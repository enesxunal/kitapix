# Catalog source notes

Catalog populated: **2026-08-11**

## Scope

Kitapix customer storefront catalog was expanded with **32 real Turkish-edition books**.

Retailer product descriptions were **not** copied verbatim. Short and long descriptions are original Kitapix copy based on well-known work summaries.

`rating` / `review_count` values in seed data are **demo merchandising metadata** for homepage ranking (popular rail). They are not claimed as live retailer review aggregates.

## Metadata sources (types)

| Field | Source types used |
| --- | --- |
| Title / author / publisher / ISBN / page count | Publisher sites, Open Library, Google Books / bibliographic records, reputable Turkish retailers (Kitapyurdu, BKM, publisher stores) |
| Publication date | Turkish edition dates when reliably available; otherwise left approximate year or omitted |
| Price / original_price | Reference retail prices checked on 2026-08-11 from Kitapyurdu / publisher list prices where available. Prices change; treat as snapshot only. `original_price` only when a list price was visible |
| Covers | Open Library Covers API (and Open Library search cover IDs). Images downloaded and **self-hosted** under `public/images/books/catalog/`. No retailer CDN hotlinks in the database |

## Cover policy

- DB `cover_url` values look like `/images/books/catalog/{slug}.jpg`
- Images optimized for web (~600–800px width JPEG)
- Prefer Turkish edition artwork when a clean cover was available
- A few internationally standard covers remain when a clean Turkish-edition scan was not available from bibliographic sources

## Fake/demo books

Previous mock titles (`sessiz-zihin`, `odaklanma-sanati`, etc.) are set to `is_active = false` rather than hard-deleted, after confirming no production favorites/cart/order FK references.

## Regeneration

Source dataset: `scripts/catalog-data.json`  
Helper: `scripts/build-catalog.js` (cover fetch + SQL generation)
