import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountNav } from "@/components/account/AccountNav";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { BookGrid } from "@/components/books/BookGrid";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getFavoriteBooks } from "@/lib/data/favorites";
import { getReadingLists } from "@/lib/data/lists";
import {
  formatOrderDate,
  getUserOrders,
  mapOrderStatus,
  type OrderItemSnapshot,
  type OrderSummary,
} from "@/lib/data/orders";
import { getFeaturedBooks } from "@/lib/data/books";
import { createClient } from "@/lib/supabase/server";

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
      {items.slice(0, 4).map((item) => (
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

function OrderSummaryCard({ order }: { order: OrderSummary }) {
  const itemCount = orderItemCount(order.items);

  return (
    <li className="rounded-large border border-border bg-surface p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
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
        </div>
        <Link href={`/hesabim/siparis/${order.id}`}>
          <Button type="button" variant="secondary" size="sm">
            Detayları Gör
          </Button>
        </Link>
      </div>
    </li>
  );
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/giris");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, first_name, last_name")
    .eq("id", user.id)
    .maybeSingle();

  const displayName =
    profile?.display_name?.trim() ||
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim() ||
    "Kitapix Üyesi";

  const [orders, favorites, lists, forYouBooks] = await Promise.all([
    getUserOrders(),
    getFavoriteBooks(),
    getReadingLists(),
    getFeaturedBooks(4),
  ]);

  const activeOrders = orders.filter(
    (order) => !["delivered", "cancelled"].includes(order.status),
  );
  const latestOrder = orders[0] ?? null;
  const summaryCards = [
    { label: "Aktif Sipariş", value: String(activeOrders.length) },
    { label: "Favori Kitaplar", value: String(favorites.length) },
    { label: "Okuma Listeleri", value: String(lists.length) },
  ] as const;

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
            <li className="text-foreground" aria-current="page">
              Hesabım
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Hesabım</h1>
          <p className="mt-3 text-body-large text-muted">
            Siparişlerini, listelerini ve hesap bilgilerini tek yerden yönet.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim" />
          </aside>

          <div className="min-w-0 space-y-10">
            <section
              aria-labelledby="profile-heading"
              className="rounded-large border border-border bg-surface p-5 sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 id="profile-heading" className="text-h3 text-foreground">
                    {displayName}
                  </h2>
                  <p className="mt-2 text-body text-muted">{user.email}</p>
                  <p className="mt-1 text-body-small text-muted">Kitapix Üyesi</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled
                    title="Yakında"
                  >
                    Profili Düzenle (Yakında)
                  </Button>
                  <LogoutButton />
                </div>
              </div>
            </section>

            <section aria-labelledby="summary-cards-heading">
              <h2 id="summary-cards-heading" className="sr-only">
                Hesap özeti
              </h2>
              <ul className="grid gap-3 sm:grid-cols-3">
                {summaryCards.map((card) => (
                  <li
                    key={card.label}
                    className="rounded-large border border-border bg-surface px-5 py-4"
                  >
                    <p className="text-caption text-muted">{card.label}</p>
                    <p className="mt-2 text-h3 text-foreground">{card.value}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="latest-order-heading"
              className="rounded-large border border-border bg-surface p-5 sm:p-6"
            >
              {latestOrder ? (
                <>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2
                        id="latest-order-heading"
                        className="text-h3 text-foreground"
                      >
                        Son Sipariş
                      </h2>
                      <dl className="mt-4 space-y-2 text-body-small">
                        <div className="flex flex-wrap gap-x-2">
                          <dt className="text-muted">Sipariş No</dt>
                          <dd className="font-medium text-foreground">
                            {latestOrder.orderNumber}
                          </dd>
                        </div>
                        <div className="flex flex-wrap gap-x-2">
                          <dt className="text-muted">Tarih</dt>
                          <dd className="font-medium text-foreground">
                            {formatOrderDate(latestOrder.createdAt)}
                          </dd>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <dt className="text-muted">Durum</dt>
                          <dd>
                            <OrderStatusBadge
                              status={mapOrderStatus(latestOrder.status)}
                            />
                          </dd>
                        </div>
                        <div className="flex flex-wrap gap-x-2">
                          <dt className="text-muted">Toplam</dt>
                          <dd className="font-semibold text-foreground">
                            {formatPrice(latestOrder.grandTotal)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <Link href={`/hesabim/siparis/${latestOrder.id}`}>
                      <Button type="button" variant="secondary" size="sm">
                        Siparişi Görüntüle
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 border-t border-border pt-5">
                    <CoverPreview items={latestOrder.items} />
                  </div>
                </>
              ) : (
                <>
                  <h2
                    id="latest-order-heading"
                    className="text-h3 text-foreground"
                  >
                    Son Sipariş
                  </h2>
                  <p className="mt-3 text-body text-muted">
                    Henüz siparişin yok. Kitapları keşfederek başlayabilirsin.
                  </p>
                  <div className="mt-5">
                    <Link href="/kitaplar">
                      <Button type="button" size="sm">
                        Kitapları Keşfet
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </section>

            <section aria-labelledby="orders-heading">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 id="orders-heading" className="text-h2 text-foreground">
                  Siparişlerim
                </h2>
                <Link
                  href="/hesabim/siparisler"
                  className="text-body-small font-medium text-primary hover:text-primary-hover"
                >
                  Tümünü Gör
                </Link>
              </div>

              {orders.length > 0 ? (
                <ul className="mt-6 space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <OrderSummaryCard key={order.id} order={order} />
                  ))}
                </ul>
              ) : (
                <p className="mt-6 rounded-large border border-border bg-surface px-5 py-8 text-body text-muted">
                  Henüz görüntülenecek sipariş yok.
                </p>
              )}
            </section>

            <section aria-labelledby="for-you-heading">
              <h2 id="for-you-heading" className="text-h2 text-foreground">
                Sana Özel
              </h2>
              <p className="mt-2 text-body text-muted">
                Editör seçiminden birkaç kitap önerisi.
              </p>
              <div className="mt-6">
                <BookGrid books={forYouBooks} className="xl:grid-cols-4" />
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
