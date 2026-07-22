'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils';
import { getOptionDisplayName } from '@/lib/menu-utils';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MapPinIcon, PhoneIcon, UserIcon, ShieldIcon, LoaderIcon, CrosshairIcon } from '@/components/ui/Icons';
import { useToast } from '@/components/ui/Toaster';

export default function CheckoutPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const { items, getSubtotal, getItemCount } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // HYDRATION FIX
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const geo = useGeolocation();

  // HYDRATION FIX: Wait for client to mount before reading local storage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRequestLocation = useCallback(() => {
    geo.requestLocation();
  }, [geo]);

  useEffect(() => {
    const { latitude, longitude, loading } = geo;
    if (latitude !== null && longitude !== null && !loading) {
      setFormData(prev => ({
        ...prev,
        address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}${prev.address ? ` (${prev.address})` : ''}`,
      }));
    }
  }, [geo.latitude, geo.longitude, geo.loading]);

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone number';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderItems = items.map(item => ({
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        selectedOptions: item.selectedOptions,
        note: item.note,
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          deliveryAddress: formData.address,
          note: formData.note || undefined,
          items: orderItems,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');

      const { orderId, orderCode } = data;
      const trackingLink = `${window.location.origin}/order/${orderId}`;
      
      success('Order Placed!', `Order ${orderCode} created. Redirecting to WhatsApp...`);

      const whatsappMessage = `*New Order ${orderCode}*\n\n` +
        orderItems.map(i => `\u2022 ${i.name} x${i.quantity} = ${formatPrice(i.unitPrice * i.quantity)}`).join('\n') +
        `\n\nTotal: ${formatPrice(subtotal)}` +
        `\nTrack: ${trackingLink}` +
        `\n\nName: ${formData.name}` +
        `\nPhone: ${formData.phone}` +
        `\nAddress: ${formData.address}` +
        (formData.note ? `\nInstructions: ${formData.note}` : '');

      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15551234567';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      router.push(`/order/${orderId}`);
    } catch (err) {
      error('Order Failed', err instanceof Error ? err.message : 'Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // HYDRATION FIX: Prevent rendering until client state is synchronized
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="w-12 h-12 text-gold animate-spin" />
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-xl">
        <div className="text-center container-padding">
          <h2 className="font-display text-headline-sm text-cream mb-2">Your cart is empty</h2>
          <Button asChild variant="primary" size="lg">
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-charcoal border-b border-border py-8 lg:py-12">
        <div className="container-padding">
          <h1 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-2">Checkout</h1>
        </div>
      </section>

      <section className="py-8 lg:py-16">
        <div className="container-padding">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Delivery Form */}
            <div className="lg:col-span-7">
              <div className="card-elevated p-6 lg:p-10">
                <h2 className="font-display text-headline-sm text-cream mb-6">Delivery Details</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                      disabled={isSubmitting}
                      leftIcon={<UserIcon className="w-5 h-5" />}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      placeholder="e.g. 03XX-XXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      required
                      disabled={isSubmitting}
                      leftIcon={<PhoneIcon className="w-5 h-5" />}
                    />
                  </div>

                  <div className="relative">
                    <Input
                      label="Delivery Address"
                      name="address"
                      placeholder="House/Street, Area, Landmark"
                      value={formData.address}
                      onChange={handleChange}
                      error={errors.address}
                      required
                      disabled={isSubmitting}
                      leftIcon={<MapPinIcon className="w-5 h-5" />}
                    />
                     {geo.supported && (
                      <button
                        type="button"
                        onClick={handleRequestLocation}
                        disabled={geo.loading || isSubmitting}
                        className="absolute right-3 top-[38px] text-on-surface-variant hover:text-gold transition-colors"
                      >
                        {geo.loading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <CrosshairIcon className="w-5 h-5" />}
                      </button>
                    )}
                  </div>

                  <Textarea
                    label="Special Instructions (Optional)"
                    name="note"
                    placeholder="Any preferences or delivery instructions..."
                    value={formData.note}
                    onChange={handleChange}
                    rows={3}
                    disabled={isSubmitting}
                  />

                  <div className="flex items-start gap-3 p-4 bg-charcoal-50 rounded-soft-sm">
                    <ShieldIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body label-lg text-cream">Secure Checkout</p>
                      <p className="font-body body-md text-on-surface-variant mt-1">
                        Pay cash on delivery. Order total verified server-side.
                      </p>
                    </div>
                  </div>

                  <Button variant="primary" size="lg" fullWidth loading={isSubmitting} disabled={isSubmitting} type="submit">
                    PLACE ORDER VIA WHATSAPP &mdash; {formatPrice(subtotal)}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sticky Order Summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 card-gold-frame p-8 lg:p-12">
                <h2 className="font-display text-headline-md text-cream mb-10 tracking-wide">Order Total</h2>
                <dl className="space-y-6 mb-8">
                  <div className="flex justify-between items-center font-body body-md">
                    <dt className="text-on-surface-variant">Subtotal ({itemCount} items)</dt>
                    <dd className="text-cream font-bold">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between items-center font-body body-md">
                    <dt className="text-on-surface-variant">Delivery</dt>
                    <dd className="text-gold font-bold">Free</dd>
                  </div>
                  <div className="w-full h-px bg-border" />
                  <div className="flex justify-between items-center font-display text-headline-sm pt-2">
                    <dt className="text-cream">Total</dt>
                    <dd className="text-gold text-[28px]">{formatPrice(subtotal)}</dd>
                  </div>
                </dl>
                <p className="font-body label-md text-on-surface-variant/70 text-center mt-8">
                  Cash on delivery via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}