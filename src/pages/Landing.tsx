import { useState } from 'react';
import { Brain, Calculator, Shield, Check, ArrowRight, MessageCircle, LogIn, ChevronDown, Lock, AlertTriangle, Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useConfig } from '@/context/ConfigContext';

const features = [
  {
    icon: Brain,
    titleKey: 'bayesianInference',
    descKey: 'bayesianDesc',
    color: '#9B59B6',
  },
  {
    icon: Calculator,
    titleKey: 'kellyCriterion',
    descKey: 'kellyDesc',
    color: '#4A9EFF',
  },
  {
    icon: Shield,
    titleKey: 'psiModulator',
    descKey: 'psiDesc',
    color: '#00D4AA',
  },
];

const steps = [
  { num: '01', titleKey: 'step1Title', descKey: 'step1Desc' },
  { num: '02', titleKey: 'step2Title', descKey: 'step2Desc' },
  { num: '03', titleKey: 'step3Title', descKey: 'step3Desc' },
  { num: '04', titleKey: 'step4Title', descKey: 'step4Desc' },
];

const faqs = [
  { q: 'faq1Q', a: 'faq1A' },
  { q: 'faq2Q', a: 'faq2A' },
  { q: 'faq3Q', a: 'faq3A' },
];

// The Graveyard - Real trader stories
const graveyardStories = [
  {
    id: 1,
    title: 'El Día Que Todo Cambió',
    author: 'Trader Anónimo',
    preview: 'Pensé que tenía el mercado dominado...',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'De $50k a $0',
    author: 'Ex-Trader Forex',
    preview: 'El overtrading me destruyó en 3 días...',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'La Trampa del Tilt',
    author: 'Recuperado',
    preview: 'No sabía que estaba en tilt hasta que fue tarde...',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

interface LandingProps {
  onEnterDemo: () => void;
}

// Enforcement Scale Component
function EnforcementScale({ palette }: { palette: any }) {
  const [activeLevel, setActiveLevel] = useState<'nudge' | 'friction' | 'lockout'>('nudge');

  const levels = [
    { id: 'nudge', label: 'NUDGE', color: '#00D4AA', desc: 'Notificación suave' },
    { id: 'friction', label: 'FRICTION', color: '#F39C12', desc: 'Confirmación extra' },
    { id: 'lockout', label: 'LOCKOUT', color: '#E74C3C', desc: 'Operaciones bloqueadas' },
  ];

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
      <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: palette.text }}>
        Escala de Enforcement
      </h3>
      <div className="flex justify-center gap-2 mb-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setActiveLevel(level.id as any)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              activeLevel === level.id ? 'scale-110' : 'opacity-50 hover:opacity-75'
            }`}
            style={{
              backgroundColor: activeLevel === level.id ? level.color : palette.border,
              color: activeLevel === level.id ? '#000' : palette.textMuted,
              boxShadow: activeLevel === level.id ? `0 0 20px ${level.color}60` : 'none',
            }}
          >
            {level.label}
          </button>
        ))}
      </div>
      <div className="h-2 rounded-full overflow-hidden flex" style={{ backgroundColor: palette.border }}>
        <div className="flex-1" style={{ backgroundColor: '#00D4AA', opacity: activeLevel === 'nudge' ? 1 : 0.3 }} />
        <div className="flex-1" style={{ backgroundColor: '#F39C12', opacity: activeLevel === 'friction' ? 1 : 0.3 }} />
        <div className="flex-1" style={{ backgroundColor: '#E74C3C', opacity: activeLevel === 'lockout' ? 1 : 0.3 }} />
      </div>
      <p className="text-center text-sm mt-3" style={{ color: palette.textMuted }}>
        {levels.find(l => l.id === activeLevel)?.desc}
      </p>
    </div>
  );
}

// Discipline Streak Component
function DisciplineStreak({ palette }: { palette: any }) {
  const streak = 12;
  const badges = [
    { id: 'ironMind', name: 'Iron Mind', icon: '🧠', earned: streak >= 7 },
    { id: 'kellyMaster', name: 'Kelly Master', icon: '📊', earned: streak >= 14 },
    { id: 'tiltProof', name: 'Tilt Proof', icon: '🛡️', earned: streak >= 30 },
  ];

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: palette.text }}>
          🔥 Racha de Disciplina
        </h3>
        <span className="text-2xl font-bold" style={{ color: palette.primary }}>
          {streak} días
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-3 rounded-full overflow-hidden mb-4" style={{ backgroundColor: palette.border }}>
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${(streak / 30) * 100}%`,
            background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary})`,
          }}
        />
      </div>

      {/* Badges */}
      <div className="flex justify-center gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id}
            className={`text-center p-3 rounded-lg transition-all ${
              badge.earned ? 'scale-100' : 'scale-90 opacity-40'
            }`}
            style={{
              backgroundColor: badge.earned ? `${palette.primary}20` : palette.border,
              border: `1px solid ${badge.earned ? palette.primary : palette.border}`,
            }}
          >
            <div className="text-2xl mb-1">{badge.icon}</div>
            <div className="text-xs font-medium" style={{ color: badge.earned ? palette.text : palette.textMuted }}>
              {badge.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Landing({ onEnterDemo }: LandingProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showLockoutDemo, setShowLockoutDemo] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { palette } = useConfig();

  const pricingTiers = [
    {
      id: 'free',
      name: t('freeTrial'),
      price: t('freeTrialPrice'),
      period: t('freeTrialPeriod'),
      description: t('freeTrialDesc'),
      features: [
        'Modo SAFE',
        'Journaling Básico',
        'Calendario P&L',
        '7 días de prueba',
      ],
      cta: t('freeTrialCta'),
      highlighted: false,
    },
    {
      id: 'basic',
      name: t('basic'),
      price: billingCycle === 'monthly' ? '€39' : '€390',
      period: billingCycle === 'monthly' ? '/mes' : '/año',
      description: t('basicDesc'),
      features: [
        t('basicFeature1'),
        t('basicFeature2'),
        t('basicFeature3'),
        'Soporte Email',
      ],
      cta: t('basicCta'),
      highlighted: false,
    },
    {
      id: 'pro',
      name: t('pro'),
      price: billingCycle === 'monthly' ? '€99' : '€990',
      period: billingCycle === 'monthly' ? '/mes' : '/año',
      description: t('proDesc'),
      features: [
        t('proFeature1'),
        t('proFeature2'),
        t('proFeature3'),
        t('proFeature4'),
      ],
      cta: t('proCta'),
      highlighted: true,
      badge: t('proBadge'),
    },
    {
      id: 'elite',
      name: t('elite'),
      price: billingCycle === 'monthly' ? '€199' : '€1990',
      period: billingCycle === 'monthly' ? '/mes' : '/año',
      description: t('eliteDesc'),
      features: [
        t('eliteFeature1'),
        t('eliteFeature2'),
        t('eliteFeature3'),
        t('eliteFeature4'),
      ],
      cta: t('eliteCta'),
      highlighted: false,
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.background }}>
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ 
          backgroundColor: `${palette.card}90`,
          borderColor: palette.border,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ boxShadow: `0 0 10px ${palette.glow}` }}
            >
              <img src="/assets/ico_sencillo.png" alt="ARGOS" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg" style={{ color: palette.text }}>ARGOS</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('features')} className="text-sm hover:opacity-70 transition-opacity" style={{ color: palette.textMuted }}>
              {t('whatIsArgos')}
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm hover:opacity-70 transition-opacity" style={{ color: palette.textMuted }}>
              {t('features')}
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm hover:opacity-70 transition-opacity" style={{ color: palette.textMuted }}>
              {t('pricing')}
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-sm hover:opacity-70 transition-opacity" style={{ color: palette.textMuted }}>
              {t('faq')}
            </button>
            <a href="https://discord.gg/argosquant" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-70 transition-opacity flex items-center gap-1" style={{ color: palette.textMuted }}>
              <MessageCircle className="w-4 h-4" />
              {t('community')}
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border" style={{ borderColor: palette.border, color: palette.text }}>
                {language === 'es' ? '🇪🇸 ES' : language === 'en' ? '🇬🇧 EN' : language === 'de' ? '🇩🇪 DE' : language === 'fr' ? '🇫🇷 FR' : language === 'zh' ? '🇨🇳 ZH' : '🇯🇵 JA'}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block rounded-lg border overflow-hidden shadow-xl" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                <button onClick={() => setLanguage('es')} className="block w-full px-4 py-2 text-sm text-left hover:opacity-70" style={{ color: palette.text }}>🇪🇸 Español</button>
                <button onClick={() => setLanguage('en')} className="block w-full px-4 py-2 text-sm text-left hover:opacity-70" style={{ color: palette.text }}>🇬🇧 English</button>
                <button onClick={() => setLanguage('de')} className="block w-full px-4 py-2 text-sm text-left hover:opacity-70" style={{ color: palette.text }}>🇩🇪 Deutsch</button>
                <button onClick={() => setLanguage('fr')} className="block w-full px-4 py-2 text-sm text-left hover:opacity-70" style={{ color: palette.text }}>🇫🇷 Français</button>
                <button onClick={() => setLanguage('zh')} className="block w-full px-4 py-2 text-sm text-left hover:opacity-70" style={{ color: palette.text }}>🇨🇳 中文</button>
                <button onClick={() => setLanguage('ja')} className="block w-full px-4 py-2 text-sm text-left hover:opacity-70" style={{ color: palette.text }}>🇯🇵 日本語</button>
              </div>
            </div>

            <button 
              onClick={onEnterDemo}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ 
                backgroundColor: palette.primary,
                color: palette.background,
              }}
            >
              <LogIn className="w-4 h-4" />
              {t('login')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - NEW COPY */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden animate-pulse"
                style={{ boxShadow: `0 0 30px ${palette.glow}` }}
              >
                <img src="/assets/ico_sencillo.png" alt="ARGOS" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* NEW TITLE - Without aggressive "quemar" */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: palette.text }}>
              {t('heroTitle')}
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{ color: palette.textMuted }}>
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                className="px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: palette.primary,
                  color: palette.background,
                  boxShadow: `0 0 20px ${palette.glow}`,
                }}
              >
                {t('startFreeTrial')}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onEnterDemo}
                className="px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 border"
                style={{ 
                  borderColor: palette.border,
                  color: palette.text,
                }}
              >
                {t('viewDemo')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Lockout Demo Hook */}
            <div className="mt-8">
              <button
                onClick={() => setShowLockoutDemo(!showLockoutDemo)}
                className="text-sm flex items-center gap-2 mx-auto transition-opacity hover:opacity-70"
                style={{ color: palette.textMuted }}
              >
                <Lock className="w-4 h-4" />
                ¿Cómo funciona el Lockout? Haz clic para ver
              </button>
              
              {showLockoutDemo && (
                <div className="mt-4 max-w-md mx-auto animate-fadeIn">
                  <EnforcementScale palette={palette} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 border-t" style={{ borderColor: palette.border }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: palette.text }}>
                {t('problemTitle')}
              </h2>
              <p className="text-base mb-6" style={{ color: palette.textMuted }}>
                {t('problemSubtitle')}
              </p>
              
              {/* Discipline Streak Gamification */}
              <div className="mb-6">
                <DisciplineStreak palette={palette} />
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: `${palette.danger}10` }}>
                  <p className="text-3xl font-bold" style={{ color: palette.danger }}>78%</p>
                  <p className="text-xs" style={{ color: palette.textMuted }}>Sin ARGOS</p>
                </div>
                <ArrowRight className="w-6 h-6" style={{ color: palette.textMuted }} />
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: `${palette.success}10` }}>
                  <p className="text-3xl font-bold" style={{ color: palette.success }}>&lt;5%</p>
                  <p className="text-xs" style={{ color: palette.textMuted }}>Con ARGOS</p>
                </div>
              </div>
            </div>
            
            <div 
              className="rounded-xl p-6"
              style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
            >
              <div className="flex items-end justify-around h-40">
                <div className="text-center">
                  <div 
                    className="w-20 rounded-t-lg"
                    style={{ height: '140px', background: `linear-gradient(to top, ${palette.danger}, #FF6B6B)` }}
                  />
                  <p className="mt-2 text-xs" style={{ color: palette.textMuted }}>Sin ARGOS</p>
                  <p className="text-sm font-bold" style={{ color: palette.danger }}>-$2,450</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-20 rounded-t-lg"
                    style={{ height: '100px', background: `linear-gradient(to top, ${palette.primary}, ${palette.secondary})` }}
                  />
                  <p className="mt-2 text-xs" style={{ color: palette.textMuted }}>Con ARGOS</p>
                  <p className="text-sm font-bold" style={{ color: palette.primary }}>+$890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Three Pillars */}
      <section id="features" className="py-12 border-t" style={{ borderColor: palette.border }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: palette.text }}>{t('threePillars')}</h2>
            <p className="text-base" style={{ color: palette.textMuted }}>Matemática pura, sin fórmulas visibles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.titleKey}
                  className="rounded-xl p-5 transition-all hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: palette.card, 
                    border: `1px solid ${palette.border}` 
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: palette.text }}>{t(feature.titleKey)}</h3>
                  <p className="text-sm" style={{ color: palette.textMuted }}>{t(feature.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 border-t" style={{ borderColor: palette.border }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: palette.text }}>{t('howItWorks')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div 
                key={step.num}
                className="rounded-xl p-5 transition-all"
                style={{ 
                  backgroundColor: palette.card, 
                  border: `1px solid ${hoveredStep === index ? palette.primary : palette.border}` 
                }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <span 
                  className="text-4xl font-bold"
                  style={{ color: palette.border }}
                >{step.num}</span>
                <h3 className="text-base font-semibold mt-3 mb-1" style={{ color: palette.text }}>{t(step.titleKey)}</h3>
                <p className="text-sm" style={{ color: palette.textMuted }}>{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Graveyard Section */}
      <section id="graveyard" className="py-12 border-t" style={{ borderColor: palette.border }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: palette.text }}>{t('theGraveyard')}</h2>
            <p className="text-base" style={{ color: palette.textMuted }}>{t('graveyardDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {graveyardStories.map((story) => (
              <div 
                key={story.id}
                className="rounded-xl overflow-hidden transition-all hover:scale-[1.02]"
                style={{ 
                  backgroundColor: palette.card, 
                  border: `1px solid ${palette.border}` 
                }}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-black flex items-center justify-center group cursor-pointer">
                  <div 
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${palette.danger}40, ${palette.primary}40)`,
                    }}
                  />
                  <Play className="w-12 h-12 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" style={{ color: palette.primary }} />
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: palette.text }}>
                    5:32
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-1" style={{ color: palette.text }}>{story.title}</h3>
                  <p className="text-xs mb-2" style={{ color: palette.textMuted }}>{story.author}</p>
                  <p className="text-sm" style={{ color: palette.textMuted }}>{story.preview}</p>
                  <button 
                    className="mt-3 flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
                    style={{ color: palette.primary }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver historia
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 border-t" style={{ borderColor: palette.border }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: palette.text }}>{t('pricing')}</h2>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'font-medium' : ''}`} style={{ color: billingCycle === 'monthly' ? palette.text : palette.textMuted }}>
                {t('monthly')}
              </span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-7 rounded-full transition-colors"
                style={{ backgroundColor: palette.border }}
              >
                <div 
                  className="absolute top-1 w-5 h-5 rounded-full transition-all"
                  style={{ 
                    backgroundColor: palette.primary,
                    left: billingCycle === 'yearly' ? 'calc(100% - 1.5rem)' : '0.25rem',
                  }}
                />
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'font-medium' : ''}`} style={{ color: billingCycle === 'yearly' ? palette.text : palette.textMuted }}>
                {t('yearly')}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: `${palette.success}20`, color: palette.success }}>
                {t('yearlyDiscount')}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingTiers.map((plan) => (
              <div 
                key={plan.id}
                className="relative rounded-xl p-5 transition-all hover:scale-[1.02]"
                style={{ 
                  backgroundColor: plan.highlighted ? `${palette.primary}10` : palette.card,
                  border: `2px solid ${plan.highlighted ? palette.primary : palette.border}`,
                }}
              >
                {plan.badge && (
                  <span 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: palette.primary, color: palette.background }}
                  >
                    {plan.badge}
                  </span>
                )}
                
                <h3 className="text-lg font-semibold" style={{ color: palette.text }}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-3">
                  <span className="text-3xl font-bold" style={{ color: palette.text }}>{plan.price}</span>
                  <span className="text-sm" style={{ color: palette.textMuted }}>{plan.period}</span>
                </div>
                <p className="text-sm mb-4" style={{ color: palette.textMuted }}>{plan.description}</p>
                
                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm" style={{ color: palette.text }}>
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: palette.success }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="w-full py-2.5 rounded-lg font-semibold transition-all text-sm"
                  style={{ 
                    backgroundColor: plan.highlighted ? palette.primary : 'transparent',
                    color: plan.highlighted ? palette.background : palette.text,
                    border: `1px solid ${plan.highlighted ? palette.primary : palette.border}`,
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 border-t" style={{ borderColor: palette.border }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: palette.text }}>{t('faqTitle')}</h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium" style={{ color: palette.text }}>{t(faq.q)}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    style={{ color: palette.textMuted }}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4">
                    <p className="text-sm" style={{ color: palette.textMuted }}>{t(faq.a)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - EXPANDED DISCLAIMER */}
      <footer className="py-8 border-t" style={{ borderColor: palette.border }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Expanded Disclaimer */}
          <div 
            className="rounded-lg p-6 mb-6"
            style={{ backgroundColor: `${palette.warning}10`, border: `1px solid ${palette.warning}30` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5" style={{ color: palette.warning }} />
              <h4 className="font-semibold" style={{ color: palette.warning }}>{t('riskWarning')}</h4>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: palette.textMuted }}>
              {t('disclaimer')}
            </p>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: `${palette.warning}30` }}>
              <p className="text-xs" style={{ color: palette.textMuted }}>
                ARGOS Quant System es una herramienta de software educativa y de análisis. No proporcionamos asesoramiento financiero, 
                gestión de carteras ni recomendaciones de inversión personalizadas. Los resultados pasados no garantizan resultados futuros. 
                El trading con apalancamiento conlleva un alto riesgo de pérdida de capital y puede no ser adecuado para todos los inversores. 
                Nunca inviertas más de lo que puedas permitirte perder. Las simulaciones Monte Carlo son estimaciones teóricas y no predicen 
                resultados reales. Consulta con un asesor financiero profesional antes de tomar decisiones de inversión.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ boxShadow: `0 0 10px ${palette.glow}` }}
              >
                <img src="/assets/ico_sencillo.png" alt="ARGOS" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: palette.text }}>ARGOS</p>
                <p className="text-xs" style={{ color: palette.textMuted }}>QUANT SYSTEM</p>
              </div>
            </div>
            
            {/* Links */}
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: palette.textMuted }}>{t('terms')}</a>
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: palette.textMuted }}>{t('privacy')}</a>
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: palette.textMuted }}>{t('cookies')}</a>
            </div>

            {/* Copyright */}
            <p className="text-xs" style={{ color: palette.textMuted }}>
              © 2025 ARGOS Quant System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
