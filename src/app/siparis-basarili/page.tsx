import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth/require-user";
import {
  formatOrderDate,
  formatPaymentStatus,
  getOrderById,
  groupOrderItemsByPublisher,
  mapOrderStatus,
} from "@/lib/data/orders";

type OrderSuccessPageProps = {
  searchParams: Promise<{ order?: string }>;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  await requireUser();

  const params = await searchParams;
  const orderRef = params.order?.trim();

  if (!orderRef) {
    redirect("/hesabim/siparisler");
  }

  const order = await getOrderById(orderRef);

  if (!order) {
    redirect("/hesabim/siparisler");
  }

  const publisherGroups = groupOrderItemsByPublisher(order.items);
  const statusLabel = mapOrderStatus(order.status);
  const paymentLabel = formatPaymentStatus(order.paymentStatus);

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
                  {order.orderNumber}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Sipariş Tarihi</dt>
                <dd className="text-right font-medium text-foreground">
                  {formatOrderDate(order.createdAt)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Durum</dt>
                <dd className="text-right font-medium text-foreground">
                  {statusLabel}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-muted">Toplam</dt>
                <dd className="text-right font-semibold text-foreground">
                  {formatPrice(order.grandTotal)}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-border pt-4">
                <dt className="text-muted">Ödeme Durumu</dt>
                <dd className="text-right font-medium text-foreground">
                  {paymentLabel}
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
              {order.shippingMethodLabel}
            </p>
            <div className="mt-4 space-y-1 text-body-small text-foreground">
              <p className="font-medium">
                {order.shippingFirstName} {order.shippingLastName}
              </p>
              <p>{order.shippingAddressLine}</p>
              <p>
                {[order.shippingDistrict, order.shippingCity]
                  .filter(Boolean)
                  .join(" / ")}
              </p>
              {order.shippingPhone ? (
                <p className="pt-2 text-muted">Telefon: {order.shippingPhone}</p>
              ) : null}
            </div>
            <p className="mt-4 text-body-small text-muted">
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
              {publisherGroups.map((group, index) => (
                <div key={group.publisher}>
                  <h3 className="text-body-small font-semibold text-muted">
                    Gönderi {index + 1} — {group.publisher}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {group.items.map((item) => (
                      <li key={item.id} className="flex gap-3">
                        <div className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-medium border border-border bg-surface-muted">
                          {item.cover ? (
                            <Image
                              src={item.cover}
                              alt={`${item.title} kitap kapağı`}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-body-small font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="mt-1 text-caption text-muted">
                            Adet: {item.quantity}
                          </p>
                          <p className="mt-1 text-body-small font-semibold text-foreground">
                            {formatPrice(item.lineTotal)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <dl className="mt-6 space-y-3 border-t border-border pt-5 text-body-small">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Ara Toplam</dt>
                <dd className="font-medium text-foreground">
                  {formatPrice(order.subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">Kargo</dt>
                <dd className="font-medium text-foreground">
                  {order.shippingTotal === 0
                    ? "Ücretsiz"
                    : formatPrice(order.shippingTotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                <dt className="font-semibold text-foreground">Toplam</dt>
                <dd className="font-semibold text-foreground">
                  {formatPrice(order.grandTotal)}
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/hesabim/siparis/${order.id}`}
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
