import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { ClockIcon, ExternalLinkIcon, RefreshIcon } from '@/components/ui/Icons'
import { OrderStatusSelect } from '@/components/staff/OrderStatusSelect'
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

export default async function StaffOrdersPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user) {
    redirect('/staff/login?redirect=/staff/orders')
  }

  const { data: staffMember } = await supabase
    .from('staff')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!staffMember) {
    redirect('/')
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-surface border-b border-border py-10 lg:py-14">
        <div className="container-padding">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-2 block">management</span>
              <h1 className="font-display text-h2 text-primary-text mb-1">staff orders</h1>
              <p className="font-body text-sm text-primary-text/60">Manage and track all customer orders</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-xs tracking-[1px] uppercase text-primary-text/50">
                {orders?.length ?? 0} total orders
              </span>
              <Button variant="outline" size="sm">
                <RefreshIcon className="w-3 h-3" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="container-padding">
          {!orders || orders.length === 0 ? (
            <div className="text-center py-20">
              <ClockIcon className="w-12 h-12 mx-auto text-border mb-4" />
              <h2 className="font-display text-2xl text-primary-text mb-2 uppercase">no orders yet</h2>
              <p className="font-body text-sm text-primary-text/60 mb-6">Orders will appear here as customers place them.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" role="table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-body text-xs tracking-[1.5px] uppercase text-primary-text/50">Order</th>
                    <th className="text-left py-4 px-4 font-body text-xs tracking-[1.5px] uppercase text-primary-text/50 hidden md:table-cell">Customer</th>
                    <th className="text-left py-4 px-4 font-body text-xs tracking-[1.5px] uppercase text-primary-text/50 hidden lg:table-cell">Items</th>
                    <th className="text-left py-4 px-4 font-body text-xs tracking-[1.5px] uppercase text-primary-text/50">Total</th>
                    <th className="text-left py-4 px-4 font-body text-xs tracking-[1.5px] uppercase text-primary-text/50">Status</th>
                    <th className="text-left py-4 px-4 font-body text-xs tracking-[1.5px] uppercase text-primary-text/50">Time</th>
                    <th className="text-left py-4 px-4 font-body text-xs tracking-[1.5px] uppercase text-primary-text/50">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: Order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                      <td className="py-4 px-4">
                        <Link
                          href={`/order/${order.id}`}
                          className="font-display text-base text-gold hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {order.order_code}
                        </Link>
                        <p className="font-body text-xs text-primary-text/40 mt-0.5">{order.id.slice(0, 8)}...</p>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        <div>
                          <p className="font-body text-sm text-primary-text">{order.customer_name}</p>
                          <p className="font-body text-xs text-primary-text/50">{order.customer_phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <div className="font-body text-sm text-primary-text/60">
                          {order.items.map((item, i) => (
                            <div key={i} className="truncate max-w-[200px]">
                              {item.name} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-display text-base text-gold">{formatPrice(order.total)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`badge ${STATUS_CONFIG[order.status].color}`}>
                          {STATUS_CONFIG[order.status].label}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-body text-xs text-primary-text/50">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/order/${order.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-tertiary text-[10px] tracking-[1px]"
                          >
                            <ExternalLinkIcon className="w-3 h-3" />
                            View
                          </Link>
                          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
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
