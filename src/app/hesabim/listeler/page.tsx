import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { ListsManager } from "@/components/account/ListsManager";
import { BookGrid } from "@/components/books/BookGrid";
import { Container } from "@/components/layout/Container";
import { requireUser } from "@/lib/auth/require-user";
import { getFavoriteBooks } from "@/lib/data/favorites";
import { getReadingLists } from "@/lib/data/lists";

export default async function ListsPage() {
  await requireUser();

  const [lists, favoriteSuggestions] = await Promise.all([
    getReadingLists(),
    getFavoriteBooks(),
  ]);
  const listCount = lists.length;
  const suggestionBooks = favoriteSuggestions.slice(0, 4);

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
              Listelerim
            </li>
          </ol>
        </nav>

        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-h1 text-foreground">Listelerim</h1>
            <p className="mt-3 text-body-large text-muted">
              Okumak istediğin kitapları kendi listelerinde düzenle ve daha
              sonra kolayca bul.
            </p>
          </div>
          <p className="text-body-small font-medium text-muted">
            {listCount} liste
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/listeler" />
          </aside>

          <div className="min-w-0 space-y-10">
            <ListsManager lists={lists} />

            {suggestionBooks.length > 0 ? (
              <section aria-labelledby="lists-favorites-heading">
                <h2
                  id="lists-favorites-heading"
                  className="text-h2 text-foreground"
                >
                  Favorilerinden listeye ekleyebilirsin
                </h2>
                <div className="mt-6">
                  <BookGrid
                    books={suggestionBooks}
                    className="xl:grid-cols-4"
                  />
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
