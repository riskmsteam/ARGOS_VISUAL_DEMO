import { useState } from 'react';
import { TrendingDown, Clock, Zap, Activity, AlertTriangle } from 'lucide-react';
import { MotorBadge, Semaphore } from '@/components/ui-custom';
import { mockStats } from '@/data/mockData';
import { useConfig } from '@/context/ConfigContext';
import { useLanguage } from '@/context/LanguageContext';

export function TradeEntry() {
  const [semaphoreState, setSemaphoreState] = useState<'green' | 'yellow' | 'red'>('yellow');
  const [customStake, setCustomStake] = useState(false);
  const [stakeValue, setStakeValue] = useState('43.20');
  const { palette } = useConfig();
  const { t } = useLanguage();

  const recommendedStake = 43.20;
  const enteredStake = parseFloat(stakeValue) || 0;
  const stakeDiff = ((enteredStake - recommendedStake) / recommendedStake) * 100;

  const cycleSemaphore = () => {
    const states: ('green' | 'yellow' | 'red')[] = ['green', 'yellow', 'red'];
    const currentIndex = states.indexOf(semaphoreState);
    setSemaphoreState(states[(currentIndex + 1) % 3]);
  };

  const semaphoreMessages = {
    green: t('favorableConditions') || 'Todos los indicadores están en zona favorable.',
    yellow: t('cautionRiskFactors') || 'Precaución: F3_Racha y F5_Drawdown activos.',
    red: t('lockoutActive') || 'Racha de 3+ pérdidas. Operaciones bloqueadas.',
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: palette.text }}>{t('tradePanel')}</h2>
        <p className="text-sm" style={{ color: palette.textMuted }}>{t('lastUpdate')}: 12 {t('secondsAgo')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Status Info */}
        <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '100ms', opacity: 0 }}>
          {/* Balance Card */}
          <div className="border rounded-xl p-5" style={{ backgroundColor: palette.background, borderColor: palette.border }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: palette.textMuted }}>{t('currentBalance')}</span>
              <Activity className="w-5 h-5" style={{ color: palette.textMuted }} />
            </div>
            <p className="text-3xl font-bold font-mono" style={{ color: palette.text }}>
              ${mockStats.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-xl p-4" style={{ backgroundColor: palette.background, borderColor: palette.border }}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-[#E74C3C]" />
                <span className="text-xs" style={{ color: palette.textMuted }}>{t('sessionDrawdown')}</span>
              </div>
              <p className="text-xl font-bold font-mono text-[#E74C3C]">{mockStats.sessionDD}%</p>
              <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: palette.border }}>
                <div
                  className="h-full bg-[#E74C3C] rounded-full"
                  style={{ width: `${Math.abs(mockStats.sessionDD) / 0.4}%` }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: palette.textMuted }}>{t('limitPercent')}</p>
            </div>

            <div className="border rounded-xl p-4" style={{ backgroundColor: palette.background, borderColor: palette.border }}>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-[#F39C12]" />
                <span className="text-xs" style={{ color: palette.textMuted }}>{t('currentStreak')}</span>
              </div>
              <p className="text-xl font-bold font-mono text-[#F39C12]">{mockStats.streak} {t('losses')}</p>
              <p className="text-xs mt-2" style={{ color: palette.textMuted }}>{t('lockoutIn')}</p>
            </div>
          </div>

          {/* CTI */}
          <div className="border rounded-xl p-4" style={{ backgroundColor: palette.background, borderColor: palette.border }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs mb-1" style={{ color: palette.textMuted }}>{t('ctiLabel')}</p>
                <p className="text-2xl font-bold font-mono text-[#F39C12]">1.08</p>
              </div>
              <span className="px-3 py-1 rounded-full text-[#F39C12] text-sm" style={{ backgroundColor: 'rgba(243, 156, 18, 0.1)', border: '1px solid rgba(243, 156, 18, 0.3)' }}>
                {t('neutralZone')}
              </span>
            </div>
          </div>

          {/* Motor & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-xl p-4" style={{ backgroundColor: palette.background, borderColor: palette.border }}>
              <p className="text-xs mb-2" style={{ color: palette.textMuted }}>{t('recommendedMotor')}</p>
              <MotorBadge motor="DYNAMIC" size="md" />
            </div>
            <div className="border rounded-xl p-4" style={{ backgroundColor: palette.background, borderColor: palette.border }}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: palette.textMuted }} />
                <span className="text-xs" style={{ color: palette.textMuted }}>{t('sinceLastTrade')}</span>
              </div>
              <p className="text-xl font-bold font-mono text-[#00D4AA]">4m 12s</p>
            </div>
          </div>
        </div>

        {/* Right Column - Recommendation */}
        <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '200ms', opacity: 0 }}>
          {/* Main Recommendation Card */}
          <div className="border-2 rounded-xl p-6 glow-purple" style={{ backgroundColor: palette.background, borderColor: palette.accent }}>
            <div className="text-center mb-6">
              <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: palette.accent }}>{t('argosRecommends')}</p>
              <p className="text-5xl font-bold font-mono" style={{ color: palette.text }}>${recommendedStake.toFixed(2)}</p>
              <p className="text-lg mt-2" style={{ color: palette.textMuted }}>{(mockStats.psi * 100).toFixed(2)}% {t('ofBalance')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg p-3 text-center" style={{ backgroundColor: palette.secondary }}>
                <p className="text-xs" style={{ color: palette.textMuted }}>{t('motor')}</p>
                <MotorBadge motor="DYNAMIC" size="sm" />
              </div>
              <div className="rounded-lg p-3 text-center" style={{ backgroundColor: palette.secondary }}>
                <p className="text-xs" style={{ color: palette.textMuted }}>Ψ</p>
                <p className="text-lg font-mono" style={{ color: palette.accent }}>{mockStats.psi.toFixed(3)}</p>
              </div>
            </div>

            <div className="rounded-lg p-3 mb-6" style={{ backgroundColor: palette.secondary }}>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: palette.textMuted }}>{t('kellyRaw')}</span>
                <span className="font-mono" style={{ color: palette.text }}>7.1%</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span style={{ color: palette.textMuted }}>{t('adjustedByPsi')}</span>
                <span className="font-mono" style={{ color: palette.accent }}>{(mockStats.psi * 7.1).toFixed(2)}%</span>
              </div>
            </div>

            <button
              className="w-full py-4 text-white font-semibold rounded-xl transition-all"
              style={{ backgroundImage: `linear-gradient(to right, ${palette.accent}, ${palette.primary || '#8E44AD'})` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 15px -3px ${palette.accent}4d`;
                e.currentTarget.style.filter = 'brightness(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.filter = 'none';
              }}
            >
              {t('registerOperation')}
            </button>
          </div>

          {/* Custom Stake Toggle */}
          <div className="border rounded-xl p-4" style={{ backgroundColor: palette.background, borderColor: palette.border }}>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={customStake}
                onChange={(e) => setCustomStake(e.target.checked)}
                className="w-4 h-4 rounded"
                style={{ backgroundColor: palette.secondary, borderColor: palette.border, accentColor: palette.accent }}
              />
              <span className="text-sm" style={{ color: palette.text }}>{t('useDifferentStake')}</span>
            </label>

            {customStake && (
              <div className="mt-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <span style={{ color: palette.textMuted }}>$</span>
                  <input
                    type="number"
                    value={stakeValue}
                    onChange={(e) => setStakeValue(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 font-mono focus:outline-none"
                    style={{ backgroundColor: palette.secondary, color: palette.text, borderColor: palette.border }}
                    onFocus={(e) => e.currentTarget.style.borderColor = palette.accent}
                    onBlur={(e) => e.currentTarget.style.borderColor = palette.border}
                  />
                </div>

                {stakeDiff > 0 && (
                  <div className="mt-3 p-3 bg-[#E74C3C]/10 border border-[#E74C3C]/30 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#E74C3C] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#E74C3C]">
                      {t('useAmount')} ${enteredStake.toFixed(2)} {t('exceedsRecommendation')} {stakeDiff.toFixed(0)}%
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Semaphore */}
      <div className="animate-fadeIn" style={{ animationDelay: '300ms', opacity: 0 }}>
        <p className="text-xs uppercase tracking-wider mb-2" style={{ color: palette.textMuted }}>{t('semaphoreDemo')}</p>
        <Semaphore
          state={semaphoreState}
          message={semaphoreMessages[semaphoreState]}
          onClick={cycleSemaphore}
        />
      </div>
    </div>
  );
}
