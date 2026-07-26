import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { menuItems, getMenuItemById, calculateItemTotal } from '@/content/menu';
import { nanoid } from 'nanoid';
import { orderRateLimiter } from '@/lib/rate-limit';

function generateOrderCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'ORD-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function calculateServerTotal(items: Array<{
  menuItemId: string;
  name?: string;
  quantity: number;
  unitPrice?: number;
  selectedOptions: Record<string, string>;
}>): { total: number; validatedItems: Array<{ menuItemId: string; name: string; quantity: number; unitPrice: number; selectedOptions: Record<string, string> }> } {
  let total = 0;
  const validatedItems: Array<{ menuItemId: string; name: string; quantity: number; unitPrice: number; selectedOptions: Record<string, string> }> = [];

  for (const item of items) {
    // Deal items have menuItemId starting with "deal-"; skip menu validation and use provided price
    if (item.menuItemId.startsWith('deal-')) {
      const unitPrice = item.unitPrice ?? 0;
      total += unitPrice * item.quantity;
      validatedItems.push({
        menuItemId: item.menuItemId,
        name: item.name || 'Deal',
        quantity: item.quantity,
        unitPrice,
        selectedOptions: item.selectedOptions,
      });
      continue;
    }

    const menuItem = getMenuItemById(item.menuItemId);
    if (!menuItem) {
      throw new Error(`Menu item ${item.menuItemId} not found`);
    }

    const unitPrice = calculateItemTotal(menuItem, item.selectedOptions);
    const itemTotal = unitPrice * item.quantity;
    total += itemTotal;

    validatedItems.push({
      menuItemId: item.menuItemId,
      name: menuItem.name,
      quantity: item.quantity,
      unitPrice,
      selectedOptions: item.selectedOptions,
    });
  }

  return { total, validatedItems };
}

async function generateIdempotencyKey(body: {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: Array<{ menuItemId: string; quantity: number; selectedOptions: Record<string, string> }>;
}): Promise<string> {
  const normalized = {
    customerName: body.customerName.trim().toLowerCase(),
    customerPhone: body.customerPhone.trim(),
    deliveryAddress: body.deliveryAddress.trim().toLowerCase(),
    items: body.items.map(item => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      selectedOptions: item.selectedOptions,
    })).sort((a, b) => a.menuItemId.localeCompare(b.menuItemId)),
  };
  const key = JSON.stringify(normalized);
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
  const rateLimit = await orderRateLimiter(request);
  if (rateLimit.limited) return rateLimit.response;

  try {
    const body = await request.json();
    const { customerName, customerPhone, deliveryAddress, note, items, latitude, longitude } = body;

    if (!customerName?.trim() || !customerPhone?.trim() || !deliveryAddress?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const { total, validatedItems } = calculateServerTotal(items);

    const supabase = createServiceClient();

    // Idempotency: check for recent duplicate order
    const idempotencyKey = await generateIdempotencyKey({ customerName, customerPhone, deliveryAddress, items });
    const recentWindow = new Date(Date.now() - 5 * 60 * 1000).toISOString(); // 5 minutes

    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id, order_code, total, created_at')
      .eq('customer_name', customerName.trim())
      .eq('customer_phone', customerPhone.trim())
      .eq('delivery_address', deliveryAddress.trim())
      .eq('total', total)
      .gte('created_at', recentWindow)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingOrder) {
      // Return existing order instead of creating duplicate
      return NextResponse.json({
        success: true,
        orderId: existingOrder.id,
        orderCode: existingOrder.order_code,
        total: existingOrder.total,
        message: 'Order already exists (duplicate prevented)',
        duplicate: true,
      });
    }

    const orderId = nanoid(24);
    const orderCode = generateOrderCode();

    const orderData: Record<string, unknown> = {
      id: orderId,
      order_code: orderCode,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      delivery_address: deliveryAddress.trim(),
      items: validatedItems.map(item => {
        const isDeal = item.menuItemId.startsWith('deal-');
        const menuItem = isDeal ? null : getMenuItemById(item.menuItemId);
        return {
          menuItemId: item.menuItemId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          selectedOptions: item.selectedOptions,
          image: menuItem?.image || '/images/Menu_Items.png',
        };
      }),
      total,
      status: 'placed',
      note: note?.trim() || null,
      latitude: latitude != null ? Number(latitude) : null,
      longitude: longitude != null ? Number(longitude) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabase
      .from('orders')
      .insert(orderData);

    if (insertError) {
      console.error('Order insert error:', insertError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderCode,
      total,
      message: 'Order created successfully',
    });
  } catch (err) {
    console.error('Order creation error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}