'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getAllowedNextStatuses } from '@/lib/order-status'
import { CheckIcon, ClockIcon, TruckIcon, AlertIcon } from '@/components/ui/Icons'

const STATUS_LABELS: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  confirmed: { label: 'Confirmed', icon: CheckIcon },
  preparing: { label: 'Preparing', icon: ClockIcon },
  ready: { label: 'Ready for Pickup', icon: TruckIcon },
  delivered: { label: 'Delivered', icon: TruckIcon },
  cancelled: { label: 'Cancelled', icon: AlertIcon },
}

interface StaffStatusControlsProps {
  orderId: string
  currentStatus: string
}

export function StaffStatusControls({ orderId, currentStatus }: StaffStatusControlsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const allowedStatuses = getAllowedNextStatuses(currentStatus)

  async function handleUpdate(status: string) {
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

  if (allowedStatuses.length === 0) return null

  return (
    <div className="bg-surface-elevated border border-gold p-6 lg:p-8">
      <h2 className="font-display text-xl text-primary-text mb-6 uppercase tracking-[1px]">staff controls</h2>
      <div className="flex flex-wrap gap-3">
        {allowedStatuses.map((status) => {
          const config = STATUS_LABELS[status]
          if (!config) return null
          const StatusIcon = config.icon
          const isLoading = loading === status

          return (
            <button
              key={status}
              onClick={() => handleUpdate(status)}
              disabled={loading !== null}
              className={`btn-primary inline-flex items-center p-2 gap-2 ${isLoading ? 'animate-pulse' : ''}`}
            >
              <StatusIcon className="w-[16px] h-[16px]" />
              {isLoading ? 'Updating...' : `Mark as ${config.label}`}
            </button>
          )
        })}
      </div>
      {error && (
        <p className="mt-3 text-red-400 font-body text-xs">{error}</p>
      )}
    </div>
  )
}
