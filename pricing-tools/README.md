# Updating the Price Finder

To update prices on the live site, sign in to **Admin → Pricing**, select PE, PP or PVC, and upload the corresponding Reliance price circular. Click **Preview prices**, review the effective date, sample prices and skipped entries, then click **Publish**. Repeat for each product that has a new circular.

The Price Finder loads `/prices.json` when the page opens and refreshes it every 10 minutes. The bundled file uses the circulars effective **1 November 2026**. On Hostinger, the live route prefers the file published through Admin, which is stored outside the website folder so it survives frontend deploys.

## Manual preparation

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
5. Save a dated copy such as `prices-2026-11-13.json` for history. Update the bundled `public/prices.json` if the checked-in fallback needs to change. Use **Admin → Pricing** for routine live updates.
6. Open `/prices`, select one changed price, and verify its amount and effective date against the PDF. Check `/prices.json` returns JSON, and try Request quote to confirm the contact form is prefilled.

## Hostinger setup

The Vite build copies `public/dscda-api/` and `public/.htaccess` into the Hostinger deployment. Keep the PHP endpoints and pricing rewrite rules together.

Under the domain's `dscda-private/pricing/` directory, put the three Python scripts in `tools/`, an executable `pdftotext` in `bin/`, and `auth.json` with `url` and `publishable_key` from the site's Supabase configuration. The endpoint uses PHP cURL, `proc_open`, `/usr/bin/python3`, and `/usr/bin/timeout`. Keep that directory private to the site account. `current.json` and `previous.json` are managed by the publish action.

The extractor handles Domestic and Ex-Depot rupee tables. If the parser stops or any sample fails checks, resolve it with the PDF or Reliance before upload.
