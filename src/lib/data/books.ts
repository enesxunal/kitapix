import { createClient } from "@/lib/supabase/server";
import type { Book } from "@/types/book";

export type BookDetail = Book & {
  description: string | null;
  categories: string[];
};

type PublisherEmbed = { name: string } | null;

type AuthorEmbed = {
  author_order: number;
  author: { name: string } | null;
};

type CategoryEmbed = {
  category: { name: string } | null;
};

type BookListRow = {
  id: string;
  slug: string;
  title: string;
  cover_url: string | null;
  price: number;
  original_price: number | null;
  rating: number | null;
  review_count: number;
  badge: string | null;
  publisher: PublisherEmbed;
  book_authors: AuthorEmbed[] | null;
};

type CatalogRow = BookListRow & {
  is_featured: boolean;
  publication_date: string | null;
  created_at: string;
};

type BookDetailRow = BookListRow & {
  description: string | null;
  book_categories: CategoryEmbed[] | null;
};

type CatalogEntry = {
  book: Book;
  isFeatured: boolean;
  publicationDate: string | null;
  createdAt: string;
  rating: number;
  reviewCount: number;
};

export type HomeBookSections = {
  forYou: Book[];
  featured: Book[];
  popular: Book[];
  newest: Book[];
  hero: Book[];
};

const BOOK_LIST_SELECT = `
  id,
  slug,
  title,
  cover_url,
  price,
  original_price,
  rating,
  review_count,
  badge,
  publisher:publishers ( name ),
  book_authors (
    author_order,
    author:authors ( name )
  )
` as const;

const CATALOG_SELECT = `
  ${BOOK_LIST_SELECT},
  is_featured,
  publication_date,
  created_at
` as const;

const BOOK_DETAIL_SELECT = `
  ${BOOK_LIST_SELECT},
  description,
  book_categories (
    category:categories ( name )
  )
` as const;

function formatAuthors(bookAuthors: AuthorEmbed[] | null): string {
  if (!bookAuthors?.length) {
    return "";
  }

  return [...bookAuthors]
    .sort((a, b) => a.author_order - b.author_order)
    .map((row) => row.author?.name)
    .filter((name): name is string => Boolean(name))
    .join(", ");
}

function formatCategories(bookCategories: CategoryEmbed[] | null): string[] {
  if (!bookCategories?.length) {
    return [];
  }

  return bookCategories
    .map((row) => row.category?.name)
    .filter((name): name is string => Boolean(name));
}

function mapBook(row: BookListRow): Book {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    author: formatAuthors(row.book_authors),
    publisher: row.publisher?.name ?? "",
    cover: row.cover_url ?? "",
    price: Number(row.price),
    originalPrice:
      row.original_price === null || row.original_price === undefined
        ? undefined
        : Number(row.original_price),
    rating: row.rating === null || row.rating === undefined ? undefined : Number(row.rating),
    reviewCount: row.review_count,
    badge: row.badge ?? undefined,
  };
}

function mapBookDetail(row: BookDetailRow): BookDetail {
  return {
    ...mapBook(row),
    description: row.description,
    categories: formatCategories(row.book_categories),
  };
}

function mapCatalogEntry(row: CatalogRow): CatalogEntry {
  const book = mapBook(row);
  return {
    book,
    isFeatured: row.is_featured,
    publicationDate: row.publication_date,
    createdAt: row.created_at,
    rating: book.rating ?? 0,
    reviewCount: book.reviewCount ?? 0,
  };
}

function throwQueryError(context: string): never {
  throw new Error(`Failed to load ${context}`);
}

async function fetchActiveCatalog(): Promise<CatalogEntry[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("books")
    .select(CATALOG_SELECT)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throwQueryError("books");
  }

  return ((data ?? []) as CatalogRow[]).map(mapCatalogEntry);
}

function takeFeatured(entries: CatalogEntry[], limit: number): Book[] {
  const featured = entries.filter((entry) => entry.isFeatured).map((entry) => entry.book);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const featuredIds = new Set(featured.map((book) => book.id));
  const fillers = entries
    .map((entry) => entry.book)
    .filter((book) => !featuredIds.has(book.id));

  return [...featured, ...fillers].slice(0, limit);
}

function takeNewest(entries: CatalogEntry[], limit: number): Book[] {
  return [...entries]
    .filter((entry) => Boolean(entry.publicationDate))
    .sort((a, b) => {
      const aDate = a.publicationDate!;
      const bDate = b.publicationDate!;
      if (bDate !== aDate) {
        return bDate.localeCompare(aDate);
      }
      return b.createdAt.localeCompare(a.createdAt);
    })
    .slice(0, limit)
    .map((entry) => entry.book);
}

export async function getBooks(): Promise<Book[]> {
  const catalog = await fetchActiveCatalog();
  return catalog.map((entry) => entry.book);
}

export async function getFeaturedBooks(limit = 4): Promise<Book[]> {
  const catalog = await fetchActiveCatalog();
  return takeFeatured(catalog, limit);
}

export async function getNewestBooks(limit = 4): Promise<Book[]> {
  const catalog = await fetchActiveCatalog();
  return takeNewest(catalog, limit);
}

export async function getNewestBooksPage(options?: {
  limit?: number;
  offset?: number;
}): Promise<{ books: Book[]; total: number }> {
  const supabase = await createClient();
  const limit = options?.limit ?? 24;
  const offset = options?.offset ?? 0;

  const { data, error, count } = await supabase
    .from("books")
    .select(BOOK_LIST_SELECT, { count: "exact" })
    .eq("is_active", true)
    .not("publication_date", "is", null)
    .order("publication_date", { ascending: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throwQueryError("newest books");
  }

  return {
    books: ((data ?? []) as BookListRow[]).map(mapBook),
    total: count ?? 0,
  };
}

export async function getPopularBooks(limit = 4): Promise<Book[]> {
  const { getBestsellers } = await import("@/lib/data/bestsellers");
  const { books } = await getBestsellers(limit);
  return books;
}

function takeUnique(
  preferred: Book[],
  excludeIds: Set<string>,
  limit: number,
  fallbackPool: Book[],
): Book[] {
  const selected: Book[] = [];

  for (const book of preferred) {
    if (selected.length >= limit) break;
    if (excludeIds.has(book.id)) continue;
    selected.push(book);
    excludeIds.add(book.id);
  }

  for (const book of fallbackPool) {
    if (selected.length >= limit) break;
    if (excludeIds.has(book.id)) continue;
    selected.push(book);
    excludeIds.add(book.id);
  }

  return selected;
}

/** Single catalog fetch for homepage sections (avoids duplicate queries). */
export async function getHomeBookSections(): Promise<HomeBookSections> {
  const [{ getBestsellers }, catalog] = await Promise.all([
    import("@/lib/data/bestsellers"),
    fetchActiveCatalog(),
  ]);
  const allBooks = catalog.map((entry) => entry.book);
  const usedIds = new Set<string>();

  const { books: bestsellerBooks } = await getBestsellers(8);
  const forYou = takeUnique(allBooks, usedIds, 5, allBooks);
  const featured = takeUnique(takeFeatured(catalog, 8), usedIds, 4, allBooks);
  const popular = takeUnique(bestsellerBooks, usedIds, 4, []);
  const newest = takeUnique(takeNewest(catalog, 8), usedIds, 4, allBooks);

  return {
    forYou,
    featured,
    popular,
    newest,
    hero: forYou.slice(0, 3),
  };
}

export async function getBookBySlug(slug: string): Promise<BookDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("books")
    .select(BOOK_DETAIL_SELECT)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throwQueryError("book");
  }

  if (!data) {
    return null;
  }

  return mapBookDetail(data as BookDetailRow);
}

export async function getRelatedBooks(bookId: string): Promise<Book[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("books")
    .select(BOOK_LIST_SELECT)
    .eq("is_active", true)
    .neq("id", bookId)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    throwQueryError("related books");
  }

  return ((data ?? []) as BookListRow[]).map(mapBook);
}
