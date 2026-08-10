import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type DemoPaymentCard = {
  id: string;
  label: string;
  brand: string;
  maskedNumber: string;
  holderName: string;
  expiry: string;
  isDefault: boolean;
};

const paymentCards: DemoPaymentCard[] = [
  {
    id: "personal",
    label: "Kişisel Kart",
    brand: "Visa",
    maskedNumber: "**** **** **** 4242",
    holderName: "Deniz Kaya",
    expiry: "08/29",
    isDefault: true,
  },
  {
    id: "other",
    label: "Diğer Kart",
    brand: "Mastercard",
    maskedNumber: "**** **** **** 8814",
    holderName: "Deniz Kaya",
    expiry: "03/28",
    isDefault: false,
  },
];

const paymentCardCount = paymentCards.length;
const showEmptyState = false;

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
        Henüz kayıtlı ödeme yöntemin yok.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">
        Siparişlerini daha hızlı tamamlamak için bir ödeme yöntemi
        ekleyebilirsin.
      </p>
      <div className="mt-6">
        <Button type="button" variant="primary" size="md">
          Kart Ekle
        </Button>
      </div>
    </section>
  );
}

function PaymentCard({ card }: { card: DemoPaymentCard }) {
  return (
    <article className="flex h-full flex-col rounded-large border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-body font-semibold text-foreground">
          {card.label}
        </h3>
        {card.isDefault ? (
          <span className="inline-flex rounded-medium border border-accent/40 bg-accent-soft px-2.5 py-1 text-caption font-medium text-foreground">
            Varsayılan
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-body-small text-muted">{card.brand}</p>

      <p
        className="mt-4 font-mono text-body tracking-wide text-foreground"
        aria-label={`Kart numarası ${card.maskedNumber}`}
      >
        {card.maskedNumber}
      </p>

      <div className="mt-4 space-y-1 text-body-small text-muted">
        <p>
          <span className="sr-only">Kart sahibi: </span>
          <span className="font-medium text-foreground">{card.holderName}</span>
        </p>
        <p>
          <span className="text-muted">Son kullanma: </span>
          <span className="text-foreground">{card.expiry}</span>
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {!card.isDefault ? (
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
              Kayıtlı ödeme yöntemlerini görüntüle ve sipariş sırasında
              kullanacağın kartları yönet.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-body-small font-medium text-muted">
              {paymentCardCount} kayıtlı kart
            </p>
            <Button type="button" variant="primary" size="md">
              Yeni Kart Ekle
            </Button>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-large border border-border bg-surface p-4 lg:p-5">
            <AccountNav activeHref="/hesabim/odeme-yontemleri" />
          </aside>

          <div className="min-w-0 space-y-8">
            {showEmptyState ? (
              <PaymentMethodsEmptyState />
            ) : (
              <section aria-labelledby="payment-methods-list-heading">
                <h2 id="payment-methods-list-heading" className="sr-only">
                  Kayıtlı ödeme yöntemleri
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {paymentCards.map((card) => (
                    <li key={card.id}>
                      <PaymentCard card={card} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

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
                Kayıtlı ödeme yöntemleri sipariş sürecini hızlandırmak için
                kullanılabilir. Kart bilgileri ödeme altyapısı üzerinden güvenli
                şekilde işlenmelidir.
              </p>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
