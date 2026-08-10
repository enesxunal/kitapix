import Image from "next/image";
import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { BookGrid } from "@/components/books/BookGrid";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { mockBooks } from "@/lib/mock-books";
import type { Book } from "@/types/book";

type DemoList = {
  id: string;
  title: string;
  description: string;
  books: Book[];
};

const demoLists: DemoList[] = [
  {
    id: "bu-ay",
    title: "Bu Ay Okuyacaklarım",
    description: "Ağustos ayında okumak istediğim kitaplar.",
    books: mockBooks.slice(0, 4),
  },
  {
    id: "tatil",
    title: "Tatil Kitapları",
    description: "Kısa, akıcı ve tatilde okunabilecek kitaplar.",
    books: mockBooks.slice(4, 7),
  },
  {
    id: "daha-sonra",
    title: "Daha Sonra",
    description: "İlgimi çeken ve daha sonra incelemek istediğim kitaplar.",
    books: [...mockBooks.slice(0, 3), ...mockBooks.slice(6, 8)],
  },
];

const favoriteSuggestions = mockBooks.slice(0, 4);
const listCount = demoLists.length;
const showEmptyState = false;

const previewZIndex = ["z-40", "z-30", "z-20", "z-10"] as const;

function ListCoverPreview({ books }: { books: Book[] }) {
  const previewBooks = books.slice(0, 4);

  return (
    <ul className="flex items-end" aria-label="Liste kitap kapakları">
      {previewBooks.map((book, index) => (
        <li
          key={`${book.id}-${index}`}
          className={[
            "relative",
            previewZIndex[index],
            index === 0 ? "" : "-ml-3",
          ].join(" ")}
        >
          <div className="relative aspect-[2/3] w-12 overflow-hidden rounded-medium border border-border bg-surface-muted sm:w-14">
            <Image
              src={book.cover}
              alt={`${book.title} kitap kapağı`}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function ListCard({ list }: { list: DemoList }) {
  const bookCount = list.books.length;

  return (
    <article className="flex h-full flex-col rounded-large border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h3 className="text-body font-semibold text-foreground">
            {list.title}
          </h3>
          <p className="mt-2 text-body-small text-muted">{list.description}</p>
          <p className="mt-3 text-caption font-medium text-muted">
            {bookCount} kitap
          </p>
        </div>

        <ListCoverPreview books={list.books} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm">
          Listeyi Gör
        </Button>
        <Button type="button" variant="ghost" size="sm">
          Düzenle
        </Button>
      </div>
    </article>
  );
}

function ListsEmptyState() {
  return (
    <section
      aria-labelledby="lists-empty-heading"
      className="rounded-large border border-border bg-surface px-6 py-12 text-center"
    >
      <h2 id="lists-empty-heading" className="text-h3 text-foreground">
        Henüz bir listen yok.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">
        Okumak istediğin kitapları düzenlemek için ilk listeni oluştur.
      </p>
      <div className="mt-6">
        <Button type="button" variant="primary" size="md">
          Yeni Liste Oluştur
        </Button>
      </div>
    </section>
  );
}

export default function ListsPage() {
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
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-body-small font-medium text-muted">
              {listCount} liste
            </p>
            <Button type="button" variant="primary" size="md">
              Yeni Liste Oluştur
            </Button>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/listeler" />
          </aside>

          <div className="min-w-0 space-y-10">
            {showEmptyState ? (
              <ListsEmptyState />
            ) : (
              <section aria-labelledby="lists-grid-heading">
                <h2 id="lists-grid-heading" className="sr-only">
                  Okuma listeleri
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {demoLists.map((list) => (
                    <li key={list.id}>
                      <ListCard list={list} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="lists-favorites-heading">
              <h2
                id="lists-favorites-heading"
                className="text-h2 text-foreground"
              >
                Favorilerinden listeye ekleyebilirsin
              </h2>
              <div className="mt-6">
                <BookGrid
                  books={favoriteSuggestions}
                  className="xl:grid-cols-4"
                />
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
