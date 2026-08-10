export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type DemoArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readingTime: string;
  intro: string;
  callout: string;
  sections: ArticleSection[];
};

export type RelatedArticleCard = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
};

export const demoArticles: DemoArticle[] = [
  {
    slug: "yeniden-kitap-okumaya-baslamak",
    category: "Okuma Rehberi",
    title: "Yeniden kitap okumaya başlamak için 7 öneri",
    excerpt:
      "Uzun bir aradan sonra okuma alışkanlığına geri dönmeyi kolaylaştırabilecek küçük ama etkili adımlar.",
    author: "Kitapix Editör",
    date: "2026-08-10",
    readingTime: "6 dk okuma",
    intro:
      "Uzun bir aradan sonra kitaba dönmek çoğu zaman motivasyon meselesi gibi görünür. Oysa asıl zorluk, okumayı yeniden günlük hayatın doğal bir parçası haline getirebilmektir. Bu yazıda, büyük vaatler yerine küçük ve sürdürülebilir adımlara odaklanıyoruz.",
    callout:
      "Okuma alışkanlığını yeniden kurmanın en kolay yolu, kendine büyük hedefler koymak değil; kitabı günlük hayatın doğal bir parçası haline getirmektir.",
    sections: [
      {
        heading: "1. Küçük hedeflerle başla",
        paragraphs: [
          "Uzun süre kitap okumadıysan, ilk günlerde kendine kalın romanlar bitirme sözü vermek çoğu zaman ters teper. Daha gerçekçi bir başlangıç, günde on–on beş sayfa gibi ulaşılabilir bir hedef koymaktır.",
          "Küçük hedefler, suçluluk hissini azaltır ve okumayı yeniden “yapılabilir” bir eyleme dönüştürür. İlerledikçe hedefi büyütmek her zaman mümkün; önemli olan ritmi kurmaktır.",
          "İlk haftayı bir deneme dönemi gibi gör. Bitirmekten çok, kitabı eline almayı alışkanlık haline getirmeyi önceliklendir.",
        ],
      },
      {
        heading: "2. Sana gerçekten ilgi çekici gelen kitapları seç",
        paragraphs: [
          "Yeniden başlarken “okumam gereken” kitaplara odaklanmak motivasyonu hızla düşürebilir. Bunun yerine, konuya veya üsluba içten ilgi duyduğun metinlerle başlamak çok daha sürdürülebilir olur.",
          "Tür konusunda katı olma. Deneme, kısa öykü, popüler bilim veya iyi yazılmış bir kurgu dışı eser de okuma alışkanlığını yeniden kurmana yardımcı olabilir.",
        ],
      },
      {
        heading: "3. Okumayı günlük rutine bağla",
        paragraphs: [
          "Alışkanlıklar çoğu zaman iradeden çok bağlama dayanır. Kahve sonrası, yolculuk sırasında veya yatmadan önce gibi sabit bir ana okumayı yerleştirmek işe yarar.",
          "Telefon bildirimlerini o kısa aralıkta azaltmak, dikkatin dağılmasını da belirgin biçimde azaltır. Aynı yerde, aynı saatte okumak zamanla otomatikleşir.",
        ],
      },
      {
        heading: "4. Her kitabı bitirmek zorunda değilsin",
        paragraphs: [
          "İlerlemediğin bir kitabı zorla bitirmek, yeniden başlama sürecini uzatabilir. Bazen doğru tercih, o kitabı bırakıp başka birine geçmektir.",
          "Bırakmak başarısızlık değil; okuma zevkini korumak için bilinçli bir tercihtir. Beğenmediğin bir metinde ısrar etmek, okumayı görev haline getirebilir.",
        ],
      },
      {
        heading: "5. Kısa bölümlü kitaplarla ivme kazan",
        paragraphs: [
          "Kısa bölümlerden oluşan kitaplar, her oturumda tamamlanmışlık hissi verir. Bu his, özellikle yeniden başlayanlar için güçlü bir motivasyon kaynağıdır.",
          "Her seferinde bir bölüm bitirmek, “bugün de okudum” duygusunu pekiştirir ve bir sonraki güne daha kolay bağlanmanı sağlar.",
        ],
      },
      {
        heading: "6. Okuma listeni sade tut",
        paragraphs: [
          "Çok uzun okuma listeleri bazen ilham vermek yerine baskı yaratır. Yeniden başlama döneminde üç–beş kitaptan oluşan sade bir liste daha işlevseldir.",
          "Listeyi dar tutmak, seçim yorgunluğunu azaltır ve mevcut kitabına daha net odaklanmanı sağlar. Yeni önerileri sonraya bırakmakta sakınca yoktur.",
        ],
      },
      {
        heading: "7. Okuma deneyimini kişiselleştir",
        paragraphs: [
          "Bazı okurlar sessizlikte, bazıları hafif müzikle daha iyi ilerler. Işık, oturuş, basılı kitap ya da e-kitap tercihi gibi unsurları kendi ritmine göre ayarlamak önemlidir.",
          "Kişisel bir okuma düzeni kurmak, alışkanlığın sadece bir hedef değil, keyif alınan bir pratik haline gelmesine yardımcı olur. Küçük düzenlemeler, uzun vadede büyük fark yaratır.",
        ],
      },
    ],
  },
  {
    slug: "odaklanmayi-destekleyen-kitaplar",
    category: "Kitap İncelemesi",
    title: "Odaklanmayı destekleyen kitaplar nasıl seçilir?",
    excerpt:
      "Dikkati dağıtmayan metinleri ayırt etmek ve doğru tempoda ilerlemek için pratik bir çerçeve.",
    author: "Kitapix Editör",
    date: "2026-07-21",
    readingTime: "5 dk okuma",
    intro:
      "Dikkatin dağıldığı bir dönemde kitap seçmek, çoğu zaman sandığımızdan daha kritik bir adımdır. Doğru metin, odaklanmayı zorlamak yerine onu destekleyebilir. Bu yazıda, seçim sürecine pratik bir çerçeve getiriyoruz.",
    callout:
      "Odaklanma, yalnızca irade meselesi değildir; doğru kitap, doğru tempo ve doğru ortam bir araya geldiğinde dikkat çok daha doğal akar.",
    sections: [
      {
        heading: "1. Metnin temposunu önceden hisset",
        paragraphs: [
          "Yoğun bir dönemde, çok katmanlı ve yavaş ilerleyen bir roman dikkatini dağıtabilir. İlk bölümleri okuyarak metnin temposunu anlamak, doğru seçim yapmana yardımcı olur.",
          "Kısa paragraflı, net anlatımlı kitaplar çoğu zaman daha kolay odaklanmayı destekler. Bu, edebiyatın sade olması gerektiği anlamına gelmez; başlangıç için daha erişilebilir bir eşik sunar.",
        ],
      },
      {
        heading: "2. Konuyu merakınla hizala",
        paragraphs: [
          "İlgini çeken bir konu, dikkat dağınıklığını azaltır. Konu sana uzaksa, en iyi yazılmış kitap bile kısa sürede yorucu gelebilir.",
          "Bu yüzden odaklanma hedefiyle okurken “prestijli” seçimler yerine, gerçekten merak ettiğin metinleri öne almak daha verimlidir.",
        ],
      },
      {
        heading: "3. Okuma dilimini netleştir",
        paragraphs: [
          "Odaklanmayı destekleyen kitaplar bile, sürekli bölünen bir ortamda etkisini kaybeder. Kısa ama kesintisiz okuma dilimleri belirlemek, ilerlemeyi görünür kılar.",
          "Yirmi–otuz dakikalık düzenli oturumlar, uzun ama dağınık okuma denemelerinden çoğu zaman daha kalıcı sonuç verir.",
        ],
      },
    ],
  },
  {
    slug: "edebiyatta-yapay-zeka",
    category: "Edebiyat",
    title: "Edebiyatta yapay zekânın yeri",
    excerpt:
      "Yaratıcılık, yazarlık ve okur deneyimi arasındaki dengeyi edebiyat bağlamında ele alan bir bakış.",
    author: "Kitapix Editör",
    date: "2026-06-30",
    readingTime: "7 dk okuma",
    intro:
      "Yapay zekâ, edebiyat tartışmalarının merkezine hızla yerleşti. Kimileri bunu yaratıcılığın sonu olarak görürken, kimileri de yazma ve okuma pratiklerini genişleten yeni bir katman olarak yorumluyor. Gerçek tablo, bu iki ucun arasında daha nüanslı duruyor.",
    callout:
      "Yapay zekâ edebiyatı ortadan kaldırmayacak; ama yazarın, editörün ve okurun rollerini yeniden tanımlamamızı isteyecek.",
    sections: [
      {
        heading: "1. Araç mı, yazar mı?",
        paragraphs: [
          "Yapay zekânın edebiyattaki yeri tartışılırken ilk soru çoğu zaman aynıdır: Bu bir yazar mı, yoksa yazara yardımcı bir araç mı? Cevap, kullanım biçimine göre değişir.",
          "Bazı yazarlar fikir geliştirme ve yapı denemelerinde yapay zekâyı destekleyici bir katman olarak kullanırken, nihai sesi ve kararları kendilerinde tutmayı tercih eder.",
        ],
      },
      {
        heading: "2. Okur güveni ve şeffaflık",
        paragraphs: [
          "Okurlar için kritik konu, bir metnin nasıl üretildiğinin şeffaf biçimde paylaşılmasıdır. Güven, yalnızca üslup kalitesinden değil, sürecin açık olmasından da beslenir.",
          "Yayıncıların ve platformların bu konuda net çerçeveler geliştirmesi, edebi deneyimin sağlıklı büyümesine katkı sağlar.",
        ],
      },
      {
        heading: "3. Yeni okuma biçimleri",
        paragraphs: [
          "Yapay zekâ yalnızca üretim tarafını değil, keşif ve öneri katmanını da dönüştürüyor. Okurlar, kendi ilgilerine daha yakın metinlere daha hızlı ulaşabiliyor.",
          "Asıl soru, bu hızın edebi derinliği zayıflatıp zayıflatmayacağıdır. Teknoloji, dikkatli kullanılırsa keşfi zenginleştirebilir; dikkatsizce kullanılırsa da seçimleri sığlaştırabilir.",
        ],
      },
    ],
  },
];

export const relatedArticleCards: RelatedArticleCard[] = [
  {
    slug: "yeniden-kitap-okumaya-baslamak",
    category: "Okuma Rehberi",
    title: "Yeniden kitap okumaya başlamak için 7 öneri",
    excerpt:
      "Okuma alışkanlığına geri dönmek isteyenler için küçük ama etkili başlangıç noktaları.",
    date: "2026-08-10",
    readingTime: "6 dk okuma",
  },
  {
    slug: "odaklanmayi-destekleyen-kitaplar",
    category: "Kitap İncelemesi",
    title: "Odaklanmayı destekleyen kitaplar nasıl seçilir?",
    excerpt:
      "Dikkati dağıtmayan metinleri ayırt etmek ve doğru tempoda ilerlemek için pratik bir çerçeve.",
    date: "2026-07-21",
    readingTime: "5 dk okuma",
  },
  {
    slug: "edebiyatta-yapay-zeka",
    category: "Edebiyat",
    title: "Edebiyatta yapay zekânın yeri",
    excerpt:
      "Yaratıcılık, yazarlık ve okur deneyimi arasındaki dengeyi edebiyat bağlamında ele alan bir bakış.",
    date: "2026-06-30",
    readingTime: "7 dk okuma",
  },
];

export function getDemoArticle(slug: string) {
  return demoArticles.find((article) => article.slug === slug);
}
