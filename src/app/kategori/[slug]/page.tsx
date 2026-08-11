import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookGrid } from "@/components/books/BookGrid";
import { DiscoveryBreadcrumb } from "@/components/discovery/DiscoveryBreadcrumb";
import { DiscoveryEmptyState } from "@/components/discovery/DiscoveryEmptyState";
import {
  DISCOVERY_PAGE_SIZE,
  DiscoveryPagination,
  parsePageParam,
} from "@/components/discovery/DiscoveryPagination";
import { Container } from "@/components/layout/Container";
import {
  getBooksByCategorySlug,
  getCategoryBySlug,
} from "@/lib/data/categories";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return pageMetadata({
      title: "Kategori bulunamadı | Kitapix",
      description: "İstediğin kategori bulunamadı.",
      path: `/kategori/${slug}`,
    });
  }

  return pageMetadata({
    title: `${category.name} Kitapları | Kitapix`,
    description:
      category.description?.trim() ||
      `${category.name} kategorisindeki kitapları Kitapix’te keşfet.`,
    path: `/kategori/${category.slug}`,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parsePageParam(pageParam);
  const offset = (page - 1) * DISCOVERY_PAGE_SIZE;

  const result = await getBooksByCategorySlug(slug, {
    limit: DISCOVERY_PAGE_SIZE,
    offset,
  });

  if (!result) {
    notFound();
  }

  const totalPages = Math.max(
    1,
    Math.ceil(result.total / DISCOVERY_PAGE_SIZE),
  );

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <DiscoveryBreadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Kategoriler", href: "/kategoriler" },
            { label: result.category.name },
          ]}
        />

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">{result.category.name}</h1>
          {result.category.description ? (
            <p className="mt-3 text-body-large text-muted">
              {result.category.description}
            </p>
          ) : (
            <p className="mt-3 text-body-large text-muted">
              {result.category.name} kategorisindeki kitaplar.
            </p>
          )}
          <p className="mt-3 text-body-small text-muted">
            {result.total} kitap
          </p>
        </header>

        <div className="mt-10">
          {result.books.length === 0 ? (
            <DiscoveryEmptyState
              title="Bu kategoride henüz kitap yok"
              description="Kategori aktif ancak listelenecek aktif kitap bulunamadı."
              actionHref="/kategoriler"
              actionLabel="Diğer kategoriler"
            />
          ) : (
            <>
              <BookGrid books={result.books} />
              <DiscoveryPagination
                basePath={`/kategori/${result.category.slug}`}
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
