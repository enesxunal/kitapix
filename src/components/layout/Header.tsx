import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Input } from "@/components/ui/Input";
import { getCartCount } from "@/lib/data/cart";
import { createClient } from "@/lib/supabase/server";
import { Container } from "./Container";

const navItems = [
  { label: "Keşfet", href: "/kitaplar" },
  { label: "İçerikler", href: "/icerikler" },
  { label: "Kategoriler" },
  { label: "Yeni Çıkanlar" },
  { label: "Çok Satanlar" },
] as const;

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let accountLabel = "Giriş";
  let accountHref = "/giris";
  let accountTitle = "Giriş";
  let cartCount = 0;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, first_name, last_name")
      .eq("id", user.id)
      .maybeSingle();

    const displayName =
      profile?.display_name?.trim() ||
      [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim() ||
      null;

    accountLabel = "Hesabım";
    accountHref = "/hesabim";
    accountTitle = displayName ? `${displayName} — Hesabım` : "Hesabım";
    cartCount = await getCartCount();
  }

  const utilityItems = [
    { label: "Favoriler", symbol: "♡", href: "/hesabim/favoriler" },
    {
      label: accountLabel,
      symbol: "○",
      href: accountHref,
      title: accountTitle,
    },
    {
      label: "Sepet",
      symbol: "◫",
      href: "/sepet",
      count: cartCount > 0 ? cartCount : undefined,
    },
  ] as const;

  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex items-center gap-4 py-4 sm:gap-6">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Kitapix ana sayfa"
        >
          <BrandLogo priority className="h-7 sm:h-8" />
        </Link>

        <form
          action="/kitaplar"
          method="get"
          className="hidden min-w-0 flex-1 md:block"
          role="search"
        >
          <Input
            id="header-search"
            type="search"
            name="q"
            placeholder="Kitap, yazar veya ne okumak istediğini ara…"
            aria-label="Kitap ara"
            className="h-10 border-border bg-accent-soft/60"
          />
        </form>

        <nav aria-label="Hesap menüsü" className="ml-auto shrink-0 md:ml-0">
          <ul className="flex items-center gap-2 sm:gap-3">
            <li>
              <Link
                href="/ai-asistan"
                className="inline-flex h-10 items-center gap-1.5 rounded-medium bg-primary px-3 text-body-small font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
              >
                <span aria-hidden="true">✦</span>
                <span className="hidden sm:inline">AI Asistan</span>
              </Link>
            </li>
            {utilityItems.map((item) => {
              const label =
                "title" in item && item.title ? item.title : item.label;
              const count = "count" in item ? item.count : undefined;
              const ariaLabel =
                count !== undefined ? `${label} (${count})` : label;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-label={ariaLabel}
                    title={ariaLabel}
                    className="relative inline-flex size-10 items-center justify-center rounded-medium text-foreground transition-colors hover:bg-accent-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                  >
                    <span aria-hidden="true" className="text-body">
                      {item.symbol}
                    </span>
                    {count !== undefined ? (
                      <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-small bg-primary px-1 text-[10px] font-semibold leading-4 text-primary-foreground">
                        {count > 99 ? "99+" : count}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-border bg-accent-soft/40">
        <Container>
          <nav aria-label="Ana menü" className="overflow-x-auto">
            <ul className="flex items-center gap-1 py-2.5">
              {navItems.map((item) => (
                <li key={item.label} className="shrink-0">
                  {"href" in item ? (
                    <Link
                      href={item.href}
                      className="inline-flex rounded-medium px-3 py-1.5 text-body-small font-medium text-primary transition-colors hover:bg-surface hover:text-primary-hover"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="inline-flex rounded-medium px-3 py-1.5 text-body-small font-medium text-muted">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
