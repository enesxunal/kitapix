import { createClient } from "@/lib/supabase/server";

export type CartBook = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  price: number;
  originalPrice?: number;
  publisher: string;
  author: string;
};

export type CartItem = {
  bookId: string;
  quantity: number;
  book: CartBook;
};

export type Cart = {
  id: string;
  items: CartItem[];
  subtotal: number;
  originalTotal: number;
  itemCount: number;
};

type PublisherEmbed = { name: string } | null;

type AuthorEmbed = {
  author_order: number;
  author: { name: string } | null;
};

type CartBookRow = {
  id: string;
  slug: string;
  title: string;
  cover_url: string | null;
  price: number;
  original_price: number | null;
  publisher: PublisherEmbed;
  book_authors: AuthorEmbed[] | null;
};

type CartItemRow = {
  book_id: string;
  quantity: number;
  book: CartBookRow | null;
};

type CartRow = {
  id: string;
  cart_items: CartItemRow[] | null;
};

const CART_BOOK_SELECT = `
  id,
  slug,
  title,
  cover_url,
  price,
  original_price,
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

function mapBook(row: CartBookRow): CartBook {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    cover: row.cover_url ?? "",
    price: Number(row.price),
    originalPrice:
      row.original_price === null || row.original_price === undefined
        ? undefined
        : Number(row.original_price),
    publisher: row.publisher?.name ?? "",
    author: formatAuthors(row.book_authors),
  };
}

export async function getOrCreateCartId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<string> {
  const { data: existing, error: selectError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (selectError) {
    throw new Error("Failed to load cart");
  }

  if (existing?.id) {
    return existing.id;
  }

  const { data: created, error: insertError } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      const { data: raced, error: raceError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (raceError || !raced?.id) {
        throw new Error("Failed to create cart");
      }

      return raced.id;
    }

    throw new Error("Failed to create cart");
  }

  return created.id;
}

export async function getCart(): Promise<Cart | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("carts")
    .select(
      `
      id,
      cart_items (
        book_id,
        quantity,
        book:books (
          ${CART_BOOK_SELECT}
        )
      )
    `,
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to load cart");
  }

  if (!data) {
    return {
      id: "",
      items: [],
      subtotal: 0,
      originalTotal: 0,
      itemCount: 0,
    };
  }

  const row = data as CartRow;
  const items: CartItem[] = (row.cart_items ?? [])
    .filter((item): item is CartItemRow & { book: CartBookRow } =>
      Boolean(item.book),
    )
    .map((item) => ({
      bookId: item.book_id,
      quantity: item.quantity,
      book: mapBook(item.book),
    }))
    .sort((a, b) => a.book.title.localeCompare(b.book.title, "tr"));

  const subtotal = items.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0,
  );
  const originalTotal = items.reduce((sum, item) => {
    const unit = item.book.originalPrice ?? item.book.price;
    return sum + unit * item.quantity;
  }, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    id: row.id,
    items,
    subtotal,
    originalTotal,
    itemCount,
  };
}

export async function getCartCount(): Promise<number> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return 0;
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (cartError) {
    throw new Error("Failed to load cart count");
  }

  if (!cart) {
    return 0;
  }

  const { data: items, error: itemsError } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("cart_id", cart.id);

  if (itemsError) {
    throw new Error("Failed to load cart count");
  }

  return (items ?? []).reduce((sum, item) => sum + item.quantity, 0);
}
