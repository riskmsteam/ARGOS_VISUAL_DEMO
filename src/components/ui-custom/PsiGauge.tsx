interface PsiGaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export function PsiGauge({ value, size = 200, strokeWidth = 12 }: PsiGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - value * circumference;
  
  // Color based on value
  let color = '#00D4AA'; // Green
  if (value < 0.15) color = '#E74C3C'; // Red
  else if (value < 0.3) color = '#F39C12'; // Yellow
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#30363D"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="gauge-circle"
          style={{
            filter: `drop-shadow(0 0 8px ${color}50)`,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold font-mono" style={{ color }}>
          {value.toFixed(3)}
        </span>
        <span className="text-xs text-[#8B949E] mt-1">Ψ (Psi)</span>
        <span className="text-xs text-[#8B949E]">{(value * 100).toFixed(1)}% Kelly</span>
      </div>
    </div>
  );
}
