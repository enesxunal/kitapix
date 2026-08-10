"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons/Icons";

type NavItem =
  | { label: string; href: string }
  | { label: string; soon: true };

type MobileNavProps = {
  items: readonly NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-medium text-foreground transition-colors hover:bg-accent-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
      >
        {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden" role="presentation">
          <button
            type="button"
            aria-label="Menüyü kapat"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Ana menü"
            className="absolute inset-x-0 top-0 border-b border-border bg-surface px-4 pt-4 pb-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-body font-semibold text-foreground">Menü</p>
              <button
                type="button"
                aria-label="Menüyü kapat"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-medium text-foreground transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <form action="/kitaplar" method="get" role="search" className="mb-4">
              <label htmlFor="mobile-search" className="sr-only">
                Kitap ara
              </label>
              <input
                id="mobile-search"
                type="search"
                name="q"
                placeholder="Kitap veya yazar ara…"
                className="h-11 w-full rounded-medium border border-border bg-accent-soft/60 px-3 text-body text-foreground placeholder:text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              />
            </form>

            <nav aria-label="Mobil ana menü">
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.label}>
                    {"href" in item ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex rounded-medium px-3 py-3 text-body font-medium text-foreground transition-colors hover:bg-accent-soft"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="flex items-center justify-between rounded-medium px-3 py-3 text-body font-medium text-muted">
                        {item.label}
                        <span className="text-caption">Yakında</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
