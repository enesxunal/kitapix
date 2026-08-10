import Link from "next/link";

const accountNavItems = [
  { label: "Hesap Özeti", href: "/hesabim" },
  { label: "Siparişlerim", href: "/hesabim/siparisler" },
  { label: "Favorilerim", href: "/hesabim/favoriler" },
  { label: "Listelerim", href: "/hesabim/listeler" },
  { label: "Adreslerim", href: "/hesabim/adresler" },
  { label: "Ödeme Yöntemlerim", href: "/hesabim/odeme-yontemleri" },
  { label: "İlgi Alanlarım", href: "/hesabim/ilgi-alanlarim" },
  { label: "Bildirim Ayarları" },
] as const;

type AccountNavProps = {
  activeHref: string;
};

export function AccountNav({ activeHref }: AccountNavProps) {
  return (
    <nav aria-label="Hesap menüsü">
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {accountNavItems.map((item) => {
          const isActive = "href" in item && item.href === activeHref;
          const className = [
            "whitespace-nowrap rounded-medium px-3 py-2 text-body-small transition-colors",
            isActive
              ? "bg-surface-muted font-semibold text-foreground"
              : "font-medium text-muted",
          ].join(" ");

          return (
            <li key={item.label}>
              {"href" in item ? (
                <Link
                  href={item.href}
                  className={className}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={className} aria-disabled="true">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
