'use client';

import { Input } from '@/components/ui/input';
import { ChevronUp } from 'lucide-react';
import { useChatInterface } from '@/hooks/use-chat-interface';
import { useState } from 'react';

interface HeroSectionProps {
  h1Prefix: string;
  businessName?: string;
  h1Suffix: string;
  h2Text: string;
  h3Text: string;
  ctaPlaceholder: string;
  showButtonCta?: boolean;
  slug: string;
}

export function HeroSection({ 
  h1Prefix, 
  businessName, 
  h1Suffix, 
  h2Text, 
  h3Text, 
  ctaPlaceholder, 
  showButtonCta = false,
  slug 
}: HeroSectionProps) {
  const { openChat } = useChatInterface();
  const [inputValue, setInputValue] = useState('');

  const handleInputFocus = () => {
    openChat();
  };

  return (
    <section className="relative overflow-hidden" style={{ height: '100vh' }}>
      {/* Position content in the first third of viewport height */}
      <div className="absolute inset-x-0" style={{ top: '20vh' }}>
        <div className="grid-container">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <div className="animate-slide-in-up">
              {/* H1: Flexible title */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent leading-[1.2] pb-4">
                {h1Prefix}{businessName ? ` ${businessName}` : ""}{h1Suffix}
              </h1>
              
              {/* H2: Main message */}
              <h2 className="text-2xl lg:text-3xl text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed font-medium">
                {h2Text}
              </h2>

              {/* H3: Additional text */}
              <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                {h3Text}
              </p>

              {/* CTA: Text field with glassmorphism */}
              <div className="max-w-md mx-auto mb-9">
                <div className="glass">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder={ctaPlaceholder}
                    className="text-white placeholder:text-white/60 text-lg px-6 py-4 h-auto border-0 bg-transparent focus:ring-0 focus:ring-offset-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chevron at bottom of hero section */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center text-white/60 text-sm">
          <ChevronUp className="w-4 h-4 mr-2" />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-500" />
    </section>
  );
}