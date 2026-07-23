'use client';

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  return (
    <form action={`/api/orders/${orderId}/delete`} method="POST" className="absolute top-3 right-3 z-10">
      <button
        type="submit"
        onClick={(e) => { if (!confirm('Delete this order permanently?')) e.preventDefault(); }}
        className="p-2 text-[#555] hover:text-red-400 hover:bg-red-950/30 rounded-[2px] transition-colors"
        aria-label="Delete order"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </form>
  );
}
