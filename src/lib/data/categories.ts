import { createClient } from "@/lib/supabase/server";
import type { Book } from "@/types/book";

export type CategorySummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  bookCount: number;
};

export type CategoryDetail = CategorySummary;

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
};

type BookCategoryCountRow = {
  category_id: string;
  book: { id: string } | null;
};

type PublisherEmbed = { name: string } | null;

type AuthorEmbed = {
  author_order: number;
  author: { name: string } | null;
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
    rating:
      row.rating === null || row.rating === undefined
        ? undefined
        : Number(row.rating),
    reviewCount: row.review_count,
    badge: row.badge ?? undefined,
  };
}

function throwQueryError(context: string): never {
  throw new Error(`Failed to load ${context}`);
}

async function loadActiveBookCountsByCategory(): Promise<Map<string, number>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("book_categories")
    .select("category_id, book:books!inner(id)")
    .eq("book.is_active", true);

  if (error) {
    throwQueryError("category book counts");
  }

  const counts = new Map<string, number>();
  for (const row of (data ?? []) as BookCategoryCountRow[]) {
    if (!row.book?.id) continue;
    counts.set(row.category_id, (counts.get(row.category_id) ?? 0) + 1);
  }

  return counts;
}

export async function getCategories(): Promise<CategorySummary[]> {
  const supabase = await createClient();

  const [{ data, error }, counts] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, description, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
    loadActiveBookCountsByCategory(),
  ]);

  if (error) {
    throwQueryError("categories");
  }

  return ((data ?? []) as CategoryRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    sortOrder: row.sort_order,
    bookCount: counts.get(row.id) ?? 0,
  }));
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throwQueryError("category");
  }

  if (!data) {
    return null;
  }

  const row = data as CategoryRow;

  const { count, error: countError } = await supabase
    .from("book_categories")
    .select("book_id, book:books!inner(id)", { count: "exact", head: true })
    .eq("category_id", row.id)
    .eq("book.is_active", true);

  if (countError) {
    throwQueryError("category book count");
  }

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    sortOrder: row.sort_order,
    bookCount: count ?? 0,
  };
}

export type CategoryBooksResult = {
  books: Book[];
  total: number;
};

export async function getBooksByCategorySlug(
  slug: string,
  options?: { limit?: number; offset?: number },
): Promise<(CategoryBooksResult & { category: CategoryDetail }) | null> {
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return null;
  }

  const limit = options?.limit ?? 24;
  const offset = options?.offset ?? 0;
  const supabase = await createClient();

  const { data, error, count } = await supabase
    .from("books")
    .select(
      `${BOOK_LIST_SELECT}, book_categories!inner(category_id)`,
      { count: "exact" },
    )
    .eq("is_active", true)
    .eq("book_categories.category_id", category.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throwQueryError("category books");
  }

  return {
    category,
    books: ((data ?? []) as BookListRow[]).map(mapBook),
    total: count ?? category.bookCount,
  };
}
