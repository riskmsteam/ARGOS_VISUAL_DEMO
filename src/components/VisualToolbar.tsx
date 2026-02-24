import { useState } from 'react';
import { Settings, X, Image, Palette, Sun, Droplets, Globe, ZoomIn, MoveHorizontal, MoveVertical, Type, Maximize } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { useLanguage, type Language } from '@/context/LanguageContext';
import { palettes } from '@/config/palettes';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧 EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸 ES' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪 DE' },
  { code: 'fr', name: 'Français', flag: '🇫🇷 FR' },
  { code: 'zh', name: '中文', flag: '🇨🇳 ZH' },
  { code: 'ja', name: '日本語', flag: '🇯🇵 JA' },
];

export function VisualToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'images' | 'colors' | 'scale' | 'language'>('images');
  
  const {
    palette,
    images,
    uiScale,
    availableImages,
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
  } = useConfig();

  const { language, setLanguage, t } = useLanguage();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full shadow-lg transition-all hover:scale-110"
        style={{ 
          backgroundColor: palette.card,
          border: `1px solid ${palette.border}`,
          boxShadow: `0 0 20px ${palette.glow}`,
        }}
      >
        <Settings className="w-5 h-5" style={{ color: palette.primary }} />
      </button>
    );
  }

  return (
    <div 
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 rounded-xl overflow-hidden shadow-2xl transition-all"
      style={{ 
        backgroundColor: palette.card,
        border: `1px solid ${palette.border}`,
        boxShadow: `0 0 30px ${palette.glow}`,
        width: '320px',
        maxHeight: '80vh',
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: palette.border }}
      >
        <h3 className="font-semibold" style={{ color: palette.text }}>
          {t('settings')}
        </h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-lg hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5" style={{ color: palette.textMuted }} />
        </button>
      </div>

      {/* Tabs */}
      <div 
        className="flex border-b"
        style={{ borderColor: palette.border }}
      >
        {[
          { id: 'images', icon: Image },
          { id: 'colors', icon: Palette },
          { id: 'scale', icon: Maximize },
          { id: 'language', icon: Globe },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className="flex-1 flex items-center justify-center gap-2 py-3 transition-all"
            style={{
              backgroundColor: activeTab === tab.id ? `${palette.primary}20` : 'transparent',
              borderBottom: activeTab === tab.id ? `2px solid ${palette.primary}` : '2px solid transparent',
            }}
          >
            <tab.icon className="w-4 h-4" style={{ color: activeTab === tab.id ? palette.primary : palette.textMuted }} />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
        {activeTab === 'images' && (
          <div className="space-y-5">
            {/* Background Image */}
            <div>
              <label className="block text-sm mb-2" style={{ color: palette.textMuted }}>
                Background
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableImages.backgrounds.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBackgroundImage(img)}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 transition-all"
                    style={{
                      borderColor: images.background === img ? palette.primary : palette.border,
                    }}
                  >
                    <img src={img} alt={`Background ${idx + 1}`} className="w-full h-full object-cover" />
                    {images.background === img && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${palette.primary}40` }}>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.primary }} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Image */}
            <div>
              <label className="block text-sm mb-2" style={{ color: palette.textMuted }}>
                Icon
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableImages.icons.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIconImage(img)}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 transition-all"
                    style={{
                      borderColor: images.icon === img ? palette.primary : palette.border,
                    }}
                  >
                    <img src={img} alt={`Icon ${idx + 1}`} className="w-full h-full object-cover" />
                    {images.icon === img && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${palette.primary}40` }}>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.primary }} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Brightness */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm" style={{ color: palette.textMuted }}>
                  <Sun className="w-4 h-4" />
                  Brightness
                </label>
                <span className="text-sm font-mono" style={{ color: palette.primary }}>
                  {images.brightness}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={images.brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm" style={{ color: palette.textMuted }}>
                  <Droplets className="w-4 h-4" />
                  Opacity
                </label>
                <span className="text-sm font-mono" style={{ color: palette.primary }}>
                  {images.opacity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={images.opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Zoom */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm" style={{ color: palette.textMuted }}>
                  <ZoomIn className="w-4 h-4" />
                  Zoom
                </label>
                <span className="text-sm font-mono" style={{ color: palette.primary }}>
                  {images.zoom}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={images.zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Position X */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm" style={{ color: palette.textMuted }}>
                  <MoveHorizontal className="w-4 h-4" />
                  Position X
                </label>
                <span className="text-sm font-mono" style={{ color: palette.primary }}>
                  {images.posX}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={images.posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Position Y */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm" style={{ color: palette.textMuted }}>
                  <MoveVertical className="w-4 h-4" />
                  Position Y
                </label>
                <span className="text-sm font-mono" style={{ color: palette.primary }}>
                  {images.posY}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={images.posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-3">
            <label className="block text-sm" style={{ color: palette.textMuted }}>
              Theme
            </label>
            {palettes.map((p) => (
              <button
                key={p.id}
                onClick={() => setPalette(p.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all"
                style={{
                  borderColor: palette.id === p.id ? p.primary : palette.border,
                  backgroundColor: palette.id === p.id ? `${p.primary}10` : 'transparent',
                }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
                    boxShadow: `0 0 10px ${p.glow}`,
                  }}
                />
                <span className="text-sm" style={{ color: palette.text }}>{p.name}</span>
                {palette.id === p.id && (
                  <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: p.primary }} />
                )}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'scale' && (
          <div className="space-y-5">
            {/* UI Scale */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm" style={{ color: palette.textMuted }}>
                  <Maximize className="w-4 h-4" />
                  {t('uiScale')}
                </label>
                <span className="text-sm font-mono" style={{ color: palette.primary }}>
                  {uiScale.uiScale.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={uiScale.uiScale}
                onChange={(e) => setUIScale(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: palette.textMuted }}>
                <span>0.5x</span>
                <span>1.0x</span>
                <span>1.5x</span>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm" style={{ color: palette.textMuted }}>
                  <Type className="w-4 h-4" />
                  {t('fontSize')}
                </label>
                <span className="text-sm font-mono" style={{ color: palette.primary }}>
                  {uiScale.fontSize}px
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="20"
                step="1"
                value={uiScale.fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: palette.textMuted }}>
                <span>10px</span>
                <span>15px</span>
                <span>20px</span>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setUIScale(0.8);
                setFontSize(14);
              }}
              className="w-full py-2 rounded-lg text-sm transition-all"
              style={{ 
                backgroundColor: palette.border, 
                color: palette.text,
              }}
            >
              Reset to Default
            </button>
          </div>
        )}

        {activeTab === 'language' && (
          <div className="space-y-2">
            <label className="block text-sm" style={{ color: palette.textMuted }}>
              Language
            </label>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border transition-all"
                style={{
                  borderColor: language === lang.code ? palette.primary : palette.border,
                  backgroundColor: language === lang.code ? `${palette.primary}10` : 'transparent',
                }}
              >
                <span className="text-lg">{lang.flag}</span>
                {language === lang.code && (
                  <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: palette.primary }} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
