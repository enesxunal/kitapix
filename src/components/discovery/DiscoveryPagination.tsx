import Link from "next/link";

type PaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
};

export function DiscoveryPagination({
  basePath,
  page,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevHref =
    page <= 2 ? basePath : `${basePath}?page=${page - 1}`;
  const nextHref = `${basePath}?page=${page + 1}`;

  return (
    <nav
      aria-label="Sayfalama"
      className="mt-10 flex items-center justify-center gap-3"
    >
      {page > 1 ? (
        <Link
          href={prevHref}
          className="inline-flex h-10 items-center rounded-medium border border-border bg-surface px-4 text-body-small font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          Önceki
        </Link>
      ) : (
        <span className="inline-flex h-10 items-center rounded-medium border border-border px-4 text-body-small text-muted opacity-50">
          Önceki
        </span>
      )}

      <p className="text-body-small text-muted">
        Sayfa {page} / {totalPages}
      </p>

      {page < totalPages ? (
        <Link
          href={nextHref}
          className="inline-flex h-10 items-center rounded-medium border border-border bg-surface px-4 text-body-small font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          Sonraki
        </Link>
      ) : (
        <span className="inline-flex h-10 items-center rounded-medium border border-border px-4 text-body-small text-muted opacity-50">
          Sonraki
        </span>
      )}
    </nav>
  );
}

export function parsePageParam(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
}

export const DISCOVERY_PAGE_SIZE = 24;
