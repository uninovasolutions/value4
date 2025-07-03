'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useFirstSlug } from '@/hooks/use-first-slug';
import { getProspectData, ProspectData } from '@/lib/prospect-data';

interface SlugContextType {
  firstSlug: string;
  prospectData: ProspectData | null;
  isLoaded: boolean;
}

const SlugContext = createContext<SlugContextType | undefined>(undefined);

interface SlugProviderProps {
  children: ReactNode;
  currentSlug?: string;
}

export function SlugProvider({ children, currentSlug }: SlugProviderProps) {
  const { firstSlug, isLoaded: slugLoaded } = useFirstSlug(currentSlug);
  const [prospectData, setProspectData] = useState<ProspectData | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (slugLoaded && firstSlug) {
      getProspectData(firstSlug)
        .then(data => {
          setProspectData(data);
          setDataLoaded(true);
        })
        .catch(error => {
          console.error('Error loading prospect data:', error);
          // Set fallback data
          setProspectData({
            biz_name: firstSlug.charAt(0).toUpperCase() + firstSlug.slice(1).replace(/[-_]/g, ' '),
            biz_pitch: 'Experience our AI-powered booking system.',
            industry: 'Service Business',
          });
          setDataLoaded(true);
        });
    }
  }, [slugLoaded, firstSlug]);

  return (
    <SlugContext.Provider value={{ 
      firstSlug, 
      prospectData, 
      isLoaded: slugLoaded && dataLoaded 
    }}>
      {children}
    </SlugContext.Provider>
  );
}

export function useSlugContext() {
  const context = useContext(SlugContext);
  if (context === undefined) {
    throw new Error('useSlugContext must be used within a SlugProvider');
  }
  return context;
}