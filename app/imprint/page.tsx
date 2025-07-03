import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Rechtliche Hinweise und Impressum',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImprintPage() {
  return (
    <main className="min-h-screen">
      <BackButton />
      
      <div className="grid-container py-24">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <article className="glass p-8 lg:p-12 prose prose-lg max-w-none">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Impressum
              </h1>
            </header>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="text-white/80 leading-relaxed bg-white/5 p-6 rounded-lg">
                <p className="mb-2"><strong>Firmenname:</strong> Liquid Glass Demo GmbH</p>
                <p className="mb-2"><strong>Geschäftsführer:</strong> Max Mustermann</p>
                <p className="mb-2"><strong>Anschrift:</strong> Musterstraße 123, 12345 Musterstadt, Deutschland</p>
                <p className="mb-2"><strong>Telefon:</strong> +49 (0) 123 456789</p>
                <p className="mb-2"><strong>E-Mail:</strong> info@liquidglass-demo.com</p>
                <p className="mb-2"><strong>Handelsregister:</strong> HRB 12345</p>
                <p className="mb-2"><strong>Registergericht:</strong> Amtsgericht Musterstadt</p>
                <p className="mb-2"><strong>Umsatzsteuer-ID:</strong> DE123456789</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Verantwortlich für den Inhalt
              </h2>
              <div className="text-white/80 leading-relaxed">
                <p className="mb-4">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
                </p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p><strong>Max Mustermann</strong></p>
                  <p>Musterstraße 123</p>
                  <p>12345 Musterstadt</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Haftungsausschluss
              </h2>
              <div className="text-white/80 leading-relaxed">
                <h3 className="text-xl font-medium text-white mb-3">Haftung für Inhalte</h3>
                <p className="mb-4">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                
                <h3 className="text-xl font-medium text-white mb-3">Haftung für Links</h3>
                <p className="mb-4">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
                
                <h3 className="text-xl font-medium text-white mb-3">Urheberrecht</h3>
                <p className="mb-4">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </section>
          </article>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}