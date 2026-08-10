import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { mockBooks } from "@/lib/mock-books";

type OrderItem = {
  book: (typeof mockBooks)[number];
  quantity: number;
};

const orderItems: OrderItem[] = [
  { book: mockBooks[0], quantity: 1 },
  { book: mockBooks[5], quantity: 1 },
  { book: mockBooks[2], quantity: 1 },
];

const shipments = [
  {
    label: "Gönderi 1 — Kitapix Yayınları",
    items: [orderItems[0], orderItems[1]],
  },
  {
    label: "Gönderi 2 — Mavi Sayfa",
    items: [orderItems[2]],
  },
];

const orderMeta = {
  number: "KPX-2026-001842",
  date: "10 Ağustos 2026",
  paymentStatus: "Ödeme Alındı",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OrderSuccessPage() {
  const total = orderItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0,
  );

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <div className="mx-auto max-w-xl">
          <section
            aria-labelledby="order-success-heading"
            className="text-center"
          >
            <div
              className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-surface"
              aria-hidden="true"
            >
              <span className="text-2xl font-semibold leading-none text-success">
                ✓
              </span>
            </div>

            <h1
              id="order-success-heading"
              className="mt-6 text-h1 text-foreground"
            >
              Siparişin alındı.
            </h1>
            <p className="mt-3 text-body-large text-muted">
              Siparişini başarıyla oluşturduk. Hazırlık ve kargo sürecini
              hesabından takip edebilirsin.
            </p>
          </section>

          <section
            aria-labelledby="order-info-heading"
            className="mt-10 rounded-large border border-border bg-surface p-6"
          >
            <h2 id="order-info-heading" className="sr-only">
              Sipariş bilgileri
            </h2>
            <dl className="space-y-4 text-body-small">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Sipariş No</dt>
                <dd className="text-right font-medium text-foreground">
                  {orderMeta.number}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Sipariş Tarihi</dt>
                <dd className="text-right font-medium text-foreground">
                  {orderMeta.date}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Toplam</dt>
                <dd className="text-right font-semibold text-foreground">
                  {formatPrice(total)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-border pt-4">
                <dt className="text-muted">Ödeme Durumu</dt>
                <dd className="text-right font-medium text-success">
                  {orderMeta.paymentStatus}
                </dd>
              </div>
            </dl>
          </section>

          <section
            aria-labelledby="delivery-heading"
            className="mt-6 rounded-large border border-border bg-surface p-6"
          >
            <h2 id="delivery-heading" className="text-h3 text-foreground">
              Teslimat
            </h2>
            <p className="mt-3 text-body text-foreground">
              Tahmini teslimat: 2–4 iş günü
            </p>
            <p className="mt-2 text-body-small text-muted">
              Siparişindeki ürünler farklı yayınevlerinden gönderiliyorsa birden
              fazla kargo oluşabilir.
            </p>
          </section>

          <section
            aria-labelledby="order-summary-heading"
            className="mt-6 rounded-large border border-border bg-surface p-6"
          >
            <h2
              id="order-summary-heading"
              className="text-h3 text-foreground"
            >
              Sipariş Özeti
            </h2>

            <div className="mt-6 space-y-8">
              {shipments.map((shipment) => (
                <div key={shipment.label}>
                  <h3 className="text-body-small font-semibold text-muted">
                    {shipment.label}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {shipment.items.map(({ book, quantity }) => (
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
                            {book.author}
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
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/hesabim/siparis/KPX-2026-001842"
              className="w-full sm:w-auto"
            >
              <Button type="button" size="lg" className="w-full">
                Siparişi Görüntüle
              </Button>
            </Link>
            <Link href="/kitaplar" className="w-full sm:w-auto">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Alışverişe Devam Et
              </Button>
            </Link>
          </div>

          <p className="mt-10 text-center text-body-small text-muted">
            Siparişinle ilgili bir sorun yaşarsan destek ekibimizle iletişime
            geçebilirsin.
          </p>
        </div>
      </Container>
    </div>
  );
}
