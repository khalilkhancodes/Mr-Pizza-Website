'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface OrderStatusUpdaterProps {
  orderId: string
}

export function OrderStatusUpdater({ orderId }: OrderStatusUpdaterProps) {
  const router = useRouter()
  const subscribed = useRef(false)

  useEffect(() => {
    if (subscribed.current) return
    subscribed.current = true

    const supabase = createClient()

    const channel = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`,
      }, () => {
        router.refresh()
      })
      .subscribe()

    return () => {
      subscribed.current = false
      supabase.removeChannel(channel)
    }
  }, [orderId, router])

  return null
}
