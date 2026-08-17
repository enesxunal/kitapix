export function PaymentMethods() {
  return (
    <section
      aria-label="Desteklenen ödeme yöntemleri"
      className="rounded-medium border border-border bg-surface-muted/50 p-4"
    >
      <p className="text-caption font-semibold tracking-wide text-muted uppercase">
        Güvenli ödeme
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-small border border-border bg-surface px-3 py-2 text-body-small font-bold tracking-wide text-[#1434CB]">
          VISA
        </span>
        <span className="rounded-small border border-border bg-surface px-3 py-2 text-body-small font-bold text-foreground">
          Mastercard
        </span>
        <span className="rounded-small border border-border bg-surface px-3 py-2 text-body-small font-bold tracking-wide text-[#00A6A6]">
          TROY
        </span>
        <span className="rounded-small border border-border bg-surface px-3 py-2 text-body-small font-bold text-[#E30613]">
          AKÖde
        </span>
      </div>
      <p className="mt-3 text-caption text-muted">
        Ödeme işlemleri SSL ile korunan güvenli ödeme altyapısı üzerinden
        gerçekleştirilir.
      </p>
    </section>
  );
}
