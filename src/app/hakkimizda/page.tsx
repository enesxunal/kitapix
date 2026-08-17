import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hakkımızda | Kitapix",
  description: "Kitapix ve faaliyetleri hakkında kurumsal bilgiler.",
  path: "/hakkimizda",
});

export default function AboutPage() {
  return (
    <LegalPage
      title="Hakkımızda"
      description="Kitapları daha kolay keşfetmenizi ve güvenle satın almanızı sağlayan modern bir kitap platformuyuz."
      sections={[
        {
          title: "Kitapix",
          content: (
            <>
              <p>
                Kitapix; edebiyattan bilime, çocuk kitaplarından kişisel
                gelişime uzanan seçkisiyle okurları doğru kitaplarla
                buluşturmayı amaçlayan bir e-ticaret platformudur.
              </p>
              <p>
                Ürün bilgilerini, fiyatları ve stok durumunu açık biçimde
                sunar; sipariş, teslimat ve satış sonrası destek süreçlerinde
                şeffaf iletişimi esas alırız.
              </p>
            </>
          ),
        },
        {
          title: "İşletme Bilgileri",
          content: (
            <ul>
              <li>Resmî unvan: {COMPANY.legalName}</li>
              <li>İşletme türü: {COMPANY.businessType}</li>
              <li>Marka: {COMPANY.brandName}</li>
              <li>Vergi dairesi: {COMPANY.taxOffice}</li>
              <li>Vergi numarası: {COMPANY.taxNumber}</li>
              <li>Adres: {COMPANY.address}</li>
            </ul>
          ),
        },
        {
          title: "İletişim",
          content: (
            <p>
              Sorularınız için{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> adresine
              yazabilir veya{" "}
              <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phoneDisplay}</a>{" "}
              numarasını arayabilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
