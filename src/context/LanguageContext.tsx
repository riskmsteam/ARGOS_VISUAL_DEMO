import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'es' | 'en' | 'de' | 'fr' | 'zh' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations = {
  es: {
    // Navigation
    dashboard: 'Dashboard',
    tradeEntry: 'Trade Entry',
    analytics: 'Análisis',
    coach: 'Coach',
    settings: 'Configuración',
    monteCarlo: 'Monte Carlo',
    journal: 'Journal',
    tutorial: 'Tutorial',
    exitDemo: 'Salir',
    
    // Landing Header
    whatIsArgos: '¿Qué es ARGOS?',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    community: 'Comunidad',
    login: 'Login',
    
    // Landing Hero
    heroTitle: 'Protección Institucional para Traders Retail.',
    heroSubtitle: 'Tu ventaja no es la estrategia, es la disciplina. Gestión de riesgo matemática con modulación conductual.',
    startFreeTrial: 'Empieza Prueba Gratuita',
    viewDemo: 'Ver Demo Interactiva',
    
    // Enforcement Scale
    enforcementNudge: 'NUDGE',
    enforcementFriction: 'FRICTION',
    enforcementLockout: 'LOCKOUT',
    enforcementOk: 'Todo correcto',
    enforcementWarning: 'Precaución activa',
    enforcementBlocked: 'Operaciones bloqueadas',
    
    // Gamification
    disciplineStreak: 'Racha de Disciplina',
    days: 'días',
    badgeIronMind: 'Iron Mind',
    badgeKellyMaster: 'Kelly Master',
    badgeTiltProof: 'Tilt Proof',
    
    // Problem Section
    problemTitle: 'El 78% de los traders retail pierde dinero.',
    problemSubtitle: 'No por falta de estrategia, sino por falta de disciplina.',
    theGraveyard: 'El Cementerio',
    graveyardDesc: 'Historias reales de traders que perdieron el control.',
    
    // Three Pillars
    threePillars: 'Los 3 Pilares de ARGOS',
    bayesianInference: 'Inferencia Bayesiana',
    bayesianDesc: 'Tu win rate real, no el que crees tener.',
    kellyCriterion: 'Kelly Criterion',
    kellyDesc: 'El tamaño óptimo para cada operación.',
    psiModulator: 'Modulador Ψ',
    psiDesc: 'Protección automática ante sesgos.',
    
    // How it Works
    howItWorks: 'Cómo Funciona',
    step1Title: 'Conecta tu cuenta',
    step1Desc: 'Compatible con MT4/MT5 y brokers principales.',
    step2Title: 'ARGOS analiza',
    step2Desc: 'Calcula tu edge real y el stake óptimo.',
    step3Title: 'Protección activa',
    step3Desc: 'Detecta tilt y ajusta el riesgo automáticamente.',
    step4Title: 'Mejora continua',
    step4Desc: 'Journal y analytics para optimizar tu trading.',
    
    // Pricing
    monthly: 'Mensual',
    yearly: 'Anual',
    yearlyDiscount: '2 meses gratis',
    freeTrial: 'FREE TRIAL',
    freeTrialPrice: '$0',
    freeTrialPeriod: '/ 7 días',
    freeTrialDesc: 'Prueba todas las funciones',
    freeTrialCta: 'Iniciar Prueba',
    basic: 'BASIC',
    basicPrice: '€39',
    basicPeriod: '/mes',
    basicDesc: 'Para traders de Binary Options',
    basicFeature1: 'Modo SAFE',
    basicFeature2: 'Journaling Básico',
    basicFeature3: 'Calendario P&L',
    basicCta: 'Elegir Basic',
    pro: 'PRO',
    proBadge: 'Recomendado',
    proPrice: '€99',
    proPeriod: '/mes',
    proDesc: 'Para traders de Prop Firms',
    proFeature1: 'Todo de Basic',
    proFeature2: 'Modo DYNAMIC',
    proFeature3: 'Análisis de Sesgos',
    proFeature4: 'Journaling Avanzado',
    proCta: 'Elegir Pro',
    elite: 'ELITE',
    elitePrice: '€199',
    elitePeriod: '/mes',
    eliteDesc: 'Para traders profesionales',
    eliteFeature1: 'Todo de Pro',
    eliteFeature2: 'Modo SNIPER',
    eliteFeature3: 'Prioridad Soporte',
    eliteFeature4: 'Datos en Bruto',
    eliteCta: 'Elegir Elite',
    
    // FAQ
    faqTitle: 'Preguntas Frecuentes',
    faq1Q: '¿ARGOS es un bot de trading?',
    faq1A: 'No. ARGOS no ejecuta trades automáticamente. Es una herramienta de gestión de riesgo que te recomienda el tamaño de posición óptimo.',
    faq2Q: '¿Funciona con cualquier broker?',
    faq2A: 'Sí, ARGOS se conecta vía API con los principales brokers y plataformas (MT4, MT5, cTrader).',
    faq3Q: '¿Puedo cancelar en cualquier momento?',
    faq3A: 'Sí, no hay compromiso de permanencia. Cancela cuando quieras desde tu panel de cuenta.',
    
    // Footer
    terms: 'Términos y Condiciones',
    privacy: 'Política de Privacidad',
    cookies: 'Política de Cookies',
    riskWarning: 'Advertencia de Riesgo',
    disclaimer: 'ARGOS es una herramienta educativa y de análisis. No ofrecemos servicios de asesoramiento financiero, gestión de carteras ni recomendaciones de inversión. Los resultados pasados no garantizan resultados futuros. El trading con apalancamiento conlleva un alto riesgo de pérdida de capital. Nunca inviertas más de lo que puedas permitirte perder.',
    
    // Dashboard
    balance: 'Balance',
    winRate: 'Win Rate',
    profitFactor: 'Profit Factor',
    sharpe: 'Sharpe',
    maxDD: 'Max DD',
    activeMotor: 'Motor Activo',
    currentPsi: 'Ψ Actual',
    equityCurve: 'Equity Curve',
    activeFactors: 'Factores Activos',
    recommendedStake: 'Stake Recomendado',
    lastTrades: 'Últimas Operaciones',
    
    // Trade Entry
    sessionDD: 'DD Sesión',
    currentStreak: 'Racha Actual',
    cti: 'CTI (Tilt)',
    argosRecommends: 'ARGOS Recomienda',
    registerTrade: 'Registrar Operación',
    
    // Settings
    tradingMode: 'Modo de Trading',
    binaryOptions: 'Binary Options',
    propFirm: 'Prop Firm',
    initialCapital: 'Capital Inicial',
    selectPropFirm: 'Selecciona tu Prop Firm',
    uiScale: 'Escala UI',
    fontSize: 'Tamaño de Fuente',
    
    // Journal
    journalTitle: 'Trading Journal',
    calendar: 'Calendario',
    dailyNotes: 'Notas del Día',
    dateRange: 'Rango de Fechas',
    startDate: 'Fecha Inicio',
    endDate: 'Fecha Fin',
    applyFilter: 'Aplicar Filtro',
    
    // Tutorial
    tutorialTitle: 'Aprende ARGOS',
    whatIsKelly: '¿Qué es el Kelly?',
    whatIsPsi: '¿Qué es el Factor Ψ?',
    howToConnect: '¿Cómo conectar tu cuenta?',
    
    // Monte Carlo
    simulationParameters: 'Parámetros de Simulación',
    numberOfTrades: 'Número de Trades',
    winRate2: 'Win Rate (%)',
    riskReward: 'Ratio Riesgo:Recompensa',
    initialBalance: 'Balance Inicial',
    riskPerTrade: 'Riesgo por Trade (%)',
    runSimulation: 'Ejecutar Simulación',
    simulationResults: 'Resultados de Simulación',
    finalBalance: 'Balance Final',
    totalReturn: 'Retorno Total',
    maxDrawdown: 'Max Drawdown',
    probabilityOfRuin: 'Probabilidad de Ruina',
  },
  
  en: {
    // Navigation
    dashboard: 'Dashboard',
    tradeEntry: 'Trade Entry',
    analytics: 'Analytics',
    coach: 'Coach',
    settings: 'Settings',
    monteCarlo: 'Monte Carlo',
    journal: 'Journal',
    tutorial: 'Tutorial',
    exitDemo: 'Exit',
    
    // Landing Header
    whatIsArgos: 'What is ARGOS?',
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    community: 'Community',
    login: 'Login',
    
    // Landing Hero
    heroTitle: 'Institutional Protection for Retail Traders.',
    heroSubtitle: 'Your edge is not the strategy, it is the discipline. Mathematical risk management with behavioral modulation.',
    startFreeTrial: 'Start Free Trial',
    viewDemo: 'View Interactive Demo',
    
    // Enforcement Scale
    enforcementNudge: 'NUDGE',
    enforcementFriction: 'FRICTION',
    enforcementLockout: 'LOCKOUT',
    enforcementOk: 'All good',
    enforcementWarning: 'Warning active',
    enforcementBlocked: 'Operations blocked',
    
    // Gamification
    disciplineStreak: 'Discipline Streak',
    days: 'days',
    badgeIronMind: 'Iron Mind',
    badgeKellyMaster: 'Kelly Master',
    badgeTiltProof: 'Tilt Proof',
    
    // Problem Section
    problemTitle: '78% of retail traders lose money.',
    problemSubtitle: 'Not for lack of strategy, but for lack of discipline.',
    theGraveyard: 'The Graveyard',
    graveyardDesc: 'Real stories of traders who lost control.',
    
    // Three Pillars
    threePillars: 'The 3 Pillars of ARGOS',
    bayesianInference: 'Bayesian Inference',
    bayesianDesc: 'Your real win rate, not what you think you have.',
    kellyCriterion: 'Kelly Criterion',
    kellyDesc: 'The optimal size for every trade.',
    psiModulator: 'Psi Modulator',
    psiDesc: 'Automatic protection against biases.',
    
    // How it Works
    howItWorks: 'How It Works',
    step1Title: 'Connect your account',
    step1Desc: 'Compatible with MT4/MT5 and major brokers.',
    step2Title: 'ARGOS analyzes',
    step2Desc: 'Calculates your real edge and optimal stake.',
    step3Title: 'Active protection',
    step3Desc: 'Detects tilt and automatically adjusts risk.',
    step4Title: 'Continuous improvement',
    step4Desc: 'Journal and analytics to optimize your trading.',
    
    // Pricing
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: '2 months free',
    freeTrial: 'FREE TRIAL',
    freeTrialPrice: '$0',
    freeTrialPeriod: '/ 7 days',
    freeTrialDesc: 'Try all features',
    freeTrialCta: 'Start Trial',
    basic: 'BASIC',
    basicPrice: '€39',
    basicPeriod: '/month',
    basicDesc: 'For Binary Options traders',
    basicFeature1: 'SAFE Mode',
    basicFeature2: 'Basic Journaling',
    basicFeature3: 'P&L Calendar',
    basicCta: 'Choose Basic',
    pro: 'PRO',
    proBadge: 'Recommended',
    proPrice: '€99',
    proPeriod: '/month',
    proDesc: 'For Prop Firm traders',
    proFeature1: 'Everything in Basic',
    proFeature2: 'DYNAMIC Mode',
    proFeature3: 'Bias Analysis',
    proFeature4: 'Advanced Journaling',
    proCta: 'Choose Pro',
    elite: 'ELITE',
    elitePrice: '€199',
    elitePeriod: '/month',
    eliteDesc: 'For professional traders',
    eliteFeature1: 'Everything in Pro',
    eliteFeature2: 'SNIPER Mode',
    eliteFeature3: 'Priority Support',
    eliteFeature4: 'Raw Data Export',
    eliteCta: 'Choose Elite',
    
    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'Is ARGOS a trading bot?',
    faq1A: 'No. ARGOS does not execute trades automatically. It is a risk management tool that recommends optimal position sizing.',
    faq2Q: 'Does it work with any broker?',
    faq2A: 'Yes, ARGOS connects via API with major brokers and platforms (MT4, MT5, cTrader).',
    faq3Q: 'Can I cancel anytime?',
    faq3A: 'Yes, there is no commitment. Cancel anytime from your account panel.',
    
    // Footer
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    riskWarning: 'Risk Warning',
    disclaimer: 'ARGOS is an educational and analysis tool. We do not offer financial advisory, portfolio management or investment recommendations. Past results do not guarantee future results. Trading with leverage involves a high risk of capital loss. Never invest more than you can afford to lose.',
    
    // Dashboard
    balance: 'Balance',
    winRate: 'Win Rate',
    profitFactor: 'Profit Factor',
    sharpe: 'Sharpe',
    maxDD: 'Max DD',
    activeMotor: 'Active Motor',
    currentPsi: 'Current Ψ',
    equityCurve: 'Equity Curve',
    activeFactors: 'Active Factors',
    recommendedStake: 'Recommended Stake',
    lastTrades: 'Last Trades',
    
    // Trade Entry
    sessionDD: 'Session DD',
    currentStreak: 'Current Streak',
    cti: 'CTI (Tilt)',
    argosRecommends: 'ARGOS Recommends',
    registerTrade: 'Register Trade',
    
    // Settings
    tradingMode: 'Trading Mode',
    binaryOptions: 'Binary Options',
    propFirm: 'Prop Firm',
    initialCapital: 'Initial Capital',
    selectPropFirm: 'Select your Prop Firm',
    uiScale: 'UI Scale',
    fontSize: 'Font Size',
    
    // Journal
    journalTitle: 'Trading Journal',
    calendar: 'Calendar',
    dailyNotes: 'Daily Notes',
    dateRange: 'Date Range',
    startDate: 'Start Date',
    endDate: 'End Date',
    applyFilter: 'Apply Filter',
    
    // Tutorial
    tutorialTitle: 'Learn ARGOS',
    whatIsKelly: 'What is Kelly?',
    whatIsPsi: 'What is the Ψ Factor?',
    howToConnect: 'How to connect your account?',
    
    // Monte Carlo
    simulationParameters: 'Simulation Parameters',
    numberOfTrades: 'Number of Trades',
    winRate2: 'Win Rate (%)',
    riskReward: 'Risk:Reward Ratio',
    initialBalance: 'Initial Balance',
    riskPerTrade: 'Risk per Trade (%)',
    runSimulation: 'Run Simulation',
    simulationResults: 'Simulation Results',
    finalBalance: 'Final Balance',
    totalReturn: 'Total Return',
    maxDrawdown: 'Max Drawdown',
    probabilityOfRuin: 'Probability of Ruin',
  },
  
  de: {
    // Navigation
    dashboard: 'Dashboard',
    tradeEntry: 'Trade-Eingabe',
    analytics: 'Analytik',
    coach: 'Coach',
    settings: 'Einstellungen',
    monteCarlo: 'Monte Carlo',
    journal: 'Journal',
    tutorial: 'Tutorial',
    exitDemo: 'Beenden',
    
    // Landing Header
    whatIsArgos: 'Was ist ARGOS?',
    features: 'Funktionen',
    pricing: 'Preise',
    faq: 'FAQ',
    community: 'Community',
    login: 'Anmelden',
    
    // Landing Hero
    heroTitle: 'Institutioneller Schutz für Retail-Trader.',
    heroSubtitle: 'Ihr Vorteil ist nicht die Strategie, sondern die Disziplin. Mathematisches Risikomanagement mit Verhaltensmodulation.',
    startFreeTrial: 'Kostenlose Testversion',
    viewDemo: 'Interaktive Demo',
    
    // Enforcement Scale
    enforcementNudge: 'NUDGE',
    enforcementFriction: 'FRICTION',
    enforcementLockout: 'LOCKOUT',
    enforcementOk: 'Alles in Ordnung',
    enforcementWarning: 'Warnung aktiv',
    enforcementBlocked: 'Operationen blockiert',
    
    // Gamification
    disciplineStreak: 'Disziplin-Serie',
    days: 'Tage',
    badgeIronMind: 'Iron Mind',
    badgeKellyMaster: 'Kelly Master',
    badgeTiltProof: 'Tilt Proof',
    
    // Problem Section
    problemTitle: '78% der Retail-Trader verlieren Geld.',
    problemSubtitle: 'Nicht aus Mangel an Strategie, sondern an Disziplin.',
    theGraveyard: 'Der Friedhof',
    graveyardDesc: 'Echte Geschichten von Tradern, die die Kontrolle verloren.',
    
    // Three Pillars
    threePillars: 'Die 3 Säulen von ARGOS',
    bayesianInference: 'Bayesianische Inferenz',
    bayesianDesc: 'Ihre echte Gewinnrate, nicht was Sie glauben.',
    kellyCriterion: 'Kelly-Kriterium',
    kellyDesc: 'Die optimale Größe für jeden Trade.',
    psiModulator: 'Psi-Modulator',
    psiDesc: 'Automatischer Schutz gegen Verzerrungen.',
    
    // How it Works
    howItWorks: 'So funktioniert es',
    step1Title: 'Konto verbinden',
    step1Desc: 'Kompatibel mit MT4/MT5 und Hauptbrokern.',
    step2Title: 'ARGOS analysiert',
    step2Desc: 'Berechnet Ihren echten Edge und optimalen Einsatz.',
    step3Title: 'Aktiver Schutz',
    step3Desc: 'Erkennt Tilt und passt Risiko automatisch an.',
    step4Title: 'Kontinuierliche Verbesserung',
    step4Desc: 'Journal und Analytik zur Optimierung.',
    
    // Pricing
    monthly: 'Monatlich',
    yearly: 'Jährlich',
    yearlyDiscount: '2 Monate gratis',
    freeTrial: 'KOSTENLOSE TEST',
    freeTrialPrice: '€0',
    freeTrialPeriod: '/ 7 Tage',
    freeTrialDesc: 'Alle Funktionen testen',
    freeTrialCta: 'Test starten',
    basic: 'BASIC',
    basicPrice: '€39',
    basicPeriod: '/Monat',
    basicDesc: 'Für Binary Options Trader',
    basicFeature1: 'SAFE Modus',
    basicFeature2: 'Basis-Journaling',
    basicFeature3: 'P&L Kalender',
    basicCta: 'Basic wählen',
    pro: 'PRO',
    proBadge: 'Empfohlen',
    proPrice: '€99',
    proPeriod: '/Monat',
    proDesc: 'Für Prop Firm Trader',
    proFeature1: 'Alles aus Basic',
    proFeature2: 'DYNAMIC Modus',
    proFeature3: 'Bias-Analyse',
    proFeature4: 'Erweitertes Journaling',
    proCta: 'Pro wählen',
    elite: 'ELITE',
    elitePrice: '€199',
    elitePeriod: '/Monat',
    eliteDesc: 'Für professionelle Trader',
    eliteFeature1: 'Alles aus Pro',
    eliteFeature2: 'SNIPER Modus',
    eliteFeature3: 'Prioritäts-Support',
    eliteFeature4: 'Rohdaten-Export',
    eliteCta: 'Elite wählen',
    
    // FAQ
    faqTitle: 'Häufige Fragen',
    faq1Q: 'Ist ARGOS ein Trading-Bot?',
    faq1A: 'Nein. ARGOS führt keine Trades automatisch aus. Es ist ein Risikomanagement-Tool.',
    faq2Q: 'Funktioniert es mit jedem Broker?',
    faq2A: 'Ja, ARGOS verbindet sich via API mit Hauptbrokern und Plattformen.',
    faq3Q: 'Kann ich jederzeit kündigen?',
    faq3A: 'Ja, keine Bindung. Kündigen Sie jederzeit über Ihr Kontopanel.',
    
    // Footer
    terms: 'AGB',
    privacy: 'Datenschutz',
    cookies: 'Cookie-Richtlinie',
    riskWarning: 'Risikohinweis',
    disclaimer: 'ARGOS ist ein Bildungs- und Analysetool. Wir bieten keine Finanzberatung. Vergangene Ergebnisse garantieren keine zukünftigen. Trading mit Hebel birgt hohes Verlustrisiko.',
    
    // Dashboard
    balance: 'Kontostand',
    winRate: 'Gewinnrate',
    profitFactor: 'Profit-Faktor',
    sharpe: 'Sharpe',
    maxDD: 'Max DD',
    activeMotor: 'Aktiver Motor',
    currentPsi: 'Aktuelles Ψ',
    equityCurve: 'Equity-Kurve',
    activeFactors: 'Aktive Faktoren',
    recommendedStake: 'Empfohlener Einsatz',
    lastTrades: 'Letzte Trades',
    
    // Trade Entry
    sessionDD: 'Session DD',
    currentStreak: 'Aktuelle Serie',
    cti: 'CTI (Tilt)',
    argosRecommends: 'ARGOS empfiehlt',
    registerTrade: 'Trade registrieren',
    
    // Settings
    tradingMode: 'Handelsmodus',
    binaryOptions: 'Binäre Optionen',
    propFirm: 'Prop Firm',
    initialCapital: 'Anfangskapital',
    selectPropFirm: 'Wählen Sie Ihre Prop Firm',
    uiScale: 'UI-Skalierung',
    fontSize: 'Schriftgröße',
    
    // Journal
    journalTitle: 'Trading Journal',
    calendar: 'Kalender',
    dailyNotes: 'Tägliche Notizen',
    dateRange: 'Datumsbereich',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    applyFilter: 'Filter anwenden',
    
    // Tutorial
    tutorialTitle: 'ARGOS lernen',
    whatIsKelly: 'Was ist Kelly?',
    whatIsPsi: 'Was ist der Ψ-Faktor?',
    howToConnect: 'Wie verbinde ich mein Konto?',
    
    // Monte Carlo
    simulationParameters: 'Simulationsparameter',
    numberOfTrades: 'Anzahl der Trades',
    winRate2: 'Gewinnrate (%)',
    riskReward: 'Risiko:Rendite',
    initialBalance: 'Anfangsbilanz',
    riskPerTrade: 'Risiko pro Trade (%)',
    runSimulation: 'Simulation starten',
    simulationResults: 'Simulationsergebnisse',
    finalBalance: 'Endbilanz',
    totalReturn: 'Gesamtrendite',
    maxDrawdown: 'Max Drawdown',
    probabilityOfRuin: 'Ruinwahrscheinlichkeit',
  },
  
  fr: {
    // Navigation
    dashboard: 'Dashboard',
    tradeEntry: 'Saisie Trade',
    analytics: 'Analytique',
    coach: 'Coach',
    settings: 'Paramètres',
    monteCarlo: 'Monte Carlo',
    journal: 'Journal',
    tutorial: 'Tutoriel',
    exitDemo: 'Quitter',
    
    // Landing Header
    whatIsArgos: "Qu'est-ce qu'ARGOS?",
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    faq: 'FAQ',
    community: 'Communauté',
    login: 'Connexion',
    
    // Landing Hero
    heroTitle: 'Protection Institutionnelle pour Traders Retail.',
    heroSubtitle: "Votre avantage n'est pas la stratégie, c'est la discipline. Gestion des risques mathématique avec modulation comportementale.",
    startFreeTrial: 'Essai Gratuit',
    viewDemo: 'Démo Interactive',
    
    // Enforcement Scale
    enforcementNudge: 'NUDGE',
    enforcementFriction: 'FRICTION',
    enforcementLockout: 'LOCKOUT',
    enforcementOk: 'Tout va bien',
    enforcementWarning: 'Avertissement actif',
    enforcementBlocked: 'Opérations bloquées',
    
    // Gamification
    disciplineStreak: 'Série de Discipline',
    days: 'jours',
    badgeIronMind: 'Iron Mind',
    badgeKellyMaster: 'Kelly Master',
    badgeTiltProof: 'Tilt Proof',
    
    // Problem Section
    problemTitle: '78% des traders retail perdent de l\'argent.',
    problemSubtitle: "Pas par manque de stratégie, mais par manque de discipline.",
    theGraveyard: 'Le Cimetière',
    graveyardDesc: 'Histoires réelles de traders ayant perdu le contrôle.',
    
    // Three Pillars
    threePillars: 'Les 3 Piliers d\'ARGOS',
    bayesianInference: 'Inférence Bayésienne',
    bayesianDesc: 'Votre vrai taux de gain, pas ce que vous croyez.',
    kellyCriterion: 'Critère de Kelly',
    kellyDesc: 'La taille optimale pour chaque trade.',
    psiModulator: 'Modulateur Ψ',
    psiDesc: 'Protection automatique contre les biais.',
    
    // How it Works
    howItWorks: 'Comment ça marche',
    step1Title: 'Connectez votre compte',
    step1Desc: 'Compatible avec MT4/MT5 et principaux brokers.',
    step2Title: 'ARGOS analyse',
    step2Desc: 'Calcule votre edge réel et le stake optimal.',
    step3Title: 'Protection active',
    step3Desc: 'Détecte le tilt et ajuste le risque automatiquement.',
    step4Title: 'Amélioration continue',
    step4Desc: 'Journal et analytique pour optimiser votre trading.',
    
    // Pricing
    monthly: 'Mensuel',
    yearly: 'Annuel',
    yearlyDiscount: '2 mois gratuits',
    freeTrial: 'ESSAI GRATUIT',
    freeTrialPrice: '€0',
    freeTrialPeriod: '/ 7 jours',
    freeTrialDesc: 'Testez toutes les fonctions',
    freeTrialCta: 'Démarrer l\'essai',
    basic: 'BASIC',
    basicPrice: '€39',
    basicPeriod: '/mois',
    basicDesc: 'Pour traders d\'Options Binaires',
    basicFeature1: 'Mode SAFE',
    basicFeature2: 'Journal de base',
    basicFeature3: 'Calendrier P&L',
    basicCta: 'Choisir Basic',
    pro: 'PRO',
    proBadge: 'Recommandé',
    proPrice: '€99',
    proPeriod: '/mois',
    proDesc: 'Pour traders de Prop Firms',
    proFeature1: 'Tout de Basic',
    proFeature2: 'Mode DYNAMIC',
    proFeature3: 'Analyse des biais',
    proFeature4: 'Journal avancé',
    proCta: 'Choisir Pro',
    elite: 'ELITE',
    elitePrice: '€199',
    elitePeriod: '/mois',
    eliteDesc: 'Pour traders professionnels',
    eliteFeature1: 'Tout de Pro',
    eliteFeature2: 'Mode SNIPER',
    eliteFeature3: 'Support prioritaire',
    eliteFeature4: 'Export données brutes',
    eliteCta: 'Choisir Elite',
    
    // FAQ
    faqTitle: 'Questions Fréquentes',
    faq1Q: 'ARGOS est-il un bot de trading?',
    faq1A: 'Non. ARGOS n\'exécute pas de trades automatiquement. C\'est un outil de gestion des risques.',
    faq2Q: 'Fonctionne-t-il avec tous les brokers?',
    faq2A: 'Oui, ARGOS se connecte via API avec les principaux brokers et plateformes.',
    faq3Q: 'Puis-je annuler à tout moment?',
    faq3A: 'Oui, aucun engagement. Annulez quand vous voulez depuis votre panel.',
    
    // Footer
    terms: 'CGU',
    privacy: 'Politique de Confidentialité',
    cookies: 'Politique des Cookies',
    riskWarning: 'Avertissement de Risque',
    disclaimer: 'ARGOS est un outil éducatif et d\'analyse. Nous n\'offrons pas de conseil financier. Les résultats passés ne garantissent pas les résultats futurs.',
    
    // Dashboard
    balance: 'Solde',
    winRate: 'Taux de gain',
    profitFactor: 'Facteur de profit',
    sharpe: 'Sharpe',
    maxDD: 'Max DD',
    activeMotor: 'Moteur Actif',
    currentPsi: 'Ψ Actuel',
    equityCurve: 'Courbe Equity',
    activeFactors: 'Facteurs Actifs',
    recommendedStake: 'Stake Recommandé',
    lastTrades: 'Derniers Trades',
    
    // Trade Entry
    sessionDD: 'DD Session',
    currentStreak: 'Série Actuelle',
    cti: 'CTI (Tilt)',
    argosRecommends: 'ARGOS Recommande',
    registerTrade: 'Enregistrer Trade',
    
    // Settings
    tradingMode: 'Mode de Trading',
    binaryOptions: 'Options Binaires',
    propFirm: 'Prop Firm',
    initialCapital: 'Capital Initial',
    selectPropFirm: 'Sélectionnez votre Prop Firm',
    uiScale: 'Échelle UI',
    fontSize: 'Taille Police',
    
    // Journal
    journalTitle: 'Trading Journal',
    calendar: 'Calendrier',
    dailyNotes: 'Notes du Jour',
    dateRange: 'Plage de Dates',
    startDate: 'Date Début',
    endDate: 'Date Fin',
    applyFilter: 'Appliquer Filtre',
    
    // Tutorial
    tutorialTitle: 'Apprendre ARGOS',
    whatIsKelly: 'Qu\'est-ce que Kelly?',
    whatIsPsi: 'Qu\'est-ce que le Facteur Ψ?',
    howToConnect: 'Comment connecter votre compte?',
    
    // Monte Carlo
    simulationParameters: 'Paramètres de Simulation',
    numberOfTrades: 'Nombre de Trades',
    winRate2: 'Taux de Gain (%)',
    riskReward: 'Ratio Risque:Rendement',
    initialBalance: 'Solde Initial',
    riskPerTrade: 'Risque par Trade (%)',
    runSimulation: 'Lancer Simulation',
    simulationResults: 'Résultats de Simulation',
    finalBalance: 'Solde Final',
    totalReturn: 'Rendement Total',
    maxDrawdown: 'Max Drawdown',
    probabilityOfRuin: 'Probabilité de Ruine',
  },
  
  zh: {
    // Navigation
    dashboard: '仪表板',
    tradeEntry: '交易录入',
    analytics: '分析',
    coach: '教练',
    settings: '设置',
    monteCarlo: '蒙特卡洛',
    journal: '日志',
    tutorial: '教程',
    exitDemo: '退出',
    
    // Landing Header
    whatIsArgos: '什么是ARGOS?',
    features: '功能',
    pricing: '定价',
    faq: '常见问题',
    community: '社区',
    login: '登录',
    
    // Landing Hero
    heroTitle: '为散户交易者提供机构级保护。',
    heroSubtitle: '你的优势不是策略，而是纪律。数学风险管理与行为调节。',
    startFreeTrial: '开始免费试用',
    viewDemo: '查看交互式演示',
    
    // Enforcement Scale
    enforcementNudge: '提示',
    enforcementFriction: '警告',
    enforcementLockout: '锁定',
    enforcementOk: '一切正常',
    enforcementWarning: '警告激活',
    enforcementBlocked: '操作被阻止',
    
    // Gamification
    disciplineStreak: '纪律连胜',
    days: '天',
    badgeIronMind: '钢铁意志',
    badgeKellyMaster: '凯利大师',
    badgeTiltProof: '防倾斜',
    
    // Problem Section
    problemTitle: '78%的散户交易者亏损。',
    problemSubtitle: '不是因为缺乏策略，而是因为缺乏纪律。',
    theGraveyard: '墓地',
    graveyardDesc: '失去控制的交易者的真实故事。',
    
    // Three Pillars
    threePillars: 'ARGOS的三大支柱',
    bayesianInference: '贝叶斯推断',
    bayesianDesc: '你的真实胜率，不是你以为的。',
    kellyCriterion: '凯利准则',
    kellyDesc: '每笔交易的最佳规模。',
    psiModulator: 'Ψ调节器',
    psiDesc: '自动防范偏见。',
    
    // How it Works
    howItWorks: '工作原理',
    step1Title: '连接账户',
    step1Desc: '兼容MT4/MT5和主要经纪商。',
    step2Title: 'ARGOS分析',
    step2Desc: '计算你的真实优势和最佳投注。',
    step3Title: '主动保护',
    step3Desc: '检测倾斜并自动调整风险。',
    step4Title: '持续改进',
    step4Desc: '日志和分析以优化你的交易。',
    
    // Pricing
    monthly: '月付',
    yearly: '年付',
    yearlyDiscount: '免费2个月',
    freeTrial: '免费试用',
    freeTrialPrice: '$0',
    freeTrialPeriod: '/ 7天',
    freeTrialDesc: '试用所有功能',
    freeTrialCta: '开始试用',
    basic: '基础版',
    basicPrice: '€39',
    basicPeriod: '/月',
    basicDesc: '适用于二元期权交易者',
    basicFeature1: '安全模式',
    basicFeature2: '基础日志',
    basicFeature3: '盈亏日历',
    basicCta: '选择基础版',
    pro: '专业版',
    proBadge: '推荐',
    proPrice: '€99',
    proPeriod: '/月',
    proDesc: '适用于自营公司交易者',
    proFeature1: '基础版所有功能',
    proFeature2: '动态模式',
    proFeature3: '偏见分析',
    proFeature4: '高级日志',
    proCta: '选择专业版',
    elite: '精英版',
    elitePrice: '€199',
    elitePeriod: '/月',
    eliteDesc: '适用于专业交易者',
    eliteFeature1: '专业版所有功能',
    eliteFeature2: '狙击手模式',
    eliteFeature3: '优先支持',
    eliteFeature4: '原始数据导出',
    eliteCta: '选择精英版',
    
    // FAQ
    faqTitle: '常见问题',
    faq1Q: 'ARGOS是交易机器人吗?',
    faq1A: '不是。ARGOS不会自动执行交易。它是一个风险管理工具。',
    faq2Q: '它适用于任何经纪商吗?',
    faq2A: '是的，ARGOS通过API连接主要经纪商和平台。',
    faq3Q: '我可以随时取消吗?',
    faq3A: '是的，没有承诺。随时从您的账户面板取消。',
    
    // Footer
    terms: '条款和条件',
    privacy: '隐私政策',
    cookies: 'Cookie政策',
    riskWarning: '风险提示',
    disclaimer: 'ARGOS是教育和分析工具。我们不提供财务建议。过去的结果不能保证未来的结果。杠杆交易涉及高资本损失风险。',
    
    // Dashboard
    balance: '余额',
    winRate: '胜率',
    profitFactor: '利润因子',
    sharpe: '夏普比率',
    maxDD: '最大回撤',
    activeMotor: '活跃引擎',
    currentPsi: '当前Ψ',
    equityCurve: '权益曲线',
    activeFactors: '活跃因子',
    recommendedStake: '推荐投注',
    lastTrades: '最近交易',
    
    // Trade Entry
    sessionDD: '会话回撤',
    currentStreak: '当前连胜',
    cti: 'CTI (倾斜)',
    argosRecommends: 'ARGOS推荐',
    registerTrade: '注册交易',
    
    // Settings
    tradingMode: '交易模式',
    binaryOptions: '二元期权',
    propFirm: '自营公司',
    initialCapital: '初始资本',
    selectPropFirm: '选择您的自营公司',
    uiScale: '界面缩放',
    fontSize: '字体大小',
    
    // Journal
    journalTitle: '交易日志',
    calendar: '日历',
    dailyNotes: '每日笔记',
    dateRange: '日期范围',
    startDate: '开始日期',
    endDate: '结束日期',
    applyFilter: '应用筛选',
    
    // Tutorial
    tutorialTitle: '学习ARGOS',
    whatIsKelly: '什么是凯利?',
    whatIsPsi: '什么是Ψ因子?',
    howToConnect: '如何连接您的账户?',
    
    // Monte Carlo
    simulationParameters: '模拟参数',
    numberOfTrades: '交易数量',
    winRate2: '胜率 (%)',
    riskReward: '风险回报比',
    initialBalance: '初始余额',
    riskPerTrade: '每笔交易风险 (%)',
    runSimulation: '运行模拟',
    simulationResults: '模拟结果',
    finalBalance: '最终余额',
    totalReturn: '总回报',
    maxDrawdown: '最大回撤',
    probabilityOfRuin: '破产概率',
  },
  
  ja: {
    // Navigation
    dashboard: 'ダッシュボード',
    tradeEntry: 'トレード入力',
    analytics: '分析',
    coach: 'コーチ',
    settings: '設定',
    monteCarlo: 'モンテカルロ',
    journal: 'ジャーナル',
    tutorial: 'チュートリアル',
    exitDemo: '終了',
    
    // Landing Header
    whatIsArgos: 'ARGOSとは?',
    features: '機能',
    pricing: '料金',
    faq: 'FAQ',
    community: 'コミュニティ',
    login: 'ログイン',
    
    // Landing Hero
    heroTitle: '小売トレーダーへの機関投資家レベルの保護。',
    heroSubtitle: 'あなたの優位性は戦略ではなく、規律です。数学的リスク管理と行動調整。',
    startFreeTrial: '無料トライアル開始',
    viewDemo: 'インタラクティブデモ',
    
    // Enforcement Scale
    enforcementNudge: 'ナッジ',
    enforcementFriction: '摩擦',
    enforcementLockout: 'ロックアウト',
    enforcementOk: 'すべて正常',
    enforcementWarning: '警告アクティブ',
    enforcementBlocked: '操作ブロック',
    
    // Gamification
    disciplineStreak: '規律ストリーク',
    days: '日',
    badgeIronMind: 'アイアンマインド',
    badgeKellyMaster: 'ケリーマスター',
    badgeTiltProof: 'ティルトプルーフ',
    
    // Problem Section
    problemTitle: '78%の小売トレーダーが損失。',
    problemSubtitle: '戦略の欠如ではなく、規律の欠如のため。',
    theGraveyard: '墓地',
    graveyardDesc: 'コントロールを失ったトレーダーの実話。',
    
    // Three Pillars
    threePillars: 'ARGOSの3つの柱',
    bayesianInference: 'ベイズ推論',
    bayesianDesc: 'あなたの本当の勝率、思い込みではなく。',
    kellyCriterion: 'ケリー基準',
    kellyDesc: '各トレードの最適サイズ。',
    psiModulator: 'Ψモジュレーター',
    psiDesc: 'バイアスに対する自動保護。',
    
    // How it Works
    howItWorks: '使い方',
    step1Title: 'アカウント接続',
    step1Desc: 'MT4/MT5および主要ブローカーと互換性あり。',
    step2Title: 'ARGOS分析',
    step2Desc: '本当のエッジと最適ステークを計算。',
    step3Title: 'アクティブ保護',
    step3Desc: 'ティルトを検出し、リスクを自動調整。',
    step4Title: '継続的改善',
    step4Desc: 'ジャーナルと分析で取引を最適化。',
    
    // Pricing
    monthly: '月額',
    yearly: '年額',
    yearlyDiscount: '2ヶ月無料',
    freeTrial: '無料トライアル',
    freeTrialPrice: '$0',
    freeTrialPeriod: '/ 7日',
    freeTrialDesc: 'すべての機能を試す',
    freeTrialCta: 'トライアル開始',
    basic: 'ベーシック',
    basicPrice: '€39',
    basicPeriod: '/月',
    basicDesc: 'バイナリーオプショントレーダー向け',
    basicFeature1: 'SAFEモード',
    basicFeature2: '基本ジャーナリング',
    basicFeature3: 'P&Lカレンダー',
    basicCta: 'ベーシック選択',
    pro: 'プロ',
    proBadge: 'おすすめ',
    proPrice: '€99',
    proPeriod: '/月',
    proDesc: 'プロップファームトレーダー向け',
    proFeature1: 'ベーシックのすべて',
    proFeature2: 'DYNAMICモード',
    proFeature3: 'バイアス分析',
    proFeature4: '高度ジャーナリング',
    proCta: 'プロ選択',
    elite: 'エリート',
    elitePrice: '€199',
    elitePeriod: '/月',
    eliteDesc: 'プロトレーダー向け',
    eliteFeature1: 'プロのすべて',
    eliteFeature2: 'SNIPERモード',
    eliteFeature3: '優先サポート',
    eliteFeature4: '生データエクスポート',
    eliteCta: 'エリート選択',
    
    // FAQ
    faqTitle: 'よくある質問',
    faq1Q: 'ARGOSは取引ボットですか?',
    faq1A: 'いいえ。ARGOSは自動的に取引を実行しません。リスク管理ツールです。',
    faq2Q: 'すべてのブローカーで動作しますか?',
    faq2A: 'はい、ARGOSはAPI経由で主要ブローカーやプラットフォームに接続します。',
    faq3Q: 'いつでもキャンセルできますか?',
    faq3A: 'はい、契約期間はありません。アカウントパネルからいつでもキャンセルできます。',
    
    // Footer
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    cookies: 'Cookieポリシー',
    riskWarning: 'リスク警告',
    disclaimer: 'ARGOSは教育および分析ツールです。金融アドバイスは提供していません。過去の結果は将来の結果を保証するものではありません。レバレッジ取引には高い資本損失リスクがあります。',
    
    // Dashboard
    balance: '残高',
    winRate: '勝率',
    profitFactor: 'プロファクター',
    sharpe: 'シャープレシオ',
    maxDD: '最大ドローダウン',
    activeMotor: 'アクティブモーター',
    currentPsi: '現在のΨ',
    equityCurve: 'エクイティカーブ',
    activeFactors: 'アクティブ要因',
    recommendedStake: '推奨ステーク',
    lastTrades: '最近のトレード',
    
    // Trade Entry
    sessionDD: 'セッションDD',
    currentStreak: '現在の連勝',
    cti: 'CTI (ティルト)',
    argosRecommends: 'ARGOS推奨',
    registerTrade: 'トレード登録',
    
    // Settings
    tradingMode: '取引モード',
    binaryOptions: 'バイナリーオプション',
    propFirm: 'プロップファーム',
    initialCapital: '初期資本',
    selectPropFirm: 'プロップファームを選択',
    uiScale: 'UIスケール',
    fontSize: 'フォントサイズ',
    
    // Journal
    journalTitle: 'トレーディングジャーナル',
    calendar: 'カレンダー',
    dailyNotes: '日次メモ',
    dateRange: '日付範囲',
    startDate: '開始日',
    endDate: '終了日',
    applyFilter: 'フィルター適用',
    
    // Tutorial
    tutorialTitle: 'ARGOSを学ぶ',
    whatIsKelly: 'ケリーとは?',
    whatIsPsi: 'Ψファクターとは?',
    howToConnect: 'アカウントの接続方法?',
    
    // Monte Carlo
    simulationParameters: 'シミュレーションパラメータ',
    numberOfTrades: 'トレード数',
    winRate2: '勝率 (%)',
    riskReward: 'リスクリターン比',
    initialBalance: '初期残高',
    riskPerTrade: 'トレードあたりのリスク (%)',
    runSimulation: 'シミュレーション実行',
    simulationResults: 'シミュレーション結果',
    finalBalance: '最終残高',
    totalReturn: '総リターン',
    maxDrawdown: '最大ドローダウン',
    probabilityOfRuin: '破産確率',
  },
} as const;

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return value as string;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
