import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kullanım Koşulları | Kitapix",
  description: "Kitapix web sitesi kullanım koşulları.",
  path: "/kullanim-kosullari",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Kullanım Koşulları"
      description="Kitapix web sitesini ve hizmetlerini kullanırken geçerli olan kurallar."
      sections={[
        {
          title: "Hizmetin Kullanımı",
          content: (
            <p>
              Kullanıcılar siteyi hukuka uygun biçimde kullanmayı, üyelik ve
              sipariş bilgilerinin doğru ve güncel olmasını sağlamayı kabul
              eder. Hesap bilgilerinin gizliliği kullanıcının sorumluluğundadır.
            </p>
          ),
        },
        {
          title: "Ürün ve Fiyat Bilgileri",
          content: (
            <p>
              Ürün açıklamaları, görselleri, fiyatları ve stok bilgileri
              mümkün olan en güncel hâliyle sunulur. Açık maddi hata veya teknik
              arıza hâlinde kullanıcı bilgilendirilir ve gerekli düzeltme ya da
              ücret iadesi yapılır.
            </p>
          ),
        },
        {
          title: "Fikri Mülkiyet",
          content: (
            <p>
              Kitapix adı, tasarım, metin ve özgün içerikler üzerindeki haklar
              ilgili hak sahiplerine aittir. İçerikler yazılı izin olmadan
              ticari amaçla çoğaltılamaz veya yayımlanamaz.
            </p>
          ),
        },
        {
          title: "Sorumluluk",
          content: (
            <p>
              Bakım, güvenlik veya mücbir sebepler nedeniyle hizmette geçici
              kesintiler olabilir. Emredici tüketici mevzuatından doğan haklar
              bu koşullarla sınırlandırılmaz.
            </p>
          ),
        },
        {
          title: "İletişim",
          content: (
            <p>
              Koşullarla ilgili sorularınızı{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> adresine
              iletebilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
