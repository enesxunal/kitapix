-- Development seed based on current mock catalog (src/lib/mock-books.ts).
-- Loaded on `supabase db reset` when [db.seed] is enabled.
-- Idempotent: fixed UUIDs + ON CONFLICT DO NOTHING for safe re-runs.

-- Publishers
insert into public.publishers (id, name, slug) values
  ('11111111-1111-4111-8111-111111111101', 'Kitapix Yayınları', 'kitapix-yayinlari'),
  ('11111111-1111-4111-8111-111111111102', 'Kuzey Kitap', 'kuzey-kitap'),
  ('11111111-1111-4111-8111-111111111103', 'Mavi Sayfa', 'mavi-sayfa'),
  ('11111111-1111-4111-8111-111111111104', 'Yeni Nesil Yayınları', 'yeni-nesil-yayinlari')
on conflict (id) do nothing;

-- Authors
insert into public.authors (id, name, slug) values
  ('22222222-2222-4222-8222-222222222201', 'Elif Aras', 'elif-aras'),
  ('22222222-2222-4222-8222-222222222202', 'Deniz Kaya', 'deniz-kaya'),
  ('22222222-2222-4222-8222-222222222203', 'Selin Aydın', 'selin-aydin'),
  ('22222222-2222-4222-8222-222222222204', 'Mert Ekin', 'mert-ekin'),
  ('22222222-2222-4222-8222-222222222205', 'Kerem Öztürk', 'kerem-ozturk')
on conflict (id) do nothing;

-- Categories
insert into public.categories (id, name, slug, sort_order) values
  ('33333333-3333-4333-8333-333333333301', 'Kişisel Gelişim', 'kisisel-gelisim', 10),
  ('33333333-3333-4333-8333-333333333302', 'Kurgu', 'kurgu', 20),
  ('33333333-3333-4333-8333-333333333303', 'Felsefe', 'felsefe', 30),
  ('33333333-3333-4333-8333-333333333304', 'Çocuk', 'cocuk', 40)
on conflict (id) do nothing;

-- Books (8 mock titles)
insert into public.books (
  id,
  title,
  slug,
  publisher_id,
  cover_url,
  price,
  original_price,
  rating,
  review_count,
  badge,
  is_featured
) values
  (
    '44444444-4444-4444-8444-444444444401',
    'Sessiz Zihin',
    'sessiz-zihin',
    '11111111-1111-4111-8111-111111111101',
    '/images/books/sessiz-zihin.svg',
    289.00,
    349.00,
    4.70,
    214,
    'Sana Uygun',
    true
  ),
  (
    '44444444-4444-4444-8444-444444444402',
    'Zamanın Kıyısında',
    'zamanin-kiyisinda',
    '11111111-1111-4111-8111-111111111102',
    '/images/books/zamanin-kiyisinda.svg',
    319.00,
    null,
    4.50,
    168,
    'Editör Seçimi',
    true
  ),
  (
    '44444444-4444-4444-8444-444444444403',
    'Odaklanma Sanatı',
    'odaklanma-sanati',
    '11111111-1111-4111-8111-111111111103',
    '/images/books/odaklanma-sanati.svg',
    259.00,
    299.00,
    4.60,
    321,
    'Çok Satan',
    false
  ),
  (
    '44444444-4444-4444-8444-444444444404',
    'Yeniden Başlamak',
    'yeniden-baslamak',
    '11111111-1111-4111-8111-111111111104',
    '/images/books/yeniden-baslamak.svg',
    275.00,
    null,
    4.30,
    97,
    'Yeni',
    false
  ),
  (
    '44444444-4444-4444-8444-444444444405',
    'Gece Yolculuğu',
    'gece-yolculugu',
    '11111111-1111-4111-8111-111111111102',
    '/images/books/gece-yolculugu.svg',
    299.00,
    365.00,
    4.40,
    142,
    null,
    false
  ),
  (
    '44444444-4444-4444-8444-444444444406',
    'Günlük Hayat İçin Felsefe',
    'gunluk-hayat-icin-felsefe',
    '11111111-1111-4111-8111-111111111101',
    '/images/books/gunluk-hayat-icin-felsefe.svg',
    339.00,
    null,
    4.80,
    256,
    'Editör Seçimi',
    true
  ),
  (
    '44444444-4444-4444-8444-444444444407',
    'Meraklı Çocuklar İçin Bilim',
    'merakli-cocuklar-icin-bilim',
    '11111111-1111-4111-8111-111111111103',
    '/images/books/merakli-cocuklar-icin-bilim.svg',
    249.00,
    289.00,
    4.60,
    188,
    'Çok Satan',
    false
  ),
  (
    '44444444-4444-4444-8444-444444444408',
    'Küçük Adımlar',
    'kucuk-adimlar',
    '11111111-1111-4111-8111-111111111104',
    '/images/books/kucuk-adimlar.svg',
    229.00,
    null,
    4.20,
    76,
    'Yeni',
    false
  )
on conflict (id) do nothing;

-- book_authors
insert into public.book_authors (book_id, author_id, author_order) values
  ('44444444-4444-4444-8444-444444444401', '22222222-2222-4222-8222-222222222201', 0),
  ('44444444-4444-4444-8444-444444444402', '22222222-2222-4222-8222-222222222202', 0),
  ('44444444-4444-4444-8444-444444444403', '22222222-2222-4222-8222-222222222203', 0),
  ('44444444-4444-4444-8444-444444444404', '22222222-2222-4222-8222-222222222204', 0),
  ('44444444-4444-4444-8444-444444444405', '22222222-2222-4222-8222-222222222205', 0),
  ('44444444-4444-4444-8444-444444444406', '22222222-2222-4222-8222-222222222201', 0),
  ('44444444-4444-4444-8444-444444444407', '22222222-2222-4222-8222-222222222202', 0),
  ('44444444-4444-4444-8444-444444444408', '22222222-2222-4222-8222-222222222203', 0)
on conflict (book_id, author_id) do nothing;

-- book_categories (simple mapping for seed)
insert into public.book_categories (book_id, category_id) values
  ('44444444-4444-4444-8444-444444444401', '33333333-3333-4333-8333-333333333301'),
  ('44444444-4444-4444-8444-444444444402', '33333333-3333-4333-8333-333333333302'),
  ('44444444-4444-4444-8444-444444444403', '33333333-3333-4333-8333-333333333301'),
  ('44444444-4444-4444-8444-444444444404', '33333333-3333-4333-8333-333333333301'),
  ('44444444-4444-4444-8444-444444444405', '33333333-3333-4333-8333-333333333302'),
  ('44444444-4444-4444-8444-444444444406', '33333333-3333-4333-8333-333333333303'),
  ('44444444-4444-4444-8444-444444444407', '33333333-3333-4333-8333-333333333304'),
  ('44444444-4444-4444-8444-444444444408', '33333333-3333-4333-8333-333333333301')
on conflict (book_id, category_id) do nothing;
