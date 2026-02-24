import { useLanguage } from '@/context/LanguageContext';

interface Badge {
    id: 'ironMind' | 'kellyMaster' | 'tiltProof';
    progress: number;
    target: number;
    earned: boolean;
}

interface BadgesData {
    streak: number;
    badges: Badge[];
}

interface DisciplineBadgesProps {
    data: BadgesData;
    palette: any;
}

const BADGE_EMOJIS = {
    ironMind: '🧠',
    kellyMaster: '📊',
    tiltProof: '🛡️',
};

const BADGE_COUNT_KEYS = {
    ironMind: 'daysCount',
    kellyMaster: 'tradesCount',
    tiltProof: 'streaksCount',
};

export function DisciplineBadges({ data, palette }: DisciplineBadgesProps) {
    const { t } = useLanguage();
    const { streak, badges } = data;

    // Max target for the overall streak bar (30 days = max)
    const streakMax = 30;
    const streakPercent = Math.min((streak / streakMax) * 100, 100);

    return (
        <div
            className="rounded-xl p-5"
            style={{
                backgroundColor: palette.secondary ?? palette.card,
                border: `1px solid ${palette.border}`,
            }}
        >
            {/* Header: Discipline Streak */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold" style={{ color: palette.text }}>
                    🔥 {t('disciplineStreak')}
                </h3>
                <span
                    className="text-2xl font-bold font-mono"
                    style={{ color: palette.primary ?? palette.accent }}
                >
                    {streak}
                </span>
            </div>

            {/* Streak progress bar */}
            <div
                className="h-2.5 rounded-full overflow-hidden mb-5"
                style={{ backgroundColor: palette.border }}
            >
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                        width: `${streakPercent}%`,
                        background: `linear-gradient(90deg, ${palette.primary ?? palette.accent}, ${palette.secondary ?? palette.info})`,
                        boxShadow: `0 0 8px ${palette.primary ?? palette.accent}60`,
                    }}
                />
            </div>

            {/* Badge grid */}
            <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => {
                    const emoji = BADGE_EMOJIS[badge.id];
                    const countKey = BADGE_COUNT_KEYS[badge.id];
                    const progressPercent = Math.min((badge.progress / badge.target) * 100, 100);

                    return (
                        <div
                            key={badge.id}
                            className="flex flex-col items-center p-3 rounded-lg transition-all duration-300"
                            style={{
                                backgroundColor: badge.earned
                                    ? `${palette.primary ?? palette.accent}15`
                                    : `${palette.border}30`,
                                border: `1px solid ${badge.earned ? palette.primary ?? palette.accent : palette.border
                                    }`,
                                boxShadow: badge.earned
                                    ? `0 0 16px ${palette.primary ?? palette.accent}30`
                                    : 'none',
                                filter: badge.earned ? 'none' : 'grayscale(80%)',
                                opacity: badge.earned ? 1 : 0.7,
                            }}
                        >
                            {/* Icon */}
                            <div className="text-2xl mb-1.5" aria-label={badge.id}>
                                {emoji}
                            </div>

                            {/* Badge name */}
                            <p
                                className="text-xs font-semibold text-center mb-2 leading-tight"
                                style={{
                                    color: badge.earned
                                        ? palette.primary ?? palette.accent
                                        : palette.textMuted,
                                }}
                            >
                                {t(badge.id)}
                            </p>

                            {/* Progress bar */}
                            <div
                                className="w-full h-1.5 rounded-full overflow-hidden mb-1"
                                style={{ backgroundColor: palette.border }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${progressPercent}%`,
                                        backgroundColor: badge.earned
                                            ? palette.primary ?? palette.accent
                                            : palette.textMuted,
                                    }}
                                />
                            </div>

                            {/* Progress label */}
                            <p className="text-xs" style={{ color: palette.textMuted }}>
                                {badge.progress}/{badge.target} {t(countKey)}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Descriptions */}
            <div className="mt-4 space-y-1">
                {badges.map((badge) => (
                    <p key={`desc-${badge.id}`} className="text-xs" style={{ color: palette.textMuted }}>
                        <span
                            className="font-medium"
                            style={{ color: badge.earned ? palette.success : palette.textMuted }}
                        >
                            {t(badge.id)}:
                        </span>{' '}
                        {t(`${badge.id}Desc`)}
                    </p>
                ))}
            </div>
        </div>
    );
}
