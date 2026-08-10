import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { FavoriteRemoveButton } from "@/components/account/FavoriteRemoveButton";
import { BookCard } from "@/components/books/BookCard";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/auth/require-user";
import { getFavoriteBooks } from "@/lib/data/favorites";
import { getPopularBooks } from "@/lib/data/books";

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

export default async function FavoritesPage() {
  await requireUser();

  const favoriteBooks = await getFavoriteBooks();
  const favoriteCount = favoriteBooks.length;
  const favoriteIds = new Set(favoriteBooks.map((book) => book.id));
  const popularBooks = await getPopularBooks(8);
  const suggestedBooks = popularBooks
    .filter((book) => !favoriteIds.has(book.id))
    .slice(0, 2);

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
            {favoriteCount === 0 ? (
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
                </div>

                <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6 xl:gap-y-10">
                  {favoriteBooks.map((book) => (
                    <li key={book.id}>
                      <BookCard book={book} />
                      <FavoriteRemoveButton
                        bookId={book.id}
                        bookTitle={book.title}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {suggestedBooks.length > 0 ? (
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
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
