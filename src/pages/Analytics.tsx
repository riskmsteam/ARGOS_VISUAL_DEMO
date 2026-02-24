import { useState } from 'react';
import { TrendingUp, Activity, BarChart3, TrendingDown, Zap } from 'lucide-react';
import { WinRateChart, MotorDistributionChart, PsiImpactChart, DrawdownChart } from '@/components/charts';
import { mockStats, mockMotorDistribution, mockWinRateData, mockPsiImpactData, mockDrawdownData } from '@/data/mockData';
import { useConfig } from '@/context/ConfigContext';
import { useLanguage } from '@/context/LanguageContext';

const tabs = [
  { id: 'resumen', labelKey: 'tabSummary', icon: BarChart3 },
  { id: 'motores', labelKey: 'tabMotors', icon: Activity },
  { id: 'psi', labelKey: 'psiAnalysis', icon: TrendingUp },
  { id: 'drawdowns', labelKey: 'tabDrawdowns', icon: TrendingDown },
  { id: 'rachas', labelKey: 'streaks', icon: Zap },
];

export function Analytics() {
  const [activeTab, setActiveTab] = useState('resumen');
  const { palette } = useConfig();
  const { t } = useLanguage();

  const metrics = [
    { label: t('trades'), value: mockStats.totalTrades, icon: BarChart3 },
    { label: t('winRate'), value: `${mockStats.winRateBayesian}%`, icon: TrendingUp },
    { label: t('profitFactor'), value: mockStats.profitFactor, icon: Activity },
    { label: t('sharpe'), value: mockStats.sharpe, icon: BarChart3 },
    { label: t('sortino'), value: mockStats.sortino, icon: TrendingUp },
    { label: t('maxDD'), value: `${mockStats.maxDD}%`, icon: TrendingDown, negative: true },
  ];

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: palette.text }}>{t('analyticsTitle')}</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-1" style={{ borderColor: palette.border }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all ${isActive ? 'border-b-2' : ''
                }`}
              style={{
                color: isActive ? palette.accent : palette.textMuted,
                backgroundColor: isActive ? `${palette.accent}10` : 'transparent',
                borderColor: isActive ? palette.accent : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = palette.text;
                  e.currentTarget.style.backgroundColor = `${palette.border}30`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = palette.textMuted;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon className="w-4 h-4" />
              {t(tab.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'resumen' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="border rounded-xl p-4 card-hover animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms`, opacity: 0, backgroundColor: palette.bg, borderColor: palette.border }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className={`w-4 h-4 ${metric.negative ? 'text-[#E74C3C]' : ''}`} style={metric.negative ? {} : { color: palette.textMuted }} />
                  <span className="text-xs" style={{ color: palette.textMuted }}>{metric.label}</span>
                </div>
                <p className={`text-xl font-bold font-mono ${metric.negative ? 'text-[#E74C3C]' : ''}`} style={metric.negative ? {} : { color: palette.text }}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Motor Distribution */}
            <div className="border rounded-xl p-5 animate-fadeIn" style={{ animationDelay: '200ms', opacity: 0, backgroundColor: palette.bg, borderColor: palette.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: palette.text }}>{t('motorDistribution')}</h3>
              <MotorDistributionChart data={mockMotorDistribution} />
            </div>

            {/* Win Rate Evolution */}
            <div className="border rounded-xl p-5 animate-fadeIn" style={{ animationDelay: '300ms', opacity: 0, backgroundColor: palette.bg, borderColor: palette.border }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: palette.text }}>{t('winRateEvolution')}</h3>
                <span className="text-xs px-2 py-1 rounded" style={{ color: palette.textMuted, backgroundColor: `${palette.border}50` }}>
                  q=10%: 54.1%
                </span>
              </div>
              <WinRateChart data={mockWinRateData} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'motores' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { motor: 'SAFE', percent: 28, trades: 69, avgStake: 28.4, winRate: 52.1, color: '#00D4AA' },
              { motor: 'DYNAMIC', percent: 55, trades: 136, avgStake: 58.7, winRate: 58.3, color: '#4A9EFF' },
              { motor: 'SNIPER', percent: 17, trades: 42, avgStake: 45.2, winRate: 61.9, color: '#FF9F43' },
            ].map((item, index) => (
              <div
                key={item.motor}
                className="border rounded-xl p-5 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0, backgroundColor: palette.bg, borderColor: palette.border }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: item.color }}>{item.motor}</h3>
                  <span className="text-2xl font-bold" style={{ color: item.color }}>{item.percent}%</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: palette.textMuted }}>{t('trades')}</span>
                    <span className="font-mono" style={{ color: palette.text }}>{item.trades}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: palette.textMuted }}>{t('avgStake')}</span>
                    <span className="font-mono" style={{ color: palette.text }}>${item.avgStake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: palette.textMuted }}>{t('winRate')}</span>
                    <span className="font-mono" style={{ color: item.color }}>{item.winRate}%</span>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ backgroundColor: palette.border }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'psi' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="border rounded-xl p-5" style={{ backgroundColor: palette.bg, borderColor: palette.border }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: palette.text }}>{t('psiImpactOnStakes')}</h3>
            <PsiImpactChart data={mockPsiImpactData} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: t('psiAverage'), value: '0.387', desc: t('last50Trades') },
              { label: t('psiMinimum'), value: '0.082', desc: t('duringLockout') },
              { label: t('psiMaximum'), value: '0.714', desc: t('optimalConditions') },
            ].map((stat) => (
              <div key={stat.label} className="border rounded-xl p-4" style={{ backgroundColor: palette.bg, borderColor: palette.border }}>
                <p className="text-xs" style={{ color: palette.textMuted }}>{stat.label}</p>
                <p className="text-2xl font-bold font-mono" style={{ color: palette.accent }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: palette.textMuted }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'drawdowns' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="border rounded-xl p-5" style={{ backgroundColor: palette.bg, borderColor: palette.border }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: palette.text }}>{t('drawdownOverTime')}</h3>
            <DrawdownChart data={mockDrawdownData} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: t('maxDDHistorical'), value: '-12.8%', color: '#E74C3C' },
              { label: t('ddAverage'), value: '-4.2%', color: '#F39C12' },
              { label: t('recoveryTime'), value: '8 trades', color: '#4A9EFF' },
              { label: t('currentDD'), value: '-4.2%', color: '#00D4AA' },
            ].map((stat) => (
              <div key={stat.label} className="border rounded-xl p-4" style={{ backgroundColor: palette.bg, borderColor: palette.border }}>
                <p className="text-xs" style={{ color: palette.textMuted }}>{stat.label}</p>
                <p className="text-xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rachas' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-5" style={{ backgroundColor: palette.bg, borderColor: palette.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: palette.text }}>{t('winStreaks')}</h3>
              <div className="space-y-3">
                {[
                  { count: 7, freq: 3, last: `2 ${t('daysAgo')}` },
                  { count: 5, freq: 8, last: `5 ${t('daysAgo')}` },
                  { count: 4, freq: 15, last: t('today') },
                  { count: 3, freq: 24, last: t('yesterday') },
                ].map((r) => (
                  <div key={r.count} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: palette.bgSecondary }}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[#27AE60]" style={{ backgroundColor: 'rgba(39, 174, 96, 0.2)' }}>
                        {r.count}
                      </span>
                      <span className="text-sm" style={{ color: palette.text }}>{t('consecutive')}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: palette.textMuted }}>{r.freq} {t('times')}</p>
                      <p className="text-xs" style={{ color: palette.textMuted }}>{t('last')}: {r.last}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-xl p-5" style={{ backgroundColor: palette.bg, borderColor: palette.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: palette.text }}>{t('lossStreaks')}</h3>
              <div className="space-y-3">
                {[
                  { count: 4, freq: 2, last: `12 ${t('daysAgo')}` },
                  { count: 3, freq: 6, last: t('today') },
                  { count: 2, freq: 18, last: t('yesterday') },
                ].map((r) => (
                  <div key={r.count} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: palette.bgSecondary }}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[#E74C3C]" style={{ backgroundColor: 'rgba(231, 76, 60, 0.2)' }}>
                        {r.count}
                      </span>
                      <span className="text-sm" style={{ color: palette.text }}>{t('consecutive')}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: palette.textMuted }}>{r.freq} {t('times')}</p>
                      <p className="text-xs" style={{ color: palette.textMuted }}>{t('last')}: {r.last}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
