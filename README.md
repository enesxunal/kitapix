# Kitapix

Kitapix, modern bir kitap keşif ve e-ticaret platformudur.

## Çalıştırma

```bash
pnpm install
pnpm dev
```

Tarayıcıda: [http://localhost:3000](http://localhost:3000)

## Teknolojiler

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ESLint

## Mevcut aşama

Customer-facing web storefront için frontend temeli kuruldu. Backend, authentication, AI ve ödeme entegrasyonları henüz eklenmedi.

## Supabase

Local ortam için `.env.example` dosyasını `.env.local` olarak kopyalayın ve değerleri doldurun:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Service role key veya database password frontend env’e eklenmez.
