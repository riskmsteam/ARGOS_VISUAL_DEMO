import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MotorDistributionChartProps {
  data: {
    safe: number;
    dynamic: number;
    sniper: number;
  };
}

export function MotorDistributionChart({ data }: MotorDistributionChartProps) {
  const chartData = [
    { name: 'SAFE', value: data.safe, color: '#00D4AA' },
    { name: 'DYNAMIC', value: data.dynamic, color: '#4A9EFF' },
    { name: 'SNIPER', value: data.sniper, color: '#FF9F43' },
  ];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161B22', 
              border: '1px solid #30363D',
              borderRadius: '8px',
              color: '#E6EDF3'
            }}
            formatter={(value: number) => [`${value}%`, '']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value, entry: any) => (
              <span style={{ color: entry.color }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
