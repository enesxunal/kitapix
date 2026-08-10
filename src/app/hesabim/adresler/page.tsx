import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { AddressesManager } from "@/components/account/AddressesManager";
import { Container } from "@/components/layout/Container";
import { requireUser } from "@/lib/auth/require-user";
import { getAddresses } from "@/lib/data/addresses";

export default async function AddressesPage() {
  await requireUser();

  const addresses = await getAddresses();
  const addressCount = addresses.length;

  return (
    <div className="bg-background py-8 md:py-12">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-small text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/hesabim" className="hover:text-foreground">
                Hesabım
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              Adreslerim
            </li>
          </ol>
        </nav>

        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-h1 text-foreground">Adreslerim</h1>
            <p className="mt-3 text-body-large text-muted">
              Teslimat ve fatura adreslerini buradan yönetebilirsin.
            </p>
          </div>
          <p className="text-body-small font-medium text-muted">
            {addressCount} kayıtlı adres
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/adresler" />
          </aside>

          <div className="min-w-0 space-y-8">
            <AddressesManager addresses={addresses} />

            <aside
              aria-labelledby="billing-note-heading"
              className="rounded-large border border-border bg-surface px-5 py-5 sm:px-6"
            >
              <h2
                id="billing-note-heading"
                className="text-body font-semibold text-foreground"
              >
                Fatura Adresi
              </h2>
              <p className="mt-2 text-body-small text-muted">
                Ödeme sırasında teslimat adresinden farklı bir fatura adresi
                seçebilirsin.
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
