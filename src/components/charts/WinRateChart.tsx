import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import type { WinRatePoint } from '@/types';

interface WinRateChartProps {
  data: WinRatePoint[];
}

export function WinRateChart({ data }: WinRateChartProps) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A9EFF" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#4A9EFF" stopOpacity={0.05}/>
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
            tickFormatter={(value) => `${value}%`}
            domain={[40, 65]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161B22', 
              border: '1px solid #30363D',
              borderRadius: '8px',
              color: '#E6EDF3'
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Win Rate']}
            labelFormatter={(label) => `Trade #${label}`}
          />
          <Area
            type="monotone"
            dataKey="upperBound"
            stroke="none"
            fill="url(#confidenceBand)"
          />
          <Area
            type="monotone"
            dataKey="lowerBound"
            stroke="none"
            fill="#0D1117"
          />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#4A9EFF" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#4A9EFF' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
