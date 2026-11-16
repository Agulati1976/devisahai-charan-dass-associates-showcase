#!/usr/bin/env python3
"""Build and summarize one uploaded circular for the admin preview."""
import csv
import json
from pathlib import Path
import subprocess
import sys


def main():
    product, pdf, extractor = sys.argv[1:]
    folder = Path(pdf).parent
    tools = Path(__file__).resolve().parent
    # Give the existing parser a fixed PDF extractor executable via PATH.
    import os
    env = {"PATH": str(Path(extractor).parent) + os.pathsep + os.defpath,
           "LANG": "C.UTF-8", "PYTHONDONTWRITEBYTECODE": "1"}
    csv_path = folder / "product.csv"
    output = folder / "product.json"
    subprocess.run([sys.executable, tools / "parse_circular.py", product, pdf, csv_path],
                   env=env, check=True, stdout=subprocess.DEVNULL)
    subprocess.run([sys.executable, tools / "build_prices_json.py", output, csv_path],
                   check=True, stdout=subprocess.DEVNULL)
    with csv_path.with_name("product_rejects.csv").open(encoding="utf-8", newline="") as stream:
        excluded = sum(1 for _ in csv.DictReader(stream))
    print(json.dumps({"excluded": excluded}))


if __name__ == "__main__":
    main()
