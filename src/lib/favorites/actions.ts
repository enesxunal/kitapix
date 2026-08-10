"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type FavoriteActionState = {
  error?: string;
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
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

export async function addFavorite(
  _prev: FavoriteActionState,
  formData: FormData,
): Promise<FavoriteActionState> {
  const bookId = readString(formData, "book_id");
  if (!bookId) {
    return { error: "Kitap seçilmedi." };
  }

  const { supabase, user } = await getAuthenticatedUser();
  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    book_id: bookId,
  });

  if (error) {
    if (error.code === "23505") {
      return {};
    }
    return { error: "Favori eklenemedi." };
  }

  revalidatePath("/hesabim/favoriler");
  revalidatePath("/kitap", "layout");
  return {};
}

export async function removeFavorite(
  _prev: FavoriteActionState,
  formData: FormData,
): Promise<FavoriteActionState> {
  const bookId = readString(formData, "book_id");
  if (!bookId) {
    return { error: "Kitap seçilmedi." };
  }

  const { supabase, user } = await getAuthenticatedUser();
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("book_id", bookId);

  if (error) {
    return { error: "Favori kaldırılamadı." };
  }

  revalidatePath("/hesabim/favoriler");
  revalidatePath("/kitap", "layout");
  return {};
}

export async function addFavoriteAction(formData: FormData) {
  await addFavorite({}, formData);
}

export async function removeFavoriteAction(formData: FormData) {
  await removeFavorite({}, formData);
}
