import './App.css';
import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Sidebar from './component/Sidebar';
import ChatGPTOverlay from './component/chatGPT';
import Body from './component/Body';
import ContactEmail from './component/ContactEmail';
import GoogleCalendar from './component/GoogleCalendar';
import LetterGlitch from './component/LetterGlitch';
import { useLanguage } from './context/LanguageContext';

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { language } = useLanguage();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {isDarkMode && (
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
        />
      )}
      <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
        <Sidebar 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
        />

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
          isDarkMode={isDarkMode}
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
