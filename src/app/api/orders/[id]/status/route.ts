import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

const VALID_STATUSES = ['placed', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'] as const;
const STATUS_TRANSITIONS: Record<string, string[]> = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready', 'cancelled'],
  ready: ['delivered'],
  delivered: [],
  cancelled: [],
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const contentType = request.headers.get('content-type') || '';
    let status: string;
    if (contentType.includes('application/json')) {
      const body = await request.json();
      status = body.status;
    } else {
      const formData = await request.formData();
      status = formData.get('status') as string;
    }

    if (!(VALID_STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: staffMember } = await supabase
      .from('staff')
      .select('id, role')
      .eq('id', user.id)
      .single();

    if (!staffMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (staffMember.role !== 'admin' && staffMember.role !== 'staff') {
      return NextResponse.json({ error: 'Forbidden: insufficient role' }, { status: 403 });
    }

    const serviceSupabase = createServiceClient();

    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('id, status')
      .eq('id', id)
      .single();

    if (fetchError || !currentOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const allowedTransitions = STATUS_TRANSITIONS[currentOrder.status];
    if (!allowedTransitions.includes(status)) {
      return NextResponse.json(
        { error: `Cannot transition from ${currentOrder.status} to ${status}` },
        { status: 400 }
      );
    }

    const { error: updateError } = await serviceSupabase
      .from('orders')
      .update({
        status,
        confirmed_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Order update error:', updateError);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Order status updated successfully' });
  } catch (err) {
    console.error('Order status update error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}