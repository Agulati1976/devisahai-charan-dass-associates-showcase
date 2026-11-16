#!/usr/bin/env python3
"""Extract Domestic and Ex-Depot INR/MT prices from a Reliance circular."""
import argparse
import csv
import re
import subprocess
from pathlib import Path

HEADER = re.compile(
    r"\s*Sr\.No\.\s+(?:(?P<domestic>Pricing Zone\s+State)|"
    r"(?P<depot>State/UT\s+Depot/CS Location)(?P<name>\s+Depot Name)?)\s+"
)
AMOUNT = re.compile(r"(?<!\S)\d[\d,]*(?:\.\d+)?(?!\S)")
SERIAL = re.compile(r"^\s*(\d+)\s+")
PUBLIC_PE_DEPOT = {"VII", "VIIA", "VIIB", "VIIC", "VIII", "VIIIA", "VIIIB", "VIIIC"}
FIELDS = (
    "product", "sale_type", "polymer", "plant", "grade", "location", "state",
    "sub_location", "price_inr_per_mt", "annexure", "source_page", "effective_from",
    "circular_ref",
)


def page_info(product, page_heading):
    ref = re.search(r"Ref\.?\s*:\s*(?:PE/\s*|PVC/\s*)?\d{4}-\d{2}/(?:PP/DTA/)?\d+\s*", page_heading)
    if not ref:
        return None
    heading = page_heading[ref.end():]
    match = re.search(r"annexure\s*-?\s*([IVX]+[A-F]?)", heading, re.I)
    annex = match[1].upper() if match else ""
    if product == "PVC" and not annex and re.search(r"\bEx\s*-?\s*Depot Prices of\b", heading, re.I):
        annex = "II"
    if product == "PE":
        polymer = re.search(r"\b(LLDPE|HDPE|LDPE)\b", heading, re.I)
        if not polymer:
            return None
        if annex in PUBLIC_PE_DEPOT:
            plant = re.search(r"\bPrices of\s+(.+?)\s+" + polymer[1], heading, re.I)
            mode = "Ex-Depot"
        elif re.fullmatch(r"I[A-F]|II[A-C]", annex):
            plant = re.search(r"\bPrices for\s+(.+?)\s+" + polymer[1], heading, re.I)
            mode = "Domestic"
        else:
            return None
        polymer = polymer[1].upper()
    else:
        polymer = product
        if annex == "II":
            plant = re.search(r"\b(?:Price|Prices) of\s+(.+?)\s+Grades\b", heading, re.I)
            mode = "Ex-Depot"
        elif re.fullmatch(r"I[A-F]?", annex):
            plant = re.search(r"\bprices for\s+(.+?)\s+(?:Complex\s+)?Grades\b", heading, re.I)
            mode = "Domestic"
        else:
            return None
    if not plant:
        raise ValueError(f"Unrecognized plant in {heading}")
    return annex, mode, polymer, re.sub(r"\s*(?:,|&|\band\b)\s*", "/", plant[1], flags=re.I)


def labels(line, start, stop, column_starts):
    part = line[start:stop].rstrip()
    if not part:
        return []
    # Poppler can expose adjacent narrow columns with only one space between
    # them. Use header positions to find the gaps, keeping spaces inside labels.
    gaps = list(re.finditer(r" +(?=\S)", part))
    cuts = [0]
    for col in column_starts:
        cut = min(gaps, key=lambda g: abs(g.end() + start - col), default=None)
        if not cut or abs(cut.end() + start - col) > 3 or cut.end() <= cuts[-1]:
            raise ValueError(f"Cannot separate location fields: {part!r}")
        cuts.append(cut.end())
    cuts.append(len(part))
    return [part[a:b].strip() for a, b in zip(cuts, cuts[1:])]


def parse(product, txt):
    pages = txt.split("\f")
    eff = re.search(r"Eff\.?\s*Date\s*:\s*([A-Za-z]+ \d+\s*,\s*\d{4})", pages[0])
    ref_match = re.search(r"Ref\.?\s*:\s*([^\n]+)", pages[0])
    if not (eff and ref_match):
        raise ValueError("Missing circular reference or effective date")
    date = re.sub(r"\s*,\s*", ", ", eff[1])
    ref = re.sub(r"\s+", "", ref_match[1])
    ref_pattern = (r"\d{4}-\d{2}/PP/DTA/\d+" if product == "PP"
                   else rf"{product}/\d{{4}}-\d{{2}}/\d+")
    if not re.fullmatch(ref_pattern, ref):
        raise ValueError(f"The circular reference does not match {product}")
    rows, rejects = [], []
    for page_no, page in enumerate(pages, 1):
        lines = [line for line in page.splitlines() if line.strip()]
        info = page_info(product, " ".join(lines[:3]))
        if not info:
            continue
        annex, mode, polymer, plant = info
        try:
            idx, header = next((i, HEADER.match(line)) for i, line in enumerate(lines) if HEADER.match(line))
        except StopIteration as exc:
            raise ValueError(f"{product} page {page_no}: no price table header") from exc
        header_text = lines[idx]
        start = header.end()
        grades = [(g[0], start + g.end()) for g in re.finditer(
            r"\S+" if product == "PE" else r"\S+(?: \S+)*", header_text[start:]
        )]
        if mode == "Domestic":
            split_at = [header_text.index("State", header.start("domestic"))]
        else:
            split_at = [header_text.index("Depot/CS", header.start("depot"))]
            if header["name"]:
                split_at.append(header_text.index("Depot Name", header.start("name")))
        if bool(header["domestic"]) != (mode == "Domestic") or not grades:
            raise ValueError(f"{product} page {page_no}: unexpected price table header")
        for line in lines[idx + 1:]:
            if "$/MT" in line:
                break
            serial = SERIAL.match(line)
            if not serial:
                continue
            amounts = [n for n in AMOUNT.finditer(line) if n.start() >= start - 12
                       and float(n[0].replace(",", "")) >= 1000]
            if not amounts:
                continue
            # The first nonspace can itself be a price in rows with no labels.
            fields = labels(line, serial.end(), amounts[0].start(), split_at)
            used = set()
            for n in amounts:
                matching = [(grade, edge) for grade, edge in grades if abs(edge - n.end()) <= 2]
                if len(matching) != 1 or matching[0] in used:
                    raise ValueError(f"{product} page {page_no}, row {serial[1]}: ambiguous price column")
                grade, edge = matching[0]
                used.add((grade, edge))
                amount = n[0].replace(",", "")
                price = float(amount) if "." in amount else int(amount)
                if not fields:
                    rejects.append((f"Annexure-{annex}", grade, price, page_no, "row has no location label in PDF"))
                    continue
                if mode == "Domestic":
                    location, state = fields
                    depot = ""
                else:
                    state, location, *rest = fields
                    depot = rest[0] if rest else ""
                if not state or not location or (header["name"] and not depot):
                    raise ValueError(f"{product} page {page_no}, row {serial[1]}: incomplete location labels")
                rows.append((product, mode, polymer, plant, grade, location, state, depot,
                             price, f"Annexure-{annex}", page_no, date, ref))
    if not rows or {row[1] for row in rows} != {"Domestic", "Ex-Depot"}:
        raise ValueError(f"{product}: missing Domestic or Ex-Depot prices")
    return list(dict.fromkeys(rows)), rejects


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("product", choices=("PE", "PP", "PVC"))
    ap.add_argument("pdf", type=Path)
    ap.add_argument("output", type=Path)
    args = ap.parse_args()
    txt = subprocess.run(["pdftotext", "-layout", "-enc", "UTF-8", args.pdf, "-"],
                         check=True, capture_output=True, encoding="utf-8").stdout
    rows, rejects = parse(args.product, txt)
    for path, header, data in (
        (args.output, FIELDS, rows),
        (args.output.with_name(args.output.stem + "_rejects.csv"),
         ("annexure", "grade", "price_inr_per_mt", "source_page", "reason"), rejects)
    ):
        with path.open("w", encoding="utf-8", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(data)
    print(f"[{args.product}] {len(rows)} rows, {len(rejects)} unlabeled prices; {rows[0][-2]}, {rows[0][-1]}")


if __name__ == "__main__":
    main()
