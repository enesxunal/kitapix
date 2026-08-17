import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "KVKK Aydınlatma Metni | Kitapix",
  description: "6698 sayılı Kanun kapsamında Kitapix KVKK aydınlatma metni.",
  path: "/kvkk-aydinlatma-metni",
});

export default function KvkkPage() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      description="Kişisel verilerinizin işlenmesine ilişkin 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki bilgilendirme."
      sections={[
        {
          title: "Veri Sorumlusu",
          content: (
            <p>
              Veri sorumlusu: {COMPANY.legalName} ({COMPANY.businessType}),
              adres: {COMPANY.address}, e-posta:{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          ),
        },
        {
          title: "İşlenen Kişisel Veriler",
          content: (
            <p>
              Kimlik ve iletişim bilgileri, üyelik ve müşteri işlem bilgileri,
              teslimat ve fatura bilgileri, ödeme işlem referansları, talep ve
              şikâyet kayıtları ile işlem güvenliği verileri işlenebilir.
            </p>
          ),
        },
        {
          title: "İşleme Amaçları ve Hukuki Sebepler",
          content: (
            <ul>
              <li>
                Sözleşmenin kurulması ve ifası: üyelik, sipariş, ödeme ve
                teslimat işlemleri,
              </li>
              <li>
                Hukuki yükümlülük: muhasebe, fatura, tüketici mevzuatı ve
                yetkili kurum talepleri,
              </li>
              <li>
                Meşru menfaat: sistem ve işlem güvenliği, hizmet kalitesinin
                geliştirilmesi,
              </li>
              <li>
                Açık rıza alınması gereken hâllerde ilgili kişinin açık rızası.
              </li>
            </ul>
          ),
        },
        {
          title: "Aktarım",
          content: (
            <p>
              Veriler; faaliyet için gerekli olması kaydıyla ödeme kuruluşları,
              kargo firmaları, teknik hizmet sağlayıcılar, mali müşavir ve
              kanunen yetkili kamu kurumlarıyla, amaçla sınırlı olarak
              paylaşılabilir.
            </p>
          ),
        },
        {
          title: "Toplama Yöntemi",
          content: (
            <p>
              Kişisel veriler; web sitesi formları, üyelik ve sipariş
              işlemleri, çerezler, e-posta, telefon ve destek kanalları
              üzerinden elektronik veya fiziki yöntemlerle elde edilir.
            </p>
          ),
        },
        {
          title: "İlgili Kişinin Hakları",
          content: (
            <p>
              KVKK’nın 11. maddesi uyarınca verilerinizin işlenip işlenmediğini
              öğrenme, bilgi talep etme, amacına uygun kullanılıp
              kullanılmadığını öğrenme, aktarılan üçüncü kişileri bilme,
              düzeltme, silme veya yok etme isteme ve zararın giderilmesini
              talep etme haklarına sahipsiniz.
            </p>
          ),
        },
        {
          title: "Başvuru",
          content: (
            <p>
              Taleplerinizi kimliğinizi doğrulayan bilgiler ve talep
              açıklamasıyla{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> adresine
              veya {COMPANY.address} adresine iletebilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
