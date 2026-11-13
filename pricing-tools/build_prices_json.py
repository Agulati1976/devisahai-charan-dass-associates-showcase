#!/usr/bin/env python3
"""
Per-product CSVs  ->  one prices.json for the website.

Usage: python build_prices_json.py prices.json prices_PE.csv prices_PP.csv prices_PVC.csv
                                   [--types "Domestic,Ex-Depot"]

JSON shape:
{
  "meta":   {"unit": "INR/MT", "gst": "excluded",
            "sources": {"PE": {"effective_from": "...", "circular_ref": "..."}, "PP": {...}, "PVC": {...}}},
  "grades": [
    {"product": "PP", "sale_type": "Domestic", "polymer": "PP", "plant": "Hazira / Jamnagar / Baroda",
     "grade": "AS030N", "locations": [["AGARTALA", "TR", 170970], ...]}
  ]
}
Identical price lists for the same grade made at several plants are merged into one entry.
"""
import csv, json, sys, collections
args = sys.argv[1:]
types = {"Domestic", "Ex-Depot"}            # public: delivered + ex-depot (see DEVELOPER_SPEC.md)
if "--types" in args:
    i = args.index("--types"); types = {t.strip() for t in args[i + 1].split(",")}; del args[i:i + 2]
dst, srcs = args[0], args[1:]

groups, sources = collections.OrderedDict(), {}
for src in srcs:
    seen = {}
    for r in csv.DictReader(open(src, encoding="utf-8")):
        if r["sale_type"] not in types: continue
        sources[r["product"]] = {"effective_from": r["effective_from"], "circular_ref": r["circular_ref"]}
        key = (r["product"], r["sale_type"], r["polymer"], r["plant"], r["grade"])
        loc = r["location"] if r["sale_type"] != "Ex-Depot" else f'{r["location"]} - {r["sub_location"]}'
        price = float(r["price_inr_per_mt"]); price = int(price) if price.is_integer() else price
        k2 = key + (loc,)
        if k2 in seen:
            if seen[k2] == price: continue          # exact duplicate row in the PDF
            n = sum(1 for x in seen if x[:-1] == key and x[-1].startswith(loc))
            loc = f"{loc} (#{n + 1})"; k2 = key + (loc,)
        seen[k2] = price
        groups.setdefault(key, []).append([loc, r["state"], price])

# merge plants whose price lists for a grade are identical
merged = collections.OrderedDict()
for (prod, st, poly, plant, grade), locs in groups.items():
    sig = (prod, st, poly, grade, json.dumps(locs))
    if sig in merged: merged[sig]["plants"].append(plant)
    else: merged[sig] = {"product": prod, "sale_type": st, "polymer": poly,
                         "plants": [plant], "grade": grade, "locations": locs}
grades = []
for g in merged.values():
    g["plant"] = ", ".join(dict.fromkeys(g.pop("plants")))
    grades.append(g)

out = {"meta": {"unit": "INR/MT", "gst": "excluded", "sources": sources}, "grades": grades}
json.dump(out, open(dst, "w"), separators=(",", ":"))
import os
print(f"{len(grades)} grade entries, {sum(len(g['locations']) for g in grades)} prices, "
      f"{os.path.getsize(dst)/1e6:.2f} MB -> {dst}")
print({p: s['effective_from'] for p, s in sources.items()})
