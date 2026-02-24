import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useConfig } from '@/context/ConfigContext';

interface TradeDay {
  date: string;
  pnl: number;
  trades: number;
  notes: string;
}

const generateMockData = (): TradeDay[] => {
  const data: TradeDay[] = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const pnl = (Math.random() - 0.45) * 500;
    data.push({
      date: date.toISOString().split('T')[0],
      pnl,
      trades: Math.floor(Math.random() * 8) + 1,
      notes: '',
    });
  }
  return data;
};

export function Journal() {
  const { t } = useLanguage();
  const { palette } = useConfig();
  const [tradeData, setTradeData] = useState<TradeDay[]>(generateMockData());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [notes, setNotes] = useState('');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay, year, month };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const getDayData = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tradeData.find(d => d.date === dateStr);
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    const dayData = tradeData.find(d => d.date === dateStr);
    setNotes(dayData?.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedDate) {
      setTradeData(prev => prev.map(d => 
        d.date === selectedDate ? { ...d, notes } : d
      ));
    }
  };

  const filteredData = dateRange.start && dateRange.end 
    ? tradeData.filter(d => d.date >= dateRange.start && d.date <= dateRange.end)
    : tradeData;

  const totalPnL = filteredData.reduce((sum, d) => sum + d.pnl, 0);
  const winDays = filteredData.filter(d => d.pnl > 0).length;
  const lossDays = filteredData.filter(d => d.pnl < 0).length;
  const winRate = filteredData.length > 0 ? (winDays / filteredData.length) * 100 : 0;

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: palette.text }}>{t('journalTitle')}</h2>
          <p className="text-sm" style={{ color: palette.textMuted }}>Tracking & Analytics</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg p-3" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <p className="text-xs" style={{ color: palette.textMuted }}>P&L Total</p>
          <p className={`text-lg font-bold ${totalPnL >= 0 ? '' : ''}`} style={{ color: totalPnL >= 0 ? palette.success : palette.danger }}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(0)}
          </p>
        </div>
        <div className="rounded-lg p-3" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <p className="text-xs" style={{ color: palette.textMuted }}>Win Rate</p>
          <p className="text-lg font-bold" style={{ color: palette.info }}>{winRate.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg p-3" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <p className="text-xs" style={{ color: palette.textMuted }}>Días Ganados</p>
          <p className="text-lg font-bold" style={{ color: palette.success }}>{winDays}</p>
        </div>
        <div className="rounded-lg p-3" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <p className="text-xs" style={{ color: palette.textMuted }}>Días Perdidos</p>
          <p className="text-lg font-bold" style={{ color: palette.danger }}>{lossDays}</p>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="rounded-lg p-3" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4" style={{ color: palette.textMuted }} />
          <span className="text-sm font-medium" style={{ color: palette.text }}>{t('dateRange')}</span>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <input 
            type="date" 
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="px-3 py-1.5 rounded-lg text-sm"
            style={{ backgroundColor: palette.background, border: `1px solid ${palette.border}`, color: palette.text }}
          />
          <span style={{ color: palette.textMuted }}>-</span>
          <input 
            type="date" 
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="px-3 py-1.5 rounded-lg text-sm"
            style={{ backgroundColor: palette.background, border: `1px solid ${palette.border}`, color: palette.text }}
          />
          <button 
            onClick={() => setDateRange({ start: '', end: '' })}
            className="px-3 py-1.5 rounded-lg text-sm"
            style={{ backgroundColor: palette.border, color: palette.text }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Calendar */}
        <div className="rounded-lg p-4" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-1 rounded-lg hover:opacity-70"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: palette.text }} />
            </button>
            <span className="font-medium" style={{ color: palette.text }}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-1 rounded-lg hover:opacity-70"
            >
              <ChevronRight className="w-5 h-5" style={{ color: palette.text }} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-center text-xs py-1" style={{ color: palette.textMuted }}>{day}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayData = getDayData(day);
              const isSelected = selectedDate === `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className="aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: isSelected ? palette.primary : dayData ? (dayData.pnl >= 0 ? `${palette.success}20` : `${palette.danger}20`) : palette.background,
                    border: `1px solid ${isSelected ? palette.primary : palette.border}`,
                    color: isSelected ? palette.background : palette.text,
                  }}
                >
                  <span>{day}</span>
                  {dayData && (
                    <span className={`text-xs ${dayData.pnl >= 0 ? '' : ''}`} style={{ color: dayData.pnl >= 0 ? palette.success : palette.danger }}>
                      {dayData.pnl >= 0 ? '+' : ''}{dayData.pnl.toFixed(0)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: `${palette.success}40` }} />
              <span style={{ color: palette.textMuted }}>Ganancia</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: `${palette.danger}40` }} />
              <span style={{ color: palette.textMuted }}>Pérdida</span>
            </div>
          </div>
        </div>

        {/* Daily Notes */}
        <div className="rounded-lg p-4" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" style={{ color: palette.primary }} />
            <h3 className="font-medium" style={{ color: palette.text }}>{t('dailyNotes')}</h3>
          </div>

          {selectedDate ? (
            <>
              <p className="text-sm mb-3" style={{ color: palette.textMuted }}>
                {selectedDate}
              </p>
              
              {(() => {
                const dayData = tradeData.find(d => d.date === selectedDate);
                return dayData ? (
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: palette.background }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ color: palette.textMuted }}>P&L:</span>
                      <span className={`font-bold ${dayData.pnl >= 0 ? '' : ''}`} style={{ color: dayData.pnl >= 0 ? palette.success : palette.danger }}>
                        {dayData.pnl >= 0 ? '+' : ''}${dayData.pnl.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: palette.textMuted }}>Trades:</span>
                      <span className="font-bold" style={{ color: palette.text }}>{dayData.trades}</span>
                    </div>
                  </div>
                ) : null;
              })()}

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Escribe tus notas del día aquí... (soporta Markdown)"
                className="w-full h-40 p-3 rounded-lg resize-none text-sm"
                style={{ 
                  backgroundColor: palette.background, 
                  border: `1px solid ${palette.border}`,
                  color: palette.text,
                }}
              />
              <button 
                onClick={handleSaveNotes}
                className="mt-3 w-full py-2 rounded-lg text-sm font-medium transition-all"
                style={{ backgroundColor: palette.primary, color: palette.background }}
              >
                Guardar Notas
              </button>
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <CalendarIcon className="w-12 h-12 mb-3" style={{ color: palette.textMuted }} />
              <p style={{ color: palette.textMuted }}>Selecciona un día del calendario para ver y editar tus notas</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Trades List */}
      <div className="rounded-lg p-4" style={{ backgroundColor: palette.card, border: `1px solid ${palette.border}` }}>
        <h3 className="font-medium mb-3" style={{ color: palette.text }}>Historial Reciente</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${palette.border}` }}>
                <th className="text-left py-2 px-3 text-xs" style={{ color: palette.textMuted }}>Fecha</th>
                <th className="text-left py-2 px-3 text-xs" style={{ color: palette.textMuted }}>Trades</th>
                <th className="text-left py-2 px-3 text-xs" style={{ color: palette.textMuted }}>P&L</th>
                <th className="text-left py-2 px-3 text-xs" style={{ color: palette.textMuted }}>Notas</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(-10).reverse().map((day, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid ${palette.border}` }}>
                  <td className="py-2 px-3 text-sm" style={{ color: palette.text }}>{day.date}</td>
                  <td className="py-2 px-3 text-sm" style={{ color: palette.text }}>{day.trades}</td>
                  <td className={`py-2 px-3 text-sm font-medium ${day.pnl >= 0 ? '' : ''}`} style={{ color: day.pnl >= 0 ? palette.success : palette.danger }}>
                    {day.pnl >= 0 ? '+' : ''}${day.pnl.toFixed(0)}
                  </td>
                  <td className="py-2 px-3 text-sm truncate max-w-xs" style={{ color: palette.textMuted }}>
                    {day.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
