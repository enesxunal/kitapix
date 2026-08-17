import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "İptal, İade ve Cayma Hakkı | Kitapix",
  description: "Kitapix sipariş iptali, ürün iadesi ve cayma hakkı koşulları.",
  path: "/iptal-iade",
});

export default function ReturnsPage() {
  return (
    <LegalPage
      title="İptal, İade ve Cayma Hakkı"
      description="Sipariş iptali ve yasal cayma hakkınızı kullanma koşulları."
      sections={[
        {
          title: "Sipariş İptali",
          content: (
            <p>
              Kargoya verilmemiş siparişler için{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> veya{" "}
              <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phoneDisplay}</a>{" "}
              üzerinden iptal talebi iletebilirsiniz. Kargoya verilen
              siparişlerde cayma ve iade süreci uygulanır.
            </p>
          ),
        },
        {
          title: "Cayma Hakkı",
          content: (
            <p>
              Tüketici, ürünü teslim aldığı tarihten itibaren{" "}
              {COMPANY.returnPeriod} içinde herhangi bir gerekçe göstermeden
              cayma hakkını kullanabilir. Talebin bu süre içinde yazılı veya
              kalıcı veri saklayıcısı yoluyla iletilmesi yeterlidir.
            </p>
          ),
        },
        {
          title: "İade Koşulları",
          content: (
            <ul>
              <li>
                Ürün, yeniden satışa uygun ve varsa tüm tamamlayıcılarıyla
                birlikte gönderilmelidir.
              </li>
              <li>
                Kullanıcı hatasıyla zarar görmüş, eksilmiş veya tekrar satışı
                mümkün olmayacak hâle gelmiş ürünlerde değer kaybı tüketiciye
                yansıtılabilir.
              </li>
              <li>
                Mevzuat gereği cayma hakkı istisnası bulunan ürünlerde ilgili
                yasal hükümler uygulanır.
              </li>
            </ul>
          ),
        },
        {
          title: "İade Gönderimi ve Ücret",
          content: (
            <>
              <p>
                İade adresi: {COMPANY.address}. Gönderimden önce destek
                ekibinden iade yönlendirmesi alınmalıdır.
              </p>
              <p>
                Cayma bildiriminin ulaşmasından sonra, yasal koşulların
                sağlanması hâlinde tahsil edilen bedel mevzuattaki süre içinde
                ve kullanılan ödeme aracına uygun şekilde iade edilir.
              </p>
            </>
          ),
        },
        {
          title: "Ayıplı veya Hasarlı Ürün",
          content: (
            <p>
              Yanlış, eksik, kusurlu veya taşıma sırasında hasar görmüş ürünler
              için fotoğraf ve sipariş numarasıyla destek ekibimize ulaşın.
              Tüketicinin kanuni seçimlik hakları saklıdır.
            </p>
          ),
        },
      ]}
    />
  );
}
