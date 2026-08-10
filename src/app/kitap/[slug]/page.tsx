import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookGrid } from "@/components/books/BookGrid";
import { FavoriteToggleButton } from "@/components/books/FavoriteToggleButton";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Container } from "@/components/layout/Container";
import { getBookBySlug, getRelatedBooks } from "@/lib/data/books";
import { isBookFavorited } from "@/lib/data/favorites";
import { createClient } from "@/lib/supabase/server";

const PLACEHOLDER_DESCRIPTION =
  "Kitap hakkında detaylı açıklama ilerleyen adımda içerik verisiyle birlikte eklenecek.";

type BookDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const description = book.description?.trim() || PLACEHOLDER_DESCRIPTION;
  const hasDiscount =
    typeof book.originalPrice === "number" && book.originalPrice > book.price;
  const discountAmount = hasDiscount ? book.originalPrice! - book.price : 0;
  const similarBooks = await getRelatedBooks(book.id);
  const showCover = Boolean(book.cover);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);
  const isFavorited = isAuthenticated ? await isBookFavorited(book.id) : false;

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-small text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/kitaplar" className="hover:text-foreground">
                Kitaplar
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              {book.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)_minmax(0,300px)] lg:gap-10 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)_minmax(0,320px)]">
          <div className="mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-none">
            <div className="relative overflow-hidden rounded-large border border-border bg-surface aspect-[2/3]">
              {showCover ? (
                <Image
                  src={book.cover}
                  alt={`${book.title} kitap kapağı`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 320px, 320px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-surface-muted px-4 text-center"
                  aria-hidden="true"
                >
                  <span className="text-caption text-muted">Kapak yok</span>
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 space-y-5">
            {book.badge ? (
              <span className="inline-flex w-fit rounded-small bg-accent-soft px-2 py-0.5 text-caption font-medium text-accent">
                {book.badge}
              </span>
            ) : null}

            <div className="space-y-2">
              <h1 className="text-h1 text-foreground">{book.title}</h1>
              <p className="text-body-large text-muted">{book.author}</p>
              <p className="text-body text-muted">{book.publisher}</p>
            </div>

            {typeof book.rating === "number" ? (
              <p className="text-body-small text-muted">
                <span className="font-medium text-foreground">{book.rating.toFixed(1)}</span>
                {typeof book.reviewCount === "number" ? (
                  <span> · {book.reviewCount} değerlendirme</span>
                ) : null}
              </p>
            ) : null}

            <p className="max-w-xl text-body text-muted">{description}</p>
          </div>

          <aside className="h-fit rounded-large border border-border bg-surface p-5 lg:sticky lg:top-6">
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-h2 text-foreground">{formatPrice(book.price)}</span>
                {hasDiscount ? (
                  <span className="text-body text-muted line-through">
                    {formatPrice(book.originalPrice!)}
                  </span>
                ) : null}
              </div>
              {hasDiscount ? (
                <p className="text-body-small font-medium text-accent">
                  {formatPrice(discountAmount)} indirim
                </p>
              ) : null}
            </div>

            <fieldset className="mt-5">
              <legend className="text-body-small font-medium text-foreground">Format</legend>
              <div className="mt-2">
                <span className="inline-flex rounded-medium border border-primary bg-surface-muted px-3 py-2 text-body-small font-medium text-foreground">
                  Basılı
                </span>
              </div>
            </fieldset>

            <div className="mt-5 flex flex-col gap-2">
              <AddToCartButton
                bookId={book.id}
                isAuthenticated={isAuthenticated}
              />
              <FavoriteToggleButton
                bookId={book.id}
                isFavorited={isFavorited}
                isAuthenticated={isAuthenticated}
              />
            </div>

            <ul className="mt-6 space-y-2 border-t border-border pt-5 text-body-small text-muted">
              <li>Tahmini kargoya teslim: 1–3 iş günü</li>
              <li>Güvenli ödeme</li>
              <li>Kolay iade</li>
            </ul>
          </aside>
        </div>

        <div className="mt-14 space-y-12 border-t border-border pt-12 md:mt-16 md:space-y-14 md:pt-14">
          <section aria-labelledby="section-kitap-hakkinda" className="max-w-3xl">
            <h2 id="section-kitap-hakkinda" className="text-h2 text-foreground">
              Kitap Hakkında
            </h2>
            <p className="mt-4 text-body text-muted">{description}</p>
          </section>

          <section aria-labelledby="section-kitap-bilgileri" className="max-w-3xl">
            <h2 id="section-kitap-bilgileri" className="text-h2 text-foreground">
              Kitap Bilgileri
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-caption text-muted">Yazar</dt>
                <dd className="mt-1 text-body text-foreground">{book.author}</dd>
              </div>
              <div>
                <dt className="text-caption text-muted">Yayınevi</dt>
                <dd className="mt-1 text-body text-foreground">{book.publisher}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="section-yazar-hakkinda" className="max-w-3xl">
            <h2 id="section-yazar-hakkinda" className="text-h2 text-foreground">
              Yazar Hakkında
            </h2>
            <p className="mt-4 text-body font-medium text-foreground">{book.author}</p>
            <p className="mt-2 text-body text-muted">
              Yazar hakkında detaylı bilgi ilerleyen adımda eklenecek.
            </p>
          </section>

          <section aria-labelledby="section-benzer-kitaplar">
            <h2 id="section-benzer-kitaplar" className="text-h2 text-foreground">
              Benzer Kitaplar
            </h2>
            <div className="mt-6">
              <BookGrid books={similarBooks} />
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
