import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { BookGrid } from "@/components/books/BookGrid";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { mockBooks } from "@/lib/mock-books";
import {
  demoArticles,
  getDemoArticle,
  relatedArticleCards,
} from "./articles";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDisplayDate(isoDate: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function generateStaticParams() {
  return demoArticles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = getDemoArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedBooks = mockBooks.slice(0, 4);
  const similarArticles = relatedArticleCards
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

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
              <Link href="/icerikler" className="hover:text-foreground">
                İçerikler
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        <article>
          <header className="mx-auto max-w-3xl">
            <p className="text-caption font-medium tracking-wide text-muted uppercase">
              {article.category}
            </p>
            <h1 className="mt-3 text-h1 text-foreground">{article.title}</h1>
            <p className="mt-4 text-body-large text-muted">{article.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-small text-muted">
              <span className="text-foreground">{article.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>
                {formatDisplayDate(article.date)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button type="button" variant="secondary" size="sm">
                Kaydet
              </Button>
              <Button type="button" variant="ghost" size="sm">
                Paylaş
              </Button>
            </div>
          </header>

          <div
            className="relative mt-10 overflow-hidden rounded-large border border-border bg-surface-muted md:mt-12"
            aria-hidden="true"
          >
            <div className="flex aspect-[16/9] w-full flex-col justify-end md:aspect-[21/9]">
              <div className="border-t border-border bg-surface p-6 md:p-10">
                <p className="text-caption font-medium tracking-wide text-muted uppercase">
                  {article.category}
                </p>
                <p className="mt-2 max-w-xl text-h3 text-foreground">
                  {article.title}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-[720px] md:mt-14">
            <p className="text-body-large text-foreground">{article.intro}</p>

            <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
              {article.sections.map((section, index) => (
                <section
                  key={section.heading}
                  aria-labelledby={`section-${index}`}
                >
                  <h2
                    id={`section-${index}`}
                    className="text-h2 text-foreground"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-body text-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {index === 1 ? (
                    <aside className="mt-10 border-l-2 border-border pl-5 md:mt-12 md:pl-6">
                      <blockquote className="text-body-large text-foreground">
                        {article.callout}
                      </blockquote>
                    </aside>
                  ) : null}
                </section>
              ))}
            </div>
          </div>

          <section
            aria-labelledby="related-books-heading"
            className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16"
          >
            <h2
              id="related-books-heading"
              className="text-h2 text-foreground"
            >
              Bu yazıyla birlikte okuyabileceğin kitaplar
            </h2>
            <div className="mt-8">
              <BookGrid books={relatedBooks} className="xl:grid-cols-4" />
            </div>
          </section>

          <section
            aria-labelledby="similar-articles-heading"
            className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16"
          >
            <h2
              id="similar-articles-heading"
              className="text-h2 text-foreground"
            >
              Bunlar da ilgini çekebilir
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {similarArticles.map((item) => (
                <li key={item.slug}>
                  <ArticleCard
                    category={item.category}
                    title={item.title}
                    excerpt={item.excerpt}
                    date={item.date}
                    readingTime={item.readingTime}
                    href={`/icerikler/${item.slug}`}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="author-box-heading"
            className="mt-16 border-t border-border pt-10 md:mt-20 md:pt-12"
          >
            <div className="max-w-2xl">
              <h2
                id="author-box-heading"
                className="text-h3 text-foreground"
              >
                {article.author}
              </h2>
              <p className="mt-3 text-body text-muted">
                Kitapix editör ekibi; kitaplar, okuma kültürü ve yayıncılık
                dünyası üzerine içerikler hazırlar.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="article-newsletter-heading"
            className="mt-16 mb-4 border-t border-border pt-12 md:mt-20 md:pt-16"
          >
            <div className="mx-auto max-w-xl text-center">
              <h2
                id="article-newsletter-heading"
                className="text-h2 text-foreground"
              >
                Yeni yazıları kaçırma
              </h2>
              <p className="mt-3 text-body text-muted">
                Kitap dünyasından seçkiler ve yeni içerikler e-postana gelsin.
              </p>

              <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end">
                <Input
                  id="article-newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="E-posta adresin"
                  aria-label="E-posta adresin"
                  className="bg-surface"
                />
                <Button type="button" size="lg" className="sm:shrink-0">
                  Abone Ol
                </Button>
              </form>
            </div>
          </section>
        </article>
      </Container>
    </div>
  );
}
