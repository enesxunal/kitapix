import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type DemoAddress = {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2: string;
  phone: string;
  isDefault: boolean;
};

const addresses: DemoAddress[] = [
  {
    id: "home",
    label: "Ev",
    name: "Deniz Kaya",
    line1: "Bağdat Cad. No: 120 D: 8",
    line2: "Kadıköy / İstanbul",
    phone: "+90 555 000 00 00",
    isDefault: true,
  },
  {
    id: "work",
    label: "İş",
    name: "Deniz Kaya",
    line1: "Büyükdere Cad. No: 45",
    line2: "Şişli / İstanbul",
    phone: "+90 555 000 00 00",
    isDefault: false,
  },
];

const addressCount = addresses.length;
const showEmptyState = false;

function AddressesEmptyState() {
  return (
    <section
      aria-labelledby="addresses-empty-heading"
      className="rounded-large border border-border bg-surface px-6 py-12 text-center"
    >
      <h2 id="addresses-empty-heading" className="text-h3 text-foreground">
        Henüz kayıtlı adresin yok.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">
        Siparişlerini daha hızlı tamamlamak için teslimat adresi ekleyebilirsin.
      </p>
      <div className="mt-6">
        <Button type="button" variant="primary" size="md">
          Adres Ekle
        </Button>
      </div>
    </section>
  );
}

function AddressCard({ address }: { address: DemoAddress }) {
  return (
    <article className="flex h-full flex-col rounded-large border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-body font-semibold text-foreground">
          {address.label}
        </h3>
        {address.isDefault ? (
          <span className="inline-flex rounded-medium border border-accent/40 bg-accent-soft px-2.5 py-1 text-caption font-medium text-foreground">
            Varsayılan
          </span>
        ) : null}
      </div>

      <div className="mt-4 space-y-1 text-body text-foreground">
        <p className="font-medium">{address.name}</p>
        <p className="text-muted">{address.line1}</p>
        <p className="text-muted">{address.line2}</p>
      </div>

      <p className="mt-3 text-body-small text-muted">
        <span className="sr-only">Telefon: </span>
        {address.phone}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {!address.isDefault ? (
          <Button type="button" variant="secondary" size="sm">
            Varsayılan Yap
          </Button>
        ) : null}
        <Button type="button" variant="secondary" size="sm">
          Düzenle
        </Button>
        <Button type="button" variant="ghost" size="sm">
          Sil
        </Button>
      </div>
    </article>
  );
}

export default function AddressesPage() {
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
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-body-small font-medium text-muted">
              {addressCount} kayıtlı adres
            </p>
            <Button type="button" variant="primary" size="md">
              Yeni Adres Ekle
            </Button>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/adresler" />
          </aside>

          <div className="min-w-0 space-y-8">
            {showEmptyState ? (
              <AddressesEmptyState />
            ) : (
              <section aria-labelledby="addresses-list-heading">
                <h2 id="addresses-list-heading" className="sr-only">
                  Kayıtlı adresler
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {addresses.map((address) => (
                    <li key={address.id}>
                      <AddressCard address={address} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

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
