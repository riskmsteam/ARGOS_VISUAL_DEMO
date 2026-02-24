import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

type SemaphoreState = 'green' | 'yellow' | 'red';

interface SemaphoreProps {
  state: SemaphoreState;
  message: string;
  onClick?: () => void;
}

const semaphoreConfig = {
  green: {
    bgColor: 'bg-[#27AE60]/10',
    borderColor: 'border-[#27AE60]/50',
    textColor: 'text-[#27AE60]',
    icon: CheckCircle,
    glow: 'shadow-[0_0_20px_rgba(39,174,96,0.3)]',
  },
  yellow: {
    bgColor: 'bg-[#F39C12]/10',
    borderColor: 'border-[#F39C12]/50',
    textColor: 'text-[#F39C12]',
    icon: AlertTriangle,
    glow: 'shadow-[0_0_20px_rgba(243,156,18,0.3)]',
  },
  red: {
    bgColor: 'bg-[#E74C3C]/10',
    borderColor: 'border-[#E74C3C]/50',
    textColor: 'text-[#E74C3C]',
    icon: XCircle,
    glow: 'shadow-[0_0_20px_rgba(231,76,60,0.3)]',
  },
};

export function Semaphore({ state, message, onClick }: SemaphoreProps) {
  const config = semaphoreConfig[state];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${config.bgColor} ${config.borderColor} ${config.glow} hover:scale-[1.02] cursor-pointer`}
    >
      <div className={`p-3 rounded-full ${config.bgColor} ${config.borderColor} border`}>
        <Icon className={`w-6 h-6 ${config.textColor}`} />
      </div>
      <div className="flex-1 text-left">
        <div className={`font-semibold ${config.textColor}`}>
          {state === 'green' && 'Condiciones favorables para operar'}
          {state === 'yellow' && 'Precaución: factores de riesgo detectados'}
          {state === 'red' && 'LOCKOUT ACTIVO — No operar'}
        </div>
        <p className="text-sm text-[#8B949E] mt-0.5">{message}</p>
      </div>
      <div className={`w-4 h-4 rounded-full ${config.textColor.replace('text', 'bg')} animate-pulse`} />
    </button>
  );
}
