import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { BookGrid } from "@/components/books/BookGrid";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getFeaturedBooks } from "@/lib/data/books";

const genres = [
  { label: "Roman", selected: true },
  { label: "Polisiye", selected: false },
  { label: "Bilim Kurgu", selected: false },
  { label: "Fantastik", selected: false },
  { label: "Psikoloji", selected: true },
  { label: "Kişisel Gelişim", selected: false },
  { label: "Felsefe", selected: true },
  { label: "Tarih", selected: false },
  { label: "Bilim", selected: true },
  { label: "Biyografi", selected: false },
  { label: "İş Dünyası", selected: false },
  { label: "Çocuk & Gençlik", selected: false },
] as const;

const readingPurposes = [
  { label: "Rahatlamak", selected: true },
  { label: "Yeni Bir Şey Öğrenmek", selected: true },
  { label: "Odaklanmak", selected: false },
  { label: "İlham Almak", selected: true },
  { label: "Kendimi Geliştirmek", selected: false },
  { label: "Eğlenmek", selected: false },
  { label: "Yeni Dünyalar Keşfetmek", selected: true },
  { label: "Çocuğum İçin Kitap Bulmak", selected: false },
] as const;

const readingTempos = [
  { label: "Kısa ve hızlı okunan", selected: false },
  { label: "Orta uzunlukta", selected: true },
  { label: "Uzun ve detaylı", selected: false },
] as const;

const readingLevels = [
  {
    label: "Kolay ve akıcı",
    description: "Hızlı ilerleyen, sade anlatımlı kitaplar.",
    selected: false,
  },
  {
    label: "Dengeli",
    description: "Akıcılık ve içerik derinliği arasında denge.",
    selected: true,
  },
  {
    label: "Yoğun ve düşündürücü",
    description: "Daha fazla dikkat ve zaman isteyen eserler.",
    selected: false,
  },
] as const;

const bookFormats = [
  { label: "Basılı Kitap", selected: true },
  { label: "E-Kitap", selected: false },
  { label: "Fark Etmez", selected: false },
] as const;

function PreferenceChip({
  label,
  selected,
}: {
  label: string;
  selected: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex min-h-11 items-center rounded-medium border px-4 py-2.5 text-left text-body-small font-medium",
        selected
          ? "border-accent/40 bg-accent-soft text-foreground"
          : "border-border bg-surface text-muted",
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function SelectableOption({
  label,
  description,
  selected,
}: {
  label: string;
  description?: string;
  selected: boolean;
}) {
  return (
    <span
      className={[
        "flex h-full min-h-11 flex-col rounded-large border px-4 py-4 text-left",
        selected ? "border-accent/40 bg-accent-soft" : "border-border bg-surface",
      ].join(" ")}
    >
      <span className="text-body font-semibold text-foreground">{label}</span>
      {description ? (
        <span className="mt-1.5 text-body-small text-muted">{description}</span>
      ) : null}
    </span>
  );
}

export default async function InterestsPage() {
  const previewBooks = await getFeaturedBooks(4);

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-small text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/hesabim" className="hover:text-foreground">
                Hesabım
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              İlgi Alanlarım
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">İlgi Alanlarım</h1>
          <p className="mt-3 text-body-large text-muted">
            Kitapix’in sana daha uygun kitaplar önerebilmesi için okuma
            tercihlerini belirle.
          </p>
          <p
            role="status"
            className="mt-4 rounded-medium border border-accent/30 bg-accent-soft px-3 py-2 text-body-small text-foreground"
          >
            Tercih kaydetme yakında aktif olacak. Aşağıdaki seçimler önizleme
            amaçlıdır.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/ilgi-alanlarim" />
          </aside>

          <div className="min-w-0 space-y-8">
            <section
              aria-labelledby="genres-heading"
              className="rounded-large border border-border bg-surface p-5 sm:p-6"
            >
              <h2 id="genres-heading" className="text-h3 text-foreground">
                Sevdiğin Türler
              </h2>
              <p className="mt-2 text-body text-muted">
                Okumaktan keyif aldığın türleri seç.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {genres.map((genre) => (
                  <PreferenceChip
                    key={genre.label}
                    label={genre.label}
                    selected={genre.selected}
                  />
                ))}
              </div>
            </section>

            <section
              aria-labelledby="purposes-heading"
              className="rounded-large border border-border bg-surface p-5 sm:p-6"
            >
              <h2 id="purposes-heading" className="text-h3 text-foreground">
                Ne İçin Okuyorsun?
              </h2>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {readingPurposes.map((purpose) => (
                  <PreferenceChip
                    key={purpose.label}
                    label={purpose.label}
                    selected={purpose.selected}
                  />
                ))}
              </div>
            </section>

            <section
              aria-labelledby="tempo-heading"
              className="rounded-large border border-border bg-surface p-5 sm:p-6"
            >
              <h2 id="tempo-heading" className="text-h3 text-foreground">
                Okuma Tercihin
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {readingTempos.map((tempo) => (
                  <SelectableOption
                    key={tempo.label}
                    label={tempo.label}
                    selected={tempo.selected}
                  />
                ))}
              </div>
            </section>

            <section
              aria-labelledby="level-heading"
              className="rounded-large border border-border bg-surface p-5 sm:p-6"
            >
              <h2 id="level-heading" className="text-h3 text-foreground">
                Okuma Seviyesi
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {readingLevels.map((level) => (
                  <SelectableOption
                    key={level.label}
                    label={level.label}
                    description={level.description}
                    selected={level.selected}
                  />
                ))}
              </div>
            </section>

            <section
              aria-labelledby="format-heading"
              className="rounded-large border border-border bg-surface p-5 sm:p-6"
            >
              <h2 id="format-heading" className="text-h3 text-foreground">
                Kitap Formatı
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {bookFormats.map((format) => (
                  <SelectableOption
                    key={format.label}
                    label={format.label}
                    selected={format.selected}
                  />
                ))}
              </div>
            </section>

            <aside
              aria-labelledby="ai-note-heading"
              className="rounded-large border border-border bg-surface px-5 py-5 sm:px-6"
            >
              <h2
                id="ai-note-heading"
                className="text-body font-semibold text-foreground"
              >
                Kitapix AI ile daha kişisel keşif
              </h2>
              <p className="mt-2 text-body-small text-muted">
                İlgi alanların, okuma tercihlerinin ve ilerideki kullanım
                davranışlarının birlikte değerlendirilmesi daha uygun kitap
                önerileri sunulmasına yardımcı olabilir.
              </p>
            </aside>

            <section aria-labelledby="preview-heading" className="space-y-5">
              <div>
                <h2 id="preview-heading" className="text-h3 text-foreground">
                  Tercihlerine Göre
                </h2>
                <p className="mt-2 text-body text-muted">
                  Bu tercihlerle sana önerilebilecek kitaplardan bazıları.
                </p>
              </div>
              <BookGrid books={previewBooks} className="xl:grid-cols-4" />
            </section>

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button type="button" variant="primary" size="md" disabled title="Yakında">
                Tercihlerimi Kaydet (Yakında)
              </Button>
              <Button type="button" variant="ghost" size="sm" disabled title="Yakında">
                Seçimleri Sıfırla (Yakında)
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
