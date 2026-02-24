import { useState, useEffect } from 'react';
import { Header, Sidebar } from '@/components/layout';
import { Dashboard, TradeEntry, Analytics, Settings, Coach, Landing, MonteCarlo, Journal, Tutorial } from '@/pages';
import { VisualToolbar } from '@/components/VisualToolbar';
import { CoachAvatar } from '@/components/CoachAvatar';
import { ConfigProvider, useConfig } from '@/context/ConfigContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { mockStats } from '@/data/mockData';

type PageType = 'dashboard' | 'trade' | 'analytics' | 'settings' | 'coach' | 'montecarlo' | 'journal' | 'tutorial' | 'landing';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const { palette, images, uiScale } = useConfig();

  // Apply UI scale and font size to document
  useEffect(() => {
    document.documentElement.style.setProperty('--ui-scale', uiScale.uiScale.toString());
    document.documentElement.style.setProperty('--font-base', `${uiScale.fontSize}px`);
  }, [uiScale]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'trade':
        return <TradeEntry />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'coach':
        return <Coach />;
      case 'montecarlo':
        return <MonteCarlo />;
      case 'journal':
        return <Journal />;
      case 'tutorial':
        return <Tutorial />;
      case 'landing':
      default:
        return <Landing onEnterDemo={() => setCurrentPage('dashboard')} />;
    }
  };

  // Landing page - Normal scroll
  if (currentPage === 'landing') {
    return (
      <div 
        className="landing-container min-h-screen"
        style={{ 
          backgroundColor: palette.background,
        }}
      >
        {/* Background Image */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={images.background}
            alt="Background"
            className="absolute min-w-full min-h-full object-cover"
            style={{
              opacity: images.opacity / 100,
              filter: `brightness(${images.brightness}%)`,
              transform: `scale(${images.zoom / 100}) translate(${(images.posX - 50) * 2}%, ${(images.posY - 50) * 2}%)`,
              transformOrigin: 'center center',
            }}
          />
        </div>
        
        <div className="relative z-10">
          <Landing onEnterDemo={() => setCurrentPage('dashboard')} />
        </div>
      </div>
    );
  }

  // App - Fixed viewport (100vh), no body scroll
  return (
    <div 
      className="app-container"
      style={{ 
        backgroundColor: palette.background,
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={images.background}
          alt="Background"
          className="absolute min-w-full min-h-full object-cover"
          style={{
            opacity: images.opacity / 100,
            filter: `brightness(${images.brightness}%)`,
            transform: `scale(${images.zoom / 100}) translate(${(images.posX - 50) * 2}%, ${(images.posY - 50) * 2}%)`,
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* UI Scaled Content */}
      <div className="ui-scaled absolute inset-0 flex">
        <Sidebar 
          activePage={currentPage} 
          onNavigate={(page) => setCurrentPage(page as PageType)} 
        />
        
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          <Header 
            activeMotor={mockStats.activeMotor}
            userName="Bruce M."
            tradingMode="Binary Options"
            onSettingsClick={() => setCurrentPage('settings')}
          />
          
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>

        {/* Visual Toolbar */}
        <VisualToolbar />

        {/* Coach Avatar */}
        <CoachAvatar />
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ConfigProvider>
        <AppContent />
      </ConfigProvider>
    </LanguageProvider>
  );
}

export default App;
