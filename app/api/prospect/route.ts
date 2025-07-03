import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

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

async function getProspectDataServer(slug: string): Promise<ProspectData | null> {
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
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch prospect data from N8N:', error);
  }
  
  // Fallback to local data
  try {
    const fallbackPath = join(process.cwd(), 'data', 'fallback.json');
    const fallbackData = await readFile(fallbackPath, 'utf8');
    const prospects = JSON.parse(fallbackData);
    
    // Find prospect by slug or return a default one
    const prospect = prospects.find((p: ProspectData & { slug: string }) => p.slug === slug);
    
    if (prospect) {
      return prospect;
    }
    
    // Return a generic prospect for any slug
    return {
      biz_name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, ' '),
      biz_pitch: `Welcome to ${slug}! Experience our AI-powered booking system.`,
      industry: 'Service Business',
    };
    
  } catch (error) {
    console.error('Failed to read fallback data:', error);
    
    // Ultimate fallback
    return {
      biz_name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, ' '),
      biz_pitch: 'Experience our AI-powered booking system.',
      industry: 'Service Business',
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }
    
    const prospectData = await getProspectDataServer(slug);
    
    return NextResponse.json(prospectData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
    
  } catch (error) {
    console.error('Prospect API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}