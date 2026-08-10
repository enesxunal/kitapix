"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getOrCreateCartId } from "@/lib/data/cart";
import { createClient } from "@/lib/supabase/server";

export type CartActionState = {
  error?: string;
  success?: boolean;
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readQuantity(formData: FormData): number | null {
  const raw = formData.get("quantity");
  const value =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number(raw);

  if (!Number.isInteger(value)) {
    return null;
  }

  return value;
}

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/giris");
  }

  return { supabase, user };
}

async function assertActiveBook(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bookId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { data, error } = await supabase
    .from("books")
    .select("id, is_active")
    .eq("id", bookId)
    .maybeSingle();

  if (error || !data) {
    return { ok: false, error: "Kitap bulunamadı." };
  }

  if (!data.is_active) {
    return { ok: false, error: "Bu kitap sepete eklenemez." };
  }

  return { ok: true };
}

function revalidateCartPaths() {
  revalidatePath("/sepet");
  revalidatePath("/kitap", "layout");
  revalidatePath("/", "layout");
}

export async function addToCart(
  _prev: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const bookId = readString(formData, "book_id");
  if (!bookId) {
    return { error: "Kitap seçilmedi." };
  }

  const { supabase, user } = await getAuthenticatedUser();
  const bookCheck = await assertActiveBook(supabase, bookId);
  if (!bookCheck.ok) {
    return { error: bookCheck.error };
  }

  const cartId = await getOrCreateCartId(supabase, user.id);

  const { data: existing, error: existingError } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("cart_id", cartId)
    .eq("book_id", bookId)
    .maybeSingle();

  if (existingError) {
    return { error: "Sepete eklenemedi." };
  }

  if (existing) {
    const nextQuantity = Math.min(existing.quantity + 1, MAX_QUANTITY);
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: nextQuantity })
      .eq("cart_id", cartId)
      .eq("book_id", bookId);

    if (error) {
      return { error: "Sepete eklenemedi." };
    }
  } else {
    const { error } = await supabase.from("cart_items").insert({
      cart_id: cartId,
      book_id: bookId,
      quantity: 1,
    });

    if (error) {
      return { error: "Sepete eklenemedi." };
    }
  }

  revalidateCartPaths();
  return { success: true };
}

export async function updateCartQuantity(
  _prev: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const bookId = readString(formData, "book_id");
  const quantity = readQuantity(formData);

  if (!bookId) {
    return { error: "Kitap seçilmedi." };
  }

  if (quantity === null || quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
    return { error: "Geçersiz adet." };
  }

  const { supabase, user } = await getAuthenticatedUser();
  const cartId = await getOrCreateCartId(supabase, user.id);

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("cart_id", cartId)
    .eq("book_id", bookId)
    .select("book_id")
    .maybeSingle();

  if (error || !data) {
    return { error: "Adet güncellenemedi." };
  }

  revalidateCartPaths();
  return { success: true };
}

export async function removeFromCart(
  _prev: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const bookId = readString(formData, "book_id");
  if (!bookId) {
    return { error: "Kitap seçilmedi." };
  }

  const { supabase, user } = await getAuthenticatedUser();
  const cartId = await getOrCreateCartId(supabase, user.id);

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId)
    .eq("book_id", bookId);

  if (error) {
    return { error: "Ürün kaldırılamadı." };
  }

  revalidateCartPaths();
  return { success: true };
}

export async function addToCartAction(formData: FormData) {
  await addToCart({}, formData);
}

export async function updateCartQuantityAction(formData: FormData) {
  await updateCartQuantity({}, formData);
}

export async function removeFromCartAction(formData: FormData) {
  await removeFromCart({}, formData);
}
