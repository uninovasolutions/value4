export interface ProspectData {
  biz_name: string;
  biz_pitch?: string;
  industry?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
}

export async function getProspectData(slug: string): Promise<ProspectData | null> {
  // Don't fetch data for the generic home slug
  if (slug === 'home') {
    return {
      biz_name: '',
      biz_pitch: 'Erleben Sie die Zukunft der Business-Automatisierung mit unseren KI-gestützten Lösungen.',
      industry: 'Technology',
    };
  }

  try {
    // First try to fetch from N8N API
    const n8nUrl = process.env.NEXT_PUBLIC_N8N_PROSPECT_URL;
    
    if (n8nUrl) {
      const response = await fetch(`${n8nUrl}?slug=${encodeURIComponent(slug)}`, {
        // SSR-compatible fetch options
        cache: 'no-store', // Always fetch fresh data for SSR
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch prospect data from N8N:', error);
  }
  
  // Fallback to local data - SSR compatible
  try {
    // For SSR, we need to handle this differently
    if (typeof window === 'undefined') {
      // Server-side: read from file system or use static data
      const prospects = [
        {
          slug: "charles",
          biz_name: "Charles Detailing",
          biz_pitch: "Premium automotive detailing services with AI-powered booking. Get your car looking pristine with our expert care.",
          industry: "Automotive Services",
          contact_email: "info@charlesdetailing.com",
          contact_phone: "+49 123 456789",
          website: "https://charlesdetailing.com",
          address: "Autowerkstatt Straße 15",
          city: "Munich",
          country: "Germany"
        },
        {
          slug: "demo",
          biz_name: "Demo Business",
          biz_pitch: "Experience the future of business automation with our AI-powered solutions.",
          industry: "Technology",
          contact_email: "demo@example.com",
          contact_phone: "+49 987 654321",
          website: "https://demo.example.com",
          address: "Demo Straße 1",
          city: "Berlin",
          country: "Germany"
        },
        {
          slug: "restaurant",
          biz_name: "Bella Vista Restaurant",
          biz_pitch: "Authentic Italian cuisine with modern AI-powered reservation system. Book your table effortlessly.",
          industry: "Restaurant",
          contact_email: "reservations@bellavista.com",
          contact_phone: "+49 456 789123",
          website: "https://bellavista.com",
          address: "Italian Plaza 22",
          city: "Hamburg",
          country: "Germany"
        }
      ];
      
      const prospect = prospects.find((p: any) => p.slug === slug);
      if (prospect) {
        return prospect;
      }
    } else {
      // Client-side: fetch from public API
      const response = await fetch('/fallback.json');
      
      if (response.ok) {
        const prospects = await response.json();
        const prospect = prospects.find((p: ProspectData & { slug: string }) => p.slug === slug);
        
        if (prospect) {
          return prospect;
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch fallback data:', error);
  }
  
  // Ultimate fallback
  return {
    biz_name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, ' '),
    biz_pitch: 'Experience our AI-powered booking system.',
    industry: 'Service Business',
  };
}