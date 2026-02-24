import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, GripVertical, Sparkles } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';

interface CoachMessage {
  id: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  title: string;
  message: string;
}

const coachMessages: CoachMessage[] = [
  {
    id: '1',
    type: 'warning',
    title: '⚠️ F3_Racha Detectado',
    message: 'Llevas 3 pérdidas consecutivas. Tu Ψ ha sido reducido un 40%. Esto es protección, no castigo.',
  },
  {
    id: '2',
    type: 'info',
    title: 'ℹ️ Cambio de Motor',
    message: 'ARGOS ha cambiado de SAFE → DYNAMIC. Tu win rate Bayesiano superó el umbral de 50%.',
  },
  {
    id: '3',
    type: 'success',
    title: '✅ Buen Ritmo',
    message: 'Has esperado 6 minutos entre operaciones. El factor F6_Speed está inactivo.',
  },
  {
    id: '4',
    type: 'danger',
    title: '🛑 Lockout Activado',
    message: '3 pérdidas consecutivas. Motor → SAFE. Usa este tiempo para revisar tu análisis.',
  },
  {
    id: '5',
    type: 'info',
    title: '📊 Recomendación',
    message: 'Tu stake óptimo es $43.20 (0.34% del balance). Kelly ajustado por Ψ.',
  },
];

export function CoachAvatar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<CoachMessage>(coachMessages[0]);
  const avatarRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const avatarWidth = 160;
  const avatarHeight = 220;
  const { palette, images } = useConfig();

  // Epic entrance animation
  useEffect(() => {
    if (isVisible && !hasEntered) {
      setTimeout(() => setHasEntered(true), 100);
    }
  }, [isVisible, hasEntered]);

  // Random message rotation
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentMessage(coachMessages[Math.floor(Math.random() * coachMessages.length)]);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Smooth drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!avatarRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;

    // Boundary constraints using actual avatar dimensions
    const maxX = window.innerWidth - avatarWidth;
    const maxY = window.innerHeight - avatarHeight;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  }, [isDragging, avatarWidth, avatarHeight]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse + touch events for smooth dragging
  useEffect(() => {
    if (isDragging) {
      const clampPosition = (clientX: number, clientY: number) => {
        const newX = clientX - dragStartRef.current.x;
        const newY = clientY - dragStartRef.current.y;
        const maxX = window.innerWidth - avatarWidth;
        const maxY = window.innerHeight - avatarHeight;
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      };

      const handleGlobalMouseMove = (e: MouseEvent) => clampPosition(e.clientX, e.clientY);
      const handleGlobalMouseUp = () => setIsDragging(false);

      // Touch equivalents
      const handleGlobalTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          e.preventDefault();
          clampPosition(e.touches[0].clientX, e.touches[0].clientY);
        }
      };
      const handleGlobalTouchEnd = () => setIsDragging(false);

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
        document.removeEventListener('touchmove', handleGlobalTouchMove);
        document.removeEventListener('touchend', handleGlobalTouchEnd);
      };
    }
  }, [isDragging, avatarWidth, avatarHeight]);

  // Get message color based on type
  const getMessageColor = (type: CoachMessage['type']) => {
    switch (type) {
      case 'success': return palette.success;
      case 'warning': return palette.warning;
      case 'danger': return palette.danger;
      default: return palette.info;
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all hover:scale-110 animate-pulse"
        style={{
          backgroundColor: palette.card,
          border: `2px solid ${palette.primary}`,
          boxShadow: `0 0 30px ${palette.glow}`,
        }}
      >
        <MessageCircle className="w-6 h-6" style={{ color: palette.primary }} />
      </button>
    );
  }

  return (
    <>
      {/* Full-Body Cyberpunk Avatar - Transparent Background */}
      <div
        ref={avatarRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => !isDragging && setIsOpen(!isOpen)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            setIsDragging(true);
            dragStartRef.current = {
              x: e.touches[0].clientX - position.x,
              y: e.touches[0].clientY - position.y,
            };
          }
        }}
        className={`fixed z-50 ${hasEntered ? 'animate-coach-entrance' : 'opacity-0 scale-50'}`}
        style={{
          left: position.x,
          top: position.y,
          background: 'transparent',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {/* Hologram Container */}
        <div
          className="relative"
          style={{
            width: '160px',
            height: '220px',
          }}
        >
          {/* Hologram Base Glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full opacity-60"
            style={{
              background: `radial-gradient(ellipse, ${palette.primary}60 0%, transparent 70%)`,
              filter: 'blur(8px)',
            }}
          />

          {/* Scan Lines Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${palette.primary}20 2px,
                ${palette.primary}20 4px
              )`,
              animation: 'scanlines 3s linear infinite',
            }}
          />

          {/* Character Image - Full Body */}
          <div
            className="relative w-full h-full"
            style={{
              background: 'transparent',
            }}
          >
            <img
              src={images.icon}
              alt="Coach Avatar"
              className="w-full h-full object-contain"
              style={{
                filter: `brightness(${images.brightness}%) drop-shadow(0 0 20px ${palette.primary}80)`,
                mixBlendMode: 'normal',
              }}
              draggable={false}
            />

            {/* Hologram Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(
                  180deg,
                  transparent 60%,
                  ${palette.primary}20 100%
                )`,
              }}
            />
          </div>

          {/* Floating Particles */}
          <div className="absolute -top-2 right-0 animate-bounce">
            <Sparkles className="w-4 h-4" style={{ color: palette.primary }} />
          </div>

          {/* Drag Handle */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 p-1.5 rounded-full cursor-grab active:cursor-grabbing"
            style={{
              backgroundColor: palette.card,
              border: `1px solid ${palette.border}`,
              boxShadow: `0 0 10px ${palette.glow}`,
            }}
          >
            <GripVertical className="w-3 h-3" style={{ color: palette.textMuted }} />
          </div>

          {/* Hologram Border Pulse */}
          <div
            className="absolute inset-0 rounded-lg animate-pulse pointer-events-none"
            style={{
              border: `1px solid ${palette.primary}40`,
              boxShadow: `0 0 30px ${palette.glow}40, inset 0 0 30px ${palette.glow}20`,
            }}
          />
        </div>
      </div>

      {/* Message Dialog */}
      {isOpen && (
        <div
          className="fixed z-40 p-4 rounded-xl max-w-sm animate-fadeIn"
          style={{
            left: position.x + 80,
            top: position.y + 240,
            transform: 'translateX(-50%)',
            backgroundColor: palette.card,
            border: `1px solid ${getMessageColor(currentMessage.type)}`,
            boxShadow: `0 0 30px ${palette.glow}`,
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute -top-2 -right-2 p-1 rounded-full transition-opacity hover:opacity-70"
            style={{
              backgroundColor: palette.danger,
            }}
          >
            <X className="w-3 h-3 text-white" />
          </button>

          {/* Message header */}
          <div
            className="flex items-center gap-2 mb-2 pb-2 border-b"
            style={{ borderColor: palette.border }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: getMessageColor(currentMessage.type) }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: getMessageColor(currentMessage.type) }}
            >
              {currentMessage.title}
            </span>
          </div>

          {/* Message content */}
          <p className="text-sm leading-relaxed" style={{ color: palette.text }}>
            {currentMessage.message}
          </p>

          {/* Action hint */}
          <p
            className="mt-3 text-xs italic"
            style={{ color: palette.textMuted }}
          >
            💡 Haz clic en el avatar para cambiar el mensaje
          </p>
        </div>
      )}

      {/* Close avatar button */}
      <button
        onClick={() => {
          setIsVisible(false);
          setIsOpen(false);
          setHasEntered(false);
        }}
        className="fixed bottom-6 right-6 z-50 p-2 rounded-full transition-all hover:scale-110"
        style={{
          backgroundColor: palette.danger,
          boxShadow: `0 0 20px ${palette.danger}40`,
        }}
      >
        <X className="w-4 h-4 text-white" />
      </button>
    </>
  );
}
