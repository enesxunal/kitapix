export type OrderStatus =
  | "Hazırlanıyor"
  | "Kargoda"
  | "Kargoya Verildi"
  | "Teslim Edildi"
  | "İptal Edildi";

const statusClasses: Record<OrderStatus, string> = {
  Hazırlanıyor: "border-warning/25 bg-warning/10 text-warning",
  Kargoda: "border-accent/40 bg-accent-soft text-foreground",
  "Kargoya Verildi": "border-accent/40 bg-accent-soft text-foreground",
  "Teslim Edildi": "border-success/25 bg-success/10 text-success",
  "İptal Edildi": "border-danger/25 bg-danger/10 text-danger",
};

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex rounded-medium border px-2.5 py-1 text-caption font-medium",
        statusClasses[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}
