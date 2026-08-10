import Link from "next/link";
import { BookGrid } from "@/components/books/BookGrid";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { getBooks } from "@/lib/data/books";

const categories = [
  "Roman",
  "Psikoloji",
  "Kişisel Gelişim",
  "Bilim",
  "Çocuk",
] as const;

const priceRanges = ["0–150 TL", "150–300 TL", "300 TL+"] as const;

const publishers = [
  "Kitapix Yayınları",
  "Kuzey Kitap",
  "Mavi Sayfa",
  "Yeni Nesil Yayınları",
] as const;

export default async function BooksListingPage() {
  const books = await getBooks();
  const bookCount = books.length;

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
              Kitaplar
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Kitapları Keşfet</h1>
          <p className="mt-3 text-body-large text-muted">
            Farklı türlerden kitapları keşfet veya sana uygun olanı bul.
          </p>
        </header>

        <div className="mt-8 max-w-xl">
          <Input
            id="books-search"
            type="search"
            name="q"
            placeholder="Kitap, yazar veya yayınevi ara"
            aria-label="Kitap, yazar veya yayınevi ara"
            className="bg-surface"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
          <aside aria-labelledby="filters-heading" className="h-fit rounded-large border border-border bg-surface p-5">
            <h2 id="filters-heading" className="text-h3 text-foreground">
              Filtrele
            </h2>

            <div className="mt-6 space-y-7">
              <fieldset>
                <legend className="text-body-small font-semibold text-foreground">
                  Kategori
                </legend>
                <ul className="mt-3 space-y-2.5">
                  {categories.map((category) => (
                    <li key={category}>
                      <label className="flex cursor-pointer items-center gap-2.5 text-body-small text-muted hover:text-foreground">
                        <input
                          type="checkbox"
                          name="category"
                          value={category}
                          className="size-4 rounded-small border-border accent-primary"
                        />
                        <span>{category}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <fieldset>
                <legend className="text-body-small font-semibold text-foreground">
                  Fiyat
                </legend>
                <ul className="mt-3 space-y-2.5">
                  {priceRanges.map((range) => (
                    <li key={range}>
                      <label className="flex cursor-pointer items-center gap-2.5 text-body-small text-muted hover:text-foreground">
                        <input
                          type="checkbox"
                          name="price"
                          value={range}
                          className="size-4 rounded-small border-border accent-primary"
                        />
                        <span>{range}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <fieldset>
                <legend className="text-body-small font-semibold text-foreground">
                  Yayınevi
                </legend>
                <ul className="mt-3 space-y-2.5">
                  {publishers.map((publisher) => (
                    <li key={publisher}>
                      <label className="flex cursor-pointer items-center gap-2.5 text-body-small text-muted hover:text-foreground">
                        <input
                          type="checkbox"
                          name="publisher"
                          value={publisher}
                          className="size-4 rounded-small border-border accent-primary"
                        />
                        <span>{publisher}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            </div>
          </aside>

          <section aria-labelledby="results-heading" className="min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="results-heading" className="text-body font-semibold text-foreground">
                {bookCount} kitap
              </h2>

              <div className="flex items-center gap-2">
                <label htmlFor="books-sort" className="sr-only">
                  Sıralama
                </label>
                <select
                  id="books-sort"
                  name="sort"
                  defaultValue="recommended"
                  className="h-10 rounded-medium border border-border bg-surface px-3 text-body-small text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent"
                >
                  <option value="recommended">Önerilen</option>
                  <option value="price-asc">Fiyat: Artan</option>
                  <option value="price-desc">Fiyat: Azalan</option>
                  <option value="rating-desc">En Yüksek Puan</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <BookGrid books={books} />
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
