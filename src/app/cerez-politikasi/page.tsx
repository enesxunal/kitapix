import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Çerez Politikası | Kitapix",
  description: "Kitapix çerez kullanımı hakkında bilgilendirme.",
  path: "/cerez-politikasi",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Çerez Politikası"
      description="Sitede kullanılan çerezler ve benzeri teknolojiler hakkında bilgilendirme."
      sections={[
        {
          title: "Çerez Nedir?",
          content: (
            <p>
              Çerezler, web sitesinin cihazınıza kaydettiği küçük metin
              dosyalarıdır. Oturumun sürdürülmesi ve tercihlerin hatırlanması
              gibi işlevleri sağlar.
            </p>
          ),
        },
        {
          title: "Kullanım Amaçları",
          content: (
            <ul>
              <li>Üyelik ve güvenli oturum süreçlerini yürütmek,</li>
              <li>Sepet ve temel site tercihlerini hatırlamak,</li>
              <li>Sistem güvenliği ve hizmet sürekliliğini sağlamak.</li>
            </ul>
          ),
        },
        {
          title: "Çerez Yönetimi",
          content: (
            <p>
              Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsiniz.
              Zorunlu çerezlerin engellenmesi üyelik, sepet ve ödeme gibi temel
              işlevlerin çalışmasını etkileyebilir.
            </p>
          ),
        },
        {
          title: "İletişim",
          content: (
            <p>
              Çerez ve kişisel veri talepleriniz için{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> adresine
              ulaşabilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
