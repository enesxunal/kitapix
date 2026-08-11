import type { Metadata } from "next";
import { BookGrid } from "@/components/books/BookGrid";
import { DiscoveryBreadcrumb } from "@/components/discovery/DiscoveryBreadcrumb";
import { DiscoveryEmptyState } from "@/components/discovery/DiscoveryEmptyState";
import { Container } from "@/components/layout/Container";
import { getBestsellers } from "@/lib/data/bestsellers";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Çok Satan Kitaplar | Kitapix",
  description:
    "Ödeme alınmış siparişlere göre Kitapix’te en çok satılan kitaplar.",
  path: "/cok-satanlar",
});

export default async function BestsellersPage() {
  const { books } = await getBestsellers(24);

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <DiscoveryBreadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Çok Satanlar" },
          ]}
        />

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Çok Satanlar</h1>
          <p className="mt-3 text-body-large text-muted">
            Sıralama, ödeme alınmış ve iptal edilmemiş siparişlerdeki satış
            adetlerine göredir.
          </p>
        </header>

        <div className="mt-10">
          {books.length === 0 ? (
            <DiscoveryEmptyState
              title="Henüz yeterli satış verisi yok"
              description="Çok satan listesi yalnızca gerçek, ödeme alınmış siparişlerden oluşturulur. Sahte sıralama gösterilmez."
            />
          ) : (
            <BookGrid books={books} />
          )}
        </div>
      </Container>
    </div>
  );
}
