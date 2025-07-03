'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Always visible footer content */}
      <div className="flex justify-center pb-8">
        <div className="glass p-8 mx-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-right">
              <h3 className="text-white font-semibold mb-4">
                Kontakt
              </h3>
              <div className="text-white/70 space-y-2">
                <p>Liquid Glass Demo GmbH</p>
                <p>info@liquidglass-demo.com</p>
              </div>
            </div>
            
            <div className="text-left">
              <h3 className="text-white font-semibold mb-4">Rechtliches</h3>
              <nav className="space-y-2">
                <Link 
                  href="/privacy"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Datenschutz
                </Link>
                <Link 
                  href="/imprint"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Impressum
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal footer */}
      <div className="text-center py-7 text-white/50 text-sm">
        <p>
          © {currentYear} Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}