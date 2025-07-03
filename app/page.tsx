'use client';

import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';
import { ChatInterface } from '@/components/chat-interface';
import { SlugProvider, useSlugContext } from '@/components/slug-provider';

function HomeContent() {
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

  const businessName = prospectData?.biz_name;
  const effectiveSlug = firstSlug === 'home' ? 'home' : firstSlug;

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection 
        h1Prefix="Hallo"
        businessName={businessName}
        h1Suffix={businessName ? "," : " Besucher!"}
        h2Text="Dein persönlicher KI-Buchungs-Assistent wartet hier auf dich."
        h3Text="Er nennt Preise in Sekunden, reserviert Termine und sichert die Anzahlung – 24 / 7, ganz ohne Telefon."
        ctaPlaceholder="Frag ihn etwas …"
        showButtonCta={false}
        slug={effectiveSlug}
      />
      
      <Footer />
      
      <ChatInterface slug={effectiveSlug} />
    </main>
  );
}

export default function Home() {
  return (
    <SlugProvider currentSlug="home">
      <HomeContent />
    </SlugProvider>
  );
}