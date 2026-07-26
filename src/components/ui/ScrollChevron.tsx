'use client';

export function ScrollChevron({ targetId }: { targetId: string }) {
  function handleClick() {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll down"
      className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-gold transition-colors animate-bounce"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}
