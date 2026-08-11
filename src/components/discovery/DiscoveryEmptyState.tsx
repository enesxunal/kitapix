import Link from "next/link";
import { Button } from "@/components/ui/Button";

type DiscoveryEmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function DiscoveryEmptyState({
  title,
  description,
  actionHref = "/kitaplar",
  actionLabel = "Kitapları Keşfet",
}: DiscoveryEmptyStateProps) {
  return (
    <section className="rounded-large border border-border bg-surface px-6 py-12 text-center">
      <h2 className="text-h3 text-foreground">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">{description}</p>
      {actionHref && actionLabel ? (
        <div className="mt-6">
          <Link href={actionHref}>
            <Button type="button" variant="primary" size="md">
              {actionLabel}
            </Button>
          </Link>
        </div>
      ) : null}
    </section>
  );
}
