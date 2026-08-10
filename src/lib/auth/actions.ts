"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  message?: string;
};

function mapAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("invalid login credentials") ||
    lower.includes("invalid credentials")
  ) {
    return "E-posta veya şifre hatalı.";
  }

  if (
    lower.includes("user already registered") ||
    lower.includes("already been registered")
  ) {
    return "Bu e-posta ile zaten bir hesap var.";
  }

  if (lower.includes("password should be") || lower.includes("password is")) {
    return "Şifre en az 6 karakter olmalı.";
  }

  if (lower.includes("email") && lower.includes("invalid")) {
    return "Geçerli bir e-posta adresi gir.";
  }

  if (lower.includes("signup is disabled")) {
    return "Yeni kayıt şu anda kapalı.";
  }

  return "İşlem tamamlanamadı. Lütfen tekrar dene.";
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signUp(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const firstName = readString(formData, "first_name");
  const lastName = readString(formData, "last_name");
  const email = readString(formData, "email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("password_confirm");
  const terms = formData.get("terms");

  if (!firstName || !lastName) {
    return { error: "Ad ve soyad gerekli." };
  }

  if (!email) {
    return { error: "E-posta gerekli." };
  }

  if (typeof password !== "string" || password.length < 6) {
    return { error: "Şifre en az 6 karakter olmalı." };
  }

  if (password !== passwordConfirm) {
    return { error: "Şifreler eşleşmiyor." };
  }

  if (terms !== "on") {
    return { error: "Devam etmek için koşulları kabul etmelisin." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  if (data.session) {
    redirect("/hesabim");
  }

  return {
    message:
      "Hesabını oluşturduk. Giriş yapmadan önce e-posta adresine gelen doğrulama linkine tıkla.",
  };
}

export async function signIn(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = readString(formData, "email");
  const password = formData.get("password");

  if (!email) {
    return { error: "E-posta gerekli." };
  }

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Şifre gerekli." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  redirect("/hesabim");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
