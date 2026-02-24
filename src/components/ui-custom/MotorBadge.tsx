import type { MotorType } from '@/types';

interface MotorBadgeProps {
  motor: MotorType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const motorConfig = {
  SAFE: { 
    color: '#00D4AA', 
    bgColor: 'bg-[#00D4AA]/10', 
    textColor: 'text-[#00D4AA]',
    borderColor: 'border-[#00D4AA]/30',
    icon: '🛡️'
  },
  DYNAMIC: { 
    color: '#4A9EFF', 
    bgColor: 'bg-[#4A9EFF]/10', 
    textColor: 'text-[#4A9EFF]',
    borderColor: 'border-[#4A9EFF]/30',
    icon: '⚙️'
  },
  SNIPER: { 
    color: '#FF9F43', 
    bgColor: 'bg-[#FF9F43]/10', 
    textColor: 'text-[#FF9F43]',
    borderColor: 'border-[#FF9F43]/30',
    icon: '🎯'
  },
  TRINITY: { 
    color: '#9B59B6', 
    bgColor: 'bg-[#9B59B6]/10', 
    textColor: 'text-[#9B59B6]',
    borderColor: 'border-[#9B59B6]/30',
    icon: '🔮'
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function MotorBadge({ motor, size = 'md', showIcon = false }: MotorBadgeProps) {
  const config = motorConfig[motor];
  
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses[size]}`}>
      {showIcon && <span>{config.icon}</span>}
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
      {motor}
    </span>
  );
}
