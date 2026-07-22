'use client'

import { useCallback } from 'react'

const STATUS_CONFIG = {
  placed: { label: 'Placed', color: 'badge-placed' },
  confirmed: { label: 'Confirmed', color: 'badge-confirmed' },
  delivered: { label: 'Delivered', color: 'badge-delivered' },
  cancelled: { label: 'Cancelled', color: 'badge-cancelled' },
} as const

const STATUS_ACTIONS: Record<string, string[]> = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: [],
}

interface OrderStatusSelectProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const submitForm = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.currentTarget.form?.requestSubmit()
  }, [])

  const actions = STATUS_ACTIONS[currentStatus] ?? []

  if (actions.length === 0) return null

  return (
    <form action={`/api/orders/${orderId}/status`} method="POST" className="flex items-center gap-2">
      <select
        name="status"
        className="input-base text-sm py-2 px-3 min-w-[140px]"
        onChange={submitForm}
      >
        <option value="" disabled>Update status</option>
        {actions.map((status) => (
          <option key={status} value={status}>
            Mark as {STATUS_CONFIG[status as keyof typeof STATUS_CONFIG].label}
          </option>
        ))}
      </select>
      <button type="submit" className="btn-primary text-sm px-3 py-2">Go</button>
    </form>
  )
}
