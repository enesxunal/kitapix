-- Real catalog seed for Kitapix
-- Generated from scripts/catalog-data.json — idempotent ON CONFLICT
-- rating/review_count are DEMO merchandising seed metadata, not live retailer reviews.
-- Covers self-hosted under /images/books/catalog/

update public.books
set is_active = false, is_featured = false, updated_at = now()
where slug in (
  'sessiz-zihin','zamanin-kiyisinda','odaklanma-sanati','yeniden-baslamak',
  'gece-yolculugu','gunluk-hayat-icin-felsefe','merakli-cocuklar-icin-bilim','kucuk-adimlar'
);

insert into public.categories (id, name, slug, sort_order, is_active) values
  ('33333333-3333-4333-8333-333333333301', 'Kişisel Gelişim', 'kisisel-gelisim', 10, true),
  ('33333333-3333-4333-8333-333333333305', 'Dünya Edebiyatı', 'dunya-edebiyati', 20, true),
  ('33333333-3333-4333-8333-333333333306', 'Türk Edebiyatı', 'turk-edebiyati', 30, true),
  ('33333333-3333-4333-8333-333333333303', 'Felsefe', 'felsefe', 40, true),
  ('33333333-3333-4333-8333-333333333307', 'Bilim', 'bilim', 50, true),
  ('33333333-3333-4333-8333-333333333308', 'Tarih', 'tarih', 60, true),
  ('33333333-3333-4333-8333-333333333304', 'Çocuk', 'cocuk', 70, true),
  ('33333333-3333-4333-8333-333333333309', 'Polisiye ve Fantastik', 'polisiye-ve-fantastik', 80, true)
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order, is_active = true, updated_at = now();

update public.categories set is_active = false, updated_at = now() where slug = 'kurgu';

insert into public.publishers (id, name, slug, is_active) values
  ('55555555-5555-4555-8555-555555555501', 'Can Yayınları', 'can-yayinlari', true),
  ('55555555-5555-4555-8555-555555555502', 'Türkiye İş Bankası Kültür Yayınları', 'is-bankasi-kultur-yayinlari', true),
  ('55555555-5555-4555-8555-555555555503', 'Yapı Kredi Yayınları', 'yapi-kredi-yayinlari', true),
  ('55555555-5555-4555-8555-555555555504', 'Dergâh Yayınları', 'dergah-yayinlari', true),
  ('55555555-5555-4555-8555-555555555505', 'İletişim Yayınları', 'iletisim-yayinlari', true),
  ('55555555-5555-4555-8555-555555555506', 'Doğan Kitap', 'dogan-kitap', true),
  ('55555555-5555-4555-8555-555555555507', 'Pegasus Yayınları', 'pegasus-yayinlari', true),
  ('55555555-5555-4555-8555-555555555508', 'Okuyan Us Yayın', 'okuyan-us', true),
  ('55555555-5555-4555-8555-555555555509', 'Varlık Yayınları', 'varlik-yayinlari', true),
  ('55555555-5555-4555-8555-555555555510', 'Butik Yayıncılık', 'butik-yayincilik', true),
  ('55555555-5555-4555-8555-555555555511', 'Kolektif Kitap', 'kolektif-kitap', true),
  ('55555555-5555-4555-8555-555555555512', 'Alfa Yayınları', 'alfa-yayinlari', true),
  ('55555555-5555-4555-8555-555555555513', 'Say Yayınları', 'say-yayinlari', true),
  ('55555555-5555-4555-8555-555555555514', 'Kabalcı Yayıncılık', 'kabalci-yayincilik', true),
  ('55555555-5555-4555-8555-555555555515', 'Kronik Kitap', 'kronik-kitap', true),
  ('55555555-5555-4555-8555-555555555516', 'Altın Kitaplar', 'altin-kitaplar', true),
  ('55555555-5555-4555-8555-555555555517', 'İthaki Yayınları', 'ithaki-yayinlari', true),
  ('55555555-5555-4555-8555-555555555518', 'Domingo Yayınevi', 'domingo-yayinevi', true),
  ('55555555-5555-4555-8555-555555555519', 'Kopernik Kitap', 'kopernik-kitap', true),
  ('55555555-5555-4555-8555-555555555520', 'Buzdağı Yayınevi', 'buzdagi-yayinevi', true),
  ('55555555-5555-4555-8555-555555555521', 'Timaş Yayınları', 'timas-yayinlari', true),
  ('55555555-5555-4555-8555-555555555522', 'Metis Yayınları', 'metis-yayinlari', true)
on conflict (slug) do update set name = excluded.name, is_active = true, updated_at = now();

insert into public.authors (id, name, slug, is_active) values
  ('66666666-6666-4666-8666-666666666601', 'George Orwell', 'george-orwell', true),
  ('66666666-6666-4666-8666-666666666602', 'Fyodor Dostoyevski', 'fyodor-dostoyevski', true),
  ('66666666-6666-4666-8666-666666666603', 'Stefan Zweig', 'stefan-zweig', true),
  ('66666666-6666-4666-8666-666666666604', 'Franz Kafka', 'franz-kafka', true),
  ('66666666-6666-4666-8666-666666666605', 'Sabahattin Ali', 'sabahattin-ali', true),
  ('66666666-6666-4666-8666-666666666606', 'Ahmet Hamdi Tanpınar', 'ahmet-hamdi-tanpinar', true),
  ('66666666-6666-4666-8666-666666666607', 'Oğuz Atay', 'oguz-atay', true),
  ('66666666-6666-4666-8666-666666666608', 'Zülfü Livaneli', 'zulfu-livaneli', true),
  ('66666666-6666-4666-8666-666666666609', 'Yaşar Kemal', 'yasar-kemal', true),
  ('66666666-6666-4666-8666-666666666610', 'James Clear', 'james-clear', true),
  ('66666666-6666-4666-8666-666666666611', 'Viktor E. Frankl', 'viktor-e-frankl', true),
  ('66666666-6666-4666-8666-666666666612', 'Mihaly Csikszentmihalyi', 'mihaly-csikszentmihalyi', true),
  ('66666666-6666-4666-8666-666666666613', 'Daniel Kahneman', 'daniel-kahneman', true),
  ('66666666-6666-4666-8666-666666666614', 'Don Miguel Ruiz', 'don-miguel-ruiz', true),
  ('66666666-6666-4666-8666-666666666615', 'Platon', 'platon', true),
  ('66666666-6666-4666-8666-666666666616', 'Alain de Botton', 'alain-de-botton', true),
  ('66666666-6666-4666-8666-666666666617', 'Jean-Paul Sartre', 'jean-paul-sartre', true),
  ('66666666-6666-4666-8666-666666666618', 'Marcus Aurelius', 'marcus-aurelius', true),
  ('66666666-6666-4666-8666-666666666619', 'Yuval Noah Harari', 'yuval-noah-harari', true),
  ('66666666-6666-4666-8666-666666666620', 'Stephen Hawking', 'stephen-hawking', true),
  ('66666666-6666-4666-8666-666666666621', 'Carl Sagan', 'carl-sagan', true),
  ('66666666-6666-4666-8666-666666666622', 'Antoine de Saint-Exupéry', 'antoine-de-saint-exupery', true),
  ('66666666-6666-4666-8666-666666666623', 'José Mauro de Vasconcelos', 'jose-mauro-de-vasconcelos', true),
  ('66666666-6666-4666-8666-666666666624', 'Michael Ende', 'michael-ende', true),
  ('66666666-6666-4666-8666-666666666626', 'J. R. R. Tolkien', 'j-r-r-tolkien', true),
  ('66666666-6666-4666-8666-666666666627', 'Agatha Christie', 'agatha-christie', true),
  ('66666666-6666-4666-8666-666666666628', 'Jared Diamond', 'jared-diamond', true),
  ('66666666-6666-4666-8666-666666666629', 'İlber Ortaylı', 'ilber-ortayli', true),
  ('66666666-6666-4666-8666-666666666631', 'Paulo Coelho', 'paulo-coelho', true)
on conflict (slug) do update set name = excluded.name, is_active = true, updated_at = now();

insert into public.books (
  id, title, slug, description, short_description, publisher_id, cover_url, isbn,
  language, format, page_count, publication_date, price, original_price,
  rating, review_count, badge, is_active, is_featured
) values
  (
    '77777777-7777-4777-8777-777777777701',
    '1984',
    '1984',
    'Winston Smith, Büyük Birader’in her yerde olduğu Okyanusya’da sıradan bir yaşam sürerken kendi düşüncelerini sorgulamaya başlar. Orwell’in romanı, propaganda, gözetim ve tarih yazımı üzerinden iktidarın bireyi nasıl biçimlendirdiğini gösterir.

Kitapix kataloğundaki Türkçe Can Yayınları baskısı, güncelliğini yitirmeyen bu uyarıyı sade ve güçlü bir anlatıyla okura sunar.',
    'Totaliter bir dünyada gözetim, dil ve gerçeklik üzerindeki mücadeleyi anlatan klasik distopya.',
    '55555555-5555-4555-8555-555555555501',
    '/images/books/catalog/1984.jpg',
    '9789750718533',
    'tr',
    'printed',
    352,
    '2019-01-01',
    165.00,
    null,
    4.80,
    42,
    'Editör Seçimi',
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777702',
    'Hayvan Çiftliği',
    'hayvan-ciftligi',
    'Manor Çiftliği’ndeki hayvanlar insanlara karşı ayaklanır; eşitlik vaadiyle kurulan düzen kısa sürede yeni bir hiyerarşiye dönüşür. Orwell, kısa ve keskin bir anlatıyla siyasal yozlaşmayı masalsı bir çerçevede gösterir.

Türkçe Can Yayınları baskısı, okul ve yetişkin okuru için hâlâ en bilinen giriş eserlerinden biridir.',
    'İktidar ve eşitlik vaatlerinin nasıl yozlaşabileceğini anlatan alegorik bir klasik.',
    '55555555-5555-4555-8555-555555555501',
    '/images/books/catalog/hayvan-ciftligi.jpg',
    '9789750719868',
    'tr',
    'printed',
    152,
    '2019-01-01',
    95.00,
    null,
    4.70,
    38,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777703',
    'Suç ve Ceza',
    'suc-ve-ceza',
    'Yoksul öğrenci Raskolnikov, bir cinayeti akılcılaştırarak işlemenin mümkün olup olmadığını sınar. Roman, suçun ardından gelen vicdan azabı ve toplumsal baskı altında bireyin çözülüşünü izler.

İş Bankası Kültür Yayınları’nın Türkçe baskısı, dünya edebiyatının bu temel eserini geniş bir okur kitlesine taşır.',
    'Vicdan, suç ve ahlak üzerine Petersburg’da geçen Dostoyevski başyapıtı.',
    '55555555-5555-4555-8555-555555555502',
    '/images/books/catalog/suc-ve-ceza.jpg',
    '9789754589023',
    'tr',
    'printed',
    687,
    '2016-01-01',
    195.00,
    null,
    4.90,
    55,
    null,
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777704',
    'Satranç',
    'satranc',
    'Zweig’in novellası, bir yolcu gemisinde rastlanan satranç ustası ile yalnızlıkta zihin jimnastiği yapan bir tutuklunun karşılaşmasını anlatır. Kısa hacmine rağmen gerilim, zeka ve travma temasını yoğun biçimde işler.

Can Yayınları Türkçe baskısı, Zweig’e ilk adım için sık tercih edilen bir seçimdir.',
    'Bir okyanus yolculuğunda satranç üzerinden gerilim ve zihin gücünü işleyen kısa roman.',
    '55555555-5555-4555-8555-555555555501',
    '/images/books/catalog/satranc.jpg',
    '9789750740280',
    'tr',
    'printed',
    112,
    '2019-01-01',
    70.00,
    null,
    4.60,
    29,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777705',
    'Dönüşüm',
    'donusum',
    'Kafka’nın kısa romanı, bir sabah kendini böcek olarak bulan Gregor Samsa’nın ailesi ve iş dünyasıyla ilişkisini anlatır. Yabancılaşma, aile baskısı ve insanlık onuru temaları sade bir üslupla işlenir.

Türkçe Can Yayınları baskısı, modern edebiyatın bu ikonik metnini erişilebilir biçimde sunar.',
    'Gregor Samsa’nın bir sabah böceğe dönüşmesiyle başlayan modern edebiyat klasiği.',
    '55555555-5555-4555-8555-555555555501',
    '/images/books/catalog/donusum.jpg',
    '9789750738265',
    'tr',
    'printed',
    104,
    '2019-01-01',
    75.00,
    null,
    4.50,
    31,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777706',
    'Kürk Mantolu Madonna',
    'kurk-mantolu-madonna',
    'Sabahattin Ali’nin romanı, Berlin’de tanıştığı Maria Puder’e duyduğu aşkı yıllarca içinde taşıyan Raif Efendi’nin hikâyesini anlatır. Sessizlik, utangaçlık ve toplumsal baskı altında ezilen bir yaşamın portresidir.

Yapı Kredi Yayınları baskısı, Türk edebiyatının en çok okunan eserlerinden biridir.',
    'Raif Efendi’nin sessiz aşkı üzerinden yalnızlık ve toplum baskısını anlatan Türk klasiği.',
    '55555555-5555-4555-8555-555555555519',
    '/images/books/catalog/kurk-mantolu-madonna.jpg',
    '9786058093508',
    'tr',
    'printed',
    160,
    '2016-01-01',
    70.00,
    null,
    4.70,
    48,
    'Çok Satan',
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777707',
    'Saatleri Ayarlama Enstitüsü',
    'saatleri-ayarlama-enstitusu',
    'Hayri İrdal’ın anlatımıyla ilerleyen roman, Osmanlı’dan Cumhuriyet’e geçişte bireyin zamanla, kurumlarla ve modernlik hayaliyle kurduğu ilişkiyi ironik bir dille ele alır. Saatleri Ayarlama Enstitüsü, hem bir kurum hem de bir zihniyet alegorisidir.

Dergâh Yayınları baskısı, Tanpınar okurları için temel referanslardan biridir.',
    'Modernleşme, zaman ve bürokrasi üzerine Tanpınar’ın ironik başyapıtı.',
    '55555555-5555-4555-8555-555555555504',
    '/images/books/catalog/saatleri-ayarlama-enstitusu.jpg',
    '9789759955083',
    'tr',
    'printed',
    396,
    '2015-01-01',
    180.00,
    null,
    4.60,
    33,
    'Editör Seçimi',
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777708',
    'Tutunamayanlar',
    'tutunamayanlar',
    'Oğuz Atay’ın Tutunamayanlar’ı, Turgut Özben’in arkadaşı Selim Işık’ın izini sürerken bireysel yalnızlık, dil oyunları ve toplumsal eleştiriyi iç içe örer. Deneysel biçimiyle Türk romanında bir kırılma anı kabul edilir.

İletişim Yayınları baskısı, eserin standart Türkçe edisyonudur.',
    'Türk modern edebiyatının dönüm noktası sayılan, çok katmanlı bir roman.',
    '55555555-5555-4555-8555-555555555505',
    '/images/books/catalog/tutunamayanlar.jpg',
    '9789754700114',
    'tr',
    'printed',
    724,
    '2014-01-01',
    320.00,
    null,
    4.80,
    40,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777709',
    'Serenad',
    'serenad',
    'Livaneli’nin Serenad’ı, bir profesör ile sekreteri Maya’nın ilişkisi üzerinden 20. yüzyıl Türkiye’sinin karanlık sayfalarına uzanır. Aşk, bellek ve tarihsel travma aynı anlatıda buluşur.

Doğan Kitap baskısı, çağdaş Türk edebiyatında geniş okur bulan eserlerdendir.',
    'İstanbul’da geçmişle yüzleşen bir aşk ve tarih romanı.',
    '55555555-5555-4555-8555-555555555506',
    '/images/books/catalog/serenad.jpg',
    '9786050901238',
    'tr',
    'printed',
    480,
    '2011-01-01',
    210.00,
    null,
    4.50,
    27,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777710',
    'İnce Memed 1',
    'ince-memed-1',
    'İnce Memed, ağalık düzenine karşı direnen bir gencin eşkıya oluşunu ve halkın adalet arayışını epik bir dil ile anlatır. Doğa, köy yaşamı ve toplumsal baskı romanın dokusunu oluşturur.

YKY baskısı, dörtlemenin ilk cildinin yaygın Türkçe edisyonudur.',
    'Çukurova’da eşkıyalık ve adalet arayışını anlatan Yaşar Kemal destanı.',
    '55555555-5555-4555-8555-555555555503',
    '/images/books/catalog/ince-memed-1.jpg',
    '9789750802942',
    'tr',
    'printed',
    436,
    '2016-01-01',
    145.00,
    null,
    4.70,
    36,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777711',
    'Atomik Alışkanlıklar',
    'atomik-aliskanliklar',
    'James Clear, alışkanlıkların kimlik, ortam ve sistemlerle nasıl kurulduğunu adım adım açıklar. Kitap, büyük hedefler yerine küçük, tekrarlanabilir davranışlara odaklanır.

Pegasus Yayınları’nın Türkçe baskısı, kişisel gelişim raflarının en bilinen başlıklarındandır.',
    'Küçük alışkanlık değişiklikleriyle kalıcı sonuçlar üretmeye odaklı pratik bir rehber.',
    '55555555-5555-4555-8555-555555555507',
    '/images/books/catalog/atomik-aliskanliklar.jpg',
    '9786052998380',
    'tr',
    'printed',
    352,
    '2020-05-08',
    220.00,
    399.98,
    4.60,
    44,
    'Çok Satan',
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777712',
    'İnsanın Anlam Arayışı',
    'insanin-anlam-arayisi',
    'Psikiyatrist Viktor Frankl, Nazi kamplarındaki deneyimini logoterapi yaklaşımıyla birleştirerek insanın en zor koşullarda bile anlam bulabileceğini savunur. Kitap hem anı hem düşünce metnidir.

Okuyan Us Türkçe baskısı, psikoloji ve kişisel gelişim kesişiminde sık önerilen bir kaynaktır.',
    'Frankl’ın kamp deneyiminden yola çıkarak anlam ve dayanıklılığı tartıştığı klasik eser.',
    '55555555-5555-4555-8555-555555555508',
    '/images/books/catalog/insanin-anlam-arayisi.jpg',
    '9786053751236',
    'tr',
    'printed',
    168,
    '2019-01-01',
    145.00,
    null,
    4.80,
    41,
    'Sana Uygun',
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777713',
    'Akış',
    'akis',
    'Csikszentmihalyi, insanların en yüksek doyumu yaşadığı “akış” hallerini araştırmalarıyla açıklar. Beceri ve zorluk dengesi, dikkat ve mutluluk ilişkisi kitabın merkezindedir.

Türkçe Okuyan Us baskısı, kavramın Türkiye’deki bilinen referansıdır.',
    'Yoğun odak ve doyum hali olan “akış” kavramını açıklayan psikoloji klasiği.',
    '55555555-5555-4555-8555-555555555520',
    '/images/books/catalog/akis.jpg',
    '9786056685873',
    'tr',
    'printed',
    392,
    '2017-01-01',
    210.00,
    null,
    4.40,
    22,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777714',
    'Düşünme, Hızlı ve Yavaş',
    'dusunme-hizli-ve-yavas',
    'Kahneman, hızlı sezgisel ve yavaş analitik düşünme sistemlerini örneklerle ayırır. Kitap, karar alma, önyargı ve risk algısı üzerine temel bir başvuru metnidir.

Varlık Yayınları Türkçe baskısı, davranışsal ekonomi okurları için standart seçimdir.',
    'İki düşünme sistemi üzerinden önyargıları ve karar hatalarını anlatan Nobel ödüllü eser.',
    '55555555-5555-4555-8555-555555555509',
    '/images/books/catalog/dusunme-hizli-ve-yavas.jpg',
    '9789754340855',
    'tr',
    'printed',
    624,
    '2018-01-01',
    340.00,
    null,
    4.50,
    26,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777715',
    'Dört Anlaşma',
    'dort-anlasma',
    'Don Miguel Ruiz, kendini yargılamamak, varsayımlardan kaçınmak ve elinden gelenin en iyisini yapmak gibi dört anlaşmayı yaşam pratiğine dönüştürmeyi önerir. Kısa ve erişilebilir bir kişisel dönüşüm metnidir.

Butik Yayıncılık Türkçe baskısı, bu alanda sık karşılaşılan bir edisyondur.',
    'Toltek bilgelikinden esinlenen dört pratik ilkeyle içsel özgürlüğü anlatır.',
    '55555555-5555-4555-8555-555555555510',
    '/images/books/catalog/dort-anlasma.jpg',
    '9786053750017',
    'tr',
    'printed',
    160,
    '2015-01-01',
    120.00,
    null,
    4.30,
    19,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777716',
    'Sokrates''in Savunması',
    'sokratesin-savunmasi',
    'Platon, Sokrates’in Atina mahkemesindeki savunusunu diyalog biçiminde aktarır. Bilgelik, erdem ve ölüme karşı duruş felsefi düşüncenin temel metinlerinden biridir.

İş Bankası Kültür Yayınları’nın cep boy Türkçe baskısı, felsefeye giriş için uygundur.',
    'Sokrates’in mahkemedeki savunmasını aktaran Platon diyaloğu.',
    '55555555-5555-4555-8555-555555555502',
    '/images/books/catalog/sokratesin-savunmasi.jpg',
    '9789754587036',
    'tr',
    'printed',
    112,
    '2016-01-01',
    45.00,
    null,
    4.60,
    24,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777717',
    'Felsefenin Tesellisi',
    'felsefenin-tesellisi',
    'Alain de Botton, aşk, başarısızlık, öfke ve yalnızlık gibi günlük meseleleri Sokrates’ten Nietzsche’ye uzanan filozoflarla ilişkilendirir. Akademik olmayan, okunabilir bir felsefe girişidir.

Domingo Türkçe baskısı, popüler felsefe kategorisinde bilinen bir başlıktır.',
    'Gündelik sorunlara klasik filozoflardan pratik bakışlar sunan popüler felsefe kitabı.',
    '55555555-5555-4555-8555-555555555518',
    '/images/books/catalog/felsefenin-tesellisi.jpg',
    '9786053756408',
    'tr',
    'printed',
    256,
    '2018-01-01',
    195.00,
    null,
    4.40,
    21,
    'Editör Seçimi',
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777718',
    'Varoluşçuluk',
    'varolusculuk',
    'Sartre, varoluşçuluğu insanın kendi değerlerini seçme sorumluluğu üzerinden açıklar. Özgürlük, kaygı ve “kötü niyet” kavramları kısa bir çerçevede sunulur.

Say Yayınları Türkçe baskısı, varoluşçuluğa giriş için kompakt bir kaynaktır.',
    'Sartre’ın özgürlük, sorumluluk ve kaygı üzerine yoğunlaşan kısa varoluşçu metni.',
    '55555555-5555-4555-8555-555555555513',
    '/images/books/catalog/varolusculuk.jpg',
    '9786050207262',
    'tr',
    'printed',
    128,
    '2015-01-01',
    95.00,
    null,
    4.30,
    18,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777719',
    'Kendime Düşünceler',
    'kendime-dusunceler',
    'Marcus Aurelius’un kişisel notları, Stoacı disiplin, ölümlülük ve erdem üzerine kısa pasajlardan oluşur. Günlük yaşamda sakinlik ve ahlaki tutarlılık arayanlar için klasik bir metindir.

Say Yayınları’nın “Kendime Düşünceler” baskısı, Türkçe’de bilinen erişilebilir edisyonlardan biridir.',
    'Roma imparatorunun kendine yazdığı Stoacı notların Türkçe baskısı.',
    '55555555-5555-4555-8555-555555555513',
    '/images/books/catalog/kendime-dusunceler.jpg',
    '9786050205084',
    'tr',
    'printed',
    136,
    '2022-02-12',
    120.00,
    200.00,
    4.70,
    28,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777720',
    'Hayvanlardan Tanrılara: Sapiens',
    'sapiens',
    'Harari, insan türünün mitler, tarım, para ve bilim üzerinden nasıl dünya hâkimiyeti kurduğunu geniş bir çerçevede özetler. Popüler bilim ile tarih anlatısını birleştirir.

Kolektif Kitap’ın Türkçe karton kapak baskısı, yayınevinin liste fiyatı üzerinden doğrulanmıştır.',
    'Homo sapiens’in bilişsel devrimden bugüne uzanan kısa tarihini anlatır.',
    '55555555-5555-4555-8555-555555555511',
    '/images/books/catalog/sapiens.jpg',
    '9786055029357',
    'tr',
    'printed',
    412,
    '2015-01-01',
    357.00,
    595.00,
    4.70,
    52,
    'Çok Satan',
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777721',
    'Homo Deus',
    'homo-deus',
    'Homo Deus, hastalık ve kıtlıkla mücadeleyi aşmış insanlığın bundan sonra mutluluk, ölümsüzlük ve tanrısallık peşine düşebileceğini tartışır. Veri, yapay zeka ve biyoloji kesişiminde spekülatif bir gelecek okumasıdır.

Kolektif Kitap Türkçe baskısı, Sapiens okurlarının doğal devamıdır.',
    'İnsanlığın geleceği, teknoloji ve yeni tanrılar üzerine Harari’nin devam kitabı.',
    '55555555-5555-4555-8555-555555555511',
    '/images/books/catalog/homo-deus.jpg',
    '9786055029531',
    'tr',
    'printed',
    456,
    '2016-01-01',
    360.00,
    null,
    4.50,
    30,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777722',
    'Zamanın Kısa Tarihi',
    'zamanin-kisa-tarihi',
    'Hawking, evrenin başlangıcı, kara delikler ve zamanın okunu geniş okur için anlaşılır bir dille anlatır. Modern kozmolojinin en bilinen giriş kitaplarından biridir.

Alfa Yayınları Türkçe baskısı, popüler bilim raflarının standart başlıklarındandır.',
    'Büyük patlama, kara delikler ve zamanın doğası üzerine popüler bilim klasiği.',
    '55555555-5555-4555-8555-555555555512',
    '/images/books/catalog/zamanin-kisa-tarihi.jpg',
    '9786051711232',
    'tr',
    'printed',
    256,
    '2017-01-01',
    175.00,
    null,
    4.40,
    23,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777723',
    'Kozmos',
    'kozmos',
    'Carl Sagan, yıldızlardan insan bilincine uzanan bir yolculukla bilimin şiirsel ve merak uyandıran yüzünü anlatır. Hem astronomi hem bilim kültürü için temel bir metindir.

Alfa Yayınları Türkçe baskısı, Kozmos’un bilinen yerel edisyonlarındandır.',
    'Evrenin büyüklüğünü ve bilimin merakını anlatan Sagan klasiği.',
    '55555555-5555-4555-8555-555555555512',
    '/images/books/catalog/kozmos.jpg',
    '9786050202281',
    'tr',
    'printed',
    416,
    '2016-01-01',
    250.00,
    null,
    4.80,
    35,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777724',
    'Küçük Prens',
    'kucuk-prens',
    'Küçük Prens, çölde düşen bir pilot ile küçük bir gezegenden gelen çocuğun buluşmasını anlatır. Görünmeyeni görmek, bağ kurmak ve sorumluluk temaları kısa ve dokunaklı bir üslupla işlenir.

Can Yayınları Türkçe baskısı, hem çocuk hem yetişkin okurda yaygındır.',
    'Çocuklar ve yetişkinler için dostluk, sorumluluk ve bakışı anlatan masalsı klasik.',
    '55555555-5555-4555-8555-555555555501',
    '/images/books/catalog/kucuk-prens.jpg',
    '9789750738609',
    'tr',
    'printed',
    112,
    '2019-01-01',
    80.00,
    null,
    4.90,
    50,
    'Sana Uygun',
    true,
    true
  ),
  (
    '77777777-7777-4777-8777-777777777725',
    'Şeker Portakalı',
    'seker-portakali',
    'Brezilyalı yazar Vasconcelos, küçük Zezé’nin ailesi, arkadaşlığı ve şeker portakalı ağacıyla kurduğu bağı anlatır. Çocuk gözünden sertlik ve umut bir aradadır.

Can Yayınları Türkçe baskısı, gençlik edebiyatının en bilinen başlıklarındandır.',
    'Zezé’nin yoksulluk ve hayal gücüyle büyüdüğü dokunaklı bir çocukluk romanı.',
    '55555555-5555-4555-8555-555555555501',
    '/images/books/catalog/seker-portakali.jpg',
    '9789750734638',
    'tr',
    'printed',
    200,
    '2019-01-01',
    110.00,
    null,
    4.60,
    34,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777726',
    'Momo',
    'momo',
    'Michael Ende’nin Momo’su, insanlardan zamanı çalan gri adamlara karşı küçük bir kızın mücadelesini anlatır. Dinlemek, oyun ve zamanın anlamı üzerine allegoric bir masaldır.

Kabalcı Türkçe baskısı, genç okur için sık önerilen edisyonlardandır.',
    'Zaman hırsızlarına karşı dinlemenin gücünü anlatan fantastik çocuk klasiği.',
    '55555555-5555-4555-8555-555555555514',
    '/images/books/catalog/momo.jpg',
    '9789758240395',
    'tr',
    'printed',
    304,
    '2015-01-01',
    160.00,
    null,
    4.70,
    25,
    'Yeni',
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777727',
    'Simyacı',
    'simyaci',
    'Paulo Coelho’nun Simyacı’sı, İspanyol çoban Santiago’nun hazine ve anlam arayışını masalsı bir dille anlatır. Rüyalar, işaretler ve içsel dönüşüm temaları öne çıkar.

Can Yayınları Türkçe baskısı, eserin Türkiye’de en bilinen edisyonudur.',
    'Kişisel efsanesinin peşine düşen bir çobanın yolculuğunu anlatan çağdaş klasik.',
    '55555555-5555-4555-8555-555555555501',
    '/images/books/catalog/simyaci.jpg',
    '9789750726439',
    'tr',
    'printed',
    184,
    '2019-01-01',
    165.00,
    340.00,
    4.40,
    28,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777728',
    'Yüzüklerin Efendisi: Yüzük Kardeşliği',
    'yuzuklerin-efendisi-1',
    'Tolkien’in üçlemesinin ilk kitabı, Shire’dan yola çıkan Yüzük Kardeşliği’nin macerasını anlatır. Dostluk, cesaret ve kötülüğe karşı direniş fantastik edebiyatın temel anlatılarından biridir.

Metis Yayınları Türkçe baskısı, eserin Türkiye’deki klasik edisyonudur.',
    'Frodo’nun Tek Yüzük’ü yok etmek için çıktığı yolculuğun destansı ilk kısmı.',
    '55555555-5555-4555-8555-555555555522',
    '/images/books/catalog/yuzuklerin-efendisi-1.jpg',
    '9789753420471',
    'tr',
    'printed',
    496,
    '2012-01-01',
    380.00,
    null,
    4.80,
    39,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777729',
    'Doğu Ekspresinde Cinayet',
    'dogu-ekspresinde-cinayet',
    'Doğu Ekspresi’nde işlenen bir cinayet, kapalı mekân polisiyesinin en ünlü örneklerinden birini oluşturur. Poirot, yolcular arasındaki sırları katman katman açar.

Altın Kitaplar Türkçe baskısı, Christie klasiklerinin bilinen yerel edisyonlarındandır.',
    'Hercule Poirot’nun karlı bir trende çözdüğü klasik polisiye bulmaca.',
    '55555555-5555-4555-8555-555555555516',
    '/images/books/catalog/dogu-ekspresinde-cinayet.jpg',
    '9789752109452',
    'tr',
    'printed',
    288,
    '2015-01-01',
    150.00,
    null,
    4.50,
    32,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777730',
    'Tüfek, Mikrop ve Çelik',
    'tufek-mikrop-ve-celik',
    'Jared Diamond, bazı toplumların neden teknoloji ve güçte öne çıktığını ırk değil çevre, tarım ve salgın hastalık dinamikleriyle açıklar. Tarih ile bilim arasında köprü kuran bir anlatıdır.

Pegasus Yayınları Türkçe baskısı, popüler tarih-bilim kesişiminde bilinen bir başlıktır.',
    'Toplumlar arası eşitsizliğin coğrafya ve biyoloji köklerini araştıran Pulitzer ödüllü eser.',
    '55555555-5555-4555-8555-555555555507',
    '/images/books/catalog/tufek-mikrop-ve-celik.jpg',
    '9786050205510',
    'tr',
    'printed',
    624,
    '2018-01-01',
    310.00,
    null,
    4.60,
    27,
    null,
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777731',
    'Türklerin Tarihi',
    'turklerin-tarihi',
    'Ortaylı, Türklerin bozkırdan imparatorluklara uzanan tarihini genel okur için anlaşılır bir çerçevede özetler. Göç, devletleşme ve kültür etkileşimleri kitabın omurgasını oluşturur.

Timaş Yayınları baskısı, yazarın bilinen popüler tarih eserlerindendir.',
    'Orta Asya’dan Avrupa’ya uzanan Türk tarihine İlber Ortaylı’nın sade anlatımı.',
    '55555555-5555-4555-8555-555555555521',
    '/images/books/catalog/turklerin-tarihi.jpg',
    '9786050819267',
    'tr',
    'printed',
    320,
    '2015-03-01',
    207.00,
    345.00,
    4.40,
    20,
    'Yeni',
    true,
    false
  ),
  (
    '77777777-7777-4777-8777-777777777732',
    '21. Yüzyıl İçin 21 Ders',
    '21-yuzyil-icin-21-ders',
    'Harari, yapay zekâ, milliyetçilik, din ve gerçeklik sonrası dünya gibi başlıklarda kısa deneme-dersler sunar. Sapiens ve Homo Deus’tan sonra bugünün sorularına odaklanır.

Kolektif Kitap Türkçe baskısı, güncel toplum okumaları için sık önerilir.',
    'Teknoloji, siyaset ve kimlik konularında günümüz dünyasına dair kısa dersler.',
    '55555555-5555-4555-8555-555555555511',
    '/images/books/catalog/21-yuzyil-icin-21-ders.jpg',
    '9786055029890',
    'tr',
    'printed',
    400,
    '2018-01-01',
    340.00,
    null,
    4.50,
    29,
    null,
    true,
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  short_description = excluded.short_description,
  publisher_id = excluded.publisher_id,
  cover_url = excluded.cover_url,
  isbn = excluded.isbn,
  language = excluded.language,
  format = excluded.format,
  page_count = excluded.page_count,
  publication_date = excluded.publication_date,
  price = excluded.price,
  original_price = excluded.original_price,
  rating = excluded.rating,
  review_count = excluded.review_count,
  badge = excluded.badge,
  is_active = true,
  is_featured = excluded.is_featured,
  updated_at = now();

insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = '1984' and a.slug = 'george-orwell'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'hayvan-ciftligi' and a.slug = 'george-orwell'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'suc-ve-ceza' and a.slug = 'fyodor-dostoyevski'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'satranc' and a.slug = 'stefan-zweig'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'donusum' and a.slug = 'franz-kafka'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'kurk-mantolu-madonna' and a.slug = 'sabahattin-ali'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'saatleri-ayarlama-enstitusu' and a.slug = 'ahmet-hamdi-tanpinar'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'tutunamayanlar' and a.slug = 'oguz-atay'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'serenad' and a.slug = 'zulfu-livaneli'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'ince-memed-1' and a.slug = 'yasar-kemal'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'atomik-aliskanliklar' and a.slug = 'james-clear'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'insanin-anlam-arayisi' and a.slug = 'viktor-e-frankl'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'akis' and a.slug = 'mihaly-csikszentmihalyi'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'dusunme-hizli-ve-yavas' and a.slug = 'daniel-kahneman'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'dort-anlasma' and a.slug = 'don-miguel-ruiz'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'sokratesin-savunmasi' and a.slug = 'platon'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'felsefenin-tesellisi' and a.slug = 'alain-de-botton'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'varolusculuk' and a.slug = 'jean-paul-sartre'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'kendime-dusunceler' and a.slug = 'marcus-aurelius'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'sapiens' and a.slug = 'yuval-noah-harari'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'homo-deus' and a.slug = 'yuval-noah-harari'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'zamanin-kisa-tarihi' and a.slug = 'stephen-hawking'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'kozmos' and a.slug = 'carl-sagan'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'kucuk-prens' and a.slug = 'antoine-de-saint-exupery'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'seker-portakali' and a.slug = 'jose-mauro-de-vasconcelos'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'momo' and a.slug = 'michael-ende'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'simyaci' and a.slug = 'paulo-coelho'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'yuzuklerin-efendisi-1' and a.slug = 'j-r-r-tolkien'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'dogu-ekspresinde-cinayet' and a.slug = 'agatha-christie'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'tufek-mikrop-ve-celik' and a.slug = 'jared-diamond'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = 'turklerin-tarihi' and a.slug = 'ilber-ortayli'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;
insert into public.book_authors (book_id, author_id, author_order)
select b.id, a.id, 0
from public.books b
cross join public.authors a
where b.slug = '21-yuzyil-icin-21-ders' and a.slug = 'yuval-noah-harari'
on conflict (book_id, author_id) do update set author_order = excluded.author_order;

insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = '1984' and c.slug = 'dunya-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'hayvan-ciftligi' and c.slug = 'dunya-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'suc-ve-ceza' and c.slug = 'dunya-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'satranc' and c.slug = 'dunya-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'donusum' and c.slug = 'dunya-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'kurk-mantolu-madonna' and c.slug = 'turk-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'saatleri-ayarlama-enstitusu' and c.slug = 'turk-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'tutunamayanlar' and c.slug = 'turk-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'serenad' and c.slug = 'turk-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'ince-memed-1' and c.slug = 'turk-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'atomik-aliskanliklar' and c.slug = 'kisisel-gelisim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'insanin-anlam-arayisi' and c.slug = 'kisisel-gelisim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'akis' and c.slug = 'kisisel-gelisim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'dusunme-hizli-ve-yavas' and c.slug = 'kisisel-gelisim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'dort-anlasma' and c.slug = 'kisisel-gelisim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'sokratesin-savunmasi' and c.slug = 'felsefe'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'felsefenin-tesellisi' and c.slug = 'felsefe'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'varolusculuk' and c.slug = 'felsefe'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'kendime-dusunceler' and c.slug = 'felsefe'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'sapiens' and c.slug = 'bilim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'homo-deus' and c.slug = 'bilim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'zamanin-kisa-tarihi' and c.slug = 'bilim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'kozmos' and c.slug = 'bilim'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'kucuk-prens' and c.slug = 'cocuk'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'seker-portakali' and c.slug = 'cocuk'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'momo' and c.slug = 'cocuk'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'simyaci' and c.slug = 'dunya-edebiyati'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'yuzuklerin-efendisi-1' and c.slug = 'polisiye-ve-fantastik'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'dogu-ekspresinde-cinayet' and c.slug = 'polisiye-ve-fantastik'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'tufek-mikrop-ve-celik' and c.slug = 'tarih'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = 'turklerin-tarihi' and c.slug = 'tarih'
on conflict (book_id, category_id) do nothing;
insert into public.book_categories (book_id, category_id)
select b.id, c.id
from public.books b
cross join public.categories c
where b.slug = '21-yuzyil-icin-21-ders' and c.slug = 'tarih'
on conflict (book_id, category_id) do nothing;

-- Deactivate unused demo authors/publishers (keep rows; no destructive deletes)
update public.authors a
set is_active = false, updated_at = now()
where a.is_active
  and not exists (
    select 1
    from public.book_authors ba
    join public.books b on b.id = ba.book_id and b.is_active
    where ba.author_id = a.id
  );

update public.publishers p
set is_active = false, updated_at = now()
where p.is_active
  and not exists (
    select 1 from public.books b where b.publisher_id = p.id and b.is_active
  );

