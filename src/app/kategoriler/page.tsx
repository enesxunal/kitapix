import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryBreadcrumb } from "@/components/discovery/DiscoveryBreadcrumb";
import { DiscoveryEmptyState } from "@/components/discovery/DiscoveryEmptyState";
import { Container } from "@/components/layout/Container";
import { getCategories } from "@/lib/data/categories";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kategoriler | Kitapix",
  description:
    "Kitapix katalog kategorilerini keşfet. Gerçek kategori listesinden kitaplara ulaş.",
  path: "/kategoriler",
});

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <DiscoveryBreadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Kategoriler" },
          ]}
        />

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Kategoriler</h1>
          <p className="mt-3 text-body-large text-muted">
            Katalogdaki aktif kategorilerden kitapları keşfet.
          </p>
        </header>

        {categories.length === 0 ? (
          <div className="mt-10">
            <DiscoveryEmptyState
              title="Henüz kategori yok"
              description="Aktif kategori bulunamadı. Kitap keşfine katalogdan devam edebilirsin."
            />
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/kategori/${category.slug}`}
                  className="flex h-full flex-col rounded-large border border-border bg-surface px-5 py-6 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                >
                  <h2 className="text-h3 text-foreground">{category.name}</h2>
                  {category.description ? (
                    <p className="mt-2 line-clamp-2 text-body-small text-muted">
                      {category.description}
                    </p>
                  ) : null}
                  <p className="mt-auto pt-4 text-caption text-muted">
                    {category.bookCount} kitap
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
