'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="absolute top-24 left-6 z-10">
      <Button
        onClick={handleBack}
        className="glass flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 border-white/20"
        variant="ghost"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </Button>
    </div>
  );
}