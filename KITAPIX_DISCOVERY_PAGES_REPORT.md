# Kitapix Discovery Pages Report

Tarih: 2026-08-11  
Kapsam: kategori / çok satanlar / yeni çıkanlar + homepage entegrasyonu  
Deploy: **yapılmadı** (istek üzerine)

---

## 1. Kategori veri modeli (source of truth)

| Kaynak | Detay |
|--------|--------|
| Tablo | `public.categories` |
| Alanlar | `id`, `name`, `slug` (unique), `description`, `parent_id`, `sort_order`, `is_active` |
| İlişki | `public.book_categories` (M2M: `book_id` ↔ `category_id`) |
| RLS | Aktif kategoriler `anon`/`authenticated` ile SELECT |

Seed’deki aktif kategoriler (örnek):

- `kisisel-gelisim` — Kişisel Gelişim  
- `dunya-edebiyati` — Dünya Edebiyatı  
- `turk-edebiyati` — Türk Edebiyatı  
- `felsefe`, `bilim`, `tarih`, `cocuk`, `polisiye-ve-fantastik`

Ana sayfadaki eski sabit liste (`Roman`, `Psikoloji`, …) **kaldırıldı**; gerçek DB kategorileri kullanılıyor.

---

## 2. Yeni route’lar

| Route | Amaç |
|-------|------|
| `/kategoriler` | Aktif kategori listesi + kitap sayısı |
| `/kategori/[slug]` | Kategori detay + kitap grid + pagination + 404 |
| `/cok-satanlar` | Gerçek satış aggregate |
| `/yeni-cikanlar` | `publication_date` sıralı liste + pagination |

Header / Footer / Mobil menü bu route’lara bağlandı.

---

## 3. Bestseller hesaplama

### Neden RPC?
`orders` / `order_items` RLS ile yalnızca kendi siparişini görür. Public bestseller için satır bazlı order verisi açılamaz.

### Migration
`supabase/migrations/20260811030000_create_bestselling_books_rpc.sql`

Fonksiyon: `public.get_bestselling_books(p_limit integer)`

```text
SUM(order_items.quantity)
GROUP BY book_id
WHERE
  books.is_active = true
  AND orders.status <> 'cancelled'
  AND orders.payment_status = 'paid'
```

- İptal (`cancelled`) hariç  
- Refunded/failed ödeme dahil değil (`paid` şartı)  
- Dönüş: yalnızca `book_id`, `units_sold` (PII yok)  
- `SECURITY DEFINER` + `search_path = public` + `EXECUTE` grant `anon`/`authenticated`

### Periyot kararı: **tüm zamanlar (`all_time`)**

Gerekçe:

1. Checkout şu an siparişi `pending` / `unpaid` olarak açıyor; ödeme provider yok.  
2. 30 günlük pencere pratikte neredeyse her zaman boş kalırdı.  
3. UI’da “son 30 gün” gibi yanıltıcı dönem iddiası yok; metin “ödeme alınmış siparişler” diyor.

### Boş state
Paid satış yoksa: **“Henüz yeterli satış verisi yok”** — sahte / rating tabanlı bestseller **yok**.

### Uygulama notu
RPC henüz remote DB’ye uygulanmadıysa client soft-fail ile boş liste döner (`PGRST202` / missing function).

---

## 4. Yeni çıkanlar — source of truth

| Alan | Durum |
|------|--------|
| `books.publication_date` | **Var ve seed’de dolu** |
| `created_at` | Katalog ekleme zamanı (yedek değil, bu sayfada kullanılmıyor) |

Sonuç: route adı ve UI **“Yeni Çıkanlar”**.

Sıralama: `publication_date DESC`, sonra `created_at DESC`.  
`publication_date IS NULL` kayıtlar listede yok.

---

## 5. Homepage entegrasyonu

- **Çok Satanlar** → `getBestsellers` + link `/cok-satanlar` (boşsa honest empty)  
- **Yeni Çıkanlar** → `publication_date` + link `/yeni-cikanlar`  
- **Kategoriler** → `getCategories()` + `/kategori/{slug}` + “Tümünü Gör” → `/kategoriler`  
- BookCard reuse; dead Sepete Ekle/Favori **geri getirilmedi** (İncele CTA)

---

## 6. SEO

`src/lib/seo.ts` ile her discovery sayfasında:

- `title` / `description`  
- `alternates.canonical`  
- Open Graph temel alanlar  

Örnek title’lar:

- `{Kategori} Kitapları | Kitapix`  
- `Çok Satan Kitaplar | Kitapix`  
- `Yeni Çıkan Kitaplar | Kitapix`  
- `Kategoriler | Kitapix`

Breadcrumb: `DiscoveryBreadcrumb` + `aria-label="Breadcrumb"`.

---

## 7. Test sonuçları

| Kontrol | Sonuç |
|---------|--------|
| `pnpm lint` | ✅ |
| `pnpm build` | ✅ |
| Route’lar build çıktısında | `/kategoriler`, `/kategori/[slug]`, `/cok-satanlar`, `/yeni-cikanlar` |
| Runtime E2E (local `.env.local`) | ❌ bu ortamda env yok; runtime smoke edilemedi |
| Migration apply (remote) | ⏳ dosya hazır, apply edilmedi |
| Cancelled order hariç | SQL filtrede ✅ (RPC uygulandıktan sonra) |
| Quantity SUM | SQL’de ✅ |
| Sahte bestseller | Yok ✅ |

---

## 8. Kalan eksikler

1. **RPC migration’ı production/local DB’ye apply etmek** gerekir; aksi halde çok satanlar boş kalır (güvenli).  
2. Ödeme provider yok → çoğu sipariş `unpaid`; bestseller listesi uzun süre boş olabilir (bilinçli).  
3. Kategori `description` seed’de çoğunlukla boş.  
4. Kategori ikon/kapak şemada yok.  
5. Bestseller sayfasında pagination henüz yok (limit 24).  
6. Kitaplar sayfasındaki filtre checkbox’ları hâlâ “Yakında”.

---

## 9. Son karar

### **B) Küçük düzeltme gerekli**

Kod ve route’lar hazır; lint/build yeşil.  
Production’a çıkmadan önce:

1. `20260811030000_create_bestselling_books_rpc.sql` migration’ını uygula  
2. Env’li ortamda kategori / 404 / yeni çıkanlar / boş bestseller smoke test  
3. Sonra deploy

Deploy bu turda **yapılmadı**.
