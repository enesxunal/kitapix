import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  CartIcon,
  HeartIcon,
  SearchIcon,
  SparklesIcon,
  UserIcon,
} from "@/components/icons/Icons";
import { Input } from "@/components/ui/Input";
import { getCartCount } from "@/lib/data/cart";
import { createClient } from "@/lib/supabase/server";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";

const navItems = [
  { label: "Keşfet", href: "/kitaplar" },
  { label: "İçerikler", href: "/icerikler" },
  { label: "Kategoriler", href: "/kategoriler" },
  { label: "Yeni Çıkanlar", href: "/yeni-cikanlar" },
  { label: "Çok Satanlar", href: "/cok-satanlar" },
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
    {
      label: "Favoriler",
      href: "/hesabim/favoriler",
      icon: HeartIcon,
    },
    {
      label: accountLabel,
      href: accountHref,
      title: accountTitle,
      icon: UserIcon,
    },
    {
      label: "Sepet",
      href: "/sepet",
      icon: CartIcon,
      count: cartCount > 0 ? cartCount : undefined,
    },
  ] as const;

  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex items-center gap-3 py-3 sm:gap-4 sm:py-4">
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
          <div className="relative">
            <SearchIcon
              size={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
            />
            <Input
              id="header-search"
              type="search"
              name="q"
              placeholder="Kitap, yazar veya ne okumak istediğini ara…"
              aria-label="Kitap ara"
              className="h-10 border-border bg-accent-soft/60 pl-10"
            />
          </div>
        </form>

        <nav aria-label="Hesap menüsü" className="ml-auto shrink-0 md:ml-0">
          <ul className="flex items-center gap-1 sm:gap-2">
            <li className="md:hidden">
              <Link
                href="/kitaplar"
                aria-label="Kitap ara"
                title="Kitap ara"
                className="inline-flex size-10 items-center justify-center rounded-medium text-foreground transition-colors hover:bg-accent-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
              >
                <SearchIcon size={20} />
              </Link>
            </li>
            <li>
              <Link
                href="/ai-asistan"
                className="inline-flex h-10 items-center gap-1.5 rounded-medium bg-primary px-2.5 text-body-small font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 sm:px-3"
              >
                <SparklesIcon size={18} className="shrink-0" />
                <span className="hidden sm:inline">AI Asistan</span>
              </Link>
            </li>
            {utilityItems.map((item) => {
              const label =
                "title" in item && item.title ? item.title : item.label;
              const count = "count" in item ? item.count : undefined;
              const ariaLabel =
                count !== undefined ? `${label} (${count})` : label;
              const Icon = item.icon;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-label={ariaLabel}
                    title={ariaLabel}
                    className="relative inline-flex size-10 items-center justify-center rounded-medium text-foreground transition-colors hover:bg-accent-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                  >
                    <Icon size={20} />
                    {count !== undefined ? (
                      <span className="absolute -top-0.5 -right-0.5 inline-flex min-w-4 items-center justify-center rounded-small bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-foreground">
                        {count > 99 ? "99+" : count}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
            <li className="md:hidden">
              <MobileNav items={navItems} />
            </li>
          </ul>
        </nav>
      </Container>

      <div className="hidden border-t border-border bg-accent-soft/40 md:block">
        <Container>
          <nav aria-label="Ana menü" className="overflow-x-auto">
            <ul className="flex items-center gap-1 py-2.5">
              {navItems.map((item) => (
                <li key={item.label} className="shrink-0">
                  <Link
                    href={item.href}
                    className="inline-flex rounded-medium px-3 py-1.5 text-body-small font-medium text-primary transition-colors hover:bg-surface hover:text-primary-hover"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
