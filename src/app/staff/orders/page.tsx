import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Suspense } from 'react'
import { OrderStatusSelect } from '@/components/staff/OrderStatusSelect'
import { DeleteOrderButton } from '@/components/staff/DeleteOrderButton'
import { ToastNotification } from '@/components/staff/ToastNotification'
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
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  confirmed_by: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG = {
  placed: { label: 'Placed', color: 'bg-[#1e1e1e] border border-[var(--color-gold)] text-[var(--color-gold)]' },
  confirmed: { label: 'Confirmed', color: 'bg-[#407BFF] text-white border border-[#407BFF]' },
  preparing: { label: 'Preparing', color: 'bg-[#E56B2E] text-white border border-[#407BFF]' },
  ready: { label: 'Ready', color: 'bg-[#1c783e] text-white border border-[#407BFF]' },
  delivered: { label: 'Delivered', color: 'bg-[#6B7280] text-white border border-[#6B7280]' },
  cancelled: { label: 'Cancelled', color: 'bg-red-900/50 text-red-400 border border-red-900' },
} as const;

// Ensure searchParams are awaited in Next.js environments
export default async function StaffOrdersPage({
  searchParams,
}: {
  searchParams: { filter?: string; message?: string; error?: string }
}) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

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

  const { data: rawOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const orders = rawOrders || []

  // Metric Calculations
  const totalOrders = orders.length;
  const placedCount = orders.filter(o => o.status === 'placed').length;
  const confirmedCount = orders.filter(o => o.status === 'confirmed').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const readyCount = orders.filter(o => o.status === 'ready').length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;
  const cancelledCount = orders.filter(o => o.status === 'cancelled').length;

  // Active Filter Logic
  const currentFilter = searchParams.filter || 'all';
  const displayOrders = currentFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === currentFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Toast Notification (auto-dismisses after 3s) */}
      <Suspense fallback={null}>
        <ToastNotification />
      </Suspense>

      {/* Header Area */}
      <section className="pt-8 pb-6 px-4 md:px-8 border-b border-[#222]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-start my-64 mt-96">
          <div>
            <span className="font-body text-[10px] tracking-[2px] uppercase text-[var(--color-gold)] mb-1 block">
              STAFF DASHBOARD
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tight">
              Order Management
            </h1>
          </div>
          
          <div className="flex items-center gap-6 mt-2">
            <Link href="/staff/orders" className="font-body text-[12px] uppercase tracking-[1px] text-[#888] hover:text-[var(--color-gold)] transition-colors flex items-center gap-2">
              <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </Link>
            <form action="/auth/signout" method="post">
              <button className="font-body text-[12px] uppercase tracking-[1px] text-[#888] hover:text-white transition-colors flex items-center gap-2">
                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className="hidden sm:inline">Exit</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Interactive Top Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
            <Link href="?filter=all" className={`p-4 md:p-6 rounded-[2px] flex flex-col justify-between h-14 md:h-96 transition-colors ${currentFilter === 'all' ? 'bg-[var(--color-gold)] border border-[var(--color-gold)]' : 'bg-[#131313] border border-[#333] hover:border-[#555]'}`}>
              <span className={`font-display text-4xl md:text-5xl leading-none ${currentFilter === 'all' ? 'text-[#131313]' : 'text-white'}`}>{totalOrders}</span>
              <span className={`font-body text-[10px] tracking-[1.5px] font-bold uppercase ${currentFilter === 'all' ? 'text-[#131313]' : 'text-[#888]'}`}>ALL ORDERS</span>
            </Link>
            
            <Link href="?filter=placed" className={`p-4 md:p-6 rounded-[2px] flex flex-col justify-between h-14 md:h-96 transition-colors ${currentFilter === 'placed' ? 'bg-[var(--color-gold)] border border-[var(--color-gold)]' : 'bg-[#131313] border border-[#333] hover:border-[#555]'}`}>
              <span className={`font-display text-4xl md:text-5xl leading-none ${currentFilter === 'placed' ? 'text-[#131313]' : 'text-[var(--color-gold)]'}`}>{placedCount}</span>
              <span className={`font-body text-[10px] tracking-[1.5px] font-bold uppercase ${currentFilter === 'placed' ? 'text-[#131313]' : 'text-[#888]'}`}>PLACED</span>
            </Link>

            <Link href="?filter=confirmed" className={`p-4 md:p-6 rounded-[2px] flex flex-col justify-between h-14 md:h-96 transition-colors ${currentFilter === 'confirmed' ? 'bg-[var(--color-gold)] border border-[var(--color-gold)]' : 'bg-[#131313] border border-[#333] hover:border-[#555]'}`}>
              <span className={`font-display text-4xl md:text-5xl leading-none ${currentFilter === 'confirmed' ? 'text-[#131313]' : 'text-[var(--color-gold)]'}`}>{confirmedCount}</span>
              <span className={`font-body text-[10px] tracking-[1.5px] font-bold uppercase ${currentFilter === 'confirmed' ? 'text-[#131313]' : 'text-[#888]'}`}>CONFIRMED</span>
            </Link>
            <Link href="?filter=preparing" className={`p-4 md:p-6 rounded-[2px] flex flex-col justify-between h-14 md:h-96 transition-colors ${currentFilter === 'preparing' ? 'bg-[var(--color-gold)] border border-[var(--color-gold)]' : 'bg-[#131313] border border-[#333] hover:border-[#555]'}`}>
              <span className={`font-display text-4xl md:text-5xl leading-none ${currentFilter === 'preparing' ? 'text-[#131313]' : 'text-[var(--color-gold)]'}`}>{preparingCount}</span>
              <span className={`font-body text-[10px] tracking-[1.5px] font-bold uppercase ${currentFilter === 'preparing' ? 'text-[#131313]' : 'text-[#888]'}`}>PREPARING</span>
            </Link>
            <Link href="?filter=ready" className={`p-4 md:p-6 rounded-[2px] flex flex-col justify-between h-14 md:h-96 transition-colors ${currentFilter === 'ready' ? 'bg-[var(--color-gold)] border border-[var(--color-gold)]' : 'bg-[#131313] border border-[#333] hover:border-[#555]'}`}>
              <span className={`font-display text-4xl md:text-5xl leading-none ${currentFilter === 'ready' ? 'text-[#131313]' : 'text-[var(--color-gold)]'}`}>{readyCount}</span>
              <span className={`font-body text-[10px] tracking-[1.5px] font-bold uppercase ${currentFilter === 'ready' ? 'text-[#131313]' : 'text-[#888]'}`}>READY</span>
            </Link>

            <Link href="?filter=delivered" className={`p-4 md:p-6 rounded-[2px] flex flex-col justify-between h-14 md:h-96 transition-colors ${currentFilter === 'delivered' ? 'bg-[var(--color-gold)] border border-[var(--color-gold)]' : 'bg-[#131313] border border-[#333] hover:border-[#555]'}`}>
              <span className={`font-display text-4xl md:text-5xl leading-none ${currentFilter === 'delivered' ? 'text-[#131313]' : 'text-[var(--color-gold)]'}`}>{deliveredCount}</span>
              <span className={`font-body text-[10px] tracking-[1.5px] font-bold uppercase ${currentFilter === 'delivered' ? 'text-[#131313]' : 'text-[#888]'}`}>DELIVERED</span>
            </Link>

            <Link href="?filter=cancelled" className={`p-4 md:p-6 rounded-[2px] flex flex-col justify-between h-14 md:h-96 transition-colors ${currentFilter === 'cancelled' ? 'bg-[var(--color-gold)] border border-[var(--color-gold)]' : 'bg-[#131313] border border-[#333] hover:border-[#555]'}`}>
              <span className={`font-display text-4xl md:text-5xl leading-none ${currentFilter === 'cancelled' ? 'text-[#131313]' : 'text-[var(--color-gold)]'}`}>{cancelledCount}</span>
              <span className={`font-body text-[10px] tracking-[1.5px] font-bold uppercase ${currentFilter === 'cancelled' ? 'text-[#131313]' : 'text-[#888]'}`}>CANCELLED</span>
            </Link>
          </div>

          {/* Expandable Order Cards (CSS Accordion for Mobile) */}
          <div className="space-y-6">
            {displayOrders.length === 0 ? (
              <div className="text-center py-20 border border-[#333] rounded-[2px] bg-[#131313]">
                <h2 className="font-display text-2xl text-[var(--color-cream)] mb-2 uppercase">No {currentFilter !== 'all' ? currentFilter : ''} orders</h2>
                <p className="font-body text-sm text-[#888]">Adjust your filters or wait for new orders.</p>
              </div>
            ) : (
              displayOrders.map((order: Order) => (
                <div key={order.id} className="bg-[#131313] border border-[#333] rounded-[2px] transition-colors relative hover:border-[#555]">
                   
                  {/* Hidden Checkbox controlling the mobile expansion */}
                  <input type="checkbox" id={`toggle-${order.id}`} className="peer hidden" />

                  {/* Delete Button - Always visible top-right */}
                  <DeleteOrderButton orderId={order.id} />

                  {/* Always Visible Mobile Header */}
                  <label htmlFor={`toggle-${order.id}`} className="flex justify-between items-center p-5 lg:hidden cursor-pointer select-none">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-display text-xl text-white">#{order.order_code}</span>
                        <span className={`px-2 py-1 text-[10px] tracking-[1px] font-bold uppercase rounded-[2px] ${STATUS_CONFIG[order.status].color}`}>
                          {STATUS_CONFIG[order.status].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-body text-[14px] text-[#ddd] truncate">{order.customer_name}</span>
                        <span className="font-display text-[16px] text-[var(--color-gold)]">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                    {/* Rotates when checkbox is checked */}
                    <svg className="w-5 h-5 text-[#888] shrink-0 ml-3 peer-checked:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </label>

                  {/* Body Content - Hidden on mobile unless checked, always flex on large screens */}
                  <div className="hidden peer-checked:flex lg:flex flex-col lg:flex-row gap-6 lg:gap-10 p-5 pt-0 lg:p-6 lg:pt-6 border-t border-[#333] lg:border-t-0 peer-checked:border-t lg:peer-checked:border-t-0">
                    
                    {/* Column 1: Customer Details */}
                    <div className="flex-1">
                      <div className="hidden lg:flex flex-wrap items-center gap-3 mb-6">
                        <Link href={`/order/${order.id}`} className="font-display text-xl text-white hover:text-[var(--color-gold)] transition-colors">
                          #{order.order_code}
                        </Link>
                        <span className={`px-2 py-1 text-[10px] tracking-[1px] font-bold uppercase rounded-[2px] ${STATUS_CONFIG[order.status].color}`}>
                          {STATUS_CONFIG[order.status].label}
                        </span>
                      </div>

                      <div className="space-y-1.5 mt-2 lg:mt-0">
                        <h3 className="font-body text-[18px] font-bold text-white mb-2">{order.customer_name}</h3>
                        <p className="font-body text-[14px] text-[#aaa] flex items-center gap-2">
                          <span>{order.customer_phone}</span>
                          <span className="text-[#555]">•</span>
                          <span>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </p>
                        <p className="font-body text-[14px] text-[#aaa]">{order.delivery_address}</p>
                      </div>
                    </div>

                    {/* Column 2: Items & Total */}
                    <div className="flex-1 lg:border-l border-[#333] lg:pl-10 pt-6 lg:pt-0 border-t lg:border-t-0 flex flex-col">
                      <h4 className="font-body text-[10px] tracking-[2px] text-[#666] uppercase mb-4">Items</h4>
                      
                      <div className="space-y-3 mb-6 flex-1">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-start">
                            <span className="font-body text-[14px] text-[#ddd] pr-4">{item.name} &times;{item.quantity}</span>
                            <span className="font-body text-[14px] font-bold text-white whitespace-nowrap">{formatPrice(item.unitPrice * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-end border-t border-[#333] pt-4">
                        <span className="font-body text-[12px] tracking-[2px] text-[#666] uppercase">Total</span>
                        <span className="font-display text-[24px] text-[var(--color-gold)]">{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    {/* Column 3: Update Status */}
                    <div className="lg:w-[280px] lg:border-l border-[#333] lg:pl-10 pt-6 lg:pt-0 border-t lg:border-t-0">
                      <h4 className="font-body text-[10px] tracking-[2px] text-[#666] uppercase mb-4">Update Status</h4>
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Tailwind Custom Animation (Inline for self-containment) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />
    </div>
  )
}