import { Metadata } from 'next';
import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';
import { ChatInterface } from '@/components/chat-interface';

export const metadata: Metadata = {
  title: 'Liquid Glass Demo - KI-gestützte Business-Lösungen',
  description: 'Erleben Sie die Zukunft der Business-Automatisierung mit unseren KI-gestützten Lösungen. Schön, schnell und intelligent.',
  openGraph: {
    title: 'Liquid Glass Demo - KI-gestützte Business-Lösungen',
    description: 'Erleben Sie die Zukunft der Business-Automatisierung mit unseren KI-gestützten Lösungen.',
    type: 'website',
  },
};

// SSR: Server-side rendered homepage
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection 
        h1Prefix="Hallo"
        businessName=""
        h1Suffix=" Besucher!"
        h2Text="Dein persönlicher KI-Buchungs-Assistent wartet hier auf dich."
        h3Text="Er nennt Preise in Sekunden, reserviert Termine und sichert die Anzahlung – 24 / 7, ganz ohne Telefon."
        ctaPlaceholder="Frag ihn etwas …"
        showButtonCta={false}
        slug="home"
      />
      
      <Footer />
      
      <ChatInterface slug="home" />
    </main>
  );
}