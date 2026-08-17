import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "İletişim | Kitapix",
  description: "Kitapix işletme ve iletişim bilgileri.",
  path: "/iletisim",
});

export default function ContactPage() {
  return (
    <LegalPage
      title="İletişim"
      description="Sipariş, ürün, teslimat ve diğer konularda bize ulaşabilirsiniz."
      sections={[
        {
          title: "İletişim Kanalları",
          content: (
            <ul>
              <li>
                E-posta:{" "}
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li>
                Telefon:{" "}
                <a href={`tel:${COMPANY.phoneHref}`}>
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>Adres: {COMPANY.address}</li>
            </ul>
          ),
        },
        {
          title: "Kurumsal Bilgiler",
          content: (
            <ul>
              <li>Resmî unvan: {COMPANY.legalName}</li>
              <li>İşletme türü: {COMPANY.businessType}</li>
              <li>Vergi dairesi: {COMPANY.taxOffice}</li>
              <li>Vergi numarası: {COMPANY.taxNumber}</li>
            </ul>
          ),
        },
        {
          title: "Destek Saatleri",
          content: (
            <p>
              Talepler hafta içi 09.00–18.00 saatleri arasında değerlendirilir.
              E-posta taleplerine en geç iki iş günü içinde dönüş yapılması
              hedeflenir.
            </p>
          ),
        },
      ]}
    />
  );
}
