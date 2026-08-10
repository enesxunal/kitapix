import Image from "next/image";
import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import {
  OrderStatusBadge,
  type OrderStatus,
} from "@/components/account/OrderStatusBadge";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { mockBooks } from "@/lib/mock-books";

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

const orderCount = orders.length;
const showEmptyState = false;

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

function OrdersFilterBar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Sipariş durumu filtresi"
      >
        {(
          [
            { label: "Tümü", pressed: true },
            { label: "Hazırlanıyor", pressed: false },
            { label: "Kargoda", pressed: false },
            { label: "Teslim Edildi", pressed: false },
          ] as const
        ).map((option) => (
          <button
            key={option.label}
            type="button"
            className={[
              "rounded-medium border px-3 py-2 text-body-small font-medium transition-colors",
              option.pressed
                ? "border-border bg-surface-muted text-foreground"
                : "border-border bg-surface text-muted",
            ].join(" ")}
            aria-pressed={option.pressed}
          >
            {option.label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-body-small text-muted">
        <span className="sr-only">Sıralama</span>
        <select
          className="rounded-medium border border-border bg-surface px-3 py-2 text-body-small font-medium text-foreground"
          defaultValue="newest"
          aria-label="Siparişleri sırala"
        >
          <option value="newest">En Yeni</option>
          <option value="oldest">En Eski</option>
        </select>
      </label>
    </div>
  );
}

export default function OrdersPage() {
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
            {showEmptyState ? (
              <OrdersEmptyState />
            ) : (
              <section aria-labelledby="orders-list-heading">
                <h2 id="orders-list-heading" className="sr-only">
                  Sipariş listesi
                </h2>

                <OrdersFilterBar />

                <ul className="mt-6 space-y-4">
                  {orders.map((order) => {
                    const itemCount = orderItemCount(order.items);

                    return (
                      <li
                        key={order.number}
                        className="rounded-large border border-border bg-surface p-5"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
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

                          <div>
                            <Link href={`/hesabim/siparis/${order.number}`}>
                              <Button type="button" variant="secondary" size="sm">
                                Detayları Gör
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
