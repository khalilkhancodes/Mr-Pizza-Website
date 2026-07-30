'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export function OrderListUpdater() {
  const router = useRouter()
  const subscribed = useRef(false)

  useEffect(() => {
    if (subscribed.current) return
    subscribed.current = true

    const supabase = createClient()

    const channel = supabase
      .channel('staff-orders')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'orders',
      }, () => {
        router.refresh()
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
      }, () => {
        router.refresh()
      })
      .subscribe()

    return () => {
      subscribed.current = false
      supabase.removeChannel(channel)
    }
  }, [router])

  return null
}
