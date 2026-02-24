import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface DrawdownChartProps {
  data: { trade: number; drawdown: number }[];
}

export function DrawdownChart({ data }: DrawdownChartProps) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="ddGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E74C3C" stopOpacity={0.4}/>
              <stop offset="50%" stopColor="#E74C3C" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#E74C3C" stopOpacity={0.05}/>
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
            domain={[-25, 0]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161B22', 
              border: '1px solid #30363D',
              borderRadius: '8px',
              color: '#E6EDF3'
            }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, 'Drawdown']}
            labelFormatter={(label) => `Trade #${label}`}
          />
          <ReferenceLine y={-40} stroke="#E74C3C" strokeDasharray="5 5" label={{ value: 'Session Limit -40%', fill: '#E74C3C', fontSize: 10, position: 'insideBottomRight' }} />
          <Area 
            type="monotone" 
            dataKey="drawdown" 
            stroke="#E74C3C" 
            strokeWidth={2}
            fill="url(#ddGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
