import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Container } from "@/components/layout/Container";
import { requireUser } from "@/lib/auth/require-user";
import { getAddresses } from "@/lib/data/addresses";
import { getCart } from "@/lib/data/cart";

const checkoutSteps = ["Teslimat", "Kargo", "Ödeme"] as const;

export default async function CheckoutPage() {
  await requireUser();

  const [cart, addresses] = await Promise.all([getCart(), getAddresses()]);
  const cartItems = cart?.items ?? [];

  if (cartItems.length === 0) {
    redirect("/sepet");
  }

  const subtotal = cart?.subtotal ?? 0;
  const originalTotal = cart?.originalTotal ?? 0;

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
              <Link href="/sepet" className="hover:text-foreground">
                Sepet
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              Ödeme
            </li>
          </ol>
        </nav>

        <header className="max-w-2xl">
          <h1 className="text-h1 text-foreground">Siparişini Tamamla</h1>
          <p className="mt-3 text-body-large text-muted">
            Teslimat ve kargo bilgilerini kontrol ederek siparişini tamamla.
          </p>
        </header>

        <ol
          aria-label="Ödeme adımları"
          className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-small"
        >
          {checkoutSteps.map((step, index) => {
            const isActive = index === 0;

            return (
              <li key={step} className="flex items-center gap-3">
                {index > 0 ? (
                  <span className="text-border" aria-hidden="true">
                    /
                  </span>
                ) : null}
                <span
                  className={
                    isActive ? "font-semibold text-foreground" : "text-muted"
                  }
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="mr-1.5 tabular-nums" aria-hidden="true">
                    {index + 1}.
                  </span>
                  {step}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10">
          <CheckoutForm
            addresses={addresses}
            cartItems={cartItems}
            subtotal={subtotal}
            originalTotal={originalTotal}
          />
        </div>
      </Container>
    </div>
  );
}
