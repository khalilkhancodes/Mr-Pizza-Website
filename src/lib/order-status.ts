export const VALID_STATUSES = ['placed', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'] as const;
export type OrderStatus = typeof VALID_STATUSES[number];

export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready', 'cancelled'],
  ready: ['delivered'],
  delivered: [],
  cancelled: [],
};

export const STATUS_ORDER: Record<OrderStatus, number> = {
  placed: 0,
  confirmed: 1,
  preparing: 2,
  ready: 3,
  delivered: 4,
  cancelled: 5,
};

export const PROGRESS_WIDTHS: Record<OrderStatus, number> = {
  placed: 20,
  confirmed: 40,
  preparing: 60,
  ready: 80,
  delivered: 100,
  cancelled: 0,
};

export function getAllowedNextStatuses(currentStatus: string): OrderStatus[] {
  return STATUS_TRANSITIONS[currentStatus as OrderStatus] ?? [];
}
