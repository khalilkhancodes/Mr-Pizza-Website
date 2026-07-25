'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const VISUAL_BUTTONS = [
  { id: 'confirmed', label: 'CONFIRMED', activeBg: 'bg-[#407BFF] text-white', disabledBg: 'bg-[#1a1a1a] text-[#555]' },
  { id: 'preparing', label: 'BEING PREPARED', activeBg: 'bg-[#E56B2E] text-white', disabledBg: 'bg-[#1a1a1a] text-[#555]' },
  { id: 'ready', label: 'READY FOR PICKUP', activeBg: 'bg-[var(--color-gold)] text-[#131313]', disabledBg: 'bg-[#1a1a1a] text-[#555]' },
  { id: 'delivered', label: 'DELIVERED', activeBg: 'bg-[#6B7280] text-white', disabledBg: 'bg-[#1a1a1a] text-[#555]' },
] as const

const STATUS_ACTIONS: Record<string, string[]> = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready', 'cancelled'],
  ready: ['delivered'],
  delivered: [],
  cancelled: [],
}

interface OrderStatusSelectProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const allowedActions = STATUS_ACTIONS[currentStatus] ?? []

  if (allowedActions.length === 0) return null

  async function handleStatusUpdate(status: string) {
    setLoading(status)
    setError(null)

    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update status')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {VISUAL_BUTTONS.map((btn) => {
          const isAllowed = allowedActions.includes(btn.id)
          const isLoading = loading === btn.id

          return (
            <button
              key={btn.id}
              onClick={() => handleStatusUpdate(btn.id)}
              disabled={!isAllowed || loading !== null}
              className={`
                w-full py-3 px-2 font-body text-[11px] tracking-[1px] font-bold uppercase rounded-[2px] transition-colors
                ${isAllowed && !isLoading
                  ? `${btn.activeBg} hover:opacity-90`
                  : `${btn.disabledBg} cursor-not-allowed`}
                ${isLoading ? 'animate-pulse' : ''}
              `}
            >
              {isLoading ? 'Updating...' : btn.label}
            </button>
          )
        })}
      </div>

      {allowedActions.includes('cancelled') && (
        <button
          onClick={() => handleStatusUpdate('cancelled')}
          disabled={loading !== null}
          className="w-full mt-2 py-3 px-2 font-body text-[11px] tracking-[1px] font-bold uppercase text-red-500 hover:bg-red-950/30 rounded-[2px] transition-colors disabled:opacity-50"
        >
          {loading === 'cancelled' ? 'Cancelling...' : 'Cancel Order'}
        </button>
      )}

      {error && (
        <p className="mt-2 text-red-400 font-body text-[11px] text-center">{error}</p>
      )}
    </div>
  )
}
