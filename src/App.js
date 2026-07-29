import './App.css';
import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Sidebar from './component/Sidebar';
import ChatGPTOverlay from './component/chatGPT';
import Body from './component/Body';
import ContactEmail from './component/ContactEmail';
import GoogleCalendar from './component/GoogleCalendar';
import LetterGlitch from './component/LetterGlitch';
import IntroSplash from './component/IntroSplash';
import { useLanguage } from './context/LanguageContext';

function AppContent() {
  const { language } = useLanguage();
  const [introDone, setIntroDone] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={false}
        outerVignette={false}
        smooth={true}
      />

      {!introDone && <IntroSplash onComplete={() => setIntroDone(true)} />}

      <div 
        className="app-container dark"
        style={{ 
          opacity: introDone ? 1 : 0, 
          transition: 'opacity 1.5s ease-in-out',
          pointerEvents: introDone ? 'auto' : 'none'
        }}
      >
        <Sidebar />

        <div className="top-right-actions">
          <button className="start-project-btn" onClick={scrollToContact}>
            {language === 'en' ? 'Start project' : 'Iniciar proyecto'}
          </button>
        </div>
        
        <div className="main-content-area">
          
          <Body />
          
          <div className="bottom-widgets-grid">
            <GoogleCalendar />
            <ContactEmail />
          </div>
          
          {/* We add some extra space at the bottom to ensure nothing is hidden behind the chat input */}
          <div style={{ height: '50px' }}></div>
        </div>

        <ChatGPTOverlay 
          isDarkMode={true}
        />
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
