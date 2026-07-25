import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import { getGoogleMapsLink } from '@/lib/geocode';
import { Badge, ClockIcon, MapPinIcon, PhoneIcon, UserIcon, CheckIcon, TruckIcon, AlertIcon, WhatsAppIcon } from '@/components/ui/Icons';

interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  selectedOptions: Record<string, string>;
  image?: string;
}

interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  items: OrderItem[];
  total: number;
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  confirmed_by: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG = {
  placed: { label: 'Order Placed', icon: ClockIcon, color: 'badge-placed', description: 'Your order has been received and is awaiting confirmation.' },
  confirmed: { label: 'Confirmed', icon: CheckIcon, color: 'badge-confirmed', description: 'The restaurant has confirmed your order and started preparing.' },
  preparing: { label: 'Preparing', icon: ClockIcon, color: 'badge-preparing', description: 'Your order is being prepared by the restaurant.' },
  ready: { label: 'Ready for Pickup', icon: TruckIcon, color: 'badge-ready', description: 'Your order is ready for pickup or delivery.' },
  delivered: { label: 'Delivered', icon: TruckIcon, color: 'badge-delivered', description: 'Your order has been delivered. Enjoy your meal!' },
  cancelled: { label: 'Cancelled', icon: AlertIcon, color: 'badge-cancelled', description: 'This order has been cancelled.' },
} as const;

const PROGRESS_WIDTHS: Record<string, number> = { placed: 20, confirmed: 40, preparing: 60, ready: 80, delivered: 100, cancelled: 0 };
const STATUS_ORDER: Record<string, number> = { placed: 0, confirmed: 1, preparing: 2, ready: 3, delivered: 4, cancelled: 5 };

async function getOrder(id: string): Promise<Order | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data as Order;
}

async function getStaffSession(): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('staff')
    .select('id')
    .eq('id', user.id)
    .single();

  return !!data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return { title: 'Order Not Found' };
  return {
    title: `Order ${order.order_code}`,
    description: `Track your order ${order.order_code} - ${order.customer_name}`,
  };
}

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  const isStaff = await getStaffSession();

  if (!order) notFound();

  const config = STATUS_CONFIG[order.status];
  const ItemIcon = config.icon;

  const allStatuses = ['placed', 'confirmed', 'preparing', 'ready', 'delivered'] as const;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-surface border-b border-border py-16 lg:py-20">
        <div className="container-padding">
          <div className=" animate-fade-in my-64">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-2 block">order status</span>
            <h1 className="font-display text-start text-[80px] lg:text-9xl md:text-hero-title text-primary-text leading-[0.94] -mt-2 mb-4">
              ORDER
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className={`badge ${config.color}`}>{config.label}</span>
            </div>
            <p className="font-body text-base text-primary-text/60">{config.description}</p>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-background">
        <div className="container-padding">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Details */}
              <div className="bg-surface border border-border p-6 lg:p-8">
                <div className='mb-6'>
                <h2 className="font-display text-xl text-primary-text uppercase tracking-[1px]">order details</h2>
                <p className="font-body text-xs text-primary-text/60">{order.order_code}</p>
                </div>
                <ul className="space-y-4" role="list">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex gap-4 py-4 border-b border-border last:border-0">
                      <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image || '/images/Menu_Items.png'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-base text-primary-text truncate uppercase tracking-[0.5px]">{item.name}</h3>
                          <span className="font-display text-base text-gold flex-shrink-0">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-body text-sm text-primary-text/60">Qty: {item.quantity}</span>
                          {Object.keys(item.selectedOptions).length > 0 && (
                            <span className="font-body text-sm text-primary-text/50">
                              {Object.values(item.selectedOptions).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Info */}
              <div className="bg-surface border border-border p-6 lg:p-8">
                <h2 className="font-display text-xl text-primary-text mb-6 uppercase tracking-[1px]">delivery information</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <UserIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body text-xs tracking-[1.5px] uppercase text-primary-text/60">Customer</p>
                      <p className="font-display text-base text-primary-text uppercase tracking-[0.5px]">{order.customer_name}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body text-xs tracking-[1.5px] uppercase text-primary-text/60">Delivery Address</p>
                      <p className="font-body text-sm text-primary-text">{order.delivery_address}</p>
                      {(() => {
                        const mapsLink = getGoogleMapsLink(order.latitude, order.longitude);
                        return mapsLink ? (
                          <a
                            href={mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-xs text-gold hover:underline inline-flex items-center gap-1 mt-1"
                          >
                            View on Map
                          </a>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Staff Controls */}
              {isStaff && (
                <div className="bg-surface-elevated border border-gold p-6 lg:p-8">
                  <h2 className="font-display text-xl text-primary-text mb-6 uppercase tracking-[1px]">staff controls</h2>
                  <div className="flex flex-wrap gap-3">
                    {(['confirmed', 'preparing', 'ready', 'delivered', 'cancelled'] as const).map((status) => {
                      if (order.status === status) return null;
                      const allowed = {
                        placed: ['confirmed', 'cancelled'] as const,
                        confirmed: ['preparing', 'cancelled'] as const,
                        preparing: ['ready', 'cancelled'] as const,
                        ready: ['delivered'] as const,
                        delivered: [] as const,
                        cancelled: [] as const,
                      }[order.status] as readonly string[];
                      if (!allowed.includes(status)) return null;

                      const statusConfig = STATUS_CONFIG[status];
                      const StatusIcon = statusConfig.icon;
                      return (
                        <form key={status} action={`/api/orders/${order.id}/status`} method="POST">
                          <button
                            type="submit"
                            className="btn-primary inline-flex items-center p-2 gap-2"
                          >
                            <StatusIcon className="w-[16px] h-[16px]" />
                            Mark as {statusConfig.label}
                          </button>
                        </form>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-surface-elevated border border-gold p-6 lg:p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display text-lg text-primary-text uppercase tracking-[1px]">total</h3>
                    <span className="font-display text-2xl text-gold">{formatPrice(order.total)}</span>
                  </div>
                  <div>
                    <div className="h-1.5 bg-border overflow-hidden">
                      <div
                        className="h-full bg-gold transition-all duration-500"
                        style={{ width: `${PROGRESS_WIDTHS[order.status] || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 font-body text-[10px] tracking-[1px] uppercase text-primary-text/60">
                      <span className={STATUS_ORDER[order.status] >= 0 ? 'text-gold' : ''}>Placed</span>
                      <span className={STATUS_ORDER[order.status] >= 1 ? 'text-gold' : ''}>Confirmed</span>
                      <span className={STATUS_ORDER[order.status] >= 2 ? 'text-gold' : ''}>Preparing</span>
                      <span className={STATUS_ORDER[order.status] >= 3 ? 'text-gold' : ''}>Ready</span>
                      <span className={STATUS_ORDER[order.status] >= 4 ? 'text-gold' : ''}>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-display text-lg text-primary-text mb-5 uppercase tracking-[1px]">timeline</h3>
                  <div className="space-y-5">
                    {allStatuses.map((status, index) => {
                      const isCompleted = STATUS_ORDER[order.status] >= index;
                      const isCurrent = order.status === status;
                      const statusConfig = STATUS_CONFIG[status];
                      const StatusIcon = statusConfig.icon;
                      return (
                        <div key={status} className="flex items-start gap-3 relative">
                          <div className="relative flex-shrink-0">
                            <div
                              className={`w-9 h-9 flex items-center justify-center border ${
                                isCompleted
                                  ? 'bg-gold border-gold'
                                  : 'bg-surface border-border'
                              }`}
                            >
                              <StatusIcon className={`w-[16px] h-[16px] ${isCompleted ? 'text-charcoal' : 'text-primary-text/50'}`} />
                            </div>
                            {index < 4 && (
                              <div
                                className="absolute left-4 top-9 bottom-[-12px] w-px"
                                style={{ background: index < STATUS_ORDER[order.status] ? 'var(--color-gold)' : 'var(--color-border)' }}
                              />
                            )}
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="flex items-center gap-2">
                              <span className={`font-display text-sm uppercase tracking-[0.5px] ${isCompleted ? 'text-primary-text' : 'text-primary-text/50'}`}>
                                {statusConfig.label}
                              </span>
                              {isCurrent && (
                                <span className="chip-gold text-[9px]">Current</span>
                              )}
                            </div>
                            <p className="font-body text-xs text-primary-text/60 mt-0.5">{statusConfig.description}</p>
                            {isCompleted && (
                              <p className="font-body text-[10px] tracking-[0.5px] text-primary-text/40 mt-1">
                                {new Date(order[status === 'placed' ? 'created_at' : 'updated_at']).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="section-spacing bg-surface border-t border-border text-center">
        <div className="container-padding">
          <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">need help?</span>
          <h2 className="font-display text-h2 text-primary-text mb-4 leading-tight">questions about your order?</h2>
          <p className="font-body text-base text-primary-text/60 mb-8 max-w-xl mx-auto">
            Contact us directly via WhatsApp or phone. We&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-4">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15551234567'}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex py-[16px] px-6">
              <WhatsAppIcon className="w-[16px] h-[16px] mr-2" />
              Contact on WhatsApp
            </a>
            <a href={`tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15551234567'}`} className="btn-secondary inline-flex py-[16px] px-6">
              <PhoneIcon className="w-[16px] h-[16px] mr-2 mt-1" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}