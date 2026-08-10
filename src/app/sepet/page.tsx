import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { mockBooks } from "@/lib/mock-books";

const FORMAT_LABEL = "Basılı Kitap";

type CartItem = {
  book: (typeof mockBooks)[number];
  quantity: number;
};

const cartItems: CartItem[] = [
  { book: mockBooks[0], quantity: 1 },
  { book: mockBooks[5], quantity: 1 },
  { book: mockBooks[2], quantity: 1 },
];

const isEmpty = false;

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function groupByPublisher(items: CartItem[]) {
  const groups: { publisher: string; items: CartItem[] }[] = [];

  for (const item of items) {
    const existing = groups.find(
      (group) => group.publisher === item.book.publisher,
    );

    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ publisher: item.book.publisher, items: [item] });
    }
  }

  return groups;
}

export default function CartPage() {
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
  const publisherGroups = groupByPublisher(cartItems);

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
              Sepet
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Sepetim</h1>
          <p className="mt-3 text-body-large text-muted">
            Seçtiğin kitapları kontrol et ve siparişini tamamlamaya hazırlan.
          </p>
        </header>

        {isEmpty ? (
          <div className="mt-12 max-w-lg py-8">
            <h2 className="text-h3 text-foreground">Sepetin şu anda boş.</h2>
            <p className="mt-3 text-body text-muted">
              Yeni kitaplar keşfederek sepetini oluşturmaya başlayabilirsin.
            </p>
            <div className="mt-6">
              <Link href="/kitaplar">
                <Button type="button" size="lg">
                  Kitapları Keşfet
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.4fr)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.35fr)]">
            <div className="space-y-8">
              <aside className="rounded-large border border-border bg-surface-muted/60 px-5 py-4">
                <p className="text-body-small text-muted">
                  Sepetindeki ürünler farklı yayınevlerinden gönderilebileceği
                  için siparişin birden fazla kargo ile teslim edilebilir.
                </p>
              </aside>

              <div className="space-y-10">
                {publisherGroups.map((group, groupIndex) => (
                  <section
                    key={group.publisher}
                    aria-labelledby={`publisher-group-${groupIndex}`}
                  >
                    <h2
                      id={`publisher-group-${groupIndex}`}
                      className="border-b border-border pb-3 text-h3 text-foreground"
                    >
                      {group.publisher}
                    </h2>

                    <ul className="divide-y divide-border">
                      {group.items.map(({ book, quantity }) => {
                        const hasDiscount =
                          typeof book.originalPrice === "number" &&
                          book.originalPrice > book.price;

                        return (
                          <li key={book.id} className="py-6">
                            <article className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                              <Link
                                href={`/kitap/${book.slug}`}
                                className="relative mx-auto aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-medium border border-border bg-surface sm:mx-0 sm:w-24"
                              >
                                <Image
                                  src={book.cover}
                                  alt={`${book.title} kitap kapağı`}
                                  fill
                                  sizes="112px"
                                  className="object-cover"
                                />
                              </Link>

                              <div className="min-w-0 flex-1 space-y-3">
                                <div className="space-y-1">
                                  <Link
                                    href={`/kitap/${book.slug}`}
                                    className="text-body-large font-semibold text-foreground transition-colors hover:text-primary"
                                  >
                                    {book.title}
                                  </Link>
                                  <p className="text-body-small text-muted">
                                    {book.author}
                                  </p>
                                  <p className="text-caption text-muted">
                                    {book.publisher}
                                  </p>
                                  <p className="text-caption text-muted">
                                    {FORMAT_LABEL}
                                  </p>
                                </div>

                                <div
                                  className="inline-flex items-center gap-0 rounded-medium border border-border bg-surface"
                                  role="group"
                                  aria-label={`${book.title} adet`}
                                >
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    disabled
                                    className="h-9 w-9 rounded-none px-0"
                                    aria-label="Adeti azalt"
                                  >
                                    −
                                  </Button>
                                  <span
                                    className="min-w-8 text-center text-body-small font-medium text-foreground"
                                    aria-live="polite"
                                  >
                                    {quantity}
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    disabled
                                    className="h-9 w-9 rounded-none px-0"
                                    aria-label="Adeti artır"
                                  >
                                    +
                                  </Button>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="px-0 text-muted hover:bg-transparent hover:text-foreground"
                                  >
                                    Sil
                                  </Button>
                                  <span
                                    className="text-caption text-border"
                                    aria-hidden="true"
                                  >
                                    |
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="px-0 text-muted hover:bg-transparent hover:text-foreground"
                                  >
                                    Favorilere Taşı
                                  </Button>
                                </div>
                              </div>

                              <div className="shrink-0 text-left sm:text-right">
                                <p className="text-body font-semibold text-foreground">
                                  {formatPrice(book.price)}
                                </p>
                                {hasDiscount ? (
                                  <p className="mt-1 text-caption text-muted line-through">
                                    {formatPrice(book.originalPrice!)}
                                  </p>
                                ) : null}
                              </div>
                            </article>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-8">
              <div className="rounded-large border border-border bg-surface p-6">
                <h2 className="text-h3 text-foreground">Sipariş Özeti</h2>

                <dl className="mt-6 space-y-3 text-body-small">
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

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
                  <Input
                    id="coupon-code"
                    name="coupon"
                    label="Kupon kodu"
                    placeholder="Kupon kodu"
                    autoComplete="off"
                    className="bg-surface"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    className="shrink-0"
                  >
                    Uygula
                  </Button>
                </div>

                <div className="mt-6">
                  <Link href="/odeme" className="block">
                    <Button type="button" size="lg" className="w-full">
                      Ödemeye Geç
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
        )}
      </Container>
    </div>
  );
}
