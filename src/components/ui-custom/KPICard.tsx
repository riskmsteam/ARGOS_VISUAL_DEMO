import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number | ReactNode;
  subtitle?: string;
  change?: number;
  icon?: ReactNode;
  children?: ReactNode;
  delay?: number;
}

export function KPICard({ title, value, subtitle, change, icon, children, delay = 0 }: KPICardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div 
      className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 card-hover animate-fadeIn"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-[#8B949E]">{title}</span>
        {icon && <div className="text-[#8B949E]">{icon}</div>}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono text-[#E6EDF3]">{value}</span>
        {change !== undefined && (
          <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-[#27AE60]' : isNegative ? 'text-[#E74C3C]' : 'text-[#8B949E]'}`}>
            {isPositive && <TrendingUp className="w-3 h-3 mr-0.5" />}
            {isNegative && <TrendingDown className="w-3 h-3 mr-0.5" />}
            {isPositive ? '+' : ''}{change}%
          </span>
        )}
      </div>
      
      {subtitle && <p className="text-xs text-[#8B949E] mt-1">{subtitle}</p>}
      {children}
    </div>
  );
}
