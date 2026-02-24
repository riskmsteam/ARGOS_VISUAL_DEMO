import { useLanguage } from '@/context/LanguageContext';

interface EnforcementScaleProps {
    activeLevel: 'nudge' | 'friction' | 'lockout';
    palette: any;
}

const LEVEL_COLORS = {
    nudge: '#00D4AA',
    friction: '#F39C12',
    lockout: '#E74C3C',
};

export function EnforcementScale({ activeLevel, palette }: EnforcementScaleProps) {
    const { t } = useLanguage();

    const levels: { id: 'nudge' | 'friction' | 'lockout'; label: string; descKey: string }[] = [
        { id: 'nudge', label: 'NUDGE', descKey: 'enforcementNudgeDesc' },
        { id: 'friction', label: 'FRICTION', descKey: 'enforcementFrictionDesc' },
        { id: 'lockout', label: 'LOCKOUT', descKey: 'enforcementLockoutDesc' },
    ];

    const activeColor = LEVEL_COLORS[activeLevel];
    const activeInfo = levels.find((l) => l.id === activeLevel);

    return (
        <div
            className="rounded-xl p-5"
            style={{
                backgroundColor: palette.secondary ?? palette.card,
                border: `1px solid ${palette.border}`,
            }}
        >
            {/* Title */}
            <h3
                className="text-base font-semibold mb-4 uppercase tracking-wider"
                style={{ color: palette.text }}
            >
                {t('enforcementScaleTitle')}
            </h3>

            {/* Segmented bar */}
            <div className="flex gap-1 mb-4">
                {levels.map((level) => {
                    const isActive = level.id === activeLevel;
                    const color = LEVEL_COLORS[level.id];
                    return (
                        <div
                            key={level.id}
                            className="flex-1 rounded-lg p-3 transition-all duration-300"
                            style={{
                                backgroundColor: isActive ? `${color}20` : `${palette.border}40`,
                                border: `1px solid ${isActive ? color : palette.border}`,
                                opacity: isActive ? 1 : 0.35,
                                boxShadow: isActive ? `0 0 14px ${color}50` : 'none',
                            }}
                        >
                            <p
                                className="text-xs font-bold mb-1"
                                style={{ color: isActive ? color : palette.textMuted }}
                            >
                                {level.label}
                            </p>
                            <p
                                className="text-xs leading-tight"
                                style={{ color: isActive ? palette.text : palette.textMuted }}
                            >
                                {t(level.descKey)}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Progress bar */}
            <div
                className="h-2 rounded-full overflow-hidden flex gap-0.5"
                style={{ backgroundColor: palette.border }}
            >
                {levels.map((level) => {
                    const isActive = level.id === activeLevel;
                    const color = LEVEL_COLORS[level.id];
                    return (
                        <div
                            key={level.id}
                            className="flex-1 transition-all duration-300"
                            style={{
                                backgroundColor: color,
                                opacity: isActive ? 1 : 0.25,
                            }}
                        />
                    );
                })}
            </div>

            {/* Active status */}
            <div className="flex items-center gap-2 mt-3">
                <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: activeColor }}
                />
                <p className="text-xs font-medium" style={{ color: activeColor }}>
                    {activeInfo ? t(activeInfo.descKey) : ''}
                </p>
            </div>
        </div>
    );
}
