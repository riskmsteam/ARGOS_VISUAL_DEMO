import { AlertTriangle, CheckCircle, XCircle, Info, Sparkles, Settings, Activity } from 'lucide-react';
import { MotorBadge } from '@/components/ui-custom';
import { mockCoachMessages, mockStats, mockPsiFactors } from '@/data/mockData';
import { useConfig } from '@/context/ConfigContext';
import { useLanguage } from '@/context/LanguageContext';

const messageIcons = {
  info: { icon: Info, color: '#4A9EFF', bgColor: 'bg-[#4A9EFF]/10', borderColor: 'border-[#4A9EFF]/30' },
  warning: { icon: AlertTriangle, color: '#F39C12', bgColor: 'bg-[#F39C12]/10', borderColor: 'border-[#F39C12]/30' },
  success: { icon: CheckCircle, color: '#27AE60', bgColor: 'bg-[#27AE60]/10', borderColor: 'border-[#27AE60]/30' },
  danger: { icon: XCircle, color: '#E74C3C', bgColor: 'bg-[#E74C3C]/10', borderColor: 'border-[#E74C3C]/30' },
  trinity: { icon: Sparkles, color: '#9B59B6', bgColor: 'bg-[#9B59B6]/10', borderColor: 'border-[#9B59B6]/30' },
};

export function Coach() {
  const activeFactors = mockPsiFactors.filter(f => f.active);
  const { palette } = useConfig();
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: palette.text }}>{t('coachTitle')}</h2>
          <p className="text-sm mt-1" style={{ color: palette.textMuted }}>{t('coachSubtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {mockCoachMessages.map((message, index) => {
            const config = messageIcons[message.type as keyof typeof messageIcons];
            const Icon = config.icon;

            return (
              <div
                key={message.id}
                className={`flex gap-4 p-4 rounded-xl border ${config.bgColor} ${config.borderColor} animate-slideIn`}
                style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
              >
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <Icon className="w-5 h-5" style={{ color: config.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono" style={{ color: palette.textMuted }}>[{message.timestamp}]</span>
                    <span className="text-sm font-semibold" style={{ color: config.color }}>
                      {message.title}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: palette.text }}>{message.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Panel */}
        <div className="space-y-4">
          {/* Current Status */}
          <div className="border rounded-xl p-5 animate-fadeIn" style={{ animationDelay: '200ms', opacity: 0, backgroundColor: palette.background, borderColor: palette.border }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: palette.text }}>
              <Activity className="w-5 h-5" style={{ color: palette.accent }} />
              {t('currentStatus')}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: palette.textMuted }}>{t('motor')}</span>
                <MotorBadge motor={mockStats.activeMotor} size="sm" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: palette.textMuted }}>Ψ</span>
                <span className="font-mono" style={{ color: palette.accent }}>{mockStats.psi.toFixed(3)}</span>
              </div>

              <div className="border-t pt-4" style={{ borderColor: palette.border }}>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: palette.textMuted }}>{t('activeFactors2')}</p>
                {activeFactors.length > 0 ? (
                  <div className="space-y-2">
                    {activeFactors.map(factor => (
                      <div key={factor.id} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-[#F39C12]" />
                        <span className="text-[#F39C12]">{factor.id} {factor.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#00D4AA]">{t('noActiveFactors')}</p>
                )}
              </div>

              <div className="border-t pt-4" style={{ borderColor: palette.border }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: palette.textMuted }}>{t('nextLockoutIn')}</span>
                  <span className="font-mono text-[#E74C3C]">1 {t('losses')} {t('more')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: palette.textMuted }}>{t('sessionDD')}</span>
                <span className={`font-mono ${mockStats.sessionDD < -10 ? 'text-[#E74C3C]' : 'text-[#F39C12]'}`}>
                  {mockStats.sessionDD}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: palette.textMuted }}>{t('tradesToday')}</span>
                <span className="font-mono" style={{ color: palette.text }}>12</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border rounded-xl p-5 animate-fadeIn" style={{ animationDelay: '300ms', opacity: 0, backgroundColor: palette.background, borderColor: palette.border }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: palette.text }}>
              <Settings className="w-5 h-5" style={{ color: palette.textMuted }} />
              {t('quickActions')}
            </h3>

            <div className="space-y-2">
              <button
                className="w-full py-2.5 px-4 rounded-lg text-sm transition-all text-left"
                style={{ backgroundColor: `${palette.border}80`, color: palette.text }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.border}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.border}80`}
              >
                {t('viewFullHistory')}
              </button>
              <button
                className="w-full py-2.5 px-4 rounded-lg text-sm transition-all text-left"
                style={{ backgroundColor: `${palette.border}80`, color: palette.text }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.border}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${palette.border}80`}
              >
                {t('exportData')}
              </button>
              <button className="w-full py-2.5 px-4 bg-[#E74C3C]/10 hover:bg-[#E74C3C]/20 text-[#E74C3C] rounded-lg text-sm transition-all text-left">
                {t('forceSafeMode')}
              </button>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-gradient-to-br from-[#9B59B6]/20 to-[#4A9EFF]/20 border border-[#9B59B6]/30 rounded-xl p-5 animate-fadeIn" style={{ animationDelay: '400ms', opacity: 0 }}>
            <p className="text-sm italic" style={{ color: palette.text }}>
              "{t('coachQuote')}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
