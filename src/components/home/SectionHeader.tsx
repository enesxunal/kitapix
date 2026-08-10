import Link from "next/link";

type SectionHeaderProps = {
  id: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
};

export function SectionHeader({
  id,
  title,
  description,
  linkHref,
  linkLabel,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="text-h2 text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-body text-muted">{description}</p>
        ) : null}
      </div>

      {linkHref && linkLabel ? (
        <Link
          href={linkHref}
          className="shrink-0 text-body-small font-medium text-primary hover:text-primary-hover"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
