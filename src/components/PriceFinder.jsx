import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./PriceFinder.css";

/**
 * PriceFinder - customer picks product (PE / PP / PVC), grade and location, and sees the price.
 * Data: /prices.json (built from the Reliance circulars by build_prices_json.py).
 * Updating prices = replacing that one file on the server. No rebuild needed.
 *
 * Props (all optional):
 *   dataUrl   : where prices.json is served from   (default "/prices.json")
 *   quoteHref : target for "Request quote"          (default "/contact"; receives ?q=<enquiry text>)
 *   whatsapp  : phone in international format, e.g. "919XXXXXXXXX" (shows a WhatsApp button)
 */
const PRODUCTS = { PE: "Polyethylene (PE)", PP: "Polypropylene (PP)", PVC: "PVC" };
const MODES = { Domestic: "Delivered to my city", "Ex-Depot": "Ex-depot (own transport)" };
const inr = (n) => "Rs " + Number(n).toLocaleString("en-IN");

export default function PriceFinder({ dataUrl = "/prices.json", quoteHref = "/contact", whatsapp }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState("PE");
  const [mode, setMode] = useState("Domestic");
  const [polymer, setPolymer] = useState("");
  const [filter, setFilter] = useState("");
  const [plant, setPlant] = useState("");
  const [gradeIdx, setGradeIdx] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    let active = true;
    const load = () => fetch(`${dataUrl}?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((next) => { if (active && next?.meta?.sources && Array.isArray(next.grades)) { setData(next); setError(null); } })
      .catch(() => { if (active) setError("Prices are temporarily unavailable. Please contact us for the latest rates."); });
    load();
    const timer = window.setInterval(load, 600000);
    return () => { active = false; window.clearInterval(timer); };
  }, [dataUrl]);

  const rows = useMemo(
    () => (data ? data.grades.filter((g) => g.product === product && g.sale_type === mode) : []),
    [data, product, mode]
  );
  const polymers = useMemo(() => [...new Set(rows.map((g) => g.polymer))].sort(), [rows]);
  const multi = polymers.length > 1;                       // PE has HDPE/LLDPE/LDPE; PP and PVC have one
  const typeRows = useMemo(() => rows.filter((g) => !multi || g.polymer === polymer), [rows, multi, polymer]);
  // one entry per individual plant (merged entries like "Hazira, Jamnagar" count for each)
  const plants = useMemo(() => {
    const m = {};
    typeRows.forEach((g) => g.plant.split(", ").forEach((p) => { m[p] = (m[p] || 0) + 1; }));
    return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]));
  }, [typeRows]);
  const plantChoice = plants.length > 1;                   // ex-depot lists have a single combined plant: no choice
  const activePlant = plantChoice ? plant : (plants[0]?.[0] ?? "");
  const ready = (!multi || polymer) && (!plantChoice || plant);
  const grades = useMemo(
    () => !ready ? [] : typeRows
      .filter((g) => g.plant.split(", ").includes(activePlant) && g.grade.toLowerCase().includes(filter.trim().toLowerCase()))
      .sort((a, b) => a.grade.localeCompare(b.grade, undefined, { numeric: true })),
    [typeRows, ready, activePlant, filter]
  );
  const selected = gradeIdx === "" ? null : grades.find((g) => g.grade === gradeIdx);
  const locations = selected ? [...selected.locations].sort((a, b) => a[0].localeCompare(b[0])) : [];
  const hit = locations.find((l) => l[0] === location);
  const source = data?.meta.sources[product];

  const resetBelow = () => { setPolymer(""); setPlant(""); setFilter(""); setGradeIdx(""); setLocation(""); };

  if (error && !data) return <div className="pf pf-error" role="alert">{error}</div>;
  if (!data) return <div className="pf">Loading prices…</div>;

  const quoteMsg = hit
    ? encodeURIComponent(`Please quote ${PRODUCTS[product]} grade ${selected.grade} (${mode === "Domestic" ? activePlant : "Ex-depot"}), location ${hit[0]}${hit[1] ? `, ${hit[1]}` : ""}. Listed price: ${inr(hit[2])}/MT excluding GST. Circular ${source.circular_ref}, effective ${source.effective_from}. Please confirm current price and availability.`)
    : "";

  return (
    <section className="pf" aria-label="Polymer price finder">
      <div className="pf-heading">
        <span className="pf-eyebrow"><span className="pf-dot" /> RELIANCE POLYMERS</span>
        <h2>Find your polymer price</h2>
        <p>Choose your product and supply details to see the listed price per metric tonne.</p>
      </div>
      {error && <p className="pf-error" role="status">The latest price file could not be refreshed. Please confirm any displayed rate with our team.</p>}

      <p className="pf-group-label">01 <span>Product</span></p>
      <div className="pf-tabs" aria-label="Product">
        {Object.entries(PRODUCTS).map(([k, label]) => (
          <button key={k} type="button" aria-pressed={product === k} className={product === k ? "on" : ""}
                  onClick={() => { setProduct(k); resetBelow(); }}>{label}</button>
        ))}
      </div>
      <p className="pf-group-label">02 <span>Supply type</span></p>
      <div className="pf-tabs" aria-label="Supply type">
        {Object.entries(MODES).map(([k, label]) => (
          <button key={k} type="button" aria-pressed={mode === k} className={mode === k ? "on" : ""}
                  onClick={() => { setMode(k); resetBelow(); }}>{label}</button>
        ))}
      </div>

      <p className="pf-group-label">03 <span>Price details</span></p>
      <div className="pf-fields">
      {multi && (
        <label className="pf-field">Type
          <select value={polymer} onChange={(e) => { setPolymer(e.target.value); setPlant(""); setFilter(""); setGradeIdx(""); setLocation(""); }}>
            <option value="">Select type…</option>
            {polymers.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
      )}

      {plantChoice && (!multi || polymer) && (
        <label className="pf-field">Plant
          <select value={plant} onChange={(e) => { setPlant(e.target.value); setFilter(""); setGradeIdx(""); setLocation(""); }}>
            <option value="">Select plant…</option>
            {plants.map(([p, n]) => <option key={p} value={p}>{p}  ({n} grades)</option>)}
          </select>
        </label>
      )}

      <label className="pf-field">Grade <small>({grades.length} available)</small>
        <input type="search" placeholder="Type to filter grades" value={filter} disabled={multi && !polymer}
               onChange={(e) => { setFilter(e.target.value); setGradeIdx(""); setLocation(""); }} />
        <select value={gradeIdx} disabled={!ready}
                onChange={(e) => { setGradeIdx(e.target.value); setLocation(""); }}>
          <option value="">Select grade…</option>
          {grades.map((g) => <option key={g.grade} value={g.grade}>{g.grade}</option>)}
        </select>
      </label>

      <label className="pf-field">{mode === "Domestic" ? "Delivery location" : "Depot"}
        <select value={location} disabled={!selected} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select location…</option>
          {locations.map(([name, state]) => <option key={name} value={name}>{name}{state ? `, ${state}` : ""}</option>)}
        </select>
      </label>
      </div>

      {hit && (
        <div className="pf-result" aria-live="polite">
          <div className="pf-result-eyebrow">LISTED PRICE</div>
          <div className="pf-price">{inr(hit[2])} <span>per MT</span></div>
          <div className="pf-sub">{PRODUCTS[product]} · {selected.grade} · {activePlant} · {hit[0]}</div>
          <div className="pf-note">
            Excluding GST. Circular {source.circular_ref}, effective {source.effective_from}.
            Indicative price, subject to confirmation and change. Discounts and availability are confirmed by our team.
          </div>
          <div className="pf-actions">
            <Link className="pf-btn" to={`${quoteHref}?q=${quoteMsg}`}>Request quote</Link>
            {whatsapp && <a className="pf-btn alt" target="_blank" rel="noreferrer"
                            href={`https://wa.me/${whatsapp}?text=${quoteMsg}`}>WhatsApp</a>}
          </div>
        </div>
      )}
    </section>
  );
}
