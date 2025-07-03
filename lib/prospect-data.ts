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
  try {
    const response = await fetch(`/api/prospect?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Failed to fetch prospect data:', error);
    
    // Ultimate fallback for client-side errors
    return {
      biz_name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, ' '),
      biz_pitch: 'Experience our AI-powered booking system.',
      industry: 'Service Business',
    };
  }
}