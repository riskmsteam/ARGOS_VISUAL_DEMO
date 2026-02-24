import { useState } from 'react';
import { Calculator, Brain, Plug, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useConfig } from '@/context/ConfigContext';

interface TutorialStep {
  id: string;
  icon: React.ElementType;
  titleKey: string;
  content: React.ReactNode;
}

export function Tutorial() {
  const { t } = useLanguage();
  const { palette } = useConfig();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const steps: TutorialStep[] = [
    {
      id: 'kelly',
      icon: Calculator,
      titleKey: 'whatIsKelly',
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${palette.primary}10`, border: `1px solid ${palette.primary}30` }}>
            <h4 className="font-semibold mb-2" style={{ color: palette.primary }}>Fórmula de Kelly</h4>
            <code className="block p-3 rounded font-mono text-sm" style={{ backgroundColor: palette.background, color: palette.text }}>
              f* = (bp - q) / b
            </code>
            <p className="text-sm mt-2" style={{ color: palette.textMuted }}>
              Donde: b = odds, p = probabilidad de ganar, q = probabilidad de perder
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
              <p className="text-xs" style={{ color: palette.textMuted }}>Win Rate 55%</p>
              <p className="text-xs" style={{ color: palette.textMuted }}>Risk:Reward 1:1.5</p>
              <p className="text-lg font-bold mt-1" style={{ color: palette.success }}>Kelly: 12.5%</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
              <p className="text-xs" style={{ color: palette.textMuted }}>Win Rate 60%</p>
              <p className="text-xs" style={{ color: palette.textMuted }}>Risk:Reward 1:2</p>
              <p className="text-lg font-bold mt-1" style={{ color: palette.success }}>Kelly: 20%</p>
            </div>
          </div>

          <div className="p-3 rounded-lg" style={{ backgroundColor: `${palette.warning}10`, border: `1px solid ${palette.warning}30` }}>
            <p className="text-sm" style={{ color: palette.textMuted }}>
              <strong style={{ color: palette.warning }}>⚠️ Importante:</strong> ARGOS usa "Half Kelly" por defecto para reducir la volatilidad. Un Kelly del 12% se convierte en un 6% real.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'psi',
      icon: Brain,
      titleKey: 'whatIsPsi',
      content: (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: palette.textMuted }}>
            El Factor Ψ (Psi) es el modulador conductual de ARGOS. Reduce automáticamente tu exposición al riesgo cuando detecta sesgos psicológicos.
          </p>

          <div className="space-y-2">
            <h4 className="font-medium text-sm" style={{ color: palette.text }}>Factores que activan Ψ:</h4>
            
            {[
              { name: 'Tilt (F1)', desc: 'Frustración tras pérdidas consecutivas', impact: '-30%' },
              { name: 'Revenge Trading (F2)', desc: 'Intentar recuperar rápido', impact: '-40%' },
              { name: 'Streak (F3)', desc: '3+ pérdidas seguidas', impact: '-50%' },
              { name: 'Euforia (F4)', desc: 'Sobreconfianza tras ganancias', impact: '-20%' },
              { name: 'Drawdown (F5)', desc: 'DD de sesión elevado', impact: '-25%' },
              { name: 'Speed (F6)', desc: 'Operar muy rápido', impact: '-15%' },
            ].map((factor, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg"
                style={{ backgroundColor: palette.background }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: palette.text }}>{factor.name}</p>
                  <p className="text-xs" style={{ color: palette.textMuted }}>{factor.desc}</p>
                </div>
                <span className="text-sm font-bold" style={{ color: palette.danger }}>{factor.impact}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg" style={{ backgroundColor: `${palette.success}10`, border: `1px solid ${palette.success}30` }}>
            <p className="text-sm" style={{ color: palette.textMuted }}>
              <strong style={{ color: palette.success }}>✓ Resultado:</strong> Si tu Kelly es 10% pero Ψ = 0.5, tu stake real será 5%.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'connect',
      icon: Plug,
      titleKey: 'howToConnect',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { step: 1, title: 'Crear cuenta ARGOS', desc: 'Regístrate con tu email y verifica' },
              { step: 2, title: 'Seleccionar tu broker', desc: 'MT4, MT5, cTrader, o brokers compatibles' },
              { step: 3, title: 'Generar API Key', desc: 'En tu broker, crea una API key de solo lectura' },
              { step: 4, title: 'Conectar en ARGOS', desc: 'Ve a Settings → Conexiones y pega tu API key' },
              { step: 5, title: 'Verificar conexión', desc: 'ARGOS mostrará tu balance en tiempo real' },
            ].map((item) => (
              <div 
                key={item.step}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: palette.primary, color: palette.background }}
                >
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color: palette.text }}>{item.title}</p>
                  <p className="text-xs" style={{ color: palette.textMuted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg" style={{ backgroundColor: `${palette.info}10`, border: `1px solid ${palette.info}30` }}>
            <p className="text-sm" style={{ color: palette.textMuted }}>
              <strong style={{ color: palette.info }}>ℹ️ Nota:</strong> ARGOS solo necesita acceso de lectura. Nunca ejecutará trades automáticamente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg text-center" style={{ backgroundColor: palette.background }}>
              <p className="text-xs" style={{ color: palette.textMuted }}>Brokers soportados</p>
              <p className="text-lg font-bold" style={{ color: palette.text }}>50+</p>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ backgroundColor: palette.background }}>
              <p className="text-xs" style={{ color: palette.textMuted }}>Tiempo de setup</p>
              <p className="text-lg font-bold" style={{ color: palette.text }}>&lt;5 min</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: palette.text }}>{t('tutorialTitle')}</h2>
          <p className="text-sm" style={{ color: palette.textMuted }}>Aprende a usar ARGOS paso a paso</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: palette.textMuted }}>
            {completedSteps.length}/{steps.length} completados
          </span>
          <div className="w-24 h-2 rounded-full overflow-hidden" style={{ backgroundColor: palette.border }}>
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${(completedSteps.length / steps.length) * 100}%`,
                backgroundColor: palette.success,
              }}
            />
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = idx === currentStep;
          
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
              style={{ 
                backgroundColor: isCurrent ? `${palette.primary}20` : isCompleted ? `${palette.success}10` : palette.card,
                border: `1px solid ${isCurrent ? palette.primary : isCompleted ? palette.success : palette.border}`,
              }}
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4" style={{ color: palette.success }} />
              ) : (
                <Icon className="w-4 h-4" style={{ color: isCurrent ? palette.primary : palette.textMuted }} />
              )}
              <span className="text-sm hidden sm:inline" style={{ color: isCurrent ? palette.primary : palette.text }}>
                {t(step.titleKey)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Card */}
      <div 
        className="rounded-xl p-5"
        style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${palette.primary}20` }}
          >
            <CurrentIcon className="w-5 h-5" style={{ color: palette.primary }} />
          </div>
          <h3 className="text-lg font-semibold" style={{ color: palette.text }}>
            {t(steps[currentStep].titleKey)}
          </h3>
        </div>

        <div className="mb-6">
          {steps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${palette.border}` }}>
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            style={{ backgroundColor: palette.border, color: palette.text }}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            onClick={() => markStepComplete(steps[currentStep].id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{ 
              backgroundColor: completedSteps.includes(steps[currentStep].id) ? palette.success : palette.primary,
              color: palette.background,
            }}
          >
            {completedSteps.includes(steps[currentStep].id) ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Completado
              </>
            ) : (
              'Marcar como completado'
            )}
          </button>

          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            style={{ backgroundColor: palette.primary, color: palette.background }}
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <p className="text-xs font-medium mb-1" style={{ color: palette.primary }}>💡 Tip #1</p>
          <p className="text-xs" style={{ color: palette.textMuted }}>Empieza con el modo SAFE hasta que entiendas bien cómo funciona ARGOS.</p>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <p className="text-xs font-medium mb-1" style={{ color: palette.primary }}>💡 Tip #2</p>
          <p className="text-xs" style={{ color: palette.textMuted }}>Revisa tu Journal diariamente para identificar patrones en tu trading.</p>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <p className="text-xs font-medium mb-1" style={{ color: palette.primary }}>💡 Tip #3</p>
          <p className="text-xs" style={{ color: palette.textMuted }}>No ignores los warnings de Ψ - están ahí para protegerte.</p>
        </div>
      </div>
    </div>
  );
}
