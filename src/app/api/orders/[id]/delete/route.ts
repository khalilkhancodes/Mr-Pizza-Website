import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: staffMember } = await supabase
      .from('staff')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!staffMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const serviceSupabase = createServiceClient();

    const { error: deleteError } = await serviceSupabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Order delete error:', deleteError);
      return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }

    return NextResponse.redirect(new URL('/staff/orders?message=Order+deleted+successfully', request.url));
  } catch (err) {
    console.error('Order delete error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
