#!/usr/bin/env python3
"""
Convert a Reliance price circular PDF into a flat 'long' CSV (one row per price).

Usage:  python parse_circular.py PE  PE_circular.pdf   prices_PE.csv
        python parse_circular.py PP  PP_circular.pdf   prices_PP.csv
        python parse_circular.py PVC PVC_circular.pdf  prices_PVC.csv

Rows with no location label in the PDF are written to <out>_rejects.csv.
ALWAYS review the output and run the checks in DEVELOPER_SPEC.md before publishing.
"""
import re, subprocess, sys, csv

product, pdf, out = sys.argv[1].upper(), sys.argv[2], sys.argv[3]
assert product in ("PE", "PP", "PVC"), "product must be PE, PP or PVC"
txt = subprocess.run(["pdftotext", "-layout", pdf, "-"], capture_output=True, text=True).stdout
pages = txt.split("\f")

eff = re.search(r"Eff\.?\s*Date\s*:\s*([A-Za-z]+ \d+ ?, ?\d{4})", txt)
eff_date = re.sub(r"\s+", " ", eff.group(1)).replace(" ,", ",") if eff else ""
refm = re.search(r"Ref\.?\s*:\s*([^\n]+)", txt)
ref = re.sub(r"\s+", "", refm.group(1)) if refm else ""

PE_SECTIONS = [
    ("IA|IB|IC|ID|IE|IF|IIA|IIB|IIC", "Domestic"),
    ("IIIA|IIIB|IIIC|IIID|IIIE|IIIF|IVA|IVB|IVC", "Deemed Export"),
    ("VA|VB|VC|VD|VE|VF|VIA|VIB|VIC", "SEZ"),
    ("VIIA|VIIB|VIIC|VIIIA|VIIIB|VIIIC|VII|VIII", "Ex-Depot"),
]
def sale_type(a):
    if product == "PE":
        for pat, t in PE_SECTIONS:
            if re.fullmatch(pat, a): return t
        return "Other"
    # PP / PVC: Annexure I(A-F) = domestic delivered, Annexure II = ex-depot.
    # PP Deemed Export / SEZ annexures (III-VI) are contract-based and not parsed.
    if re.fullmatch(r"I[A-F]?", a): return "Domestic"
    if a == "II": return "Ex-Depot"
    return "Other"

def polymer_of(head):
    if product != "PE": return product
    for p in ("LLDPE", "HDPE", "LDPE"):
        if p in head.upper(): return p
    return ""

def plant_of(head, stype):
    if stype == "Ex-Depot":
        return {"PE": "Hazira/Dahej/Nagothane", "PP": "Hazira/Jamnagar/Baroda/Nagothane",
                "PVC": "Hazira/Gandhar/Baroda"}[product]
    if product == "PVC":
        m = re.search(r"for\s+(.+?)\s+(?:Complex\s+)?Grades", head, re.I)
        return re.sub(r"\s*Complex$", "", m.group(1)).strip() if m else ""
    m = re.search(r"(Hazira|Jamnagar|Nagothane|Dahej|Vadodara|Baroda)", head, re.I)
    return m.group(1).title() if m else ""

LABEL_COLS = ("Sr.No.", "Pricing", "Zone", "State", "State/UT", "SEZ",
              "Location", "Depot/CS", "Depot", "Name")
rows, rejects = [], []
for pno, page in enumerate(pages, 1):
    m = re.search(r"(?i)annexure\s*-?\s*([IVX]+[A-F]?)", page)
    if not m: continue
    annex = m.group(1).upper()
    stype = sale_type(annex)
    if stype == "Other": continue
    lines = page.splitlines()
    head = " ".join(lines[:3])
    polymer, plant = polymer_of(head), plant_of(head, stype)
    hdr = None
    for line in lines:
        if "$/MT" in line: break                      # keep Rs/MT block only
        if line.strip().startswith("Sr.No"):
            hdr = line; continue
        if hdr is None: continue
        mm = re.match(r"\s*(\d+)\s+(.*)", line)
        if not mm: continue
        toks = [[t.start(), t.end(), t.group()] for t in re.finditer(r"\S+", hdr)]
        if product == "PVC":   # grade names like "57GER01 D": merge a lone capital letter into the previous token
            merged = []
            for t in toks:
                if merged and re.fullmatch(r"[A-Z]", t[2]) and merged[-1][2] not in LABEL_COLS:
                    merged[-1] = [merged[-1][0], t[1], merged[-1][2] + " " + t[2]]
                else: merged.append(t)
            toks = merged
        grade_toks = [t for t in toks if t[2] not in LABEL_COLS]
        g0 = grade_toks[0][0]
        label_part = line[:g0 - 2] if len(line) > g0 else line
        label_parts = re.split(r"\s{2,}", re.sub(r"^\s*\d+\s+", "", label_part).strip())
        for num in re.finditer(r"\d[\d,]*\.?\d*", line[g0 - 6:]):
            pos = num.end() + g0 - 6
            col = min(grade_toks, key=lambda t: abs(t[1] - pos))
            if abs(col[1] - pos) > 8: continue
            val = float(num.group().replace(",", ""))
            if val < 1000: continue                   # skip serial numbers
            if not label_parts or not label_parts[0]:
                rejects.append(dict(annexure=f"Annexure-{annex}", grade=col[2],
                                    price_inr_per_mt=int(val), source_page=pno,
                                    reason="row has no location label in PDF"))
                continue
            p = label_parts + [""] * 3
            if stype == "Ex-Depot":      state, zone, sub = p[0], p[1], p[2]
            elif stype == "SEZ":         zone, state, sub = p[0], "", p[1]
            else:                        zone, state, sub = p[0], p[1], ""
            rows.append(dict(
                product=product, sale_type=stype, polymer=polymer, plant=plant, grade=col[2],
                location=zone, state=state, sub_location=sub,
                price_inr_per_mt=int(val) if val == int(val) else val,
                annexure=f"Annexure-{annex}", source_page=pno))

seen, clean = set(), []
for r in rows:
    k = tuple(r.values())
    if k in seen: continue
    seen.add(k); clean.append(r)

with open(out, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(clean[0].keys()) + ["effective_from", "circular_ref"])
    w.writeheader()
    for r in clean:
        r["effective_from"] = eff_date; r["circular_ref"] = ref
        w.writerow(r)
rj = out.replace(".csv", "_rejects.csv")
with open(rj, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["annexure","grade","price_inr_per_mt","source_page","reason"])
    w.writeheader(); w.writerows(rejects)
print(f"[{product}] {len(clean)} rows -> {out}; {len(rejects)} skipped -> {rj}; effective {eff_date}; ref {ref}")
