'use client';

import { useState, useEffect } from 'react';

export function useFirstSlug(currentSlug?: string) {
  const [firstSlug, setFirstSlug] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get the first slug cookie
    const getFirstSlugCookie = () => {
      const cookies = document.cookie.split(';');
      const firstSlugCookie = cookies.find(cookie => 
        cookie.trim().startsWith('first-slug=')
      );
      return firstSlugCookie ? firstSlugCookie.split('=')[1] : null;
    };

    // Set the first slug cookie
    const setFirstSlugCookie = (slug: string) => {
      // Set cookie to expire in 1 year
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `first-slug=${slug}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    };

    const existingSlug = getFirstSlugCookie();
    
    if (existingSlug) {
      // Use existing stored slug
      setFirstSlug(existingSlug);
    } else if (currentSlug && currentSlug !== 'home') {
      // Store the current slug as the first slug (only if it's not the generic homepage)
      setFirstSlug(currentSlug);
      setFirstSlugCookie(currentSlug);
    } else {
      // If visiting homepage first, check URL path for any slug
      const path = window.location.pathname;
      const pathSlug = path.split('/')[1];
      
      if (pathSlug && pathSlug.length > 0) {
        setFirstSlug(pathSlug);
        setFirstSlugCookie(pathSlug);
      } else {
        // No slug detected, use 'home' as default
        setFirstSlug('generic');
        setFirstSlugCookie('generic');
      }
    }
    
    setIsLoaded(true);
  }, [currentSlug]);

  return { firstSlug, isLoaded };
}