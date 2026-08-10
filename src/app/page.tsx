import Image from "next/image";
import Link from "next/link";
import { BookGrid } from "@/components/books/BookGrid";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/layout/Container";
import { mockBooks } from "@/lib/mock-books";

const forYouBooks = mockBooks.slice(0, 5);
const editorBooks = [mockBooks[1], mockBooks[5], mockBooks[2], mockBooks[6]];
const bestsellerBooks = [mockBooks[2], mockBooks[6], mockBooks[3], mockBooks[0]];
const newReleaseBooks = [mockBooks[3], mockBooks[7], mockBooks[4], mockBooks[5]];
const heroCovers = [mockBooks[0], mockBooks[2], mockBooks[1]];

const categories = [
  "Roman",
  "Psikoloji",
  "Kişisel Gelişim",
  "Bilim",
  "Çocuk",
  "Tarih",
  "Felsefe",
  "İş Dünyası",
] as const;

const editorialItems = [
  {
    title: "Yeniden kitap okumaya başlamak için 5 öneri",
    excerpt: "Okuma alışkanlığını nazikçe geri kazanmana yardımcı olacak seçkiler.",
  },
  {
    title: "Odaklanmayı destekleyen kitaplar",
    excerpt: "Dikkati dağıtmadan ilerlemeyi kolaylaştıran sakin ve net metinler.",
  },
  {
    title: "Bu ay editörün radarında",
    excerpt: "Editör ekibimizin bu dönemde öne çıkardığı yeni keşifler.",
  },
] as const;

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--accent-soft),transparent_55%),radial-gradient(ellipse_at_bottom_left,var(--surface-muted),transparent_50%)]"
          aria-hidden="true"
        />

        <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-caption font-semibold tracking-wide text-accent-foreground/70 uppercase">
              Kitap keşfi, yeniden
            </p>
            <h1 className="text-display text-foreground">
              Aradığın kitabın adını bilmek zorunda değilsin.
            </h1>
            <p className="mt-5 max-w-xl text-body-large text-muted">
              Ne okumak istediğini, nasıl hissettiğini veya neye ihtiyaç duyduğunu anlat.
              Kitapix sana uygun kitapları bulsun.
            </p>

            <form className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end" role="search">
              <Input
                id="hero-search"
                type="search"
                name="q"
                placeholder="Bugün nasıl bir kitap arıyorsun?"
                aria-label="Bugün nasıl bir kitap arıyorsun?"
                className="h-12 border-border bg-surface"
              />
              <Button type="button" size="lg" className="sm:shrink-0">
                Kitap Bul
              </Button>
            </form>

            <p className="mt-3 text-body-small text-muted">
              Örn: Uzun zamandır kitap okumuyorum. Sürükleyici bir roman öner.
            </p>
          </div>

          <div className="relative mx-auto flex h-[280px] w-full max-w-md items-end justify-center sm:h-[340px] lg:mx-0 lg:max-w-none" aria-hidden="true">
            <div className="absolute inset-x-8 bottom-0 h-24 rounded-full bg-accent/20 blur-2xl" />
            {heroCovers.map((book, index) => {
              const offsets = [
                "-translate-x-[38%] -rotate-8",
                "translate-x-0 rotate-0 z-10",
                "translate-x-[38%] rotate-8",
              ] as const;

              return (
                <div
                  key={book.id}
                  className={[
                    "absolute bottom-2 w-[42%] max-w-[180px] overflow-hidden rounded-large border border-border bg-surface shadow-lg transition-transform",
                    offsets[index],
                    index === 1 ? "scale-110" : "scale-95 opacity-95",
                  ].join(" ")}
                >
                  <div className="relative aspect-[2/3] w-full">
                    <Image
                      src={book.cover}
                      alt=""
                      fill
                      sizes="180px"
                      className="object-cover"
                      priority={index === 1}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Container className="space-y-16 py-16 md:space-y-20 md:py-20">
        <section aria-labelledby="section-sana-ozel">
          <SectionHeader
            id="section-sana-ozel"
            title="Sana Özel"
            linkHref="/kitaplar"
            linkLabel="Tümünü Gör"
          />
          <div className="mt-6">
            <BookGrid books={forYouBooks} />
          </div>
        </section>

        <section aria-labelledby="section-editorun-sectikleri">
          <SectionHeader
            id="section-editorun-sectikleri"
            title="Editörün Seçtikleri"
            description="Kitapix editörlerinden öne çıkan kitaplar."
            linkHref="/kitaplar"
            linkLabel="Tümünü Gör"
          />
          <div className="mt-6">
            <BookGrid books={editorBooks} className="xl:grid-cols-4" />
          </div>
        </section>

        <section
          aria-labelledby="section-ai-kesif"
          className="overflow-hidden rounded-large bg-primary px-6 py-10 text-primary-foreground md:px-10 md:py-12"
        >
          <div className="max-w-2xl">
            <p className="text-caption font-semibold tracking-wide text-accent uppercase">
              Kitapix AI
            </p>
            <h2 id="section-ai-kesif" className="mt-2 text-h2 text-primary-foreground">
              Ne okuyacağını bilmiyor musun?
            </h2>
            <p className="mt-3 text-body text-primary-foreground/80">
              Kitapix AI’a ne hissettiğini veya ne aradığını anlat. Sana uygun kitapları
              birlikte bulalım.
            </p>
            <div className="mt-6">
              <Link
                href="/ai-asistan"
                className="inline-flex h-12 items-center justify-center rounded-medium bg-accent px-6 text-body font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                AI Asistanı Keşfet
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="section-cok-satanlar">
          <SectionHeader
            id="section-cok-satanlar"
            title="Çok Satanlar"
            linkHref="/kitaplar"
            linkLabel="Tümünü Gör"
          />
          <div className="mt-6">
            <BookGrid books={bestsellerBooks} className="xl:grid-cols-4" />
          </div>
        </section>

        <section aria-labelledby="section-kategoriler">
          <SectionHeader
            id="section-kategoriler"
            title="Kategorilere Göre Keşfet"
          />
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((category) => (
              <li key={category}>
                <span className="flex h-full items-center justify-center rounded-large border border-border bg-accent-soft px-4 py-5 text-center text-body-small font-medium text-primary transition-colors hover:border-accent hover:bg-surface">
                  {category}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="section-yeni-cikanlar">
          <SectionHeader
            id="section-yeni-cikanlar"
            title="Yeni Çıkanlar"
            linkHref="/kitaplar"
            linkLabel="Tümünü Gör"
          />
          <div className="mt-6">
            <BookGrid books={newReleaseBooks} className="xl:grid-cols-4" />
          </div>
        </section>

        <section aria-labelledby="section-kitapix-ten">
          <SectionHeader
            id="section-kitapix-ten"
            title="Kitapix’ten"
            linkHref="/icerikler"
            linkLabel="Tüm içerikler"
          />
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {editorialItems.map((item) => (
              <li
                key={item.title}
                className="rounded-large border border-border bg-surface px-5 py-6"
              >
                <div className="mb-4 h-1.5 w-10 rounded-full bg-accent" aria-hidden="true" />
                <h3 className="text-h3 text-foreground">{item.title}</h3>
                <p className="mt-2 text-body-small text-muted">{item.excerpt}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
