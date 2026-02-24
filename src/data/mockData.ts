import type { Trade, PsiFactor, CoachMessage, UserSettings, DashboardStats, MotorDistribution, EquityPoint, WinRatePoint, PsiImpactPoint } from '@/types';

export const mockStats: DashboardStats = {
  balance: 12847.50,
  balanceChange: 28.5,
  winRateBayesian: 57.2,
  activeMotor: 'DYNAMIC',
  psi: 0.342,
  sessionDD: -4.2,
  streak: 2,
  totalTrades: 247,
  profitFactor: 1.43,
  sharpe: 2.14,
  sortino: 3.21,
  maxDD: -12.8,
};

export const mockTrades: Trade[] = [
  { id: 47, time: '14:32', result: 'WIN', motor: 'DYNAMIC', stake: 52.30, pnl: 48.12, balance: 12847.50, psi: 0.41 },
  { id: 46, time: '14:15', result: 'LOSS', motor: 'DYNAMIC', stake: 61.20, pnl: -61.20, balance: 12799.38, psi: 0.38 },
  { id: 45, time: '13:58', result: 'LOSS', motor: 'SAFE', stake: 25.60, pnl: -25.60, balance: 12860.58, psi: 0.22 },
  { id: 44, time: '13:42', result: 'WIN', motor: 'SAFE', stake: 28.40, pnl: 26.20, balance: 12886.18, psi: 0.35 },
  { id: 43, time: '13:25', result: 'WIN', motor: 'DYNAMIC', stake: 58.90, pnl: 54.30, balance: 12859.98, psi: 0.42 },
  { id: 42, time: '13:08', result: 'LOSS', motor: 'DYNAMIC', stake: 65.20, pnl: -65.20, balance: 12805.68, psi: 0.36 },
  { id: 41, time: '12:52', result: 'WIN', motor: 'SNIPER', stake: 45.80, pnl: 42.20, balance: 12870.88, psi: 0.48 },
  { id: 40, time: '12:35', result: 'WIN', motor: 'SNIPER', stake: 42.30, pnl: 39.00, balance: 12828.68, psi: 0.50 },
  { id: 39, time: '12:18', result: 'LOSS', motor: 'DYNAMIC', stake: 72.50, pnl: -72.50, balance: 12789.68, psi: 0.28 },
  { id: 38, time: '11:55', result: 'WIN', motor: 'DYNAMIC', stake: 68.40, pnl: 63.10, balance: 12862.18, psi: 0.44 },
];

export const mockPsiFactors: PsiFactor[] = [
  { id: 'F1', name: 'Tilt', active: false, description: 'Indicador de frustración' },
  { id: 'F3', name: 'Racha', active: true, impact: -40, description: '3 pérdidas consecutivas' },
  { id: 'F5', name: 'Drawdown', active: true, impact: -50, description: 'Sesión DD 22%' },
  { id: 'F4', name: 'Euforia', active: false, description: 'Sobreconfianza detectada' },
  { id: 'F2', name: 'Revenge', active: false, description: 'Trading de venganza' },
  { id: 'F6', name: 'Velocidad', active: false, impact: 0, description: '4 min desde última' },
];

export const mockCoachMessages: CoachMessage[] = [
  {
    id: '1',
    timestamp: '14:45',
    type: 'warning',
    title: 'PRECAUCIÓN',
    message: 'Llevas 3 pérdidas consecutivas. El sistema ha activado F3_Streak y ha reducido tu Ψ un 40%. Tu próximo stake recomendado baja de $72 a $43. Esto es protección, no castigo.',
  },
  {
    id: '2',
    timestamp: '14:20',
    type: 'info',
    title: 'CAMBIO DE MOTOR',
    message: 'ARGOS ha cambiado de SAFE → DYNAMIC. Tu win rate Bayesiano (q=10%) ha superado el umbral de 50% con N=25 trades. El sistema considera que tienes edge suficiente.',
  },
  {
    id: '3',
    timestamp: '13:45',
    type: 'success',
    title: 'BUENA PRÁCTICA',
    message: 'Has esperado 6 minutos entre operaciones. El factor F6_Speed está inactivo. Buen ritmo.',
  },
  {
    id: '4',
    timestamp: '13:30',
    type: 'danger',
    title: 'LOCKOUT ACTIVADO',
    message: '3 pérdidas consecutivas. Motor → SAFE. Stake → $0 durante las próximas 3 operaciones virtuales. Usa este tiempo para revisar tu análisis, no para buscar revancha.',
  },
  {
    id: '5',
    timestamp: '12:15',
    type: 'trinity',
    title: 'SESIÓN INICIADA',
    message: 'Balance: $12,450. Motor: TRINITY (auto). Objetivo: mantener drawdown < 40%. Ψ inicial: 0.285.',
  },
];

export const mockSettings: UserSettings = {
  tradingMode: 'binary',
  propFirm: 'FTMO',
  motor: 'TRINITY',
  psiBase: 0.50,
  tiltSensitivity: 4.5,
  inflectionPoint: 1.15,
  lockoutTrades: 3,
  bayesianQuantile: 10,
  memoryWindow: 50,
  forgetFactor: 0.95,
  initialCapital: 10000,
  maxKelly: 5,
  minStake: 5,
};

export const mockMotorDistribution: MotorDistribution = {
  safe: 28,
  dynamic: 55,
  sniper: 17,
};

export const mockEquityData: EquityPoint[] = Array.from({ length: 50 }, (_, i) => {
  const baseBalance = 10000;
  const randomWalk = Array.from({ length: i + 1 }, () => (Math.random() - 0.4) * 200);
  const balance = baseBalance + randomWalk.reduce((a, b) => a + b, 0) + i * 60;
  const peak = Math.max(balance, baseBalance + i * 70);
  const motors: ('SAFE' | 'DYNAMIC' | 'SNIPER' | 'TRINITY')[] = ['SAFE', 'DYNAMIC', 'SNIPER', 'TRINITY'];
  return {
    trade: i + 1,
    balance: Math.round(balance * 100) / 100,
    peak: Math.round(peak * 100) / 100,
    motor: motors[Math.floor(Math.random() * motors.length)],
  };
});

export const mockWinRateData: WinRatePoint[] = Array.from({ length: 50 }, (_, i) => {
  const prior = 50;
  const convergence = 57.2;
  const rate = prior + (convergence - prior) * (1 - Math.exp(-i / 15));
  const uncertainty = 10 * Math.exp(-i / 20);
  return {
    trade: i + 1,
    rate: Math.round(rate * 10) / 10,
    lowerBound: Math.round((rate - uncertainty) * 10) / 10,
    upperBound: Math.round((rate + uncertainty) * 10) / 10,
  };
});

export const mockPsiImpactData: PsiImpactPoint[] = Array.from({ length: 100 }, (_, i) => {
  const psi = i / 100;
  const motors: ('SAFE' | 'DYNAMIC' | 'SNIPER')[] = ['SAFE', 'DYNAMIC', 'SNIPER'];
  return {
    psi: Math.round(psi * 100) / 100,
    stakePercent: Math.round(psi * 7 * 100) / 100,
    motor: motors[Math.floor(Math.random() * motors.length)],
  };
});

export const mockDrawdownData = Array.from({ length: 50 }, (_, i) => {
  const dd = -Math.abs(Math.sin(i / 8) * 15 + Math.random() * 5);
  return {
    trade: i + 1,
    drawdown: Math.round(dd * 100) / 100,
  };
});

export const mockBadges = {
  streak: 12,
  badges: [
    { id: 'ironMind' as const, progress: 5, target: 7, earned: false },
    { id: 'kellyMaster' as const, progress: 30, target: 30, earned: true },
    { id: 'tiltProof' as const, progress: 2, target: 3, earned: false },
  ],
};
