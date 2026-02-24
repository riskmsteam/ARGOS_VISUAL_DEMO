import { useState } from 'react';
import { LayoutDashboard, TrendingUp, BarChart3, Settings, MessageSquare, LogOut, Calculator, ChevronLeft, ChevronRight, BookOpen, Calendar } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { useLanguage } from '@/context/LanguageContext';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const { palette } = useConfig();
  const { t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'trade', label: t('tradeEntry'), icon: TrendingUp },
    { id: 'analytics', label: t('analytics'), icon: BarChart3 },
    { id: 'montecarlo', label: t('monteCarlo'), icon: Calculator },
    { id: 'journal', label: t('journal'), icon: Calendar },
    { id: 'coach', label: t('coach'), icon: MessageSquare },
    { id: 'tutorial', label: t('tutorial'), icon: BookOpen },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <aside 
      className={`${isCollapsed ? 'w-16' : 'w-64'} flex flex-col transition-all duration-300 relative z-20`}
      style={{ 
        backgroundColor: palette.card,
        borderRight: `1px solid ${palette.border}`,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-30"
        style={{
          backgroundColor: palette.primary,
          boxShadow: `0 0 10px ${palette.glow}`,
        }}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" style={{ color: palette.background }} />
        ) : (
          <ChevronLeft className="w-4 h-4" style={{ color: palette.background }} />
        )}
      </button>

      {/* Logo */}
      <div 
        className="h-16 flex items-center justify-center border-b"
        style={{ borderColor: palette.border }}
      >
        <div 
          className="w-10 h-10 rounded-lg overflow-hidden"
          style={{ boxShadow: `0 0 15px ${palette.glow}` }}
        >
          <img 
            src="/assets/ico_sencillo.png" 
            alt="ARGOS"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group"
              style={{
                backgroundColor: isActive ? `${palette.primary}20` : 'transparent',
                border: `1px solid ${isActive ? palette.primary : 'transparent'}`,
              }}
            >
              <Icon 
                className="w-5 h-5 transition-colors" 
                style={{ color: isActive ? palette.primary : palette.textMuted }} 
              />
              {!isCollapsed && (
                <span 
                  className="text-sm font-medium"
                  style={{ color: isActive ? palette.primary : palette.text }}
                >
                  {item.label as string}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div 
        className="p-3 border-t"
        style={{ borderColor: palette.border }}
      >
        <button 
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group"
          style={{ color: palette.textMuted }}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && (
            <span className="text-sm font-medium">{t('exitDemo') as string}</span>
          )}
        </button>
      </div>
    </aside>
  );
}
