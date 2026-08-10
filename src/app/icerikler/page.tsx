import Link from "next/link";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { BookGrid } from "@/components/books/BookGrid";
import { SectionHeader } from "@/components/home/SectionHeader";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getFeaturedBooks } from "@/lib/data/books";

const categories = [
  "Tümü",
  "Kitap İncelemeleri",
  "Yazar Röportajları",
  "Okuma Rehberleri",
  "Edebiyat",
  "Yayıncılık",
  "Yapay Zeka",
] as const;

const articles = [
  {
    category: "Okuma Rehberi",
    title: "Yeniden kitap okumaya başlamak için 7 öneri",
    excerpt:
      "Okuma alışkanlığına geri dönmek isteyenler için küçük ama etkili başlangıç noktaları.",
    date: "2026-07-28",
    readingTime: "6 dk okuma",
    href: "/icerikler/yeniden-kitap-okumaya-baslamak",
  },
  {
    category: "Kitap İncelemesi",
    title: "Odaklanmayı destekleyen kitaplar nasıl seçilir?",
    excerpt:
      "Dikkati dağıtmayan metinleri ayırt etmek ve doğru tempoda ilerlemek için pratik bir çerçeve.",
    date: "2026-07-21",
    readingTime: "5 dk okuma",
    href: "/icerikler/odaklanmayi-destekleyen-kitaplar",
  },
  {
    category: "Editör Seçkisi",
    title: "Bu ay editörün radarındaki 5 kitap",
    excerpt:
      "Editör ekibimizin bu dönemde öne çıkardığı yeni keşifler ve nedenlerini paylaştığı kısa notlar.",
    date: "2026-07-14",
    readingTime: "4 dk okuma",
  },
  {
    category: "Yayıncılık",
    title: "Yeni yazarlar için yayıncılık sürecine giriş",
    excerpt:
      "Fikirden basılı kitaba uzanan yolculukta bilmen gereken temel adımlar ve yaygın yanılgılar.",
    date: "2026-07-07",
    readingTime: "8 dk okuma",
  },
  {
    category: "Edebiyat",
    title: "Edebiyatta yapay zekânın yeri",
    excerpt:
      "Yaratıcılık, yazarlık ve okur deneyimi arasındaki dengeyi edebiyat bağlamında ele alan bir bakış.",
    date: "2026-06-30",
    readingTime: "7 dk okuma",
    href: "/icerikler/edebiyatta-yapay-zeka",
  },
  {
    category: "Okuma Rehberi",
    title: "Kısa sürede okunabilecek güçlü kitaplar",
    excerpt:
      "Yoğun günlerde bile tamamlanabilecek, etkisi uzun süren kısa ve yoğun okumalar.",
    date: "2026-06-23",
    readingTime: "5 dk okuma",
  },
] as const;

const aiArticles = [
  {
    category: "Yapay Zeka",
    title: "Yapay zeka kitap keşfini nasıl değiştiriyor?",
    excerpt:
      "Okurların ihtiyaçlarını anlayan öneri sistemleri, kitap bulma deneyimini nasıl daha kişisel hale getiriyor.",
    date: "2026-07-18",
    readingTime: "6 dk okuma",
  },
  {
    category: "Yayıncılık",
    title: "AI editörler yazarlara nasıl yardımcı olabilir?",
    excerpt:
      "Metin düzenleme, yapı önerisi ve okur geri bildirimi süreçlerinde yapay zekânın sınırlı ama faydalı rolü.",
    date: "2026-07-11",
    readingTime: "7 dk okuma",
  },
  {
    category: "Yayıncılık",
    title: "Geleceğin yayıncılık deneyimi nasıl olacak?",
    excerpt:
      "Keşif, okuma ve paylaşımın bir araya geldiği yeni nesil yayıncılık deneyimine dair bir çerçeve.",
    date: "2026-07-04",
    readingTime: "5 dk okuma",
  },
] as const;

export default async function EditorialPage() {
  const editorPicks = await getFeaturedBooks(4);

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
              İçerikler
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Kitapix’ten</h1>
          <p className="mt-3 text-body-large text-muted">
            Kitaplar, yazarlar, okuma kültürü ve yayıncılık dünyasından seçilmiş içerikler.
          </p>
        </header>

        <section
          aria-labelledby="featured-article-heading"
          className="mt-12 border-t border-border pt-10 md:mt-14 md:pt-12"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 lg:items-center">
            <div
              className="aspect-[16/10] w-full rounded-large bg-surface-muted lg:aspect-[4/3]"
              aria-hidden="true"
            />

            <div>
              <p className="text-caption font-medium tracking-wide text-muted uppercase">
                Okuma Rehberi
              </p>
              <h2
                id="featured-article-heading"
                className="mt-3 text-h2 text-foreground md:text-h1"
              >
                Yeniden kitap okumaya başlamak için 7 öneri
              </h2>
              <p className="mt-4 text-body text-muted">
                Okuma alışkanlığına geri dönmek isteyenler için küçük ama etkili başlangıç
                noktaları.
              </p>
              <p className="mt-4 text-caption text-muted">6 dk okuma</p>
              <div className="mt-6">
                <Link href="/icerikler/yeniden-kitap-okumaya-baslamak">
                  <Button type="button">Yazıyı Oku</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <nav
          aria-label="İçerik kategorileri"
          className="mt-12 border-y border-border py-4 md:mt-14"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-caption text-muted">Kategori filtresi yakında</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {categories.map((category, index) => (
              <li key={category}>
                <span
                  className={[
                    "text-body-small font-medium",
                    index === 0 ? "text-foreground" : "text-muted",
                  ].join(" ")}
                >
                  {category}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="editorial-grid-heading" className="mt-10 md:mt-12">
          <h2 id="editorial-grid-heading" className="sr-only">
            Tüm içerikler
          </h2>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.title}>
                <ArticleCard
                  category={article.category}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={article.date}
                  readingTime={article.readingTime}
                  href={"href" in article ? article.href : undefined}
                />
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="section-editorun-seckisi"
          className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16"
        >
          <SectionHeader
            id="section-editorun-seckisi"
            title="Editörün Seçkisi"
            description="Bu ay üzerinde durduğumuz temalar ve kitaplar."
          />
          <div className="mt-8">
            <BookGrid books={editorPicks} className="xl:grid-cols-4" />
          </div>
        </section>

        <section
          aria-labelledby="interview-heading"
          className="mt-16 rounded-large border border-border bg-surface px-6 py-10 md:mt-20 md:px-10 md:py-12"
        >
          <div className="max-w-2xl">
            <p className="text-caption font-medium tracking-wide text-muted uppercase">
              Yazar Röportajı
            </p>
            <h2 id="interview-heading" className="mt-3 text-h2 text-foreground">
              Elif Aras ile yazmak, okumak ve yeni nesil yayıncılık üzerine
            </h2>
            <p className="mt-4 text-body text-muted">
              Bir kitabın fikirden okura ulaşan yolculuğunu konuştuk.
            </p>
            <div className="mt-6">
              <Button type="button" variant="secondary">
                Röportajı Oku
              </Button>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="section-ai-yayincilik"
          className="mt-16 md:mt-20"
        >
          <SectionHeader
            id="section-ai-yayincilik"
            title="Yapay Zeka & Yayıncılık"
            description="Teknolojinin kitap keşfi ve yayıncılıkla buluştuğu noktalar."
          />
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {aiArticles.map((article) => (
              <li key={article.title} className="border-t border-border pt-6">
                <ArticleCard {...article} showImage={false} />
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="newsletter-heading"
          className="mt-16 mb-4 border-t border-border pt-12 md:mt-20 md:pt-16"
        >
          <div className="mx-auto max-w-xl text-center">
            <h2 id="newsletter-heading" className="text-h2 text-foreground">
              Kitap dünyasından seçkiler e-postana gelsin.
            </h2>
            <p className="mt-3 text-body text-muted">
              Yeni kitaplar, editör önerileri ve haftanın içeriklerini kaçırma.
            </p>

            <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end">
              <Input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="E-posta adresin"
                aria-label="E-posta adresin"
                className="bg-surface"
                disabled
              />
              <Button type="button" size="lg" className="sm:shrink-0" disabled>
                Abone Ol (Yakında)
              </Button>
            </form>
            <p className="mt-3 text-caption text-muted">
              Bülten aboneliği yakında aktif olacak.
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}
