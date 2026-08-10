import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { mockBooks } from "@/lib/mock-books";

type CartItem = {
  book: (typeof mockBooks)[number];
  quantity: number;
};

const cartItems: CartItem[] = [
  { book: mockBooks[0], quantity: 1 },
  { book: mockBooks[5], quantity: 1 },
  { book: mockBooks[2], quantity: 1 },
];

const checkoutSteps = ["Teslimat", "Kargo", "Ödeme"] as const;

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CheckoutPage() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0,
  );
  const originalTotal = cartItems.reduce((sum, item) => {
    const unit = item.book.originalPrice ?? item.book.price;
    return sum + unit * item.quantity;
  }, 0);
  const discount = originalTotal - subtotal;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-small text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/sepet" className="hover:text-foreground">
                Sepet
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              Ödeme
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Siparişini Tamamla</h1>
          <p className="mt-3 text-body-large text-muted">
            Teslimat ve ödeme bilgilerini kontrol ederek siparişini tamamla.
          </p>
        </header>

        <ol
          aria-label="Ödeme adımları"
          className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-small"
        >
          {checkoutSteps.map((step, index) => {
            const isActive = index === 0;

            return (
              <li key={step} className="flex items-center gap-3">
                {index > 0 ? (
                  <span className="text-border" aria-hidden="true">
                    /
                  </span>
                ) : null}
                <span
                  className={
                    isActive
                      ? "font-semibold text-foreground"
                      : "text-muted"
                  }
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="mr-1.5 tabular-nums" aria-hidden="true">
                    {index + 1}.
                  </span>
                  {step}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)] lg:items-start lg:gap-12">
          <div className="space-y-10">
            <section
              aria-labelledby="delivery-heading"
              className="rounded-large border border-border bg-surface p-6 md:p-8"
            >
              <h2
                id="delivery-heading"
                className="text-h3 text-foreground"
              >
                Teslimat Bilgileri
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Input
                  id="first-name"
                  name="firstName"
                  label="Ad"
                  placeholder="Adınız"
                  autoComplete="given-name"
                  className="bg-surface"
                />
                <Input
                  id="last-name"
                  name="lastName"
                  label="Soyad"
                  placeholder="Soyadınız"
                  autoComplete="family-name"
                  className="bg-surface"
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Telefon"
                  placeholder="05XX XXX XX XX"
                  autoComplete="tel"
                  className="bg-surface"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="E-posta"
                  placeholder="ornek@email.com"
                  autoComplete="email"
                  className="bg-surface"
                />
                <Input
                  id="city"
                  name="city"
                  label="İl"
                  placeholder="İl"
                  autoComplete="address-level1"
                  className="bg-surface"
                />
                <Input
                  id="district"
                  name="district"
                  label="İlçe"
                  placeholder="İlçe"
                  autoComplete="address-level2"
                  className="bg-surface"
                />
                <div className="flex w-full flex-col gap-1.5 sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="text-body-small font-medium text-foreground"
                  >
                    Adres
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    placeholder="Mahalle, sokak, bina ve daire bilgisi"
                    autoComplete="street-address"
                    className={[
                      "w-full rounded-medium border border-border bg-surface px-3 py-2.5 text-body text-foreground",
                      "placeholder:text-muted",
                      "transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent",
                    ].join(" ")}
                  />
                </div>
                <Input
                  id="postal-code"
                  name="postalCode"
                  label="Posta Kodu (opsiyonel)"
                  placeholder="34000"
                  autoComplete="postal-code"
                  className="bg-surface"
                />
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="sameBillingAddress"
                    defaultChecked
                    className="mt-1 size-4 shrink-0 accent-primary"
                  />
                  <span className="text-body-small text-foreground">
                    Fatura adresim teslimat adresimle aynı
                  </span>
                </label>
                <p className="mt-2 pl-7 text-caption text-muted">
                  Farklı bir fatura adresi gerekiyorsa sipariş sonrası
                  destek ekibimizle iletişime geçebilirsin.
                </p>
              </div>
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

                <label className="flex cursor-pointer items-start gap-3 rounded-medium border border-border bg-surface-muted/40 px-4 py-4">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    defaultChecked
                    className="mt-1 size-4 shrink-0 accent-primary"
                  />
                  <span className="min-w-0">
                    <span className="block text-body font-semibold text-foreground">
                      Standart Teslimat
                    </span>
                    <span className="mt-1 block text-body-small text-muted">
                      2–4 iş günü
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-medium border border-border px-4 py-4">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    className="mt-1 size-4 shrink-0 accent-primary"
                  />
                  <span className="min-w-0">
                    <span className="block text-body font-semibold text-foreground">
                      Hızlı Teslimat
                    </span>
                    <span className="mt-1 block text-body-small text-muted">
                      1–2 iş günü
                    </span>
                  </span>
                </label>
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

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    id="card-name"
                    name="cardName"
                    label="Kart Üzerindeki İsim"
                    placeholder="Ad Soyad"
                    autoComplete="cc-name"
                    className="bg-surface"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Input
                    id="card-number"
                    name="cardNumber"
                    label="Kart Numarası"
                    placeholder="•••• •••• •••• ••••"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    className="bg-surface"
                  />
                </div>
                <Input
                  id="card-expiry"
                  name="cardExpiry"
                  label="Son Kullanma Tarihi"
                  placeholder="AA/YY"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  className="bg-surface"
                />
                <Input
                  id="card-cvv"
                  name="cardCvv"
                  label="CVV"
                  placeholder="•••"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  className="bg-surface"
                />
              </div>

              <p className="mt-5 text-body-small text-muted">
                Kart bilgileriniz güvenli bağlantı üzerinden işlenir.
              </p>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="distanceSalesAgreement"
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
                      <Image
                        src={book.cover}
                        alt={`${book.title} kitap kapağı`}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
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
                    {discount > 0
                      ? `−${formatPrice(discount)}`
                      : formatPrice(0)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Kargo</dt>
                  <dd className="font-medium text-foreground">
                    {shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                  <dt className="text-body font-semibold text-foreground">
                    Toplam
                  </dt>
                  <dd className="text-body font-semibold text-foreground">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link href="/siparis-basarili">
                  <Button type="button" size="lg" className="w-full">
                    Siparişi Tamamla
                  </Button>
                </Link>
              </div>

              <ul className="mt-6 space-y-2 border-t border-border pt-5 text-caption text-muted">
                <li>Güvenli ödeme</li>
                <li>Kolay iade</li>
                <li>Sipariş takibi</li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
