"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BookCard({ book }: BookCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showCover = Boolean(book.cover) && !imageFailed;
  const bookHref = `/kitap/${book.slug}`;

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={bookHref}
        className="relative block overflow-hidden rounded-large border border-border bg-surface-muted aspect-[2/3] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
        aria-label={`${book.title} detayına git`}
      >
        {showCover ? (
          <Image
            src={book.cover}
            alt={`${book.title} kitap kapağı`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 240px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-surface-muted px-4 text-center"
            aria-hidden="true"
          >
            <span className="text-caption text-muted">Kapak yok</span>
          </div>
        )}
      </Link>

      <div className="mt-3 flex flex-1 flex-col gap-2">
        {book.badge ? (
          <span className="inline-flex w-fit rounded-small bg-accent-soft px-2 py-0.5 text-caption font-medium text-primary">
            {book.badge}
          </span>
        ) : null}

        <div className="space-y-1">
          <h3 className="text-body font-semibold text-foreground line-clamp-2">
            <Link
              href={bookHref}
              className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
            >
              {book.title}
            </Link>
          </h3>
          <p className="text-body-small text-muted">{book.author}</p>
        </div>

        {typeof book.rating === "number" ? (
          <p className="text-caption text-muted">
            <span className="font-medium text-foreground">{book.rating.toFixed(1)}</span>
            {typeof book.reviewCount === "number" ? (
              <span> · {book.reviewCount} değerlendirme</span>
            ) : null}
          </p>
        ) : null}

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-body font-semibold text-foreground">{formatPrice(book.price)}</span>
          {typeof book.originalPrice === "number" && book.originalPrice > book.price ? (
            <span className="text-body-small text-muted line-through">
              {formatPrice(book.originalPrice)}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="flex-1"
            aria-label={`${book.title} sepete ekle`}
          >
            Sepete Ekle
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="px-3"
            aria-label={`${book.title} favorilere ekle`}
          >
            ♡
          </Button>
        </div>
      </div>
    </article>
  );
}
