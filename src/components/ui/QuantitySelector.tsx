'use client';

import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  'aria-label'?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  'aria-label': ariaLabel = 'Quantity',
}: QuantitySelectorProps) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div
      className={cn('inline-flex items-center border border-border rounded-soft-sm overflow-hidden', className)}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="flex items-center justify-center w-10 h-10 text-cream hover:text-gold hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-r border-border"
        aria-label="Decrease quantity"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <span className="inline-flex items-center justify-center w-10 h-10 font-body text-body font-medium text-cream" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="flex items-center justify-center w-10 h-10 text-cream hover:text-gold hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-l border-border"
        aria-label="Increase quantity"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}