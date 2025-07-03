import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString('de-DE');

  return (
    <main className="min-h-screen">
      <BackButton />
      
      <div className="grid-container py-24">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <article className="glass p-8 lg:p-12 prose prose-lg max-w-none">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Datenschutzerklärung
              </h1>
              <p className="text-white/70">
                Zuletzt aktualisiert: {currentDate}
              </p>
            </header>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                1. Einführung
              </h2>
              <p className="text-white/80 leading-relaxed">
                Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten auf unserer Website auf. Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind, z.B. Name, Adresse, E-Mail-Adressen, Nutzerverhalten.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                2. Datenerhebung
              </h2>
              <div className="text-white/80 leading-relaxed">
                <h3 className="text-xl font-medium text-white mb-3">Cookies und Session-Daten</h3>
                <p className="mb-4">
                  Wir verwenden ausschließlich technisch notwendige Cookies:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Session-ID (UUID): Zur Identifikation Ihrer Chat-Sitzung</li>
                  <li>Theme-Cookie: Zur Speicherung Ihrer Design-Präferenz</li>
                </ul>
                
                <h3 className="text-xl font-medium text-white mb-3">Chat-Daten</h3>
                <p className="mb-4">
                  Bei der Nutzung unseres KI-Assistenten werden folgende Daten verarbeitet:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Ihre Chat-Nachrichten</li>
                  <li>Zeitstempel der Nachrichten</li>
                  <li>Session-ID zur Zuordnung</li>
                  <li>Technische Metadaten (Bildschirmauflösung, Zeitzone)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                3. Drittanbieter - N8N Integration
              </h2>
              <div className="text-white/80 leading-relaxed">
                <p className="mb-4">
                  Zur Bereitstellung unseres KI-Assistenten nutzen wir N8N als Datenverarbeiter. Ihre Chat-Nachrichten werden an unsere N8N-Instanz übertragen und dort verarbeitet. N8N fungiert dabei als Auftragsverarbeiter gemäß Art. 28 DSGVO.
                </p>
                <p className="mb-4">
                  <strong>Datenübertragung:</strong> Alle Daten werden verschlüsselt über HTTPS übertragen.
                </p>
                <p className="mb-4">
                  <strong>Speicherdauer:</strong> Chat-Daten werden automatisch nach 90 Tagen gelöscht.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                4. Zahlungsverarbeitung - Stripe
              </h2>
              <div className="text-white/80 leading-relaxed">
                <p className="mb-4">
                  Für die Zahlungsabwicklung nutzen wir Stripe Inc. als Zahlungsdienstleister. Bei einer Zahlung werden Sie zu Stripe weitergeleitet. Stripe verarbeitet Ihre Zahlungsdaten gemäß ihren eigenen Datenschutzbestimmungen.
                </p>
                <p className="mb-4">
                  Weitere Informationen finden Sie in der 
                  <a href="https://stripe.com/privacy" className="text-blue-400 hover:text-blue-300 underline ml-1">
                    Datenschutzerklärung von Stripe
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                5. Ihre Rechte
              </h2>
              <div className="text-white/80 leading-relaxed">
                <p className="mb-4">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                6. Kontakt
              </h2>
              <div className="text-white/80 leading-relaxed">
                <p className="mb-4">
                  Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte kontaktieren Sie uns unter:
                </p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p><strong>E-Mail:</strong> privacy@example.com</p>
                  <p><strong>Adresse:</strong> Musterstraße 123, 12345 Musterstadt</p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}