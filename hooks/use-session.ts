'use client';

import { useState, useEffect } from 'react';

export function useSession() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Get or create session ID
    let sid = sessionStorage.getItem('session_id');
    
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem('session_id', sid);
    }
    
    setSessionId(sid);
  }, []);

  return { sessionId };
}