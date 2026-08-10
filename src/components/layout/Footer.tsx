import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "./Container";

const footerLinks = [
  { label: "Keşfet" },
  { label: "Yardım" },
  { label: "Kurumsal" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <Link href="/" aria-label="Kitapix ana sayfa">
              <BrandLogo className="h-7" />
            </Link>
            <p className="text-body-small text-muted">
              Modern kitap keşif ve e-ticaret platformu. Ne okumak istediğini anlat, sana uygun
              kitapları bulalım.
            </p>
          </div>

          <nav aria-label="Alt menü">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <span className="text-body-small font-medium text-muted">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-caption text-muted">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-foreground">
              Kitapix
            </Link>
            . Tüm hakları saklıdır.
          </p>
        </div>
      </Container>
    </footer>
  );
}
