'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('Delete this order permanently?')) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${orderId}/delete`, { method: 'POST' });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete order');
      }

      router.refresh();
    } catch (err) {
      console.error('Delete error:', err);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="absolute top-3 right-3 z-10 p-2 text-[#555] hover:text-red-400 hover:bg-red-950/30 rounded-[2px] transition-colors disabled:opacity-50"
      aria-label={loading ? 'Deleting...' : 'Delete order'}
    >
      <svg
        className={`w-[16px] h-[16px] ${loading ? 'animate-spin' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {loading ? (
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        ) : (
          <>
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </>
        )}
      </svg>
    </button>
  );
}
