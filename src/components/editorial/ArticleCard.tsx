import Link from "next/link";

type ArticleCardProps = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  showImage?: boolean;
  href?: string;
};

export function ArticleCard({
  category,
  title,
  excerpt,
  date,
  readingTime,
  showImage = true,
  href,
}: ArticleCardProps) {
  const titleNode = href ? (
    <Link href={href} className="hover:text-primary">
      {title}
    </Link>
  ) : (
    title
  );

  return (
    <article className="flex h-full flex-col">
      {showImage ? (
        <div
          className="mb-5 aspect-[16/10] w-full rounded-large bg-surface-muted"
          aria-hidden="true"
        />
      ) : null}

      <p className="text-caption font-medium tracking-wide text-muted uppercase">
        {category}
      </p>

      <h3 className="mt-2 text-h3 text-foreground">{titleNode}</h3>

      <p className="mt-3 flex-1 text-body-small text-muted">{excerpt}</p>

      <p className="mt-5 text-caption text-muted">
        <time dateTime={date}>{formatDisplayDate(date)}</time>
        <span aria-hidden="true"> · </span>
        <span>{readingTime}</span>
      </p>
    </article>
  );
}

function formatDisplayDate(isoDate: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
