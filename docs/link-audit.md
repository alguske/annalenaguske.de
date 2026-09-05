# Link audit

Checked on 2026-09-05, covering both CVs, both legal pages, the 404 page,
structured publication data, local assets, language links, and section anchors.

## Changes

- Replaced 36 distinct URLs throughout the templates and structured data.
- Removed every Bitly and Shortlink dependency. Six Shortlink destinations
  had become interstitial pages instead of the intended content.
- Repaired two missing university project pages and an expired OECD download.
- Replaced EUCANCan and LIAISE sites with certificate/connection failures
  with their European Commission project records.
- Replaced generic redirect destinations with the specific project or publication.
- Updated the broken Cronitor product link and the LINQ canonical address.
- Kept all CV entries and publications.

## Results and limits

All 107 internal link and resource references resolve across the five generated
HTML pages. Manifest assets and sitemap destinations also exist.

Checked 48 distinct external URLs with HTTPS GET requests and redirects enabled.
45 returned HTTP 200; MDPI and OECD returned automated-access challenges (403),
and LinkedIn returned its automated-access restriction (999). Five of the 200
responses from Refubium were also bot challenges, so status codes alone were
not treated as proof that the documents were accessible.

The restricted destinations were cross-checked against public publisher,
repository, and author records:

- [MDPI article and DOI](https://www.mdpi.com/2071-1050/11/21/6163).
- [OECD report](https://one.oecd.org/document/SG/SD%282011%296/FINAL/en/pdf).
- [LinkedIn profile](https://de.linkedin.com/in/annalenaguske).
- [Finanzpolitik](https://refubium.fu-berlin.de/handle/fub188/22028).
- [Umfelder Nachhaltigen Wirtschaftens](https://refubium.fu-berlin.de/handle/fub188/20905).
- [Governance for the sustainable economy](https://refubium.fu-berlin.de/handle/fub188/25313).
- [Populated toolbox document in the same repository record](https://refubium.fu-berlin.de/bitstream/fub188/18392/1/Populated_Toolbox_front_office_with_Inventories.pdf).
- [Coauthor's publication list linking the Trade and the environment record](https://www.thuenen.de/en/institutes/baltic-sea-fisheries/staff/alumni/ferretti-johanna-dr).

These links identify the intended content, but unrestricted access could not be
verified from the automated browser. External availability and access policies
remain controlled by the destination sites. Email links use the existing address;
mail delivery was not tested.
