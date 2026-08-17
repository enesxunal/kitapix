import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COMPANY } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Teslimat ve Kargo | Kitapix",
  description: "Kitapix teslimat süreleri ve kargo süreçleri.",
  path: "/teslimat-kargo",
});

export default function DeliveryPage() {
  return (
    <LegalPage
      title="Teslimat ve Kargo"
      description="Siparişlerin hazırlanması, kargoya verilmesi ve teslimat süreci hakkında bilgiler."
      sections={[
        {
          title: "Siparişin Hazırlanması",
          content: (
            <p>
              Stokta bulunan ürünler ödeme onayından sonra hazırlanır.
              Siparişiniz kargoya verildiğinde takip bilgileri hesabınız ve
              iletişim kanalları üzerinden paylaşılır.
            </p>
          ),
        },
        {
          title: "Kargo ve Teslimat Süresi",
          content: (
            <>
              <p>
                Siparişler anlaşmalı kargo firması aracılığıyla gönderilir.
                Tahmini teslimat süresi, resmî tatiller ve mücbir sebepler hariç,
                sipariş onayından itibaren {COMPANY.deliveryEstimate}.
              </p>
              <p>
                Uzak bölgeler, yoğun kampanya dönemleri veya tedarik kaynaklı
                durumlarda süre uzayabilir. Her durumda yasal azami teslim
                süresine uyulur.
              </p>
            </>
          ),
        },
        {
          title: "Teslimat Kontrolü",
          content: (
            <p>
              Paketi teslim alırken dış ambalajı kontrol edin. Hasarlı,
              açılmış veya eksik paketlerde kargo görevlisine tutanak
              tutturarak paketi teslim almamanız ve aynı gün bizimle iletişime
              geçmeniz önerilir.
            </p>
          ),
        },
        {
          title: "Kargo Ücreti",
          content: (
            <p>
              Kargo ücreti veya ücretsiz kargo koşulu, sipariş tamamlanmadan
              önce sepet ve ödeme ekranında açıkça gösterilir.
            </p>
          ),
        },
      ]}
    />
  );
}
