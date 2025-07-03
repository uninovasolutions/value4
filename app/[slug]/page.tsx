'use client';

import { useParams } from 'next/navigation';
import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';
import { ChatInterface } from '@/components/chat-interface';
import { SlugProvider, useSlugContext } from '@/components/slug-provider';

function SlugContent({ currentSlug }: { currentSlug: string }) {
  const { firstSlug, prospectData, isLoaded } = useSlugContext();

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="glass p-8 animate-pulse">
            <div className="h-8 bg-white/20 rounded w-48 mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-32"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!prospectData) {
    return (
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="glass p-8">
            <h1 className="text-2xl text-white mb-4">Unternehmen nicht gefunden</h1>
            <p className="text-white/70">Das angeforderte Unternehmensprofil konnte nicht gefunden werden.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection 
        h1Prefix="Hallo"
        businessName={prospectData.biz_name}
        h1Suffix=","
        h2Text="Dein persönlicher KI-Buchungs-Assistent wartet hier auf dich."
        h3Text="Er nennt Preise in Sekunden, reserviert Termine und sichert die Anzahlung – 24 / 7, ganz ohne Telefon."
        ctaPlaceholder="Frag ihn etwas …"
        showButtonCta={false}
        slug={firstSlug}
      />
      
      <Footer />
      
      <ChatInterface slug={firstSlug} />
    </main>
  );
}

export default function SlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <SlugProvider currentSlug={slug}>
      <SlugContent currentSlug={slug} />
    </SlugProvider>
  );
}