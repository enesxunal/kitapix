#!/usr/bin/env node
/**
 * Downloads book covers from Open Library / Google Books, optimizes them,
 * and generates supabase/seeds/catalog.sql from scripts/catalog-data.json.
 *
 * Cover sources: Open Library Covers API, Google Books imageLinks (no retailer CDNs).
 * Demo ratings are merchandising seed metadata, not live retailer reviews.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DATA_PATH = path.join(__dirname, "catalog-data.json");
const OUT_DIR = path.join(ROOT, "public/images/books/catalog");
const SQL_PATH = path.join(ROOT, "supabase/seeds/catalog.sql");
const REPORT_PATH = path.join(__dirname, "tmp/cover-report.json");

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });

function sqlEscape(value) {
  if (value === null || value === undefined) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function fetchBuffer(url, redirects = 0) {
  const res = await fetch(url, {
    redirect: "manual",
    headers: {
      "User-Agent": "KitapixCatalogBot/1.0 (catalog seed; contact: local-dev)",
      Accept: "image/*,application/json,*/*",
    },
  });
  if ([301, 302, 303, 307, 308].includes(res.status) && redirects < 5) {
    const loc = res.headers.get("location");
    if (!loc) throw new Error(`Redirect without location: ${url}`);
    return fetchBuffer(new URL(loc, url).toString(), redirects + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, contentType: res.headers.get("content-type") || "" };
}

async function openLibraryCover(isbn) {
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
  try {
    const { buf, contentType } = await fetchBuffer(url);
    if (buf.length < 3000) return null;
    if (!contentType.includes("image") && buf[0] !== 0xff && buf[0] !== 0x89) return null;
    return buf;
  } catch {
    return null;
  }
}

async function googleBooksCover(isbn) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "KitapixCatalogBot/1.0" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const item = json.items?.[0];
    const links = item?.volumeInfo?.imageLinks;
    const coverUrl =
      links?.extraLarge ||
      links?.large ||
      links?.medium ||
      links?.thumbnail ||
      links?.smallThumbnail;
    if (!coverUrl) return null;
    const httpsUrl = coverUrl.replace(/^http:/, "https:").replace("&edge=curl", "");
    const { buf } = await fetchBuffer(httpsUrl);
    if (buf.length < 2000) return null;
    return buf;
  } catch {
    return null;
  }
}

async function openLibraryByTitle(title, author) {
  const q = encodeURIComponent(`${title} ${author}`);
  const url = `https://openlibrary.org/search.json?q=${q}&limit=5`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "KitapixCatalogBot/1.0" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const doc = (json.docs || []).find((d) => d.cover_i);
    if (!doc) return null;
    const coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
    const { buf } = await fetchBuffer(coverUrl);
    if (buf.length < 3000) return null;
    return buf;
  } catch {
    return null;
  }
}

function optimizeImage(rawPath, outPath) {
  // Resize with sips to max width 800, then Pillow compress via python
  const tmp = `${outPath}.tmp.jpg`;
  try {
    execFileSync("sips", ["-s", "format", "jpeg", rawPath, "--out", tmp], {
      stdio: "pipe",
    });
    execFileSync(
      "sips",
      ["--resampleWidth", "800", tmp, "--out", tmp],
      { stdio: "pipe" }
    );
  } catch {
    fs.copyFileSync(rawPath, tmp);
  }

  const py = `
from PIL import Image
img = Image.open(${JSON.stringify(tmp)}).convert("RGB")
w, h = img.size
if w > 800:
    nh = int(h * 800 / w)
    img = img.resize((800, nh), Image.Resampling.LANCZOS)
img.save(${JSON.stringify(outPath)}, "JPEG", quality=82, optimize=True)
print(f"{img.size[0]}x{img.size[1]}")
`;
  const size = execFileSync("python3", ["-c", py], { encoding: "utf8" }).trim();
  fs.unlinkSync(tmp);
  return size;
}

function authorName(slug) {
  return data.authors.find((a) => a.slug === slug)?.name || slug;
}

async function downloadCover(book) {
  const outPath = path.join(OUT_DIR, `${book.slug}.jpg`);
  const rawPath = path.join(__dirname, "tmp", `${book.slug}.raw`);

  let buf = await openLibraryCover(book.isbn);
  let source = "openlibrary-isbn";
  if (!buf) {
    buf = await googleBooksCover(book.isbn);
    source = "google-books";
  }
  if (!buf) {
    buf = await openLibraryByTitle(book.title, authorName(book.author_slugs[0]));
    source = "openlibrary-search";
  }
  if (!buf) {
    return { ok: false, source: null, path: null };
  }

  fs.writeFileSync(rawPath, buf);
  const dims = optimizeImage(rawPath, outPath);
  fs.unlinkSync(rawPath);
  const bytes = fs.statSync(outPath).size;
  return {
    ok: true,
    source,
    path: `/images/books/catalog/${book.slug}.jpg`,
    dims,
    bytes,
  };
}

function generateSql(coverMap) {
  const lines = [];
  lines.push("-- Real catalog seed for Kitapix");
  lines.push("-- Generated from scripts/catalog-data.json — idempotent ON CONFLICT");
  lines.push("-- demo_rating / demo_review_count are merchandising seed metadata, not live retailer reviews.");
  lines.push("-- Covers are self-hosted under /images/books/catalog/");
  lines.push("");

  lines.push("-- Deactivate legacy demo/fake books (preserve rows for any future FK safety)");
  lines.push(`update public.books
set is_active = false, is_featured = false, updated_at = now()
where slug in (
  'sessiz-zihin',
  'zamanin-kiyisinda',
  'odaklanma-sanati',
  'yeniden-baslamak',
  'gece-yolculugu',
  'gunluk-hayat-icin-felsefe',
  'merakli-cocuklar-icin-bilim',
  'kucuk-adimlar'
);`);
  lines.push("");

  lines.push("-- Categories");
  lines.push("insert into public.categories (id, name, slug, sort_order, is_active) values");
  lines.push(
    data.categories
      .map(
        (c) =>
          `  (${sqlEscape(c.id)}, ${sqlEscape(c.name)}, ${sqlEscape(c.slug)}, ${c.sort_order}, true)`
      )
      .join(",\n")
  );
  lines.push(
    "on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order, is_active = true, updated_at = now();"
  );
  lines.push("");

  // Keep old "Kurgu" category inactive if present
  lines.push(
    "update public.categories set is_active = false, updated_at = now() where slug = 'kurgu';"
  );
  lines.push("");

  lines.push("-- Publishers");
  lines.push("insert into public.publishers (id, name, slug, is_active) values");
  lines.push(
    data.publishers
      .map(
        (p) =>
          `  (${sqlEscape(p.id)}, ${sqlEscape(p.name)}, ${sqlEscape(p.slug)}, true)`
      )
      .join(",\n")
  );
  lines.push(
    "on conflict (slug) do update set name = excluded.name, is_active = true, updated_at = now();"
  );
  lines.push("");

  const usedAuthorSlugs = new Set(
    data.books.flatMap((b) => b.author_slugs)
  );
  const authors = data.authors.filter((a) => usedAuthorSlugs.has(a.slug));
  lines.push("-- Authors");
  lines.push("insert into public.authors (id, name, slug, is_active) values");
  lines.push(
    authors
      .map(
        (a) =>
          `  (${sqlEscape(a.id)}, ${sqlEscape(a.name)}, ${sqlEscape(a.slug)}, true)`
      )
      .join(",\n")
  );
  lines.push(
    "on conflict (slug) do update set name = excluded.name, is_active = true, updated_at = now();"
  );
  lines.push("");

  const pubBySlug = Object.fromEntries(data.publishers.map((p) => [p.slug, p]));
  const catBySlug = Object.fromEntries(data.categories.map((c) => [c.slug, c]));
  const authorBySlug = Object.fromEntries(data.authors.map((a) => [a.slug, a]));

  lines.push("-- Books");
  lines.push(`insert into public.books (
  id, title, slug, description, short_description, publisher_id, cover_url, isbn,
  language, format, page_count, publication_date, price, original_price,
  rating, review_count, badge, is_active, is_featured
) values`);

  const bookValues = data.books.map((b) => {
    const cover = coverMap[b.slug]?.path || null;
    const pub = pubBySlug[b.publisher_slug];
    return `  (
    ${sqlEscape(b.id)},
    ${sqlEscape(b.title)},
    ${sqlEscape(b.slug)},
    ${sqlEscape(b.description)},
    ${sqlEscape(b.short_description)},
    ${sqlEscape(pub.id)},
    ${sqlEscape(cover)},
    ${sqlEscape(b.isbn)},
    'tr',
    'printed',
    ${b.page_count},
    ${b.publication_date ? sqlEscape(b.publication_date) : "null"},
    ${Number(b.price).toFixed(2)},
    ${b.original_price == null ? "null" : Number(b.original_price).toFixed(2)},
    ${Number(b.demo_rating).toFixed(2)},
    ${b.demo_review_count},
    ${sqlEscape(b.badge)},
    true,
    ${b.is_featured ? "true" : "false"}
  )`;
  });
  lines.push(bookValues.join(",\n"));
  lines.push(`on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  publisher_id = excluded.publisher_id,
  cover_url = excluded.cover_url,
  isbn = excluded.isbn,
  language = excluded.language,
  format = excluded.format,
  page_count = excluded.page_count,
  publication_date = excluded.publication_date,
  price = excluded.price,
  original_price = excluded.original_price,
  rating = excluded.rating,
  review_count = excluded.review_count,
  badge = excluded.badge,
  is_active = true,
  is_featured = excluded.is_featured,
  updated_at = now();`);
  lines.push("");

  lines.push("-- book_authors");
  const ba = [];
  for (const b of data.books) {
    b.author_slugs.forEach((as, idx) => {
      const a = authorBySlug[as];
      ba.push(
        `  (${sqlEscape(b.id)}, ${sqlEscape(a.id)}, ${idx})`
      );
    });
  }
  lines.push(
    "insert into public.book_authors (book_id, author_id, author_order) values"
  );
  lines.push(ba.join(",\n"));
  lines.push("on conflict (book_id, author_id) do update set author_order = excluded.author_order;");
  lines.push("");

  lines.push("-- book_categories");
  const bc = [];
  for (const b of data.books) {
    for (const cs of b.category_slugs) {
      const c = catBySlug[cs];
      bc.push(`  (${sqlEscape(b.id)}, ${sqlEscape(c.id)})`);
    }
  }
  lines.push(
    "insert into public.book_categories (book_id, category_id) values"
  );
  lines.push(bc.join(",\n"));
  lines.push("on conflict (book_id, category_id) do nothing;");
  lines.push("");

  fs.writeFileSync(SQL_PATH, lines.join("\n") + "\n");
}

async function main() {
  const report = [];
  const coverMap = {};

  for (const book of data.books) {
    process.stdout.write(`Cover: ${book.slug} ... `);
    const result = await downloadCover(book);
    coverMap[book.slug] = result;
    report.push({ slug: book.slug, isbn: book.isbn, ...result });
    console.log(
      result.ok
        ? `OK (${result.source}, ${result.dims}, ${result.bytes}b)`
        : "FAILED"
    );
    // polite pacing for Open Library
    await new Promise((r) => setTimeout(r, 350));
  }

  const okCount = report.filter((r) => r.ok).length;
  console.log(`\nCovers OK: ${okCount}/${data.books.length}`);
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  generateSql(coverMap);
  console.log(`Wrote ${SQL_PATH}`);

  if (okCount < data.books.length) {
    console.error("Some covers failed — fix ISBNs or replace titles before import.");
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
