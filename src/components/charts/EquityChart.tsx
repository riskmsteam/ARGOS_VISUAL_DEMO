import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { EquityPoint } from '@/types';

interface EquityChartProps {
  data: EquityPoint[];
}

export function EquityChart({ data }: EquityChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9B59B6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#9B59B6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B949E" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#8B949E" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
          <XAxis 
            dataKey="trade" 
            stroke="#8B949E" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `#${value}`}
          />
          <YAxis 
            stroke="#8B949E" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            domain={['dataMin - 500', 'dataMax + 500']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161B22', 
              border: '1px solid #30363D',
              borderRadius: '8px',
              color: '#E6EDF3'
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Balance']}
            labelFormatter={(label) => `Trade #${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="peak" 
            stroke="#8B949E" 
            strokeWidth={1}
            strokeDasharray="5 5"
            fill="url(#colorPeak)" 
            fillOpacity={0.3}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#9B59B6" 
            strokeWidth={2}
            fill="url(#colorBalance)" 
          />
          <ReferenceLine y={10000} stroke="#30363D" strokeDasharray="3 3" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
