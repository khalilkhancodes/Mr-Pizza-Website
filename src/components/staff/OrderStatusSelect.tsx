'use client'

// Visual config mapped strictly to the target design images
const VISUAL_BUTTONS = [
  { id: 'confirmed', label: 'CONFIRMED', activeBg: 'bg-[#407BFF] text-white', disabledBg: 'bg-[#1a1a1a] text-[#555]' },
  { id: 'preparing', label: 'BEING PREPARED', activeBg: 'bg-[#E56B2E] text-white', disabledBg: 'bg-[#1a1a1a] text-[#555]' },
  { id: 'ready', label: 'READY FOR PICKUP', activeBg: 'bg-[var(--color-gold)] text-[#131313]', disabledBg: 'bg-[#1a1a1a] text-[#555]' },
  { id: 'delivered', label: 'DELIVERED', activeBg: 'bg-[#6B7280] text-white', disabledBg: 'bg-[#1a1a1a] text-[#555]' },
] as const

// Existing backend logic constraints
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
  // Determine which actions are legally allowed by the backend based on current state
  const allowedActions = STATUS_ACTIONS[currentStatus] ?? []

  // If the order is fully resolved, render nothing (matches existing logic)
  if (allowedActions.length === 0) return null

  return (
    <form action={`/api/orders/${orderId}/status`} method="POST" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {VISUAL_BUTTONS.map((btn) => {
          // Check if this specific button maps to an allowed action in the DB
          const isAllowed = allowedActions.includes(btn.id)
          
          return (
            <button
              key={btn.id}
              type="submit"
              name="status"
              value={btn.id}
              disabled={!isAllowed}
              className={`
                w-full py-3 px-2 font-body text-[11px] tracking-[1px] font-bold uppercase rounded-[2px] transition-colors
                ${isAllowed 
                  ? `${btn.activeBg} hover:opacity-90` 
                  : `${btn.disabledBg} cursor-not-allowed`}
              `}
            >
              {btn.label}
            </button>
          )
        })}
      </div>
      
      {/* Optional Cancel Button for placed/confirmed/preparing orders */}
      {allowedActions.includes('cancelled') && (
        <button
          type="submit"
          name="status"
          value="cancelled"
          className="w-full mt-2 py-3 px-2 font-body text-[11px] tracking-[1px] font-bold uppercase text-red-500 hover:bg-red-950/30 rounded-[2px] transition-colors"
        >
          Cancel Order
        </button>
      )}
    </form>
  )
}