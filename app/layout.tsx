import './globals.css';
import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from '@/components/session-provider';
import { ConsentBanner } from '@/components/consent-banner';

const kumbhSans = Kumbh_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kumbh-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Liquid Glass Demo',
    default: 'Liquid Glass Demo - KI-gestützte Business-Lösungen',
  },
  description: 'Erleben Sie die Zukunft der Business-Automatisierung mit unseren KI-gestützten Lösungen. Schön, schnell und intelligent.',
  keywords: ['KI', 'Automatisierung', 'Business', 'Chat', 'Assistent', 'Liquid Glass', 'Modern'],
  authors: [{ name: 'Liquid Glass Demo' }],
  creator: 'Liquid Glass Demo',
  publisher: 'Liquid Glass Demo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Liquid Glass Demo',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={kumbhSans.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#1c274f" />
        <meta name="theme-color" content="#1c274f" />
      </head>
      <body className={kumbhSans.className} suppressHydrationWarning>
        <div className="liquid-background-variant-2" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <ConsentBanner />
            <Toaster 
              position="top-right"
              expand
              richColors
              closeButton
            />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}