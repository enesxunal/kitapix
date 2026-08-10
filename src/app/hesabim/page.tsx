import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountNav } from "@/components/account/AccountNav";
import {
  OrderStatusBadge,
  type OrderStatus,
} from "@/components/account/OrderStatusBadge";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { BookGrid } from "@/components/books/BookGrid";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { mockBooks } from "@/lib/mock-books";
import { createClient } from "@/lib/supabase/server";

type OrderItem = {
  book: (typeof mockBooks)[number];
  quantity: number;
};

type DemoOrder = {
  number: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
};

const summaryCards = [
  { label: "Aktif Sipariş", value: "1" },
  { label: "Favori Kitaplar", value: "6" },
  { label: "Okuma Listeleri", value: "3" },
] as const;

const forYouBooks = mockBooks.slice(0, 4);

const orders: DemoOrder[] = [
  {
    number: "KPX-2026-001842",
    date: "10 Ağustos 2026",
    status: "Hazırlanıyor",
    items: [
      { book: mockBooks[0], quantity: 1 },
      { book: mockBooks[5], quantity: 1 },
      { book: mockBooks[2], quantity: 1 },
    ],
  },
  {
    number: "KPX-2026-001127",
    date: "28 Temmuz 2026",
    status: "Kargoda",
    items: [
      { book: mockBooks[1], quantity: 1 },
      { book: mockBooks[3], quantity: 1 },
    ],
  },
  {
    number: "KPX-2026-000914",
    date: "12 Haziran 2026",
    status: "Teslim Edildi",
    items: [
      { book: mockBooks[4], quantity: 1 },
      { book: mockBooks[6], quantity: 1 },
      { book: mockBooks[7], quantity: 1 },
    ],
  },
];

const latestOrder = orders[0];

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function orderTotal(items: OrderItem[]) {
  return items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
}

function orderItemCount(items: OrderItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function CoverPreview({ items }: { items: OrderItem[] }) {
  return (
    <ul className="flex gap-2" aria-label="Sipariş kitap kapakları">
      {items.map(({ book }) => (
        <li key={book.id}>
          <div className="relative aspect-[2/3] w-11 overflow-hidden rounded-medium border border-border bg-surface-muted sm:w-12">
            <Image
              src={book.cover}
              alt={`${book.title} kitap kapağı`}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        </li>
      ))}
    </ul>
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
                  <h2
                    id="profile-heading"
                    className="text-h3 text-foreground"
                  >
                    {displayName}
                  </h2>
                  <p className="mt-2 text-body text-muted">{user.email}</p>
                  <p className="mt-1 text-body-small text-muted">
                    Kitapix Üyesi
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" size="sm">
                    Profili Düzenle
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
                        {latestOrder.number}
                      </dd>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="text-muted">Tarih</dt>
                      <dd className="font-medium text-foreground">
                        {latestOrder.date}
                      </dd>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <dt className="text-muted">Durum</dt>
                      <dd>
                        <OrderStatusBadge status={latestOrder.status} />
                      </dd>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="text-muted">Toplam</dt>
                      <dd className="font-semibold text-foreground">
                        {formatPrice(orderTotal(latestOrder.items))}
                      </dd>
                    </div>
                  </dl>
                </div>
                <Link href={`/hesabim/siparis/${latestOrder.number}`}>
                  <Button type="button" variant="secondary" size="sm">
                    Siparişi Görüntüle
                  </Button>
                </Link>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <CoverPreview items={latestOrder.items} />
              </div>
            </section>

            <section aria-labelledby="orders-heading">
              <h2 id="orders-heading" className="text-h2 text-foreground">
                Siparişlerim
              </h2>

              <ul className="mt-6 space-y-4">
                {orders.map((order) => {
                  const itemCount = orderItemCount(order.items);

                  return (
                    <li
                      key={order.number}
                      className="rounded-large border border-border bg-surface p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-body font-semibold text-foreground">
                              {order.number}
                            </p>
                            <OrderStatusBadge status={order.status} />
                          </div>
                          <p className="text-body-small text-muted">
                            {order.date} · {itemCount} ürün ·{" "}
                            <span className="font-medium text-foreground">
                              {formatPrice(orderTotal(order.items))}
                            </span>
                          </p>
                          <CoverPreview items={order.items} />
                        </div>
                        <Link href={`/hesabim/siparis/${order.number}`}>
                          <Button type="button" variant="secondary" size="sm">
                            Detayları Gör
                          </Button>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section aria-labelledby="for-you-heading">
              <h2 id="for-you-heading" className="text-h2 text-foreground">
                Sana Özel
              </h2>
              <p className="mt-2 text-body text-muted">
                İlgi alanlarına uygun birkaç kitap önerisi.
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
