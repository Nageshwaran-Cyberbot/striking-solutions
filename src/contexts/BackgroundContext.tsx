
import React, { createContext, useContext, useState, useEffect } from "react";

type BackgroundType = 'particles' | 'image' | 'video';

interface BackgroundSettings {
  type: BackgroundType;
  mediaUrl?: string;
}

interface BackgroundContextType {
  backgroundSettings: BackgroundSettings;
  changeBackground: (settings: BackgroundSettings) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

// Default background settings
const defaultSettings: BackgroundSettings = {
  type: 'particles',
  mediaUrl: undefined
};

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>(() => {
    // Try to load settings from localStorage
    const savedSettings = localStorage.getItem('backgroundSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('backgroundSettings', JSON.stringify(backgroundSettings));
  }, [backgroundSettings]);

  const changeBackground = (settings: BackgroundSettings) => {
    setBackgroundSettings(settings);
  };

  return (
    <BackgroundContext.Provider
      value={{
        backgroundSettings,
        changeBackground
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}
