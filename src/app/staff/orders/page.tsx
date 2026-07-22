import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { ClockIcon, ExternalLinkIcon, RefreshIcon } from '@/components/ui/Icons'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  total: number;
  status: 'placed' | 'confirmed' | 'delivered' | 'cancelled';
  confirmed_by: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG = {
  placed: { label: 'Placed', color: 'badge-placed' },
  confirmed: { label: 'Confirmed', color: 'badge-confirmed' },
  delivered: { label: 'Delivered', color: 'badge-delivered' },
  cancelled: { label: 'Cancelled', color: 'badge-cancelled' },
} as const;

const STATUS_ACTIONS = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: [],
};

export default async function StaffOrdersPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

   console.log('[orders page] user:', user?.email ?? null, '| error:', error?.message ?? null)

  if (!user) {
    redirect('/staff/login?redirect=/staff/orders')
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen">
      <section className="bg-charcoal border-b border-border py-lg lg:py-xl">
        <div className="container-padding">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-2">Staff Orders</h1>
              <p className="font-body body-lg text-on-surface-variant">Manage and track all customer orders</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body label-md text-on-surface-variant/70">
                {orders?.length ?? 0} total orders
              </span>
              <Button variant="ghost" size="sm">
                <RefreshIcon className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-charcoal">
        <div className="container-padding">
          {!orders || orders.length === 0 ? (
            <div className="text-center py-20">
              <ClockIcon className="w-16 h-16 mx-auto text-border mb-4" />
              <h2 className="font-display text-headline-sm text-cream mb-2">No Orders Yet</h2>
              <p className="font-body body-md text-on-surface-variant mb-6">Orders will appear here as customers place them.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" role="table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-body label-lg text-on-surface-variant/70">Order</th>
                    <th className="text-left py-4 px-4 font-body label-lg text-on-surface-variant/70 hidden md:table-cell">Customer</th>
                    <th className="text-left py-4 px-4 font-body label-lg text-on-surface-variant/70 hidden lg:table-cell">Items</th>
                    <th className="text-left py-4 px-4 font-body label-lg text-on-surface-variant/70">Total</th>
                    <th className="text-left py-4 px-4 font-body label-lg text-on-surface-variant/70">Status</th>
                    <th className="text-left py-4 px-4 font-body label-lg text-on-surface-variant/70">Time</th>
                    <th className="text-left py-4 px-4 font-body label-lg text-on-surface-variant/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: Order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-surface-elevated/50 transition-colors">
                      <td className="py-4 px-4">
                        <Link
                          href={`/order/${order.id}`}
                          className="font-display text-headline-sm text-gold hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {order.order_code}
                        </Link>
                        <p className="font-body label-md text-on-surface-variant/60 mt-0.5">{order.id.slice(0, 8)}...</p>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        <div>
                          <p className="font-body body-md text-cream">{order.customer_name}</p>
                          <p className="font-body label-md text-on-surface-variant">{order.customer_phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <div className="font-body body-md text-on-surface-variant">
                          {order.items.map((item, i) => (
                            <div key={i} className="truncate">
                              {item.name} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-display text-headline-sm text-gold">{formatPrice(order.total)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`badge ${STATUS_CONFIG[order.status].color}`}>
                          {STATUS_CONFIG[order.status].label}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-body label-md text-on-surface-variant">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/order/${order.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-tertiary text-sm"
                          >
                            <ExternalLinkIcon className="w-4 h-4" />
                            View
                          </Link>
                          {STATUS_ACTIONS[order.status].length > 0 && (
                            <form action={`/api/orders/${order.id}/status`} method="POST" className="flex items-center gap-2">
                              <select
                                name="status"
                                className="input-base text-sm py-2 px-3 min-w-[140px]"
                                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                              >
                                <option value="" disabled>Update status</option>
                                {STATUS_ACTIONS[order.status].map((status) => (
                                  <option key={status} value={status}>
                                    Mark as {STATUS_CONFIG[status as keyof typeof STATUS_CONFIG].label}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="submit"
                                className="btn-primary text-sm px-3 py-2"
                              >
                                Go
                              </button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
