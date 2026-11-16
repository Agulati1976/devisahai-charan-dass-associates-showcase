# Updating the Price Finder

The website reads `/prices.json` when the page opens and refreshes it every 10 minutes. Updating that single file in the website's document root updates prices without a React build. The current file uses the Reliance PE, PP and PVC circulars effective **1 November 2026**.

1. Save the latest Reliance PDF for each changed product. Keep the unchanged CSVs in this folder.
2. From this folder, run the parser for each changed circular. It requires Python 3 and Poppler's `pdftotext` command:

   ```text
   python parse_circular.py PE NEW_PE.pdf prices_PE.csv
   python parse_circular.py PP NEW_PP.pdf prices_PP.csv
   python parse_circular.py PVC NEW_PVC.pdf prices_PVC.csv
   ```

   Run only the lines for products whose PDF changed. If the circular layout has changed, stop and review the parser output before publishing.

3. Review each changed `prices_*_rejects.csv`. The November PE circular has 70 prices with no location label; do not guess the location. Build the combined file with **all three** CSVs:

   ```text
   python build_prices_json.py prices.json prices_PE.csv prices_PP.csv prices_PVC.csv
   ```

4. Check the effective dates and references printed by the builder. Compare row counts with the prior run and spot-check prices against the PDFs, especially PE 46GP009 at Delhi, PVC 57GER01 at Delhi, and PP AS030N at Ahmedabad. Review prices that differ sharply from the previous file. The builder publishes only Domestic delivered and Ex-Depot prices.
5. Save a dated copy such as `prices-2026-11-13.json` for history. Upload the new `prices.json` **over the existing file in the deployed site's document root** (the same folder as `index.html`). Keep the exact filename. If your host has a CDN cache, purge that file's cache.
6. Open `/prices`, select one changed price, and verify its amount and effective date against the PDF. Check `/prices.json` returns JSON, and try Request quote to confirm the contact form is prefilled.

For a full site deployment, `public/prices.json` is copied into `dist/prices.json` by Vite. A later full build from this repository will overwrite the server file with the repository version, so commit the newly approved JSON here as well before the next full deployment. Routine price-only updates can be uploaded to the server directly without a build.

The extractor handles Domestic and Ex-Depot rupee tables. If the parser stops or any sample fails checks, resolve it with the PDF or Reliance before upload.
