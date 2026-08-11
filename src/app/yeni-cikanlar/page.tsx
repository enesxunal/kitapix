import type { Metadata } from "next";
import { BookGrid } from "@/components/books/BookGrid";
import { DiscoveryBreadcrumb } from "@/components/discovery/DiscoveryBreadcrumb";
import { DiscoveryEmptyState } from "@/components/discovery/DiscoveryEmptyState";
import {
  DISCOVERY_PAGE_SIZE,
  DiscoveryPagination,
  parsePageParam,
} from "@/components/discovery/DiscoveryPagination";
import { Container } from "@/components/layout/Container";
import { getNewestBooksPage } from "@/lib/data/books";
import { pageMetadata } from "@/lib/seo";

type NewestPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export const metadata: Metadata = pageMetadata({
  title: "Yeni Çıkan Kitaplar | Kitapix",
  description:
    "Yayın tarihine göre katalogdaki yeni çıkan kitaplar. Kaynak: publication_date.",
  path: "/yeni-cikanlar",
});

export default async function NewestBooksPage({
  searchParams,
}: NewestPageProps) {
  const { page: pageParam } = await searchParams;
  const page = parsePageParam(pageParam);
  const offset = (page - 1) * DISCOVERY_PAGE_SIZE;
  const { books, total } = await getNewestBooksPage({
    limit: DISCOVERY_PAGE_SIZE,
    offset,
  });
  const totalPages = Math.max(1, Math.ceil(total / DISCOVERY_PAGE_SIZE));

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <DiscoveryBreadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Yeni Çıkanlar" },
          ]}
        />

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Yeni Çıkanlar</h1>
          <p className="mt-3 text-body-large text-muted">
            Kitaplar yayın tarihine göre yeniden eskiye sıralanır. Yayın tarihi
            olmayan kayıtlar bu listede yer almaz.
          </p>
          <p className="mt-3 text-body-small text-muted">{total} kitap</p>
        </header>

        <div className="mt-10">
          {books.length === 0 ? (
            <DiscoveryEmptyState
              title="Yeni çıkan kitap bulunamadı"
              description="Yayın tarihi dolu aktif kitap yok. Katalog güncellendiğinde burada listelenecek."
            />
          ) : (
            <>
              <BookGrid books={books} />
              <DiscoveryPagination
                basePath="/yeni-cikanlar"
                page={page}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
