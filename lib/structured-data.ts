import { ProspectData } from './prospect-data';

export function generateStructuredData(prospect: ProspectData) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: prospect.biz_name,
    description: prospect.biz_pitch || `${prospect.biz_name} - KI-gestütztes Buchungssystem`,
    url: baseUrl,
    telephone: prospect.contact_phone,
    email: prospect.contact_email,
    address: prospect.address ? {
      '@type': 'PostalAddress',
      streetAddress: prospect.address,
      addressLocality: prospect.city,
      addressCountry: prospect.country || 'DE',
    } : undefined,
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 09:00-16:00'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'KI-Buchungsservices',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'KI-gestütztes Buchungssystem',
            description: 'Automatisierte Terminplanung mit KI-Assistent'
          }
        }
      ]
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${prospect.biz_name.toLowerCase().replace(/\s+/g, '-')}`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: 'Terminbuchung'
      }
    }
  };
}