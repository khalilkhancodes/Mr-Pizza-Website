import { LoaderIcon } from '@/components/ui/Icons';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <LoaderIcon className="w-12 h-12 text-gold animate-spin" />
        <p className="font-body label-lg text-on-surface-variant">Loading...</p>
      </div>
    </div>
  );
}