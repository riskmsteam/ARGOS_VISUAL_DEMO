import { TrendingUp, Activity, Settings, Brain, AlertTriangle, CheckCircle } from 'lucide-react';
import { KPICard, PsiGauge, MotorBadge, EnforcementScale, DisciplineBadges } from '@/components/ui-custom';
import { EquityChart } from '@/components/charts';
import { mockStats, mockTrades, mockPsiFactors, mockEquityData, mockBadges } from '@/data/mockData';
import { useConfig } from '@/context/ConfigContext';
import { useLanguage } from '@/context/LanguageContext';

export function Dashboard() {
  const { palette } = useConfig();
  const { t } = useLanguage();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={t('balance')}
          value={formatCurrency(mockStats.balance)}
          change={mockStats.balanceChange}
          icon={<TrendingUp className="w-5 h-5" />}
          delay={0}
        />
        <KPICard
          title={`${t('winRate')} Bayesiano`}
          value={`${mockStats.winRateBayesian}%`}
          subtitle="q=10% estimación conservadora"
          icon={<Brain className="w-5 h-5" />}
          delay={100}
        >
          <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: palette.border }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${mockStats.winRateBayesian}%`,
                background: `linear-gradient(to right, ${palette.info}, ${palette.primary})`,
              }}
            />
          </div>
        </KPICard>
        <KPICard
          title={t('activeMotor')}
          value={<MotorBadge motor={mockStats.activeMotor} size="sm" />}
          subtitle="Modo adaptativo activo"
          icon={<Settings className="w-5 h-5" />}
          delay={200}
        />
        <KPICard
          title={t('currentPsi')}
          value={mockStats.psi.toFixed(3)}
          subtitle={`${(mockStats.psi * 100).toFixed(1)}% del Kelly óptimo`}
          icon={<Activity className="w-5 h-5" />}
          delay={300}
        >
          <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: palette.border }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${mockStats.psi * 100}%`,
                backgroundColor: mockStats.psi > 0.3 ? palette.success : mockStats.psi > 0.15 ? palette.warning : palette.danger,
              }}
            />
          </div>
        </KPICard>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Curve */}
        <div
          className="lg:col-span-2 rounded-xl p-5 animate-fadeIn"
          style={{
            animationDelay: '200ms',
            opacity: 0,
            backgroundColor: palette.card,
            border: `1px solid ${palette.border}`,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: palette.text }}>{t('equityCurve')}</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5" style={{ color: palette.textMuted }}>
                <span className="w-3 h-1 rounded-full" style={{ backgroundColor: palette.primary }} />
                Balance
              </span>
              <span className="flex items-center gap-1.5" style={{ color: palette.textMuted }}>
                <span className="w-3 h-1 rounded-full border-dashed" style={{ borderTop: `1px dashed ${palette.textMuted}` }} />
                Peak
              </span>
            </div>
          </div>
          <EquityChart data={mockEquityData} />
        </div>

        {/* PSI Panel */}
        <div
          className="rounded-xl p-5 animate-fadeIn"
          style={{
            animationDelay: '300ms',
            opacity: 0,
            backgroundColor: palette.card,
            border: `1px solid ${palette.border}`,
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: palette.text }}>Modulador Ψ (Psi)</h3>

          <div className="flex justify-center mb-6">
            <PsiGauge value={mockStats.psi} size={180} strokeWidth={10} />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider mb-3" style={{ color: palette.textMuted }}>{t('activeFactors')}</p>
            {mockPsiFactors.map((factor) => (
              <div
                key={factor.id}
                className="flex items-center justify-between p-2.5 rounded-lg border"
                style={{
                  backgroundColor: factor.active ? `${palette.warning}10` : `${palette.success}05`,
                  borderColor: factor.active ? `${palette.warning}30` : `${palette.success}20`,
                }}
              >
                <div className="flex items-center gap-2">
                  {factor.active ? (
                    <AlertTriangle className="w-4 h-4" style={{ color: palette.warning }} />
                  ) : (
                    <CheckCircle className="w-4 h-4" style={{ color: palette.success }} />
                  )}
                  <span className="text-sm" style={{ color: factor.active ? palette.warning : palette.success }}>
                    {factor.id} {factor.name}
                  </span>
                </div>
                <span className="text-xs" style={{ color: factor.active ? palette.warning : palette.textMuted }}>
                  {factor.active ? (factor.impact ? `${factor.impact}%` : 'Activo') : 'Inactivo'}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-4 p-3 rounded-lg"
            style={{
              backgroundColor: `${palette.primary}10`,
              border: `1px solid ${palette.primary}30`,
            }}
          >
            <p className="text-sm" style={{ color: palette.text }}>
              {t('recommendedStake')} <span className="font-mono font-bold" style={{ color: palette.primary }}>$43.20</span>
            </p>
            <p className="text-xs mt-1" style={{ color: palette.textMuted }}>
              {(mockStats.psi * 100).toFixed(2)}% del balance
            </p>
          </div>
        </div>
      </div>

      {/* Enforcement Scale + Discipline Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn" style={{ animationDelay: '450ms', opacity: 0 }}>
        <EnforcementScale activeLevel="nudge" palette={palette} />
        <DisciplineBadges data={mockBadges} palette={palette} />
      </div>

      {/* Recent Trades Table */}
      <div
        className="rounded-xl overflow-hidden animate-fadeIn"
        style={{
          animationDelay: '400ms',
          opacity: 0,
          backgroundColor: palette.card,
          border: `1px solid ${palette.border}`,
        }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: palette.border }}>
          <h3 className="text-lg font-semibold" style={{ color: palette.text }}>{t('lastTrades')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full trade-table">
            <thead>
              <tr style={{ backgroundColor: palette.background }}>
                <th>#</th>
                <th>Hora</th>
                <th>Resultado</th>
                <th>Motor</th>
                <th>Stake</th>
                <th>P&L</th>
                <th>Balance</th>
                <th>Ψ</th>
              </tr>
            </thead>
            <tbody>
              {mockTrades.map((trade) => (
                <tr
                  key={trade.id}
                  className="transition-colors"
                  style={{ borderBottom: `1px solid ${palette.border}` }}
                >
                  <td className="font-mono" style={{ color: palette.textMuted }}>{trade.id}</td>
                  <td style={{ color: palette.text }}>{trade.time}</td>
                  <td>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: trade.result === 'WIN' ? `${palette.success}10` : `${palette.danger}10`,
                        color: trade.result === 'WIN' ? palette.success : palette.danger,
                        border: `1px solid ${trade.result === 'WIN' ? `${palette.success}30` : `${palette.danger}30`}`,
                      }}
                    >
                      {trade.result === 'WIN' ? '✓ WIN' : '✗ LOSS'}
                    </span>
                  </td>
                  <td><MotorBadge motor={trade.motor} size="sm" /></td>
                  <td className="font-mono" style={{ color: palette.text }}>${trade.stake.toFixed(2)}</td>
                  <td
                    className="font-mono"
                    style={{ color: trade.pnl >= 0 ? palette.success : palette.danger }}
                  >
                    {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                  </td>
                  <td className="font-mono" style={{ color: palette.text }}>${trade.balance.toFixed(0)}</td>
                  <td className="font-mono" style={{ color: palette.textMuted }}>{trade.psi.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
