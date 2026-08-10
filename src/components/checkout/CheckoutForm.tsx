"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  placeOrder,
  type CheckoutActionState,
} from "@/lib/checkout/actions";
import {
  SHIPPING_METHODS,
  getShippingTotal,
  type ShippingMethodKey,
} from "@/lib/checkout/shipping";
import type { Address } from "@/lib/data/addresses";
import type { CartItem } from "@/lib/data/cart";

type CheckoutFormProps = {
  addresses: Address[];
  cartItems: CartItem[];
  subtotal: number;
  originalTotal: number;
};

const initialState: CheckoutActionState = {};

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(value);
}

export function CheckoutForm({
  addresses,
  cartItems,
  subtotal,
  originalTotal,
}: CheckoutFormProps) {
  const defaultAddressId =
    addresses.find((address) => address.isDefault)?.id ?? addresses[0]?.id ?? "";
  const [addressId, setAddressId] = useState(defaultAddressId);
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethodKey>("standard");
  const [state, formAction, pending] = useActionState(placeOrder, initialState);

  const discount = Math.max(0, originalTotal - subtotal);
  const shippingTotal = getShippingTotal(shippingMethod);
  const grandTotal = subtotal + shippingTotal;

  if (addresses.length === 0) {
    return (
      <section className="rounded-large border border-border bg-surface p-6 md:p-8">
        <h2 className="text-h3 text-foreground">Teslimat adresi gerekli</h2>
        <p className="mt-3 text-body text-muted">
          Siparişi tamamlamak için önce kayıtlı bir teslimat adresi eklemelisin.
        </p>
        <div className="mt-6">
          <Link href="/hesabim/adresler">
            <Button type="button" size="lg">
              Adres Ekle
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <form action={formAction} className="grid gap-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)] lg:items-start lg:gap-12">
      <input type="hidden" name="address_id" value={addressId} />
      <input type="hidden" name="shipping_method" value={shippingMethod} />

      <div className="space-y-10">
        <section
          aria-labelledby="delivery-heading"
          className="rounded-large border border-border bg-surface p-6 md:p-8"
        >
          <h2 id="delivery-heading" className="text-h3 text-foreground">
            Teslimat Adresi
          </h2>
          <p className="mt-2 text-body-small text-muted">
            Kayıtlı adreslerinden birini seç. Yeni adres eklemek için{" "}
            <Link href="/hesabim/adresler" className="underline hover:text-foreground">
              Adreslerim
            </Link>{" "}
            sayfasını kullanabilirsin.
          </p>

          <fieldset className="mt-6 space-y-3">
            <legend className="sr-only">Teslimat adresi</legend>
            {addresses.map((address) => {
              const selected = address.id === addressId;
              return (
                <label
                  key={address.id}
                  className={[
                    "flex cursor-pointer items-start gap-3 rounded-medium border px-4 py-4",
                    selected
                      ? "border-border bg-surface-muted/40"
                      : "border-border",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="address_choice"
                    value={address.id}
                    checked={selected}
                    onChange={() => setAddressId(address.id)}
                    className="mt-1 size-4 shrink-0 accent-primary"
                  />
                  <span className="min-w-0">
                    <span className="block text-body font-semibold text-foreground">
                      {address.title}
                      {address.isDefault ? (
                        <span className="ml-2 text-caption font-medium text-muted">
                          (Varsayılan)
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-body-small text-foreground">
                      {address.firstName} {address.lastName}
                    </span>
                    <span className="mt-1 block text-body-small text-muted">
                      {address.addressLine}
                    </span>
                    <span className="mt-1 block text-body-small text-muted">
                      {[address.district, address.city]
                        .filter(Boolean)
                        .join(" / ")}
                    </span>
                    {address.phone ? (
                      <span className="mt-1 block text-caption text-muted">
                        {address.phone}
                      </span>
                    ) : null}
                  </span>
                </label>
              );
            })}
          </fieldset>
        </section>

        <section
          aria-labelledby="shipping-heading"
          className="rounded-large border border-border bg-surface p-6 md:p-8"
        >
          <h2 id="shipping-heading" className="text-h3 text-foreground">
            Kargo
          </h2>

          <fieldset className="mt-6 space-y-3">
            <legend className="sr-only">Kargo seçenekleri</legend>
            {(Object.keys(SHIPPING_METHODS) as ShippingMethodKey[]).map(
              (key) => {
                const method = SHIPPING_METHODS[key];
                const selected = shippingMethod === key;
                return (
                  <label
                    key={key}
                    className={[
                      "flex cursor-pointer items-start gap-3 rounded-medium border px-4 py-4",
                      selected
                        ? "border-border bg-surface-muted/40"
                        : "border-border",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="shipping_choice"
                      value={key}
                      checked={selected}
                      onChange={() => setShippingMethod(key)}
                      className="mt-1 size-4 shrink-0 accent-primary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3">
                        <span className="block text-body font-semibold text-foreground">
                          {method.label}
                        </span>
                        <span className="shrink-0 text-body-small font-medium text-foreground">
                          {method.total === 0
                            ? "Ücretsiz"
                            : formatPrice(method.total)}
                        </span>
                      </span>
                      <span className="mt-1 block text-body-small text-muted">
                        {method.description}
                      </span>
                    </span>
                  </label>
                );
              },
            )}
          </fieldset>

          <p className="mt-5 text-body-small text-muted">
            Siparişindeki ürünler farklı yayınevlerinden gönderiliyorsa
            teslimatlar farklı zamanlarda ulaşabilir.
          </p>
        </section>

        <section
          aria-labelledby="payment-heading"
          className="rounded-large border border-border bg-surface p-6 md:p-8"
        >
          <h2 id="payment-heading" className="text-h3 text-foreground">
            Ödeme
          </h2>
          <div className="mt-6 rounded-medium border border-border bg-surface-muted/50 px-4 py-4">
            <p className="text-body font-medium text-foreground">
              Online ödeme entegrasyonu henüz aktif değil.
            </p>
            <p className="mt-2 text-body-small text-muted">
              Bu aşamada sipariş kaydı oluşturulur; kart bilgisi toplanmaz ve
              gerçek tahsilat yapılmaz. Ödeme durumu siparişte “ödeme
              bekleniyor” olarak işaretlenir.
            </p>
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="distanceSalesAgreement"
                required
                className="mt-1 size-4 shrink-0 accent-primary"
              />
              <span className="text-body-small text-foreground">
                Mesafeli Satış Sözleşmesi’ni okudum ve kabul ediyorum.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="preInfoForm"
                required
                className="mt-1 size-4 shrink-0 accent-primary"
              />
              <span className="text-body-small text-foreground">
                Ön Bilgilendirme Formu’nu okudum ve kabul ediyorum.
              </span>
            </label>
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-8">
        <div className="rounded-large border border-border bg-surface p-6">
          <h2 className="text-h3 text-foreground">Sipariş Özeti</h2>

          <ul className="mt-6 space-y-4">
            {cartItems.map(({ book, quantity }) => (
              <li key={book.id} className="flex gap-3">
                <div className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-medium border border-border bg-surface-muted">
                  {book.cover ? (
                    <Image
                      src={book.cover}
                      alt={`${book.title} kitap kapağı`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-body-small font-medium text-foreground">
                    {book.title}
                  </p>
                  <p className="mt-1 text-caption text-muted">
                    Adet: {quantity}
                  </p>
                  <p className="mt-1 text-body-small font-semibold text-foreground">
                    {formatPrice(book.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-3 border-t border-border pt-5 text-body-small">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Ara Toplam</dt>
              <dd className="font-medium text-foreground">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">İndirim</dt>
              <dd className="font-medium text-foreground">
                {discount > 0 ? `−${formatPrice(discount)}` : formatPrice(0)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted">Kargo</dt>
              <dd className="font-medium text-foreground">
                {shippingTotal === 0 ? "Ücretsiz" : formatPrice(shippingTotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
              <dt className="text-body font-semibold text-foreground">
                Toplam
              </dt>
              <dd className="text-body font-semibold text-foreground">
                {formatPrice(grandTotal)}
              </dd>
            </div>
          </dl>

          {state.error ? (
            <p
              role="alert"
              className="mt-4 rounded-medium border border-danger/30 bg-danger/5 px-3 py-2 text-body-small text-danger"
            >
              {state.error}
            </p>
          ) : null}

          <div className="mt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={pending || !addressId}
            >
              {pending ? "Sipariş oluşturuluyor..." : "Siparişi Tamamla"}
            </Button>
          </div>

          <ul className="mt-6 space-y-2 border-t border-border pt-5 text-caption text-muted">
            <li>Ödeme entegrasyonu yakında</li>
            <li>Kolay iade</li>
            <li>Sipariş takibi</li>
          </ul>
        </div>
      </aside>
    </form>
  );
}
