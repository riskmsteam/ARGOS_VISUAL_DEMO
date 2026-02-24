import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ColorPalette } from '@/config/palettes';
import { palettes, defaultPalette } from '@/config/palettes';

export interface ImageSettings {
  background: string;
  icon: string;
  brightness: number;
  opacity: number;
  zoom: number;
  posX: number;
  posY: number;
}

export interface UIScaleSettings {
  uiScale: number; // 0.5 to 1.5
  fontSize: number; // 10 to 20
}

export interface ConfigState {
  // Visual
  palette: ColorPalette;
  images: ImageSettings;
  uiScale: UIScaleSettings;
  
  // Available images
  availableImages: {
    backgrounds: string[];
    icons: string[];
  };
}

interface ConfigContextType extends ConfigState {
  setPalette: (paletteId: string) => void;
  setBackgroundImage: (image: string) => void;
  setIconImage: (image: string) => void;
  setBrightness: (value: number) => void;
  setOpacity: (value: number) => void;
  setZoom: (value: number) => void;
  setPosX: (value: number) => void;
  setPosY: (value: number) => void;
  setUIScale: (value: number) => void;
  setFontSize: (value: number) => void;
}

const availableBackgrounds = [
  '/assets/fondo_1.png',
  '/assets/fondo_grande_1.png',
  '/assets/fondo_grande_2.png',
  '/assets/banner.png',
  '/assets/CA6511AE-D026-45A6-A604-8768E86E8B15 (1)(1).png',
];

const availableIcons = [
  '/assets/ico_sencillo.png',
  '/assets/ico_og.png',
  '/assets/CA6511AE-D026-45A6-A604-8768E86E8B15 (1)(1).png',
];

const ConfigContext = createContext<ConfigContextType | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<ColorPalette>(defaultPalette);
  const [images, setImages] = useState<ImageSettings>({
    background: availableBackgrounds[0],
    icon: availableIcons[0],
    brightness: 100,
    opacity: 20,
    zoom: 100,
    posX: 50,
    posY: 50,
  });
  const [uiScale, setUIScaleState] = useState<UIScaleSettings>({
    uiScale: 0.8,
    fontSize: 14,
  });

  const setPalette = useCallback((paletteId: string) => {
    const newPalette = palettes.find(p => p.id === paletteId);
    if (newPalette) {
      setPaletteState(newPalette);
    }
  }, []);

  const setBackgroundImage = useCallback((image: string) => {
    setImages(prev => ({ ...prev, background: image }));
  }, []);

  const setIconImage = useCallback((image: string) => {
    setImages(prev => ({ ...prev, icon: image }));
  }, []);

  const setBrightness = useCallback((value: number) => {
    setImages(prev => ({ ...prev, brightness: value }));
  }, []);

  const setOpacity = useCallback((value: number) => {
    setImages(prev => ({ ...prev, opacity: value }));
  }, []);

  const setZoom = useCallback((value: number) => {
    setImages(prev => ({ ...prev, zoom: value }));
  }, []);

  const setPosX = useCallback((value: number) => {
    setImages(prev => ({ ...prev, posX: value }));
  }, []);

  const setPosY = useCallback((value: number) => {
    setImages(prev => ({ ...prev, posY: value }));
  }, []);

  const setUIScale = useCallback((value: number) => {
    setUIScaleState(prev => ({ ...prev, uiScale: value }));
  }, []);

  const setFontSize = useCallback((value: number) => {
    setUIScaleState(prev => ({ ...prev, fontSize: value }));
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        palette,
        images,
        uiScale,
        availableImages: {
          backgrounds: availableBackgrounds,
          icons: availableIcons,
        },
        setPalette,
        setBackgroundImage,
        setIconImage,
        setBrightness,
        setOpacity,
        setZoom,
        setPosX,
        setPosY,
        setUIScale,
        setFontSize,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
