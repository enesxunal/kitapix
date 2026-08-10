import Image from "next/image";
import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth/require-user";
import {
  formatOrderDate,
  getUserOrders,
  mapOrderStatus,
  type OrderItemSnapshot,
  type OrderSummary,
} from "@/lib/data/orders";

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(value);
}

function orderItemCount(items: OrderItemSnapshot[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function CoverPreview({ items }: { items: OrderItemSnapshot[] }) {
  return (
    <ul className="flex gap-2" aria-label="Sipariş kitap kapakları">
      {items.map((item) => (
        <li key={item.id}>
          <div className="relative aspect-[2/3] w-11 overflow-hidden rounded-medium border border-border bg-surface-muted sm:w-12">
            {item.cover ? (
              <Image
                src={item.cover}
                alt={`${item.title} kitap kapağı`}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function OrdersEmptyState() {
  return (
    <section
      aria-labelledby="orders-empty-heading"
      className="rounded-large border border-border bg-surface px-6 py-12 text-center"
    >
      <h2 id="orders-empty-heading" className="text-h3 text-foreground">
        Henüz siparişin yok.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">
        Kitapları keşfetmeye başlayarak ilk siparişini oluşturabilirsin.
      </p>
      <div className="mt-6">
        <Link href="/kitaplar">
          <Button type="button" variant="primary" size="md">
            Kitapları Keşfet
          </Button>
        </Link>
      </div>
    </section>
  );
}

function OrderListItem({ order }: { order: OrderSummary }) {
  const itemCount = orderItemCount(order.items);

  return (
    <li className="rounded-large border border-border bg-surface p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-body font-semibold text-foreground">
            {order.orderNumber}
          </p>
          <OrderStatusBadge status={mapOrderStatus(order.status)} />
        </div>

        <p className="text-body-small text-muted">
          {formatOrderDate(order.createdAt)} · {itemCount} ürün ·{" "}
          <span className="font-medium text-foreground">
            {formatPrice(order.grandTotal)}
          </span>
        </p>

        <CoverPreview items={order.items} />

        <div>
          <Link href={`/hesabim/siparis/${order.id}`}>
            <Button type="button" variant="secondary" size="sm">
              Detayları Gör
            </Button>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default async function OrdersPage() {
  await requireUser();
  const orders = await getUserOrders();
  const orderCount = orders.length;
  const isEmpty = orderCount === 0;

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
            <li className="text-foreground" aria-current="page">
              Siparişlerim
            </li>
          </ol>
        </nav>

        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-h1 text-foreground">Siparişlerim</h1>
            <p className="mt-3 text-body-large text-muted">
              Geçmiş ve devam eden siparişlerini buradan takip edebilirsin.
            </p>
          </div>
          <p className="shrink-0 text-body-small font-medium text-muted">
            {orderCount} sipariş
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/siparisler" />
          </aside>

          <div className="min-w-0 space-y-6">
            {isEmpty ? (
              <OrdersEmptyState />
            ) : (
              <section aria-labelledby="orders-list-heading">
                <h2 id="orders-list-heading" className="sr-only">
                  Sipariş listesi
                </h2>

                <ul className="mt-2 space-y-4">
                  {orders.map((order) => (
                    <OrderListItem key={order.id} order={order} />
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
