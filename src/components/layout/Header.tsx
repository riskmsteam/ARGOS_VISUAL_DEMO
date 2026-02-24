import { Settings, User, ChevronDown } from 'lucide-react';
import type { MotorType } from '@/types';
import { useConfig } from '@/context/ConfigContext';

interface HeaderProps {
  activeMotor: MotorType;
  userName: string;
  tradingMode: string;
  onSettingsClick: () => void;
}

const motorConfig: Record<MotorType, { color: string }> = {
  SAFE: { color: '#00D4AA' },
  DYNAMIC: { color: '#4A9EFF' },
  SNIPER: { color: '#FF9F43' },
  TRINITY: { color: '#9B59B6' },
};

export function Header({ activeMotor, userName, tradingMode, onSettingsClick }: HeaderProps) {
  const { palette, images } = useConfig();
  const motor = motorConfig[activeMotor];

  return (
    <header 
      className="h-16 flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-md"
      style={{ 
        backgroundColor: `${palette.card}80`,
        borderBottom: `1px solid ${palette.border}`,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
          style={{ boxShadow: `0 0 15px ${palette.glow}` }}
        >
          <img 
            src={images.icon} 
            alt="ARGOS"
            className="w-full h-full object-cover"
            style={{ filter: `brightness(${images.brightness}%)` }}
          />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: palette.text }}>ARGOS</h1>
          <span className="text-xs" style={{ color: palette.textMuted }}>QUANT SYSTEM</span>
        </div>
      </div>

      {/* Center - Motor Indicator */}
      <div 
        className="flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ 
          backgroundColor: `${motor.color}20`,
          border: `1px solid ${motor.color}50`,
        }}
      >
        <div 
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ 
            backgroundColor: motor.color,
            boxShadow: `0 0 8px ${motor.color}`,
          }} 
        />
        <span className="text-sm font-medium" style={{ color: motor.color }}>
          {activeMotor}
        </span>
      </div>

      {/* Right - User & Settings */}
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center gap-2 text-sm px-2 py-1 rounded"
          style={{ backgroundColor: palette.border }}
        >
          <span style={{ color: palette.textMuted }}>{tradingMode}</span>
        </div>
        
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ 
            backgroundColor: palette.background,
            border: `1px solid ${palette.border}`,
          }}
        >
          <User className="w-4 h-4" style={{ color: palette.textMuted }} />
          <span className="text-sm" style={{ color: palette.text }}>{userName}</span>
          <ChevronDown className="w-3 h-3" style={{ color: palette.textMuted }} />
        </div>

        <button 
          onClick={onSettingsClick}
          className="p-2 rounded-lg transition-all hover:scale-105"
          style={{ 
            backgroundColor: palette.background,
            border: `1px solid ${palette.border}`,
            color: palette.textMuted,
          }}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
