"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type AddressActionState = {
  error?: string;
  message?: string;
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readOptional(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value || null;
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

function parseAddressFields(formData: FormData) {
  return {
    title: readString(formData, "title"),
    first_name: readString(formData, "first_name"),
    last_name: readString(formData, "last_name"),
    phone: readOptional(formData, "phone"),
    address_line: readString(formData, "address_line"),
    district: readOptional(formData, "district"),
    city: readString(formData, "city"),
    postal_code: readOptional(formData, "postal_code"),
    country_code: readString(formData, "country_code") || "TR",
    is_default: formData.get("is_default") === "on",
  };
}

function validateAddressFields(fields: ReturnType<typeof parseAddressFields>) {
  if (!fields.title || !fields.first_name || !fields.last_name) {
    return "Başlık, ad ve soyad gerekli.";
  }
  if (!fields.address_line || !fields.city) {
    return "Adres ve şehir gerekli.";
  }
  return null;
}

async function clearOtherDefaults(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  exceptId?: string,
) {
  let query = supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", userId)
    .eq("is_default", true);

  if (exceptId) {
    query = query.neq("id", exceptId);
  }

  await query;
}

export async function createAddress(
  _prev: AddressActionState,
  formData: FormData,
): Promise<AddressActionState> {
  const fields = parseAddressFields(formData);
  const validationError = validateAddressFields(fields);
  if (validationError) {
    return { error: validationError };
  }

  const { supabase, user } = await getAuthenticatedUser();

  if (fields.is_default) {
    await clearOtherDefaults(supabase, user.id);
  }

  const { error } = await supabase.from("addresses").insert({
    user_id: user.id,
    ...fields,
  });

  if (error) {
    return { error: "Adres eklenemedi." };
  }

  revalidatePath("/hesabim/adresler");
  return { message: "Adres eklendi." };
}

export async function updateAddress(
  _prev: AddressActionState,
  formData: FormData,
): Promise<AddressActionState> {
  const addressId = readString(formData, "address_id");
  if (!addressId) {
    return { error: "Adres bulunamadı." };
  }

  const fields = parseAddressFields(formData);
  const validationError = validateAddressFields(fields);
  if (validationError) {
    return { error: validationError };
  }

  const { supabase, user } = await getAuthenticatedUser();

  if (fields.is_default) {
    await clearOtherDefaults(supabase, user.id, addressId);
  }

  const { error } = await supabase
    .from("addresses")
    .update(fields)
    .eq("id", addressId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Adres güncellenemedi." };
  }

  revalidatePath("/hesabim/adresler");
  return { message: "Adres güncellendi." };
}

export async function deleteAddress(formData: FormData) {
  const addressId = readString(formData, "address_id");
  if (!addressId) {
    return;
  }

  const { supabase, user } = await getAuthenticatedUser();
  await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", user.id);

  revalidatePath("/hesabim/adresler");
}

export async function setDefaultAddress(formData: FormData) {
  const addressId = readString(formData, "address_id");
  if (!addressId) {
    return;
  }

  const { supabase, user } = await getAuthenticatedUser();
  await clearOtherDefaults(supabase, user.id, addressId);
  await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", addressId)
    .eq("user_id", user.id);

  revalidatePath("/hesabim/adresler");
}
