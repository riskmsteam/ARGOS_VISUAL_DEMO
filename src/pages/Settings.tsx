import { useState } from 'react';
import { RotateCcw, TrendingUp, Building2, Wallet } from 'lucide-react';
import type { MotorType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useConfig } from '@/context/ConfigContext';

const propFirms = ['FTMO', 'Topstep', 'FundedNext', 'Custom'];

const motorDescriptions: Record<MotorType, { title: string; desc: string; color: string }> = {
  SAFE: { 
    title: 'SAFE', 
    desc: 'Conservador. Stake fijo 2%. Ideal para rachas malas.', 
    color: '#00D4AA' 
  },
  DYNAMIC: { 
    title: 'DYNAMIC', 
    desc: 'Adaptativo. Bayesian + Kelly + Ψ. Modo recomendado.', 
    color: '#4A9EFF' 
  },
  SNIPER: { 
    title: 'SNIPER', 
    desc: 'Agresivo. Solo opera con ganancias acumuladas.', 
    color: '#FF9F43' 
  },
  TRINITY: { 
    title: 'TRINITY', 
    desc: 'Automático. ARGOS decide el mejor motor en tiempo real.', 
    color: '#9B59B6' 
  },
};

// Valores hardcoded internos (no editables por el usuario)
const HARDCODED_VALUES = {
  minStake: 1,
  maxKelly: 5,
  psiThreshold: 0.15,
  timerMinutes: 15,
};

export function Settings() {
  const { t } = useLanguage();
  const { palette } = useConfig();
  
  const [settings, setSettings] = useState({
    tradingMode: 'binary' as 'binary' | 'prop',
    propFirm: 'FTMO',
    motor: 'TRINITY' as MotorType,
    initialCapital: 10000,
    customMaxDD: 5,
    customTotalDD: 10,
    accountSize: 100000,
  });

  const handleReset = () => {
    setSettings({
      tradingMode: 'binary',
      propFirm: 'FTMO',
      motor: 'TRINITY',
      initialCapital: 10000,
      customMaxDD: 5,
      customTotalDD: 10,
      accountSize: 100000,
    });
  };

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold" style={{ color: palette.text }}>{t('settings')}</h2>
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
          style={{ backgroundColor: palette.border, color: palette.textMuted }}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restaurar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Trading Mode - Tarjetas grandes */}
        <div 
          className="rounded-xl p-4"
          style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
        >
          <h3 className="text-base font-semibold mb-3" style={{ color: palette.text }}>{t('tradingMode')}</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSettings({ ...settings, tradingMode: 'binary' })}
              className="p-4 rounded-xl border-2 text-left transition-all"
              style={{
                borderColor: settings.tradingMode === 'binary' ? palette.primary : palette.border,
                backgroundColor: settings.tradingMode === 'binary' ? `${palette.primary}10` : palette.background,
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: `${palette.success}20` }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: palette.success }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: palette.text }}>{t('binaryOptions')}</p>
              <p className="text-xs mt-1" style={{ color: palette.textMuted }}>Para traders de opciones binarias</p>
            </button>

            <button
              onClick={() => setSettings({ ...settings, tradingMode: 'prop' })}
              className="p-4 rounded-xl border-2 text-left transition-all"
              style={{
                borderColor: settings.tradingMode === 'prop' ? palette.primary : palette.border,
                backgroundColor: settings.tradingMode === 'prop' ? `${palette.primary}10` : palette.background,
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: `${palette.info}20` }}
              >
                <Building2 className="w-5 h-5" style={{ color: palette.info }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: palette.text }}>{t('propFirm')}</p>
              <p className="text-xs mt-1" style={{ color: palette.textMuted }}>Para traders de Prop Firms</p>
            </button>
          </div>

          {settings.tradingMode === 'prop' && (
            <div className="mt-4 animate-fadeIn">
              <label className="block text-sm mb-2" style={{ color: palette.textMuted }}>{t('selectPropFirm')}</label>
              <select 
                value={settings.propFirm}
                onChange={(e) => setSettings({ ...settings, propFirm: e.target.value })}
                className="w-full rounded-lg px-3 py-2 text-sm"
                style={{ 
                  backgroundColor: palette.background, 
                  border: `1px solid ${palette.border}`,
                  color: palette.text,
                }}
              >
                {propFirms.map(firm => (
                  <option key={firm} value={firm}>{firm}</option>
                ))}
              </select>

              {settings.propFirm === 'Custom' && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs mb-1" style={{ color: palette.textMuted }}>Max DD Diario %</label>
                    <input 
                      type="number" 
                      value={settings.customMaxDD}
                      onChange={(e) => setSettings({ ...settings, customMaxDD: parseFloat(e.target.value) })}
                      className="w-full rounded-lg px-2 py-1.5 text-sm font-mono"
                      style={{ 
                        backgroundColor: palette.background, 
                        border: `1px solid ${palette.border}`,
                        color: palette.text,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: palette.textMuted }}>Max DD Total %</label>
                    <input 
                      type="number" 
                      value={settings.customTotalDD}
                      onChange={(e) => setSettings({ ...settings, customTotalDD: parseFloat(e.target.value) })}
                      className="w-full rounded-lg px-2 py-1.5 text-sm font-mono"
                      style={{ 
                        backgroundColor: palette.background, 
                        border: `1px solid ${palette.border}`,
                        color: palette.text,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: palette.textMuted }}>Tamaño Cuenta</label>
                    <input 
                      type="number" 
                      value={settings.accountSize}
                      onChange={(e) => setSettings({ ...settings, accountSize: parseFloat(e.target.value) })}
                      className="w-full rounded-lg px-2 py-1.5 text-sm font-mono"
                      style={{ 
                        backgroundColor: palette.background, 
                        border: `1px solid ${palette.border}`,
                        color: palette.text,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Motor Selection */}
        <div 
          className="rounded-xl p-4"
          style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
        >
          <h3 className="text-base font-semibold mb-3" style={{ color: palette.text }}>Motor</h3>
          
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(motorDescriptions) as MotorType[]).map((motor) => {
              const config = motorDescriptions[motor];
              const isSelected = settings.motor === motor;
              
              return (
                <button
                  key={motor}
                  onClick={() => setSettings({ ...settings, motor })}
                  className="p-3 rounded-xl border-2 text-left transition-all"
                  style={{
                    borderColor: isSelected ? config.color : palette.border,
                    backgroundColor: isSelected ? `${config.color}10` : palette.background,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="font-semibold text-sm" style={{ color: config.color }}>
                      {config.title}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: palette.textMuted }}>{config.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Capital */}
        <div 
          className="rounded-xl p-4"
          style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}
        >
          <h3 className="text-base font-semibold mb-3" style={{ color: palette.text }}>{t('initialCapital')}</h3>
          
          <div className="relative">
            <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: palette.textMuted }} />
            <input
              type="number"
              value={settings.initialCapital}
              onChange={(e) => setSettings({ ...settings, initialCapital: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-lg py-2.5 pl-10 pr-4 text-sm font-mono"
              style={{ 
                backgroundColor: palette.background, 
                border: `1px solid ${palette.border}`,
                color: palette.text,
              }}
            />
          </div>

          {/* Hardcoded values info */}
          <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: palette.background }}>
            <p className="text-xs font-medium mb-2" style={{ color: palette.textMuted }}>Valores del sistema:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span style={{ color: palette.textMuted }}>Stake mínimo:</span>
                <span className="font-mono" style={{ color: palette.text }}>${HARDCODED_VALUES.minStake}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: palette.textMuted }}>Kelly máximo:</span>
                <span className="font-mono" style={{ color: palette.text }}>{HARDCODED_VALUES.maxKelly}%</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: palette.textMuted }}>Umbral Ψ:</span>
                <span className="font-mono" style={{ color: palette.text }}>{HARDCODED_VALUES.psiThreshold}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: palette.textMuted }}>Timer entre trades:</span>
                <span className="font-mono" style={{ color: palette.text }}>{HARDCODED_VALUES.timerMinutes}m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div 
          className="rounded-xl p-4"
          style={{ backgroundColor: `${palette.info}10`, border: `1px solid ${palette.info}30` }}
        >
          <h3 className="text-base font-semibold mb-2" style={{ color: palette.info }}>ℹ️ Sobre los parámetros</h3>
          <p className="text-sm mb-3" style={{ color: palette.textMuted }}>
            ARGOS utiliza un modelo híbrido que combina:
          </p>
          <ul className="space-y-1 text-sm" style={{ color: palette.textMuted }}>
            <li>• <strong style={{ color: palette.text }}>Multiplicativo:</strong> Los factores de riesgo se multiplican entre sí</li>
            <li>• <strong style={{ color: palette.text }}>Hysteresis:</strong> Cambios graduales para evitar fluctuaciones bruscas</li>
            <li>• <strong style={{ color: palette.text }}>Half Kelly:</strong> Conservador por defecto para reducir volatilidad</li>
          </ul>
          <p className="text-sm mt-3" style={{ color: palette.textMuted }}>
            Los parámetros matemáticos están optimizados y no son editables para proteger tu cuenta.
          </p>
        </div>
      </div>
    </div>
  );
}
