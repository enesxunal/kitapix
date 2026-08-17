import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  description: string;
  sections: LegalSection[];
  updatedAt?: string;
};

export function LegalPage({
  title,
  description,
  sections,
  updatedAt = "17 Ağustos 2026",
}: LegalPageProps) {
  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-body-small text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {title}
            </li>
          </ol>
        </nav>

        <article className="mx-auto max-w-4xl rounded-large border border-border bg-surface p-6 shadow-sm sm:p-8 md:p-10">
          <header className="border-b border-border pb-6">
            <h1 className="text-h1 text-foreground">{title}</h1>
            <p className="mt-3 text-body-large text-muted">{description}</p>
            <p className="mt-3 text-caption text-muted">
              Son güncelleme: {updatedAt}
            </p>
          </header>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-h3 text-foreground">{section.title}</h2>
                <div className="mt-3 space-y-3 text-body text-muted [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </div>
  );
}
