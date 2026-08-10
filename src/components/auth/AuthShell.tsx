import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="bg-background py-10 md:py-16">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] md:items-center md:gap-16 lg:gap-20">
          <aside className="hidden md:block">
            <p className="text-h2 text-foreground">Doğru kitap, doğru zamanda.</p>
            <p className="mt-4 max-w-sm text-body-large text-muted">
              Kitapix ile kitapları yalnızca arama; ne okumak istediğini anlat ve
              keşfet.
            </p>
          </aside>

          <div className="w-full max-w-[28rem] justify-self-center md:justify-self-end">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
