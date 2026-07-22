'use client';

import { create } from 'zustand';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertIcon, CheckIcon, CloseIcon } from '@/components/ui/Icons';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

const typeStyles = {
  success: 'border-green-900/50 bg-green-900/30 text-green-300',
  error: 'border-red-900/50 bg-red-900/30 text-red-300',
  info: 'border-blue-900/50 bg-blue-900/30 text-blue-300',
  warning: 'border-amber-900/50 bg-amber-900/30 text-amber-300',
};

interface ToastProps {
  toast: Toast;
  onClose: () => void;
}

function ToastContent({ toast, onClose }: ToastProps) {
  const icons = {
    success: CheckIcon,
    error: AlertIcon,
    info: AlertIcon,
    warning: AlertIcon,
  };

  const Icon = icons[toast.type];

  return (
    <>
      <div className="flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body label-lg text-cream">{toast.title}</p>
        {toast.message && (
          <p className="font-body body-md mt-1 text-on-surface-variant">{toast.message}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-md text-on-surface-variant hover:text-cream transition-colors duration-fast"
        aria-label="Dismiss"
      >
        <CloseIcon className="w-5 h-5" />
      </button>
    </>
  );
}

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[500] flex flex-col gap-3 w-full max-w-sm lg:max-w-md pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`flex items-start gap-3 p-4 rounded-soft-sm border pointer-events-auto ${typeStyles[toast.type]}`}
          >
            <ToastContent toast={toast} onClose={() => removeToast(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const { addToast, removeToast } = useToastStore();

  return {
    success: (title: string, message?: string, duration = 5000) => {
      const id = addToast({ type: 'success', title, message, duration });
      if (duration > 0) setTimeout(() => removeToast(id), duration);
      return id;
    },
    error: (title: string, message?: string, duration = 8000) => {
      const id = addToast({ type: 'error', title, message, duration });
      if (duration > 0) setTimeout(() => removeToast(id), duration);
      return id;
    },
    info: (title: string, message?: string, duration = 5000) => {
      const id = addToast({ type: 'info', title, message, duration });
      if (duration > 0) setTimeout(() => removeToast(id), duration);
      return id;
    },
    warning: (title: string, message?: string, duration = 6000) => {
      const id = addToast({ type: 'warning', title, message, duration });
      if (duration > 0) setTimeout(() => removeToast(id), duration);
      return id;
    },
    dismiss: removeToast,
  };
}