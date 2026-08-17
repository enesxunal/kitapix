import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mesafeli Satış Sözleşmesi | Kitapix",
  description: "Kitapix mesafeli satış sözleşmesi.",
  path: "/mesafeli-satis-sozlesmesi",
});

export default function DistanceSalesPage() {
  return (
    <LegalPage
      title="Mesafeli Satış Sözleşmesi"
      description="Kitapix üzerinden kurulan mesafeli satışlara uygulanan temel sözleşme hükümleri."
      sections={[
        {
          title: "1. Taraflar",
          content: (
            <>
              <p>
                <strong>Satıcı:</strong> {COMPANY.legalName},{" "}
                {COMPANY.businessType}; {COMPANY.address};{" "}
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;{" "}
                <a href={`tel:${COMPANY.phoneHref}`}>
                  {COMPANY.phoneDisplay}
                </a>
                ; {COMPANY.taxOffice}, VKN {COMPANY.taxNumber}.
              </p>
              <p>
                <strong>Alıcı:</strong> Sipariş sırasında adı, iletişim ve
                teslimat bilgileri alınan tüketici.
              </p>
            </>
          ),
        },
        {
          title: "2. Konu ve Kapsam",
          content: (
            <p>
              Bu sözleşme; alıcının Kitapix üzerinden elektronik ortamda
              sipariş verdiği ürünlerin satışı ve teslimi ile tarafların 6502
              sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
              Sözleşmeler Yönetmeliği kapsamındaki hak ve yükümlülüklerini
              düzenler.
            </p>
          ),
        },
        {
          title: "3. Ürün, Fiyat ve Ödeme",
          content: (
            <p>
              Ürünün temel nitelikleri, adet, birim fiyat, indirimler, kargo
              bedeli ve vergiler dâhil toplam tutar sipariş özeti ve ödeme
              ekranında gösterilir. Alıcı siparişi onaylayarak ödeme
              yükümlülüğü doğduğunu kabul eder.
            </p>
          ),
        },
        {
          title: "4. Teslimat",
          content: (
            <p>
              Ürün, siparişte belirtilen adrese anlaşmalı kargo firmasıyla
              gönderilir. Tahmini teslimat {COMPANY.deliveryEstimate} olup
              yasal azami teslim süresi saklıdır. Kargo sürecine ilişkin
              ayrıntılar Teslimat ve Kargo sayfasında açıklanır.
            </p>
          ),
        },
        {
          title: "5. Cayma Hakkı",
          content: (
            <p>
              Alıcı, ürünü teslim aldığı tarihten itibaren{" "}
              {COMPANY.returnPeriod} içinde gerekçe göstermeksizin cayma hakkını
              kullanabilir. Bildirim e-posta, telefon veya mevzuata uygun başka
              bir kalıcı veri saklayıcısı üzerinden satıcıya yöneltilir.
              Cayma hakkının kullanımı ve istisnaları İptal, İade ve Cayma
              Hakkı sayfasında açıklanır.
            </p>
          ),
        },
        {
          title: "6. İade ve Geri Ödeme",
          content: (
            <p>
              Geçerli cayma bildiriminin ardından ürün, satıcının bildirdiği
              yöntemle iade edilir. Mevzuatta öngörülen şartların sağlanması
              hâlinde tahsil edilen bedel yasal süre içinde, alıcının kullandığı
              ödeme aracına uygun biçimde iade edilir.
            </p>
          ),
        },
        {
          title: "7. Uyuşmazlıklar",
          content: (
            <p>
              Tüketici; parasal sınırlar dâhilinde yerleşim yerindeki veya
              işlemin yapıldığı yerdeki Tüketici Hakem Heyetine, gerekli
              hâllerde Tüketici Mahkemesine başvurabilir.
            </p>
          ),
        },
        {
          title: "8. Yürürlük",
          content: (
            <p>
              Alıcı, siparişi tamamlamadan önce ön bilgilendirmeyi ve bu
              sözleşmeyi okuyup elektronik ortamda onaylar. Siparişe özel ürün,
              fiyat, teslimat ve alıcı bilgileri sözleşmenin ayrılmaz parçasıdır.
            </p>
          ),
        },
      ]}
    />
  );
}
