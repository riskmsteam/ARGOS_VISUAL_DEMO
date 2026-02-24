export type MotorType = 'SAFE' | 'DYNAMIC' | 'SNIPER' | 'TRINITY';

export type TradeResult = 'WIN' | 'LOSS';

export interface Trade {
  id: number;
  time: string;
  result: TradeResult;
  motor: MotorType;
  stake: number;
  pnl: number;
  balance: number;
  psi: number;
}

export interface PsiFactor {
  id: string;
  name: string;
  active: boolean;
  impact?: number;
  description?: string;
}

export interface CoachMessage {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'danger' | 'trinity';
  title: string;
  message: string;
}

export interface UserSettings {
  tradingMode: 'binary' | 'prop';
  propFirm?: string;
  customMaxDD?: number;
  customTotalDD?: number;
  accountSize?: number;
  motor: MotorType;
  psiBase: number;
  tiltSensitivity: number;
  inflectionPoint: number;
  lockoutTrades: number;
  bayesianQuantile: number;
  memoryWindow: number;
  forgetFactor: number;
  initialCapital: number;
  maxKelly: number;
  minStake: number;
}

export interface DashboardStats {
  balance: number;
  balanceChange: number;
  winRateBayesian: number;
  activeMotor: MotorType;
  psi: number;
  sessionDD: number;
  streak: number;
  totalTrades: number;
  profitFactor: number;
  sharpe: number;
  sortino: number;
  maxDD: number;
}

export interface MotorDistribution {
  safe: number;
  dynamic: number;
  sniper: number;
}

export interface EquityPoint {
  trade: number;
  balance: number;
  peak: number;
  motor: MotorType;
}

export interface WinRatePoint {
  trade: number;
  rate: number;
  lowerBound: number;
  upperBound: number;
}

export interface PsiImpactPoint {
  psi: number;
  stakePercent: number;
  motor: MotorType;
}
