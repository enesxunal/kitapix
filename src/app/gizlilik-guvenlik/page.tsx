import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gizlilik ve Güvenlik Politikası | Kitapix",
  description: "Kitapix gizlilik, veri ve ödeme güvenliği politikası.",
  path: "/gizlilik-guvenlik",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Gizlilik ve Güvenlik Politikası"
      description="Kullanıcı bilgilerinin korunması ve güvenli alışveriş için benimsediğimiz esaslar."
      sections={[
        {
          title: "Toplanan Bilgiler",
          content: (
            <p>
              Üyelik ve sipariş süreçlerinde ad, soyad, iletişim, teslimat ve
              fatura bilgileri; hizmet güvenliği için teknik kayıtlar ve işlem
              bilgileri işlenebilir.
            </p>
          ),
        },
        {
          title: "Kullanım Amaçları",
          content: (
            <ul>
              <li>Üyelik, sepet, sipariş ve teslimat işlemlerini yürütmek,</li>
              <li>Müşteri desteği sağlamak ve talepleri sonuçlandırmak,</li>
              <li>Yasal ve mali yükümlülükleri yerine getirmek,</li>
              <li>Dolandırıcılığı önlemek ve sistem güvenliğini sağlamak.</li>
            </ul>
          ),
        },
        {
          title: "Ödeme Güvenliği",
          content: (
            <p>
              Site genelinde HTTPS/SSL kullanılır. Kart ödemeleri, yetkili ödeme
              kuruluşunun güvenli altyapısı üzerinden gerçekleştirilir. Kart
              numarası, son kullanma tarihi ve güvenlik kodu Kitapix
              sunucularında saklanmaz.
            </p>
          ),
        },
        {
          title: "Bilgi Paylaşımı",
          content: (
            <p>
              Bilgiler; siparişin yürütülmesi için kargo ve ödeme hizmeti
              sağlayıcılarıyla, hukuki yükümlülük hâlinde yetkili kurumlarla ve
              yalnızca gerekli kapsamda paylaşılabilir. Kişisel veriler satılmaz.
            </p>
          ),
        },
        {
          title: "Başvuru ve İletişim",
          content: (
            <p>
              Gizlilik talepleriniz için veri sorumlusu {COMPANY.legalName}’a{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> üzerinden
              ulaşabilirsiniz. Ayrıntılar KVKK Aydınlatma Metni’nde yer alır.
            </p>
          ),
        },
      ]}
    />
  );
}
