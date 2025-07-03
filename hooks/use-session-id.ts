'use client';

import { useState, useEffect } from 'react';

export function useSessionId() {
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get session ID cookie
    const getSessionIdCookie = () => {
      const cookies = document.cookie.split(';');
      const sidCookie = cookies.find(cookie => 
        cookie.trim().startsWith('sid=')
      );
      return sidCookie ? sidCookie.split('=')[1] : null;
    };

    // Set session ID cookie (always secure, essential cookie)
    const setSessionIdCookie = (sid: string) => {
      // This is an essential technical cookie - always set regardless of consent
      // It expires in 24 hours for privacy
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      document.cookie = `sid=${sid}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
    };

    // Generate UUID v4
    const generateUUIDv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    const existingSid = getSessionIdCookie();
    
    if (existingSid) {
      setSessionId(existingSid);
    } else {
      // Generate new session ID
      const newSid = generateUUIDv4();
      setSessionId(newSid);
      setSessionIdCookie(newSid);
    }
    
    setIsLoaded(true);
  }, []);

  return { sessionId, isLoaded };
}