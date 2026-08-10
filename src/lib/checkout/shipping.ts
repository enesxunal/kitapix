export const SHIPPING_METHODS = {
  standard: {
    key: "standard",
    label: "Standart Teslimat",
    description: "2–4 iş günü",
    total: 0,
  },
  express: {
    key: "express",
    label: "Hızlı Teslimat",
    description: "1–2 iş günü",
    total: 49.9,
  },
} as const;

export type ShippingMethodKey = keyof typeof SHIPPING_METHODS;

export function isShippingMethodKey(value: string): value is ShippingMethodKey {
  return value === "standard" || value === "express";
}

export function getShippingTotal(method: ShippingMethodKey): number {
  return SHIPPING_METHODS[method].total;
}
