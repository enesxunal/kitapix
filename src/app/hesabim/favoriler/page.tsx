import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { BookCard } from "@/components/books/BookCard";
import { BookGrid } from "@/components/books/BookGrid";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { mockBooks } from "@/lib/mock-books";

const favoriteBooks = mockBooks.slice(0, 6);
const suggestedBooks = mockBooks.slice(6, 8);
const favoriteCount = favoriteBooks.length;

const showEmptyState = false;

function FavoritesEmptyState() {
  return (
    <section
      aria-labelledby="favorites-empty-heading"
      className="rounded-large border border-border bg-surface px-6 py-12 text-center"
    >
      <h2
        id="favorites-empty-heading"
        className="text-h3 text-foreground"
      >
        Henüz favori kitabın yok.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">
        Keşfederken ilgini çeken kitapları favorilerine ekleyebilirsin.
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

export default function FavoritesPage() {
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
              Favorilerim
            </li>
          </ol>
        </nav>

        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-h1 text-foreground">Favorilerim</h1>
            <p className="mt-3 text-body-large text-muted">
              Daha sonra incelemek veya satın almak istediğin kitapları burada
              bulabilirsin.
            </p>
          </div>
          <p className="shrink-0 text-body-small font-medium text-muted">
            {favoriteCount} kitap
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/favoriler" />
          </aside>

          <div className="min-w-0 space-y-10">
            {showEmptyState ? (
              <FavoritesEmptyState />
            ) : (
              <section aria-labelledby="favorites-grid-heading">
                <h2 id="favorites-grid-heading" className="sr-only">
                  Favori kitaplar
                </h2>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-body-small font-medium text-muted">
                    {favoriteCount} favori kitap
                  </p>
                  <label className="flex items-center gap-2 text-body-small text-muted">
                    <span className="sr-only">Sıralama</span>
                    <select
                      className="rounded-medium border border-border bg-surface px-3 py-2 text-body-small font-medium text-foreground"
                      defaultValue="recent"
                      aria-label="Favorileri sırala"
                    >
                      <option value="recent">En Son Eklenen</option>
                      <option value="price-asc">Fiyat: Artan</option>
                      <option value="price-desc">Fiyat: Azalan</option>
                      <option value="rating">En Yüksek Puan</option>
                    </select>
                  </label>
                </div>

                <div className="mt-6">
                  <BookGrid books={favoriteBooks} />
                </div>
              </section>
            )}

            <section aria-labelledby="favorites-suggestions-heading">
              <h2
                id="favorites-suggestions-heading"
                className="text-h2 text-foreground"
              >
                Bunlar da ilgini çekebilir
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:max-w-md">
                {suggestedBooks.map((book) => (
                  <li key={book.id}>
                    <BookCard book={book} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
