import type { OrderStatus } from "@/components/account/OrderStatusBadge";
import { createClient } from "@/lib/supabase/server";

export type OrderItemSnapshot = {
  id: string;
  bookId: string | null;
  title: string;
  slug: string | null;
  cover: string;
  publisherId: string | null;
  publisherName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderPublisherGroup = {
  publisher: string;
  items: OrderItemSnapshot[];
};

export type OrderSummary = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  subtotal: number;
  shippingTotal: number;
  discountTotal: number;
  grandTotal: number;
  shippingMethod: string;
  shippingMethodLabel: string;
  shippingTitle: string | null;
  shippingFirstName: string;
  shippingLastName: string;
  shippingPhone: string | null;
  shippingAddressLine: string;
  shippingDistrict: string | null;
  shippingCity: string;
  shippingPostalCode: string | null;
  shippingCountryCode: string;
  createdAt: string;
  items: OrderItemSnapshot[];
};

type OrderRow = {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string | null;
  subtotal: number;
  shipping_total: number;
  discount_total: number;
  grand_total: number;
  shipping_method: string;
  shipping_method_label: string;
  shipping_title: string | null;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_phone: string | null;
  shipping_address_line: string;
  shipping_district: string | null;
  shipping_city: string;
  shipping_postal_code: string | null;
  shipping_country_code: string;
  created_at: string;
};

type OrderItemRow = {
  id: string;
  book_id: string | null;
  book_title: string;
  book_slug: string | null;
  cover_url: string | null;
  publisher_id: string | null;
  publisher_name: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
};

const ORDER_SELECT = `
  id,
  order_number,
  status,
  payment_status,
  payment_method,
  subtotal,
  shipping_total,
  discount_total,
  grand_total,
  shipping_method,
  shipping_method_label,
  shipping_title,
  shipping_first_name,
  shipping_last_name,
  shipping_phone,
  shipping_address_line,
  shipping_district,
  shipping_city,
  shipping_postal_code,
  shipping_country_code,
  created_at
` as const;

const ORDER_ITEM_SELECT = `
  id,
  book_id,
  book_title,
  book_slug,
  cover_url,
  publisher_id,
  publisher_name,
  quantity,
  unit_price,
  line_total
` as const;

function mapItem(row: OrderItemRow): OrderItemSnapshot {
  return {
    id: row.id,
    bookId: row.book_id,
    title: row.book_title,
    slug: row.book_slug,
    cover: row.cover_url ?? "",
    publisherId: row.publisher_id,
    publisherName: row.publisher_name?.trim() || "Diğer",
    quantity: row.quantity,
    unitPrice: Number(row.unit_price),
    lineTotal: Number(row.line_total),
  };
}

function mapOrder(row: OrderRow, items: OrderItemSnapshot[]): OrderSummary {
  return {
    id: row.id,
    orderNumber: row.order_number,
    status: row.status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method,
    subtotal: Number(row.subtotal),
    shippingTotal: Number(row.shipping_total),
    discountTotal: Number(row.discount_total),
    grandTotal: Number(row.grand_total),
    shippingMethod: row.shipping_method,
    shippingMethodLabel: row.shipping_method_label,
    shippingTitle: row.shipping_title,
    shippingFirstName: row.shipping_first_name,
    shippingLastName: row.shipping_last_name,
    shippingPhone: row.shipping_phone,
    shippingAddressLine: row.shipping_address_line,
    shippingDistrict: row.shipping_district,
    shippingCity: row.shipping_city,
    shippingPostalCode: row.shipping_postal_code,
    shippingCountryCode: row.shipping_country_code,
    createdAt: row.created_at,
    items,
  };
}

export function mapOrderStatus(status: string): OrderStatus {
  switch (status) {
    case "shipped":
      return "Kargoda";
    case "delivered":
      return "Teslim Edildi";
    case "cancelled":
      return "İptal Edildi";
    case "pending":
    case "processing":
    default:
      return "Hazırlanıyor";
  }
}

export function formatOrderDate(iso: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatPaymentStatus(status: string): string {
  switch (status) {
    case "paid":
      return "Ödeme Alındı";
    case "failed":
      return "Ödeme Başarısız";
    case "refunded":
      return "İade Edildi";
    case "unpaid":
    default:
      return "Ödeme Bekleniyor";
  }
}

export function groupOrderItemsByPublisher(
  items: OrderItemSnapshot[],
): OrderPublisherGroup[] {
  const groups: OrderPublisherGroup[] = [];

  for (const item of items) {
    const existing = groups.find(
      (group) => group.publisher === item.publisherName,
    );

    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ publisher: item.publisherName, items: [item] });
    }
  }

  return groups;
}

async function loadItemsForOrders(
  supabase: Awaited<ReturnType<typeof createClient>>,
  orderIds: string[],
): Promise<Map<string, OrderItemSnapshot[]>> {
  const map = new Map<string, OrderItemSnapshot[]>();

  if (orderIds.length === 0) {
    return map;
  }

  const { data, error } = await supabase
    .from("order_items")
    .select(`${ORDER_ITEM_SELECT}, order_id`)
    .in("order_id", orderIds)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to load order items");
  }

  for (const row of (data ?? []) as (OrderItemRow & { order_id: string })[]) {
    const list = map.get(row.order_id) ?? [];
    list.push(mapItem(row));
    map.set(row.order_id, list);
  }

  return map;
}

export async function getUserOrders(): Promise<OrderSummary[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_SELECT)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load orders");
  }

  const rows = (data ?? []) as OrderRow[];
  const itemsByOrder = await loadItemsForOrders(
    supabase,
    rows.map((row) => row.id),
  );

  return rows.map((row) => mapOrder(row, itemsByOrder.get(row.id) ?? []));
}

export async function getOrderById(
  orderIdOrNumber: string,
): Promise<OrderSummary | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      orderIdOrNumber,
    );

  let query = supabase
    .from("orders")
    .select(ORDER_SELECT)
    .eq("user_id", user.id);

  query = isUuid
    ? query.eq("id", orderIdOrNumber)
    : query.eq("order_number", orderIdOrNumber);

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error("Failed to load order");
  }

  if (!data) {
    return null;
  }

  const row = data as OrderRow;
  const itemsByOrder = await loadItemsForOrders(supabase, [row.id]);
  return mapOrder(row, itemsByOrder.get(row.id) ?? []);
}
