import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';
import { ChatInterface } from '@/components/chat-interface';
import { getProspectData, ProspectData } from '@/lib/prospect-data';

interface SlugPageProps {
  params: { slug: string };
}

// SSR: Generate metadata server-side
export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const prospectData = await getProspectData(params.slug);
  
  if (!prospectData) {
    return {
      title: 'Business Not Found',
      description: 'The requested business profile could not be found.',
    };
  }

  return {
    title: `${prospectData.biz_name} - KI-Buchungsassistent`,
    description: prospectData.biz_pitch || `Buchen Sie Termine bei ${prospectData.biz_name} mit unserem KI-gestützten Assistenten.`,
    openGraph: {
      title: `${prospectData.biz_name} - KI-Buchungsassistent`,
      description: prospectData.biz_pitch || `Buchen Sie Termine bei ${prospectData.biz_name} mit unserem KI-gestützten Assistenten.`,
      type: 'website',
    },
  };
}

// SSR: Server-side data fetching
export default async function SlugPage({ params }: SlugPageProps) {
  const prospectData = await getProspectData(params.slug);

  if (!prospectData) {
    notFound();
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
        slug={params.slug}
      />
      
      <Footer />
      
      <ChatInterface slug={params.slug} />
    </main>
  );
}