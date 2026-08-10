"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isShippingMethodKey } from "@/lib/checkout/shipping";
import { createClient } from "@/lib/supabase/server";

export type CheckoutActionState = {
  error?: string;
};

type CreateOrderResult = {
  order_id: string;
  order_number: string;
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function mapCheckoutError(message: string | undefined): string {
  const text = (message ?? "").toLowerCase();

  if (text.includes("not authenticated")) {
    return "Sipariş vermek için giriş yapmalısın.";
  }
  if (text.includes("cart is empty")) {
    return "Sepetin boş. Sipariş oluşturmak için sepete ürün ekle.";
  }
  if (text.includes("address not found") || text.includes("address is required")) {
    return "Geçerli bir teslimat adresi seçmelisin.";
  }
  if (text.includes("invalid shipping method")) {
    return "Geçersiz kargo seçimi.";
  }
  if (text.includes("unavailable books")) {
    return "Sepetinde satın alınamayan kitaplar var. Sepeti kontrol et.";
  }

  return "Sipariş oluşturulamadı. Lütfen tekrar dene.";
}

export async function placeOrder(
  _prev: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const addressId = readString(formData, "address_id");
  const shippingMethod = readString(formData, "shipping_method");

  if (!addressId) {
    return { error: "Teslimat adresi seçmelisin." };
  }

  if (!isShippingMethodKey(shippingMethod)) {
    return { error: "Geçersiz kargo seçimi." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/giris");
  }

  const { data, error } = await supabase.rpc("create_order_from_cart", {
    p_address_id: addressId,
    p_shipping_method: shippingMethod,
  });

  if (error || !data) {
    return { error: mapCheckoutError(error?.message) };
  }

  const result = data as CreateOrderResult;
  if (!result.order_id || !result.order_number) {
    return { error: "Sipariş oluşturulamadı. Lütfen tekrar dene." };
  }

  revalidatePath("/sepet");
  revalidatePath("/odeme");
  revalidatePath("/hesabim/siparisler");
  revalidatePath("/hesabim/siparis", "layout");
  revalidatePath("/", "layout");

  redirect(`/siparis-basarili?order=${encodeURIComponent(result.order_id)}`);
}
