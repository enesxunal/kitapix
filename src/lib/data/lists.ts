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

type ListItemRow = {
  created_at: string;
  book: BookListRow | null;
};

type ReadingListRow = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  reading_list_items: ListItemRow[] | null;
};

export type ReadingListSummary = {
  id: string;
  name: string;
  description: string | null;
  bookCount: number;
  books: Book[];
};

const BOOK_EMBED_SELECT = `
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
    rating: row.rating === null || row.rating === undefined ? undefined : Number(row.rating),
    reviewCount: row.review_count,
    badge: row.badge ?? undefined,
  };
}

export async function getReadingLists(): Promise<ReadingListSummary[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reading_lists")
    .select(
      `
      id,
      name,
      description,
      created_at,
      updated_at,
      reading_list_items (
        created_at,
        book:books (
          ${BOOK_EMBED_SELECT}
        )
      )
    `,
    )
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load reading lists");
  }

  return ((data ?? []) as ReadingListRow[]).map((list) => {
    const items = [...(list.reading_list_items ?? [])].sort((a, b) =>
      b.created_at.localeCompare(a.created_at),
    );
    const books = items
      .map((item) => item.book)
      .filter((book): book is BookListRow => Boolean(book))
      .map(mapBook);

    return {
      id: list.id,
      name: list.name,
      description: list.description,
      bookCount: books.length,
      books: books.slice(0, 4),
    };
  });
}
