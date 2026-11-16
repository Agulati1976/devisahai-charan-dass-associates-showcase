import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Supply = "Domestic" | "Ex-Depot";
type Source = { circular_ref: string; effective_from: string };
type Sample = { grade: string; plant: string; location: string; state: string; price: number };
type Preview = {
  token: string;
  product: string;
  source: Source;
  previous: Source;
  prices: Record<Supply, number>;
  samples: Record<Supply, Sample>;
  excluded: number;
};

const modes: Supply[] = ["Domestic", "Ex-Depot"];
const amount = new Intl.NumberFormat("en-IN");

async function pricingRequest<T>(action: "preview" | "publish", body: FormData): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session && "access_token" in session ? session.access_token : null;
  if (typeof token !== "string") throw new Error("Sign in as an admin to manage pricing.");
  const response = await fetch(`/dscda-api/prices-admin.php?action=${action}`, {
    method: "POST", credentials: "same-origin", body,
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) throw new Error(result?.error || "The pricing service is unavailable.");
  return result as T;
}

export default function AdminPricing() {
  const [product, setProduct] = useState("PE");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [pending, setPending] = useState<"preview" | "publish" | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function resetPreview() {
    setPreview(null);
    setError("");
    setNotice("");
  }

  async function inspect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || pending) return;
    resetPreview();
    if (file.size > 5 * 1024 * 1024) {
      setError("Choose a PDF circular under 5 MB.");
      return;
    }
    setPending("preview");
    const body = new FormData();
    body.append("product", product);
    body.append("circular", file);
    try {
      setPreview(await pricingRequest<Preview>("preview", body));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The circular could not be read.");
    } finally {
      setPending(null);
    }
  }

  async function publish() {
    if (!preview || pending) return;
    setPending("publish");
    setError("");
    const body = new FormData();
    body.append("token", preview.token);
    try {
      await pricingRequest<{ published: boolean }>("publish", body);
      setNotice(`${preview.product} prices effective ${preview.source.effective_from} are live.`);
      setPreview(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Prices could not be published.");
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Pricing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Upload a Reliance price circular, review the extracted rates, then publish them to the Price Finder.</p>
      </div>
      <form onSubmit={inspect} className="space-y-4 rounded-xl border bg-card p-5">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="pricing-product">Product</label>
          <select id="pricing-product" className="w-full rounded-md border bg-background p-2 sm:w-60" value={product}
            disabled={pending !== null} onChange={(event) => { setProduct(event.target.value); resetPreview(); }}>
            <option value="PE">Polyethylene (PE)</option>
            <option value="PP">Polypropylene (PP)</option>
            <option value="PVC">PVC</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="pricing-pdf">Reliance price circular (PDF)</label>
          <input id="pricing-pdf" type="file" accept="application/pdf,.pdf" required disabled={pending !== null}
            className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-foreground"
            onChange={(event) => { setFile(event.target.files?.[0] ?? null); resetPreview(); }} />
        </div>
        <Button type="submit" disabled={!file || pending !== null}>
          {pending === "preview" ? "Reading circular…" : "Preview prices"}
        </Button>
      </form>

      {preview && (
        <section className="space-y-4 rounded-xl border bg-card p-5" aria-labelledby="pricing-preview">
          <div>
            <h2 id="pricing-preview" className="text-lg font-bold">Review {preview.product} prices</h2>
            <p className="text-sm">{preview.source.circular_ref} · Effective {preview.source.effective_from}</p>
            <p className="mt-1 text-sm text-muted-foreground">Currently published {preview.previous.circular_ref} · {preview.previous.effective_from}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {modes.map((mode) => {
              const sample = preview.samples[mode];
              return (
                <div key={mode} className="rounded-lg border p-3 text-sm">
                  <p className="font-semibold">{mode === "Domestic" ? "Delivered" : "Ex-depot"}</p>
                  <p>{amount.format(preview.prices[mode])} prices</p>
                  <p className="mt-2 text-muted-foreground">
                    {sample.grade} · {sample.location}{sample.state ? `, ${sample.state}` : ""}<br />
                    {sample.plant} · ₹{amount.format(sample.price)}/MT excluding GST
                  </p>
                </div>
              );
            })}
          </div>
          {preview.excluded > 0 && <p className="text-sm">{preview.excluded} prices have no location in the PDF and are excluded from this update.</p>}
          <Button type="button" disabled={pending !== null} onClick={publish}>
            {pending === "publish" ? "Publishing…" : `Publish ${preview.product} prices`}
          </Button>
        </section>
      )}
      {error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
      {notice && <p role="status" className="rounded-lg border bg-card p-3 text-sm">{notice} <a href="/prices" className="text-primary underline">Open Price Finder</a></p>}
    </div>
  );
}
