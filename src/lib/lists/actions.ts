"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type ListActionState = {
  error?: string;
  message?: string;
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

export async function createReadingList(
  _prev: ListActionState,
  formData: FormData,
): Promise<ListActionState> {
  const name = readString(formData, "name");
  const description = readString(formData, "description");

  if (!name) {
    return { error: "Liste adı gerekli." };
  }

  const { supabase, user } = await getAuthenticatedUser();
  const { error } = await supabase.from("reading_lists").insert({
    user_id: user.id,
    name,
    description: description || null,
  });

  if (error) {
    return { error: "Liste oluşturulamadı." };
  }

  revalidatePath("/hesabim/listeler");
  return { message: "Liste oluşturuldu." };
}

export async function updateReadingList(
  _prev: ListActionState,
  formData: FormData,
): Promise<ListActionState> {
  const listId = readString(formData, "list_id");
  const name = readString(formData, "name");
  const description = readString(formData, "description");

  if (!listId) {
    return { error: "Liste bulunamadı." };
  }

  if (!name) {
    return { error: "Liste adı gerekli." };
  }

  const { supabase, user } = await getAuthenticatedUser();
  const { error } = await supabase
    .from("reading_lists")
    .update({
      name,
      description: description || null,
    })
    .eq("id", listId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Liste güncellenemedi." };
  }

  revalidatePath("/hesabim/listeler");
  return { message: "Liste güncellendi." };
}

export async function deleteReadingList(formData: FormData) {
  const listId = readString(formData, "list_id");
  if (!listId) {
    return;
  }

  const { supabase, user } = await getAuthenticatedUser();
  await supabase
    .from("reading_lists")
    .delete()
    .eq("id", listId)
    .eq("user_id", user.id);

  revalidatePath("/hesabim/listeler");
}
