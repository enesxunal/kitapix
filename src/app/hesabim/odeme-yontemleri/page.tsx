import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

function PaymentMethodsEmptyState() {
  return (
    <section
      aria-labelledby="payment-methods-empty-heading"
      className="rounded-large border border-border bg-surface px-6 py-12 text-center"
    >
      <h2
        id="payment-methods-empty-heading"
        className="text-h3 text-foreground"
      >
        Ödeme entegrasyonu henüz aktif değil
      </h2>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">
        Kart kaydetme ve kayıtlı ödeme yöntemleri yakında eklenecek. Sipariş
        akışında ödeme sağlayıcısı bağlandığında burada görünecek.
      </p>
      <div className="mt-6">
        <Button type="button" variant="primary" size="md" disabled title="Yakında">
          Kart Ekle (Yakında)
        </Button>
      </div>
    </section>
  );
}

export default function PaymentMethodsPage() {
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
              Ödeme Yöntemlerim
            </li>
          </ol>
        </nav>

        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-h1 text-foreground">Ödeme Yöntemlerim</h1>
            <p className="mt-3 text-body-large text-muted">
              Kayıtlı ödeme yöntemleri ödeme entegrasyonu hazır olduğunda burada
              yönetilecek.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-body-small font-medium text-muted">
              0 kayıtlı kart
            </p>
            <Button type="button" variant="primary" size="md" disabled title="Yakında">
              Yeni Kart Ekle (Yakında)
            </Button>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/odeme-yontemleri" />
          </aside>

          <div className="min-w-0 space-y-8">
            <PaymentMethodsEmptyState />

            <aside
              aria-labelledby="payment-security-heading"
              className="rounded-large border border-border bg-surface px-5 py-5 sm:px-6"
            >
              <h2
                id="payment-security-heading"
                className="text-body font-semibold text-foreground"
              >
                Ödeme Güvenliği
              </h2>
              <p className="mt-2 text-body-small text-muted">
                Kart bilgileri yalnızca güvenli ödeme altyapısı üzerinden
                işlenecek. Şu an demo/sahte kart bilgisi gösterilmiyor.
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
