import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
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
  status: 'placed' | 'confirmed' | 'delivered' | 'cancelled';
  confirmed_by: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG = {
  placed: { label: 'Order Placed', icon: ClockIcon, color: 'badge-placed', description: 'Your order has been received and is awaiting confirmation.' },
  confirmed: { label: 'Confirmed', icon: CheckIcon, color: 'badge-confirmed', description: 'The restaurant has confirmed your order and started preparing.' },
  delivered: { label: 'Delivered', icon: TruckIcon, color: 'badge-delivered', description: 'Your order has been delivered. Enjoy your meal!' },
  cancelled: { label: 'Cancelled', icon: AlertIcon, color: 'badge-cancelled', description: 'This order has been cancelled.' },
} as const;

const PROGRESS_WIDTHS: Record<string, number> = { placed: 25, confirmed: 50, delivered: 100, cancelled: 0 };
const STATUS_ORDER: Record<string, number> = { placed: 0, confirmed: 1, delivered: 2, cancelled: 3 };

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
  return !!user;
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

  const allStatuses = ['placed', 'confirmed', 'delivered'] as const;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-charcoal border-b border-border py-16 lg:py-24">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <span className="font-body label-lg text-gold tracking-widest mb-4 block">ORDER STATUS</span>
            <h1 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-4">
              Order <span className="text-gold">{order.order_code}</span>
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className={`badge ${config.color}`}>{config.label}</span>
            </div>
            <p className="font-body body-lg text-on-surface-variant">{config.description}</p>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-charcoal">
        <div className="container-padding">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Details */}
              <div className="card-elevated p-6 lg:p-8">
                <h2 className="font-display text-headline-sm text-cream mb-6">Order Details</h2>
                <ul className="space-y-4" role="list">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex gap-4 py-4 border-b border-border last:border-0">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-soft-sm overflow-hidden">
                        <img
                          src={item.image || '/images/Menu_Items.png'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-headline-sm text-cream truncate">{item.name}</h3>
                          <span className="font-display text-headline-sm text-gold flex-shrink-0">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="font-body body-md text-on-surface-variant">Qty: {item.quantity}</span>
                          {Object.keys(item.selectedOptions).length > 0 && (
                            <span className="font-body body-md text-on-surface-variant/70">
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
              <div className="card-elevated p-6 lg:p-8">
                <h2 className="font-display text-headline-sm text-cream mb-6">Delivery Information</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <UserIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body label-md text-on-surface-variant">Customer</p>
                      <p className="font-display text-headline-sm text-cream">{order.customer_name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body label-md text-on-surface-variant">Phone</p>
                      <p className="font-display text-headline-sm text-cream">{order.customer_phone}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body label-md text-on-surface-variant">Delivery Address</p>
                      <p className="font-body body-md text-cream">{order.delivery_address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Staff Controls */}
              {isStaff && (
                <div className="card-gold-frame">
                  <h2 className="font-display text-headline-sm text-cream mb-6">Staff Controls</h2>
                  <div className="flex flex-wrap gap-3">
                    {(['confirmed', 'delivered', 'cancelled'] as const).map((status) => {
                      if (order.status === status) return null;
                      const allowed = {
                        placed: ['confirmed', 'cancelled'] as const,
                        confirmed: ['delivered', 'cancelled'] as const,
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
                            className="btn-primary inline-flex items-center gap-2"
                          >
                            <StatusIcon className="w-4 h-4" />
                            Mark as {statusConfig.label}
                          </button>
                        </form>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — Gold Frame */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 card-gold-frame space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-headline-sm text-cream">Total</h3>
                    <span className="font-display text-headline-lg text-gold">{formatPrice(order.total)}</span>
                  </div>
                  {/* Progress Bar */}
                  <div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-500"
                        style={{ width: `${PROGRESS_WIDTHS[order.status] || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 font-body label-md text-on-surface-variant">
                      <span className={STATUS_ORDER[order.status] >= 0 ? 'text-gold' : ''}>Placed</span>
                      <span className={['confirmed', 'delivered'].includes(order.status) ? 'text-gold' : ''}>Confirmed</span>
                      <span className={order.status === 'delivered' ? 'text-gold' : ''}>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-display text-headline-sm text-cream mb-4">Timeline</h3>
                  <div className="space-y-4">
                    {allStatuses.map((status, index) => {
                      const isCompleted = STATUS_ORDER[order.status] >= index;
                      const isCurrent = order.status === status;
                      const statusConfig = STATUS_CONFIG[status];
                      const StatusIcon = statusConfig.icon;
                      return (
                        <div key={status} className="flex items-start gap-3 relative">
                          <div className="relative flex-shrink-0">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                isCompleted
                                  ? 'bg-gold border-gold'
                                  : 'bg-charcoal border-border'
                              }`}
                            >
                              <StatusIcon className={`w-5 h-5 ${isCompleted ? 'text-charcoal' : 'text-on-surface-variant'}`} />
                            </div>
                            {index < 2 && (
                              <div
                                className="absolute left-5 top-10 bottom-[-16px] w-px"
                                style={{ background: index < STATUS_ORDER[order.status] ? 'var(--color-gold)' : 'var(--color-border)' }}
                              />
                            )}
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-display text-headline-sm ${isCompleted ? 'text-cream' : 'text-on-surface-variant'}`}>
                                {statusConfig.label}
                              </span>
                              {isCurrent && (
                                <span className="chip bg-gold/10 text-gold animate-pulse">Current</span>
                              )}
                            </div>
                            <p className="font-body body-md text-on-surface-variant mt-1">{statusConfig.description}</p>
                            {isCompleted && (
                              <p className="font-body label-md text-on-surface-variant/60 mt-1">
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
      <section className="section-spacing bg-background text-center">
        <div className="container-padding">
          <span className="font-body label-lg text-gold tracking-widest mb-4 block">NEED HELP?</span>
          <h2 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-4">Questions About Your Order?</h2>
          <p className="font-body body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Contact us directly via WhatsApp or phone. We&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15551234567'}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex">
              <WhatsAppIcon className="w-5 h-5" />
              Contact on WhatsApp
            </a>
            <a href={`tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15551234567'}`} className="btn-secondary inline-flex">
              <PhoneIcon className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
