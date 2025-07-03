'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, Settings, X } from 'lucide-react';

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    }));
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    }));
    setIsVisible(false);
  };

  const saveSettings = () => {
    // In a real implementation, you'd get these values from checkboxes
    localStorage.setItem('cookie-consent', JSON.stringify({
      essential: true,
      analytics: false, // Get from checkbox
      marketing: false, // Get from checkbox
      timestamp: Date.now(),
    }));
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="glass mx-auto max-w-4xl">
        <div className="p-6">
          {!showSettings ? (
            <div className="flex items-start gap-4">
              <Cookie className="w-6 h-6 text-white/80 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2">
                  Cookie-Einstellungen
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={acceptAll}
                    className="glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    Alle akzeptieren
                  </Button>
                  <Button
                    onClick={acceptEssential}
                    variant="outline"
                    className="bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Nur notwendige
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Konfigurieren
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">
                  Konfigurieren
                </h3>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notwendige Cookies</p>
                    <p className="text-white/70 text-sm">Erforderlich für die Grundfunktionalität</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end pr-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Analyse-Cookies</p>
                    <p className="text-white/70 text-sm">Helfen uns, unseren Service zu verbessern</p>
                  </div>
                  <div className="w-12 h-6 bg-white/20 rounded-full flex items-center pl-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Marketing-Cookies</p>
                    <p className="text-white/70 text-sm">Personalisierte Inhalte und Werbung</p>
                  </div>
                  <div className="w-12 h-6 bg-white/20 rounded-full flex items-center pl-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={saveSettings}
                  className="glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  Einstellungen speichern
                </Button>
                <Button
                  onClick={acceptAll}
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  Alle akzeptieren
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}