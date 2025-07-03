import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { CheckCircle } from 'lucide-react';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
  title: 'Vielen Dank!',
  description: 'Ihre Zahlung wurde erfolgreich verarbeitet.',
  robots: {
    index: false,
    follow: false,
  },
};

interface ThanksPageProps {
  searchParams: { session_id?: string };
}

export default function ThanksPage({ searchParams }: ThanksPageProps) {
  const sessionId = searchParams.session_id;

  return (
    <main className="min-h-screen flex flex-col">
      <BackButton />
      
      {/* Main content section that takes full viewport height */}
      <section className="relative overflow-hidden" style={{ height: '100vh' }}>
        <div className="h-full flex items-center justify-center px-4">
          <div className="w-full max-w-lg relative z-10">
            <div className="glass p-8 sm:p-12 animate-slide-in-up text-center">
              <div className="mb-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white mb-4">
                  Vielen Dank!
                </h1>
                <p className="text-xl text-white/80 mb-6">
                  Ihre Zahlung wurde erfolgreich verarbeitet.
                </p>
                
                {sessionId && (
                  <div className="bg-white/5 p-4 rounded-lg mb-8">
                    <p className="text-white/70 text-sm">
                      Referenz: {sessionId}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Simple, mobile-friendly button */}
              <a 
                href="/"
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl text-center text-lg transition-all duration-200 no-underline active:scale-95 touch-manipulation select-none"
                style={{
                  minHeight: '56px',
                  lineHeight: '1.2',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                Zurück zur Startseite
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative elements with proper positioning */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-500 pointer-events-none" />
      </section>
      
      <Footer />
    </main>
  );
}