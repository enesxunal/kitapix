import { createClient } from "@/lib/supabase/server";
import type { Book } from "@/types/book";

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

type BestsellerRpcRow = {
  book_id: string;
  units_sold: number;
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

export type BestsellerBook = Book & {
  unitsSold: number;
};

export type BestsellersResult = {
  books: BestsellerBook[];
  /** All-time paid sales only; no period window claimed in UI. */
  period: "all_time";
};

/**
 * Bestsellers from paid, non-cancelled orders.
 * Uses SECURITY DEFINER RPC so order row PII stays private under RLS.
 */
export async function getBestsellers(
  limit = 24,
): Promise<BestsellersResult> {
  const supabase = await createClient();

  const { data: ranks, error: rankError } = await supabase.rpc(
    "get_bestselling_books",
    { p_limit: limit },
  );

  if (rankError) {
    // RPC may be missing before migration is applied — fail soft with empty list.
    if (
      rankError.message?.includes("get_bestselling_books") ||
      rankError.code === "PGRST202" ||
      rankError.code === "42883"
    ) {
      return { books: [], period: "all_time" };
    }
    throwQueryError("bestsellers");
  }

  const ranked = ((ranks ?? []) as BestsellerRpcRow[]).filter(
    (row) => row.book_id && row.units_sold > 0,
  );

  if (ranked.length === 0) {
    return { books: [], period: "all_time" };
  }

  const ids = ranked.map((row) => row.book_id);
  const unitsById = new Map(
    ranked.map((row) => [row.book_id, Number(row.units_sold)]),
  );

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select(BOOK_LIST_SELECT)
    .eq("is_active", true)
    .in("id", ids);

  if (booksError) {
    throwQueryError("bestseller books");
  }

  const bookById = new Map(
    ((books ?? []) as BookListRow[]).map((row) => [row.id, mapBook(row)]),
  );

  const result: BestsellerBook[] = [];
  for (const id of ids) {
    const book = bookById.get(id);
    if (!book) continue;
    result.push({
      ...book,
      unitsSold: unitsById.get(id) ?? 0,
    });
  }

  return { books: result, period: "all_time" };
}
