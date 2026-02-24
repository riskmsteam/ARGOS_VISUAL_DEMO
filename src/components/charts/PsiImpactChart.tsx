import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine } from 'recharts';
import type { PsiImpactPoint } from '@/types';

interface PsiImpactChartProps {
  data: PsiImpactPoint[];
}

const motorColors: Record<string, string> = {
  SAFE: '#00D4AA',
  DYNAMIC: '#4A9EFF',
  SNIPER: '#FF9F43',
};

export function PsiImpactChart({ data }: PsiImpactChartProps) {
  const safeData = data.filter(d => d.motor === 'SAFE');
  const dynamicData = data.filter(d => d.motor === 'DYNAMIC');
  const sniperData = data.filter(d => d.motor === 'SNIPER');

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
          <XAxis 
            type="number" 
            dataKey="psi" 
            name="Ψ" 
            stroke="#8B949E"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 1]}
            tickFormatter={(v) => v.toFixed(1)}
          />
          <YAxis 
            type="number" 
            dataKey="stakePercent" 
            name="Stake %" 
            stroke="#8B949E"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <ZAxis type="number" dataKey="stakePercent" range={[20, 100]} />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ 
              backgroundColor: '#161B22', 
              border: '1px solid #30363D',
              borderRadius: '8px',
              color: '#E6EDF3'
            }}
            formatter={(value: number, name: string) => {
              if (name === 'psi') return [value.toFixed(2), 'Ψ'];
              return [`${value.toFixed(2)}%`, 'Stake'];
            }}
          />
          <ReferenceLine y={5} stroke="#9B59B6" strokeDasharray="5 5" label={{ value: 'Max Kelly 5%', fill: '#9B59B6', fontSize: 10 }} />
          <Scatter name="SAFE" data={safeData} fill={motorColors.SAFE} opacity={0.6} />
          <Scatter name="DYNAMIC" data={dynamicData} fill={motorColors.DYNAMIC} opacity={0.6} />
          <Scatter name="SNIPER" data={sniperData} fill={motorColors.SNIPER} opacity={0.6} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
