import { useState, useCallback } from 'react';
import { Play, RotateCcw, TrendingUp, TrendingDown, AlertTriangle, BarChart3, ChevronDown, ChevronUp, Settings2 } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { useLanguage } from '@/context/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TradeResult {
  tradeNum: number;
  isWin: boolean;
  pnl: number;
  balance: number;
  winRate: number; // Win rate acumulado
}

interface SimulationResult {
  trades: TradeResult[];
  finalBalance: number;
  totalReturn: number;
  maxDrawdown: number;
  wins: number;
  losses: number;
}

export function MonteCarlo() {
  const { palette } = useConfig();
  const { t } = useLanguage();
  
  const [params, setParams] = useState({
    numTrades: 100,
    winRate: 55,
    riskReward: 1.5,
    initialBalance: 10000,
    riskPerTrade: 2,
    numSimulations: 10,
    maxDDAllowed: 20, // Max drawdown permitido por usuario
  });
  
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSim, setSelectedSim] = useState(0);
  const [isParamsCollapsed, setIsParamsCollapsed] = useState(false);

  // Calcular max drawdown recomendado basado en win rate
  // Fórmula simplificada: cuanto mayor el win rate, mayor DD permitido
  const recommendedMaxDD = Math.min(40, Math.max(10, params.winRate * 0.5));

  // Función para generar distribución aleatoria de wins/losses
  const generateRandomTrades = (numTrades: number, targetWinRate: number): boolean[] => {
    const trades: boolean[] = [];
    const targetWins = Math.round((targetWinRate / 100) * numTrades);
    
    // Crear array con el número exacto de wins y losses
    for (let i = 0; i < targetWins; i++) trades.push(true);
    for (let i = targetWins; i < numTrades; i++) trades.push(false);
    
    // Fisher-Yates shuffle para distribución aleatoria
    for (let i = trades.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [trades[i], trades[j]] = [trades[j], trades[i]];
    }
    
    return trades;
  };

  const runSimulation = useCallback(() => {
    setIsRunning(true);
    setResults([]);
    
    setTimeout(() => {
      const newResults: SimulationResult[] = [];
      
      for (let sim = 0; sim < params.numSimulations; sim++) {
        // Generar distribución aleatoria de wins/losses
        const tradeOutcomes = generateRandomTrades(params.numTrades, params.winRate);
        
        const trades: TradeResult[] = [];
        let currentBalance = params.initialBalance;
        let peakBalance = params.initialBalance;
        let maxDD = 0;
        let wins = 0;
        let losses = 0;
        
        for (let i = 0; i < params.numTrades; i++) {
          const isWin = tradeOutcomes[i];
          const riskAmount = params.initialBalance * (params.riskPerTrade / 100); // Riesgo fijo sobre balance inicial
          
          let pnl: number;
          if (isWin) {
            pnl = riskAmount * params.riskReward;
            currentBalance += pnl;
            wins++;
          } else {
            pnl = -riskAmount;
            currentBalance += pnl;
            losses++;
          }
          
          // Calculate drawdown
          if (currentBalance > peakBalance) {
            peakBalance = currentBalance;
          }
          const drawdown = ((peakBalance - currentBalance) / peakBalance) * 100;
          if (drawdown > maxDD) {
            maxDD = drawdown;
          }
          
          // Calcular win rate acumulado (empieza en 50%)
          const cumulativeWinRate = i === 0 ? 50 : (wins / (i + 1)) * 100;
          
          trades.push({
            tradeNum: i + 1,
            isWin,
            pnl,
            balance: currentBalance,
            winRate: cumulativeWinRate,
          });
        }
        
        newResults.push({
          trades,
          finalBalance: currentBalance,
          totalReturn: ((currentBalance - params.initialBalance) / params.initialBalance) * 100,
          maxDrawdown: maxDD,
          wins,
          losses,
        });
      }
      
      setResults(newResults);
      setIsRunning(false);
    }, 500);
  }, [params]);

  const resetSimulation = () => {
    setResults([]);
    setSelectedSim(0);
  };

  // Prepare chart data
  const chartData = results.length > 0 
    ? results[selectedSim].trades.map((trade) => ({
        tradeNum: trade.tradeNum,
        balance: trade.balance,
        winRate: trade.winRate,
      }))
    : [];

  // Calculate statistics
  const avgFinalBalance = results.length > 0 
    ? results.reduce((sum, r) => sum + r.finalBalance, 0) / results.length 
    : 0;
  const avgReturn = results.length > 0 
    ? results.reduce((sum, r) => sum + r.totalReturn, 0) / results.length 
    : 0;
  const avgMaxDD = results.length > 0 
    ? results.reduce((sum, r) => sum + r.maxDrawdown, 0) / results.length 
    : 0;
  const profitableSims = results.filter(r => r.finalBalance > params.initialBalance).length;
  const probabilityOfRuin = results.filter(r => r.finalBalance <= 0).length / Math.max(results.length, 1) * 100;

  // Encontrar min y max balance para el dominio Y
  const minBalance = results.length > 0 
    ? Math.min(...results[selectedSim].trades.map(t => t.balance), params.initialBalance) * 0.95
    : params.initialBalance * 0.8;
  const maxBalance = results.length > 0 
    ? Math.max(...results[selectedSim].trades.map(t => t.balance), params.initialBalance) * 1.05
    : params.initialBalance * 1.2;

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: palette.text }}>
            {t('monteCarloSimulator') as string}
          </h2>
          <p className="text-sm mt-1" style={{ color: palette.textMuted }}>
            {t('simulateStrategy') as string}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameters Panel - Collapsible */}
        <div 
          className="rounded-xl overflow-hidden transition-all"
          style={{ 
            backgroundColor: palette.card,
            border: `1px solid ${palette.border}`,
          }}
        >
          {/* Header with collapse toggle */}
          <button
            onClick={() => setIsParamsCollapsed(!isParamsCollapsed)}
            className="w-full flex items-center justify-between p-4 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: `${palette.background}50` }}
          >
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5" style={{ color: palette.primary }} />
              <h3 className="text-lg font-semibold" style={{ color: palette.text }}>
                {t('simulationParameters') as string}
              </h3>
            </div>
            {isParamsCollapsed ? (
              <ChevronDown className="w-5 h-5" style={{ color: palette.textMuted }} />
            ) : (
              <ChevronUp className="w-5 h-5" style={{ color: palette.textMuted }} />
            )}
          </button>
          
          {/* Collapsible content */}
          <div className={`space-y-5 p-4 transition-all duration-300 ${isParamsCollapsed ? 'hidden' : 'block'}`}>

          {[
            { key: 'numTrades', label: t('numberOfTrades') as string, min: 10, max: 1000, step: 10 },
            { key: 'winRate', label: t('winRate2') as string, min: 1, max: 99, step: 1 },
            { key: 'riskReward', label: t('riskReward') as string, min: 0.5, max: 5, step: 0.1 },
            { key: 'initialBalance', label: t('initialBalance') as string, min: 1000, max: 1000000, step: 1000 },
            { key: 'riskPerTrade', label: t('riskPerTrade') as string, min: 0.1, max: 10, step: 0.1 },
            { key: 'numSimulations', label: t('simulations') as string, min: 1, max: 50, step: 1 },
          ].map((param) => (
            <div key={param.key}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm" style={{ color: palette.textMuted }}>
                  {param.label}
                </label>
                <span className="text-sm font-mono" style={{ color: palette.primary }}>
                  {param.key === 'initialBalance' 
                    ? `$${params[param.key as keyof typeof params].toLocaleString()}`
                    : param.key === 'riskPerTrade' || param.key === 'winRate'
                      ? `${params[param.key as keyof typeof params]}%`
                      : params[param.key as keyof typeof params]}
                </span>
              </div>
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={params[param.key as keyof typeof params]}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  [param.key]: parseFloat(e.target.value) 
                }))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${palette.primary} 0%, ${palette.primary} ${
                    ((params[param.key as keyof typeof params] - param.min) / (param.max - param.min)) * 100
                  }%, ${palette.border} ${
                    ((params[param.key as keyof typeof params] - param.min) / (param.max - param.min)) * 100
                  }%, ${palette.border} 100%)`,
                }}
              />
            </div>
          ))}

          {/* Max Drawdown Allowed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm" style={{ color: palette.textMuted }}>
                Max Drawdown Permitido
              </label>
              <span className="text-sm font-mono" style={{ color: palette.warning }}>
                {params.maxDDAllowed}%
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={params.maxDDAllowed}
              onChange={(e) => setParams(prev => ({ ...prev, maxDDAllowed: parseFloat(e.target.value) }))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${palette.warning} 0%, ${palette.warning} ${
                  ((params.maxDDAllowed - 5) / 45) * 100
                }%, ${palette.border} ${
                  ((params.maxDDAllowed - 5) / 45) * 100
                }%, ${palette.border} 100%)`,
              }}
            />
          </div>

          {/* Max Drawdown Recomendado */}
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${palette.info}10`, border: `1px solid ${palette.info}30` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: palette.textMuted }}>
                Max DD Recomendado
              </span>
              <span className="text-sm font-mono" style={{ color: palette.info }}>
                {recommendedMaxDD.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: palette.textMuted }}>
              Basado en win rate del {params.winRate}%
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{ 
                backgroundColor: palette.primary,
                color: palette.background,
              }}
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : t('runSimulation') as string}
            </button>
            <button
              onClick={resetSimulation}
              className="p-3 rounded-lg transition-all"
              style={{ 
                backgroundColor: palette.border,
                color: palette.text,
              }}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {results.length > 0 ? (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { 
                    label: t('finalBalance') as string, 
                    value: `$${avgFinalBalance.toFixed(0)}`, 
                    color: avgFinalBalance >= params.initialBalance ? palette.success : palette.danger,
                    icon: avgFinalBalance >= params.initialBalance ? TrendingUp : TrendingDown,
                  },
                  { 
                    label: t('totalReturn') as string, 
                    value: `${avgReturn >= 0 ? '+' : ''}${avgReturn.toFixed(1)}%`, 
                    color: avgReturn >= 0 ? palette.success : palette.danger,
                    icon: avgReturn >= 0 ? TrendingUp : TrendingDown,
                  },
                  { 
                    label: t('maxDrawdown') as string, 
                    value: `-${avgMaxDD.toFixed(1)}%`, 
                    color: avgMaxDD > params.maxDDAllowed ? palette.danger : palette.warning,
                    icon: AlertTriangle,
                  },
                  { 
                    label: t('probabilityOfRuin') as string, 
                    value: `${probabilityOfRuin.toFixed(1)}%`, 
                    color: probabilityOfRuin > 10 ? palette.danger : palette.success,
                    icon: AlertTriangle,
                  },
                ].map((stat, idx) => (
                  <div 
                    key={idx}
                    className="rounded-xl p-4"
                    style={{ 
                      backgroundColor: palette.card,
                      border: `1px solid ${palette.border}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                      <span className="text-xs" style={{ color: palette.textMuted }}>
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-xl font-bold font-mono" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div 
                className="rounded-xl p-5"
                style={{ 
                  backgroundColor: palette.card,
                  border: `1px solid ${palette.border}`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: palette.text }}>
                    {t('simulationResults') as string}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: palette.textMuted }}>
                      Sim:
                    </span>
                    <select
                      value={selectedSim}
                      onChange={(e) => setSelectedSim(Number(e.target.value))}
                      className="px-3 py-1 rounded-lg text-sm"
                      style={{ 
                        backgroundColor: palette.background,
                        border: `1px solid ${palette.border}`,
                        color: palette.text,
                      }}
                    >
                      {results.map((_, idx) => (
                        <option key={idx} value={idx}>#{idx + 1}</option>
                      ))}
                    </select>
                    <span className="text-sm" style={{ color: palette.textMuted }}>
                      of {results.length}
                    </span>
                  </div>
                </div>

                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
                      <XAxis 
                        dataKey="tradeNum" 
                        stroke={palette.textMuted}
                        fontSize={12}
                        tickLine={false}
                        label={{ value: 'Número de Operación', position: 'insideBottom', offset: -5, fill: palette.textMuted }}
                      />
                      {/* Eje Y izquierdo - Balance */}
                      <YAxis 
                        yAxisId="balance"
                        stroke={palette.textMuted}
                        fontSize={12}
                        tickLine={false}
                        tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                        domain={[minBalance, maxBalance]}
                        label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft', fill: palette.textMuted }}
                      />
                      {/* Eje Y derecho - Win Rate */}
                      <YAxis 
                        yAxisId="winrate"
                        orientation="right"
                        stroke={palette.info}
                        fontSize={12}
                        tickLine={false}
                        tickFormatter={(v) => `${v.toFixed(0)}%`}
                        domain={[0, 100]}
                        label={{ value: 'Win Rate (%)', angle: 90, position: 'insideRight', fill: palette.info }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: palette.card,
                          border: `1px solid ${palette.border}`,
                          borderRadius: '8px',
                          color: palette.text,
                        }}
                        formatter={(value: number, name: string) => {
                          if (name === 'Balance') return [`$${value.toFixed(2)}`, 'Balance'];
                          if (name === 'Win Rate') return [`${value.toFixed(1)}%`, 'Win Rate'];
                          return [value, name];
                        }}
                      />
                      {/* Línea de balance inicial */}
                      <ReferenceLine 
                        yAxisId="balance"
                        y={params.initialBalance} 
                        stroke={palette.textMuted} 
                        strokeDasharray="5 5" 
                        label={{ value: 'Inicio', fill: palette.textMuted, fontSize: 10 }}
                      />
                      {/* Línea de win rate objetivo */}
                      <ReferenceLine 
                        yAxisId="winrate"
                        y={params.winRate} 
                        stroke={palette.success} 
                        strokeDasharray="5 5" 
                        label={{ value: `Objetivo: ${params.winRate}%`, fill: palette.success, fontSize: 10 }}
                      />
                      {/* Línea de balance */}
                      <Line 
                        yAxisId="balance"
                        type="monotone" 
                        dataKey="balance" 
                        stroke={results[selectedSim].finalBalance >= params.initialBalance ? palette.success : palette.danger}
                        strokeWidth={2}
                        dot={false}
                        name="Balance"
                      />
                      {/* Línea de win rate acumulado */}
                      <Line 
                        yAxisId="winrate"
                        type="monotone" 
                        dataKey="winRate" 
                        stroke={palette.info}
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        dot={false}
                        name="Win Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Simulation stats */}
                <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t" style={{ borderColor: palette.border }}>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: palette.textMuted }}>Wins</p>
                    <p className="text-lg font-bold" style={{ color: palette.success }}>
                      {results[selectedSim].wins}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: palette.textMuted }}>Losses</p>
                    <p className="text-lg font-bold" style={{ color: palette.danger }}>
                      {results[selectedSim].losses}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: palette.textMuted }}>Win Rate Final</p>
                    <p className="text-lg font-bold" style={{ color: palette.info }}>
                      {((results[selectedSim].wins / params.numTrades) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: palette.textMuted }}>Max DD</p>
                    <p className="text-lg font-bold" style={{ 
                      color: results[selectedSim].maxDrawdown > params.maxDDAllowed ? palette.danger : palette.warning 
                    }}>
                      {results[selectedSim].maxDrawdown.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Trade sequence visualization */}
                <div className="mt-4 pt-4 border-t" style={{ borderColor: palette.border }}>
                  <p className="text-sm mb-2" style={{ color: palette.textMuted }}>
                    Secuencia de operaciones (últimas 50):
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {results[selectedSim].trades.slice(-50).map((trade, idx) => (
                      <div
                        key={idx}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: trade.isWin ? palette.success : palette.danger,
                        }}
                        title={`Trade ${trade.tradeNum}: ${trade.isWin ? 'Win' : 'Loss'} - $${trade.pnl.toFixed(2)}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: palette.textMuted }}>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: palette.success }} />
                      Win
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: palette.danger }} />
                      Loss
                    </span>
                  </div>
                </div>
              </div>

              {/* All simulations summary */}
              <div 
                className="rounded-xl p-5"
                style={{ 
                  backgroundColor: palette.card,
                  border: `1px solid ${palette.border}`,
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: palette.text }}>
                  All Simulations Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: `${palette.success}10` }}>
                    <p className="text-xs" style={{ color: palette.textMuted }}>Profitable</p>
                    <p className="text-2xl font-bold" style={{ color: palette.success }}>
                      {profitableSims}/{results.length}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: `${palette.danger}10` }}>
                    <p className="text-xs" style={{ color: palette.textMuted }}>Ruined</p>
                    <p className="text-2xl font-bold" style={{ color: palette.danger }}>
                      {results.filter(r => r.finalBalance <= 0).length}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: `${palette.info}10` }}>
                    <p className="text-xs" style={{ color: palette.textMuted }}>Best Return</p>
                    <p className="text-2xl font-bold" style={{ color: palette.info }}>
                      +{Math.max(...results.map(r => r.totalReturn)).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: `${palette.warning}10` }}>
                    <p className="text-xs" style={{ color: palette.textMuted }}>Worst Return</p>
                    <p className="text-2xl font-bold" style={{ color: palette.warning }}>
                      {Math.min(...results.map(r => r.totalReturn)).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div 
              className="rounded-xl p-10 flex flex-col items-center justify-center"
              style={{ 
                backgroundColor: palette.card,
                border: `1px solid ${palette.border}`,
              }}
            >
              <BarChart3 className="w-16 h-16 mb-4" style={{ color: palette.textMuted }} />
              <p className="text-lg" style={{ color: palette.text }}>
                Run a simulation to see results
              </p>
              <p className="text-sm mt-2" style={{ color: palette.textMuted }}>
                Adjust parameters and click "Run Simulation"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
