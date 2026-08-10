import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

type Shipment = {
  id: string;
  publisher: string;
  status: OrderStatus;
  estimatedDelivery: string;
  items: OrderItem[];
  carrier?: string;
  trackingNumber?: string;
};

type DemoOrderDetail = {
  id: string;
  date: string;
  status: OrderStatus;
  shipments: Shipment[];
  summary: {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
};

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
};

const address = {
  name: "Deniz Kaya",
  line1: "Bağdat Cad. No: 120 D: 8",
  line2: "Kadıköy / İstanbul",
  phone: "+90 555 000 00 00",
};

const payment = {
  method: "Kredi Kartı",
  cardMask: "**** **** **** 4242",
  status: "Ödeme Alındı",
};

const demoOrders: Record<string, DemoOrderDetail> = {
  "KPX-2026-001842": {
    id: "KPX-2026-001842",
    date: "10 Ağustos 2026",
    status: "Hazırlanıyor",
    shipments: [
      {
        id: "shipment-1",
        publisher: "Kitapix Yayınları",
        status: "Hazırlanıyor",
        estimatedDelivery: "12–14 Ağustos",
        items: [
          { book: mockBooks[0], quantity: 1 },
          { book: mockBooks[5], quantity: 1 },
        ],
      },
      {
        id: "shipment-2",
        publisher: "Mavi Sayfa",
        status: "Kargoya Verildi",
        estimatedDelivery: "11–12 Ağustos",
        carrier: "Örnek Kargo",
        trackingNumber: "KPX872194",
        items: [{ book: mockBooks[2], quantity: 1 }],
      },
    ],
    summary: {
      subtotal: 887,
      discount: 0,
      shipping: 0,
      total: 887,
    },
  },
  "KPX-2026-001127": {
    id: "KPX-2026-001127",
    date: "28 Temmuz 2026",
    status: "Kargoda",
    shipments: [
      {
        id: "shipment-1",
        publisher: "Kuzey Kitap",
        status: "Kargoya Verildi",
        estimatedDelivery: "30 Temmuz – 1 Ağustos",
        carrier: "Örnek Kargo",
        trackingNumber: "KPX651203",
        items: [{ book: mockBooks[1], quantity: 1 }],
      },
      {
        id: "shipment-2",
        publisher: "Yeni Nesil Yayınları",
        status: "Kargoya Verildi",
        estimatedDelivery: "30 Temmuz – 1 Ağustos",
        carrier: "Örnek Kargo",
        trackingNumber: "KPX651218",
        items: [{ book: mockBooks[3], quantity: 1 }],
      },
    ],
    summary: {
      subtotal: 594,
      discount: 0,
      shipping: 0,
      total: 594,
    },
  },
  "KPX-2026-000914": {
    id: "KPX-2026-000914",
    date: "12 Haziran 2026",
    status: "Teslim Edildi",
    shipments: [
      {
        id: "shipment-1",
        publisher: "Kuzey Kitap",
        status: "Teslim Edildi",
        estimatedDelivery: "14–16 Haziran",
        items: [{ book: mockBooks[4], quantity: 1 }],
      },
      {
        id: "shipment-2",
        publisher: "Mavi Sayfa",
        status: "Teslim Edildi",
        estimatedDelivery: "14–16 Haziran",
        items: [{ book: mockBooks[6], quantity: 1 }],
      },
      {
        id: "shipment-3",
        publisher: "Yeni Nesil Yayınları",
        status: "Teslim Edildi",
        estimatedDelivery: "14–16 Haziran",
        items: [{ book: mockBooks[7], quantity: 1 }],
      },
    ],
    summary: {
      subtotal: 777,
      discount: 0,
      shipping: 0,
      total: 777,
    },
  },
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function ShipmentCard({
  shipment,
  index,
}: {
  shipment: Shipment;
  index: number;
}) {
  const showTracking =
    shipment.status === "Kargoya Verildi" &&
    Boolean(shipment.carrier && shipment.trackingNumber);

  return (
    <article
      aria-labelledby={`shipment-${shipment.id}-heading`}
      className="rounded-large border border-border bg-surface p-5 sm:p-6"
    >
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-caption font-medium text-muted">
            Gönderi {index + 1}
          </p>
          <h2
            id={`shipment-${shipment.id}-heading`}
            className="text-h3 text-foreground"
          >
            {shipment.publisher}
          </h2>
          <OrderStatusBadge status={shipment.status} />
        </div>
        <p className="text-body-small text-muted sm:text-right">
          Tahmini teslimat
          <span className="mt-1 block font-medium text-foreground">
            {shipment.estimatedDelivery}
          </span>
        </p>
      </header>

      <ul className="mt-5 space-y-4">
        {shipment.items.map(({ book, quantity }) => (
          <li key={book.id} className="flex gap-3">
            <Link
              href={`/kitap/${book.slug}`}
              className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-medium border border-border bg-surface-muted sm:w-16"
            >
              <Image
                src={book.cover}
                alt={`${book.title} kitap kapağı`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/kitap/${book.slug}`}
                className="text-body-small font-medium text-foreground hover:underline"
              >
                {book.title}
              </Link>
              <p className="mt-1 text-caption text-muted">{book.author}</p>
              <p className="mt-1 text-caption text-muted">Adet: {quantity}</p>
              <p className="mt-1 text-body-small font-semibold text-foreground">
                {formatPrice(book.price)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {showTracking ? (
        <div className="mt-5 rounded-medium border border-border bg-surface-muted/60 p-4">
          <dl className="space-y-2 text-body-small">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted">Kargo firması</dt>
              <dd className="font-medium text-foreground">{shipment.carrier}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted">Takip no</dt>
              <dd className="font-medium text-foreground">
                {shipment.trackingNumber}
              </dd>
            </div>
          </dl>
          <Button type="button" variant="secondary" size="sm" className="mt-4">
            Kargoyu Takip Et
          </Button>
        </div>
      ) : null}
    </article>
  );
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  const order = demoOrders[orderId];

  if (!order) {
    notFound();
  }

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
              {order.id}
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Sipariş Detayı</h1>
          <dl className="mt-4 space-y-2 text-body-small">
            <div className="flex flex-wrap gap-x-2">
              <dt className="sr-only">Sipariş numarası</dt>
              <dd className="font-semibold text-foreground">{order.id}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="sr-only">Sipariş tarihi</dt>
              <dd className="text-muted">{order.date}</dd>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <dt className="sr-only">Sipariş durumu</dt>
              <dd>
                <OrderStatusBadge status={order.status} />
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
                {order.shipments.map((shipment, index) => (
                  <ShipmentCard
                    key={shipment.id}
                    shipment={shipment}
                    index={index}
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
                <p className="font-medium">{address.name}</p>
                <p>{address.line1}</p>
                <p>{address.line2}</p>
                <p className="pt-2 text-muted">Telefon: {address.phone}</p>
              </div>
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
                    {payment.method}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Kart</dt>
                  <dd className="text-muted">{payment.cardMask}</dd>
                </div>
                <div>
                  <dt className="sr-only">Ödeme durumu</dt>
                  <dd className="font-medium text-success">{payment.status}</dd>
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
                    {formatPrice(order.summary.subtotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">İndirim</dt>
                  <dd className="font-medium text-foreground">
                    {order.summary.discount > 0
                      ? `−${formatPrice(order.summary.discount)}`
                      : formatPrice(0)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Kargo</dt>
                  <dd className="font-medium text-foreground">
                    {order.summary.shipping === 0
                      ? "Ücretsiz"
                      : formatPrice(order.summary.shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                  <dt className="font-semibold text-foreground">Toplam</dt>
                  <dd className="font-semibold text-foreground">
                    {formatPrice(order.summary.total)}
                  </dd>
                </div>
              </dl>
            </section>

            <section
              aria-labelledby="invoice-heading"
              className="rounded-large border border-border bg-surface p-5"
            >
              <h2 id="invoice-heading" className="text-h3 text-foreground">
                Fatura
              </h2>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-4"
              >
                Faturayı Görüntüle
              </Button>
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
