import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'bhagwa' | 'ocean' | 'forest' | 'dark';
type Language = 'en' | 'hi';
type FontSize = 'small' | 'medium' | 'large';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  language: 'en',
  setLanguage: () => null,
  fontSize: 'medium',
  setFontSize: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'bhagwa',
  storageKey = 'app-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('app-language') as Language) || 'en'
  );
  const [fontSize, setFontSize] = useState<FontSize>(
    () => (localStorage.getItem('app-font-size') as FontSize) || 'medium'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('bhagwa', 'ocean', 'forest', 'dark', 'light', 'system');
    // Our themes are class-based. "dark" uses the existing .dark variables.
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem('app-language', language);
      setLanguage(language);
    },
    fontSize,
    setFontSize: (fontSize: FontSize) => {
      localStorage.setItem('app-font-size', fontSize);
      setFontSize(fontSize);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};