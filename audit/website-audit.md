# Website changes and live-page audit

Checked on 28 September 2026. Changes are prepared locally and have not been deployed.

## Prepared changes

- Standardised the company name to **Devi Sahai Charan Dass Associates** in headings, navigation image text, footer, copyright, contact page, login page, careers page and notification/grade-sheet email senders and templates.
- The current source and inspected live homepage already spell **Del Credere** correctly. No `Del Credre` occurrence was found in the source or deployed JavaScript. The new homepage title also uses the correct spelling.
- Expanded About Us to state PP, PE, PVC and **bottle-grade PET**, supplied under the same DCA arrangement, and the company's intention to grow its PET business.
- Added the supplied Google Search Console HTML verification tag to `index.html` and confirmed it in the built page. This is not a successful Google ownership verification yet; the updated HTML must be published before Google can check it.
- Corrected the canonical domain from `devisahai.com` to `devisahaicharandass.com`. Added per-page titles/canonicals and `noindex` for login, dashboard, admin and unknown routes after JavaScript renders.
- Added a sitemap with the 21 public pages below and referenced it in robots.txt. The wildcard robots rule already allows all crawlers.
- Updated the existing Apache/LiteSpeed `.htaccess`: the known retired dental demo URL returns **410 Gone**, supported app routes remain available, and unknown paths return an actual **404** instead of the SPA's former HTTP 200 fallback. These server statuses require deployment to a compatible server; Vite preview does not execute `.htaccess`.

## Live public pages found

These 21 routes are present in the active deployed JavaScript bundle and each returned HTTP 200 in direct checks. Since this is a single-page app, their HTTP bodies are the same application shell. Homepage, About Us, product catalogue and all four polymer detail pages were also inspected in the browser and display their page content. Hosting access is required to conclusively inventory any unrelated server files or historical deployments.

| Page | Live URL |
| --- | --- |
| Homepage | https://devisahaicharandass.com/ |
| About Us | https://devisahaicharandass.com/about |
| Product catalogue | https://devisahaicharandass.com/products |
| Polypropylene (PP) | https://devisahaicharandass.com/products/pp |
| Polyethylene (PE) | https://devisahaicharandass.com/products/pe |
| Polyvinyl Chloride (PVC) | https://devisahaicharandass.com/products/pvc |
| Bottle-grade PET | https://devisahaicharandass.com/products/pet |
| Vimal Gifting | https://devisahaicharandass.com/textiles/vimal-gifting |
| Vimal Suitings | https://devisahaicharandass.com/textiles/vimal-suitings |
| Uniforms | https://devisahaicharandass.com/textiles/uniforms |
| Polyester Suiting | https://devisahaicharandass.com/textiles/polyester-suiting |
| Georgia Gullini | https://devisahaicharandass.com/textiles/georgia-gullini |
| Reliance Industries | https://devisahaicharandass.com/reliance |
| Careers | https://devisahaicharandass.com/careers |
| Alok Industries | https://devisahaicharandass.com/alok |
| Alok Wovens | https://devisahaicharandass.com/alok/wovens |
| Alok Knits | https://devisahaicharandass.com/alok/knits |
| Alok Yarns | https://devisahaicharandass.com/alok/yarns |
| Alok Furnishing | https://devisahaicharandass.com/alok/furnishing |
| Alok Embroideries | https://devisahaicharandass.com/alok/embroideries |
| Contact Us | https://devisahaicharandass.com/contact |

**PP, PE, PVC and PET are live pages, not merely planned pages.** Being live does not establish that Google has indexed them.

Seven additional implemented account/admin routes are `/login`, `/dashboard`, `/admin/login`, `/admin`, `/admin/products`, `/admin/enquiries`, and `/admin/users`. They are omitted from the public sitemap. An HTTP 200 for the shared shell does not establish access to authenticated content.

## Retired theme content

`https://devisahaicharandass.com/fixed-removable-prosthesis/` currently shows the app's 404 screen. It does not show a dental demo page. The server nevertheless returns HTTP 200, a soft 404. No additional dental/theme demo routes or content were found in the source or active deployed JavaScript. The prepared 410 rule permanently retires this known URL once deployed. A full hosting-file inventory remains pending.

## AI crawler responses

Client-side HTTP observations are saved in `http-observations.json`; these are **not server access logs**.

| User-Agent used in the request | `/` | `/about` | `/products/pet` | `/robots.txt` |
| --- | --- | --- | --- | --- |
| Googlebot | 200 | 200 | 200 | 200 |
| bingbot | 200 | 200 | 200 | 200 |
| GPTBot | 200 | 200 | 200 | 200 |
| ClaudeBot | 200 | 200 | 200 | 200 |
| PerplexityBot | 200 | 200 | 200 | 200 |

Responses identify `platform: hostinger`, `panel: hpanel`, and `server: hcdn`, with Hostinger request IDs included in the observations. DNS uses `ns1.dns-parking.com` and `ns2.dns-parking.com`. These signals indicate Hostinger delivery; they do not reveal all upstream security settings or conclusively exclude another protection layer.

The live robots.txt allows all user agents. The repository's original `.htaccess` only rewrote requests to `index.html` and contained no AI-bot deny rule. The React application contains no matching crawler deny rule. No WordPress runtime was found in this project; the apparent `wp-sitemap.xml` response is also just the React shell, not a WordPress sitemap.

The reported 403s were not reproduced from this connection. Requests bearing crawler names do not originate from those crawlers' real IPs and therefore cannot rule out IP, reputation or geographic blocking. The exact blocking layer, if a block still exists, requires the owning Hostinger account's access/security/CDN logs and actual failed request timestamps/IPs. Do not disable general security protection solely on the strength of these tests.

## Search Console and indexing

The available Google account opened Search Console's welcome screen, without a verified property/report available. The requested Pages report screenshot and true Google indexing counts remain pending, as requested by the user until account access is handled later.

Before these changes, all inspected public pages declared `https://devisahai.com/` as their canonical URL. This is a plausible indexing problem, not proof of the reason Google selected particular pages. Both `/sitemap.xml` and `/wp-sitemap.xml` returned the HTML application shell instead of XML. The prepared changes correct these issues, but per-page metadata still relies on JavaScript and does not guarantee indexing or add server rendering.

## Verification and publication

- Production build passed; existing CSS/import-order and large-bundle warnings remain.
- Existing Vitest suite passed (one example test; it is not broad application coverage).
- Local browser checks confirmed the exact verification token, updated About Us copy/name, PET-page canonical, unknown-route `noindex`, and restored homepage metadata after client-side navigation.
- Targeted lint passed for the new metadata component and edited App, About, Footer, Navbar and Careers files. Linting the edited Contact and AdminLogin files also exposed their pre-existing `any` catch annotations; those unrelated annotations were left unchanged.
- Hosting rewrite behavior has not been executed against a local Apache/LiteSpeed server; verify HTTP 410/404 and all supported routes on the target host after publishing.

The owning hosting account was not accessible through the connected Hostinger API or the current hPanel website search. Publication, genuine server logs, real-crawler allowlisting if needed, and Google verification/report retrieval are deferred per the user's instruction.

Deploy the **contents** of the production build directory to this domain's correct document root, including `.htaccess`, `robots.txt`, and `sitemap.xml`. Preserve any unrelated hosting rules if the server has a different `.htaccess`. The two Supabase email functions (`send-grade-sheet` and `notify-admin`) require a separate function deployment to publish their name changes.
