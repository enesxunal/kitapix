import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandLogo";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { mockBooks } from "@/lib/mock-books";

const quickPrompts = [
  "Sürükleyici bir roman",
  "Odaklanmak istiyorum",
  "Kısa bir kitap",
  "Yeni bir şey öğrenmek istiyorum",
  "Rahatlatıcı bir kitap",
  "Çocuğum için kitap",
] as const;

const refinements = [
  "Daha kısa olsun",
  "Daha sürükleyici olsun",
  "Daha edebi olsun",
  "Türk yazarlardan olsun",
  "Daha uygun fiyatlı olsun",
  "Başka öneriler göster",
] as const;

const recommendations = [
  {
    book: mockBooks[1],
    reason:
      "Akıcı anlatımı ve kısa bölümleri nedeniyle tekrar okuma alışkanlığı kazanmak isteyenler için uygun.",
  },
  {
    book: mockBooks[4],
    reason:
      "Hızlı ilerleyen kurgusuyla ağır olmadan sürükleyici bir okuma deneyimi sunar.",
  },
  {
    book: mockBooks[3],
    reason:
      "Sade dili ve umut veren tonuyla uzun bir aradan sonra okumaya dönmek için iyi bir başlangıç.",
  },
  {
    book: mockBooks[0],
    reason:
      "Sakin temposu ve net anlatımıyla yormadan ilerlemek isteyen okurlar için önerilir.",
  },
] as const;

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AiAssistantPage() {
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
              AI Asistan
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <div className="flex items-center gap-3">
            <BrandMark className="size-10 shrink-0" />
            <h1 className="text-h1 text-primary">Kitapix AI</h1>
          </div>
          <p className="mt-3 text-body-large text-muted">
            Ne okumak istediğini anlat. Kitabın adını bilmen gerekmiyor.
          </p>
          <p className="mt-3 text-body text-muted">
            Ruh halini, ilgini, ihtiyacını veya nasıl bir okuma deneyimi aradığını
            yaz; sana uygun kitapları birlikte bulalım.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
          <section
            aria-labelledby="ai-conversation-heading"
            className="flex h-fit flex-col rounded-large border border-border bg-surface p-5 md:p-6"
          >
            <h2 id="ai-conversation-heading" className="text-h3 text-primary">
              Ne arıyorsun?
            </h2>

            <div className="mt-6 space-y-4" aria-label="Örnek konuşma">
              <div className="rounded-medium bg-surface-muted px-4 py-3">
                <p className="text-caption font-medium text-muted">Sen</p>
                <p className="mt-1.5 text-body text-foreground">
                  Uzun zamandır kitap okumuyorum. Çok ağır olmayan, sürükleyici bir
                  roman istiyorum.
                </p>
              </div>

              <div className="rounded-medium border border-accent/40 bg-accent-soft px-4 py-3">
                <div className="flex items-center gap-2">
                  <BrandMark className="size-5" />
                  <p className="text-caption font-medium text-primary">Kitapix</p>
                </div>
                <p className="mt-1.5 text-body text-foreground">
                  Tekrar okuma alışkanlığı kazanmanı kolaylaştırabilecek, hızlı
                  ilerleyen ve sade anlatımlı birkaç kitap seçtim.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-body-small font-medium text-foreground">
                Hızlı öneriler
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <li key={prompt}>
                    <button
                      type="button"
                      className="rounded-medium border border-border bg-background px-3 py-1.5 text-caption text-muted transition-colors hover:border-accent hover:bg-accent-soft hover:text-primary"
                    >
                      {prompt}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              <label htmlFor="ai-query" className="sr-only">
                Ne okumak istediğini yaz
              </label>
              <textarea
                id="ai-query"
                name="query"
                rows={4}
                placeholder="Örn: Yoğun çalışıyorum, günde 15 dakika okuyabileceğim bir kitap öner."
                className="w-full resize-y rounded-medium border border-border bg-background px-3 py-3 text-body text-foreground placeholder:text-muted transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              />
              <Button type="button" size="lg" className="w-full sm:w-auto">
                Kitap Öner
              </Button>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-body-small font-medium text-foreground">
                Öneriyi iyileştir
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {refinements.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="rounded-medium border border-border bg-surface-muted px-3 py-1.5 text-caption text-muted transition-colors hover:border-accent/50 hover:text-primary"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="ai-recommendations-heading" className="min-w-0">
            <div className="max-w-xl">
              <h2 id="ai-recommendations-heading" className="text-h2 text-primary">
                Senin için seçtik
              </h2>
              <p className="mt-2 text-body text-muted">
                Aradığın okuma deneyimine uygun kitaplar.
              </p>
            </div>

            <ul className="mt-6 space-y-4">
              {recommendations.map(({ book, reason }) => (
                <li
                  key={book.id}
                  className="rounded-large border border-border bg-surface p-4 md:p-5"
                >
                  <article className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                    <div className="relative mx-auto aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-medium border border-border bg-surface-muted sm:mx-0 sm:w-24">
                      <Image
                        src={book.cover}
                        alt={`${book.title} kitap kapağı`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-h3 text-foreground">{book.title}</h3>
                      <p className="mt-1 text-body-small text-muted">{book.author}</p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {typeof book.rating === "number" ? (
                          <p className="text-body-small text-muted">
                            <span className="font-medium text-foreground">
                              {book.rating.toFixed(1)}
                            </span>
                            {typeof book.reviewCount === "number"
                              ? ` · ${book.reviewCount} değerlendirme`
                              : null}
                          </p>
                        ) : null}
                        <p className="text-body-small font-semibold text-foreground">
                          {formatPrice(book.price)}
                        </p>
                      </div>

                      <p className="mt-3 text-body-small text-muted">{reason}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/kitap/${book.slug}`}
                          className="inline-flex h-11 items-center justify-center rounded-medium border border-border bg-surface px-4 text-body-small font-semibold text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          Kitabı İncele
                        </Link>
                        <Button type="button" variant="primary" size="md">
                          Sepete Ekle
                        </Button>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside
          aria-labelledby="ai-info-heading"
          className="mt-12 rounded-large border border-accent/30 bg-accent-soft p-5 md:p-6"
        >
          <h2 id="ai-info-heading" className="text-h3 text-primary">
            Kitapix AI nasıl çalışır?
          </h2>
          <p className="mt-2 max-w-3xl text-body text-muted">
            Kitapix AI, aradığın deneyimi anlamaya çalışır ve katalogdaki kitaplar
            arasından sana uygun seçenekleri öne çıkarır.
          </p>
          <p className="mt-2 max-w-3xl text-body-small text-muted">
            Öneriler keşif amaçlıdır; kitap detaylarını satın almadan önce
            inceleyebilirsin.
          </p>
        </aside>
      </Container>
    </div>
  );
}
