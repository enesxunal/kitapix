import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth/require-user";
import {
  formatOrderDate,
  formatPaymentStatus,
  getOrderById,
  groupOrderItemsByPublisher,
  mapOrderStatus,
  type OrderItemSnapshot,
  type OrderPublisherGroup,
} from "@/lib/data/orders";

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(value);
}

function ShipmentCard({
  group,
  index,
  orderStatus,
}: {
  group: OrderPublisherGroup;
  index: number;
  orderStatus: ReturnType<typeof mapOrderStatus>;
}) {
  return (
    <article
      aria-labelledby={`shipment-${index}-heading`}
      className="rounded-large border border-border bg-surface p-5 sm:p-6"
    >
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-caption font-medium text-muted">
            Gönderi {index + 1}
          </p>
          <h2
            id={`shipment-${index}-heading`}
            className="text-h3 text-foreground"
          >
            {group.publisher}
          </h2>
          <OrderStatusBadge status={orderStatus} />
        </div>
      </header>

      <ul className="mt-5 space-y-4">
        {group.items.map((item: OrderItemSnapshot) => {
          const href = item.slug ? `/kitap/${item.slug}` : null;

          return (
            <li key={item.id} className="flex gap-3">
              {href ? (
                <Link
                  href={href}
                  className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-medium border border-border bg-surface-muted sm:w-16"
                >
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={`${item.title} kitap kapağı`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : null}
                </Link>
              ) : (
                <div className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-medium border border-border bg-surface-muted sm:w-16">
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={`${item.title} kitap kapağı`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
              )}
              <div className="min-w-0 flex-1">
                {href ? (
                  <Link
                    href={href}
                    className="text-body-small font-medium text-foreground hover:underline"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <p className="text-body-small font-medium text-foreground">
                    {item.title}
                  </p>
                )}
                <p className="mt-1 text-caption text-muted">
                  Adet: {item.quantity}
                </p>
                <p className="mt-1 text-body-small font-semibold text-foreground">
                  {formatPrice(item.lineTotal)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  await requireUser();

  const { orderId } = await params;
  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  const status = mapOrderStatus(order.status);
  const publisherGroups = groupOrderItemsByPublisher(order.items);
  const paymentLabel = formatPaymentStatus(order.paymentStatus);

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
              <Link href="/hesabim" className="hover:text-foreground">
                Hesabım
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/hesabim/siparisler" className="hover:text-foreground">
                Siparişlerim
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              {order.orderNumber}
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Sipariş Detayı</h1>
          <dl className="mt-4 space-y-2 text-body-small">
            <div className="flex flex-wrap gap-x-2">
              <dt className="sr-only">Sipariş numarası</dt>
              <dd className="font-semibold text-foreground">
                {order.orderNumber}
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="sr-only">Sipariş tarihi</dt>
              <dd className="text-muted">{formatOrderDate(order.createdAt)}</dd>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <dt className="sr-only">Sipariş durumu</dt>
              <dd>
                <OrderStatusBadge status={status} />
              </dd>
            </div>
          </dl>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.95fr)_minmax(280px,1fr)] lg:items-start lg:gap-10">
          <div className="min-w-0 space-y-6">
            <section aria-labelledby="shipments-heading" className="space-y-4">
              <h2 id="shipments-heading" className="text-h2 text-foreground">
                Gönderiler
              </h2>
              <p className="text-body text-muted">
                Bu siparişteki ürünler farklı yayınevlerinden ayrı gönderiler
                halinde yola çıkabilir.
              </p>
              <div className="space-y-4">
                {publisherGroups.map((group, index) => (
                  <ShipmentCard
                    key={group.publisher}
                    group={group}
                    index={index}
                    orderStatus={status}
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">
            <section
              aria-labelledby="address-heading"
              className="rounded-large border border-border bg-surface p-5"
            >
              <h2 id="address-heading" className="text-h3 text-foreground">
                Teslimat Adresi
              </h2>
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
                  <p className="pt-2 text-muted">
                    Telefon: {order.shippingPhone}
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-body-small text-muted">
                {order.shippingMethodLabel}
              </p>
            </section>

            <section
              aria-labelledby="payment-heading"
              className="rounded-large border border-border bg-surface p-5"
            >
              <h2 id="payment-heading" className="text-h3 text-foreground">
                Ödeme
              </h2>
              <dl className="mt-4 space-y-2 text-body-small">
                <div>
                  <dt className="sr-only">Ödeme yöntemi</dt>
                  <dd className="font-medium text-foreground">
                    {order.paymentMethod === "payment_pending"
                      ? "Ödeme entegrasyonu bekleniyor"
                      : (order.paymentMethod ?? "Belirtilmedi")}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Ödeme durumu</dt>
                  <dd className="font-medium text-foreground">{paymentLabel}</dd>
                </div>
              </dl>
            </section>

            <section
              aria-labelledby="order-summary-heading"
              className="rounded-large border border-border bg-surface p-5"
            >
              <h2
                id="order-summary-heading"
                className="text-h3 text-foreground"
              >
                Sipariş Özeti
              </h2>
              <dl className="mt-4 space-y-3 text-body-small">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Ara Toplam</dt>
                  <dd className="font-medium text-foreground">
                    {formatPrice(order.subtotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">İndirim</dt>
                  <dd className="font-medium text-foreground">
                    {order.discountTotal > 0
                      ? `−${formatPrice(order.discountTotal)}`
                      : formatPrice(0)}
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

            <section
              aria-labelledby="support-heading"
              className="rounded-large border border-border bg-surface p-5"
            >
              <h2 id="support-heading" className="text-h3 text-foreground">
                Yardıma mı ihtiyacın var?
              </h2>
              <p className="mt-2 text-body-small text-muted">
                Siparişinle ilgili destek alabilir veya iade talebi
                oluşturabilirsin.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="secondary" size="sm">
                  Destek Al
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  İade Talebi
                </Button>
              </div>
            </section>
          </aside>
        </div>
      </Container>
    </div>
  );
}
