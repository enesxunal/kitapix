import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";
import { COMPANY } from "@/lib/company";
import { Container } from "./Container";

const footerGroups = [
  {
    title: "Keşfet",
    links: [
      { label: "Kitaplar", href: "/kitaplar" },
      { label: "Kategoriler", href: "/kategoriler" },
      { label: "Çok Satanlar", href: "/cok-satanlar" },
      { label: "Yeni Çıkanlar", href: "/yeni-cikanlar" },
      { label: "İçerikler", href: "/icerikler" },
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "İletişim", href: "/iletisim" },
      { label: "Teslimat ve Kargo", href: "/teslimat-kargo" },
      { label: "İptal ve İade", href: "/iptal-iade" },
    ],
  },
  {
    title: "Yasal",
    links: [
      {
        label: "Mesafeli Satış Sözleşmesi",
        href: "/mesafeli-satis-sozlesmesi",
      },
      {
        label: "Gizlilik ve Güvenlik",
        href: "/gizlilik-guvenlik",
      },
      {
        label: "KVKK Aydınlatma Metni",
        href: "/kvkk-aydinlatma-metni",
      },
      { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
      { label: "Çerez Politikası", href: "/cerez-politikasi" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.35fr]">
          <div className="max-w-sm space-y-4">
            <Link href="/" aria-label="Kitapix ana sayfa">
              <BrandLogo className="h-7" />
            </Link>
            <p className="text-body-small text-muted">
              Modern kitap keşif ve e-ticaret platformu. Ne okumak istediğini
              anlat, sana uygun kitapları bulalım.
            </p>
            <address className="space-y-1 text-body-small text-muted not-italic">
              <p className="font-medium text-foreground">{COMPANY.legalName}</p>
              <p>{COMPANY.address}</p>
              <p>
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="hover:text-foreground"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="break-all hover:text-foreground"
                >
                  {COMPANY.email}
                </a>
              </p>
            </address>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} bağlantıları`}>
              <h2 className="text-body-small font-semibold text-foreground">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-body-small text-muted transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <PaymentMethods />

        <div className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-foreground">
              Kitapix
            </Link>
            . Tüm hakları saklıdır.
          </p>
          <p className="text-caption text-muted">
            {COMPANY.taxOffice} · VKN {COMPANY.taxNumber}
          </p>
        </div>
      </Container>
    </footer>
  );
}
