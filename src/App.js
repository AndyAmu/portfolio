import './App.css';
import React, { Suspense, lazy, useState, useCallback } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Sidebar from './component/Sidebar';
import ChatGPTOverlay from './component/chatGPT';
import Body from './component/Body';
import LetterGlitch from './component/LetterGlitch';
import IntroSplash from './component/IntroSplash';

const ProjectsSection = lazy(() => import('./component/ProjectsSection'));
const GoogleCalendar = lazy(() => import('./component/GoogleCalendar'));
const ContactEmail = lazy(() => import('./component/ContactEmail'));

const SectionSkeleton = ({ minHeight = '360px' }) => (
  <div className="skeleton-card" style={{ minHeight }} aria-hidden="true">
    <div className="skeleton-line" style={{ width: '42%', height: '28px', margin: '0 auto' }} />
    <div className="skeleton-line" style={{ width: '75%', margin: '0 auto' }} />
    <div className="skeleton-line" style={{ width: '100%', height: '140px', marginTop: '12px' }} />
  </div>
);

function shouldSkipIntroInitially() {
  try {
    if (sessionStorage.getItem('andres_portfolio_intro_seen_v1') === '1') {
      return true;
    }
  } catch {
    // Ignore storage errors
  }
  return (
    typeof window !== 'undefined' &&
    Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches)
  );
}

function AppContent() {
  const { language, translations } = useLanguage();
  const [introDone, setIntroDone] = useState(shouldSkipIntroInitially);
  const [activeProjectCategory, setActiveProjectCategory] = useState('all');
  const [contactPreset, setContactPreset] = useState(null);

  const scrollToElement = useCallback((id) => {
    const element = document.getElementById(id);
    const container = document.querySelector('.main-content-area');
    if (element && container) {
      container.scrollTo({
        top: Math.max(0, element.offsetTop - 32),
        behavior: 'smooth',
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleRequestSimilarProject = useCallback(
    (project) => {
      const subject =
        language === 'en'
          ? `Project inquiry similar to ${project.title}`
          : `Consulta por proyecto similar a ${project.title}`;
      const message =
        language === 'en'
          ? `Hi Andrés, I saw ${project.title} (${project.type.en}) in your portfolio and I'd like to discuss a similar project.`
          : `Hola Andrés, vi el caso de ${project.title} (${project.type.es}) en tu portafolio y quiero cotizar un proyecto similar.`;

      setContactPreset({ subject, message, nonce: Date.now() });
      scrollToElement('contact');
    },
    [language, scrollToElement]
  );

  const handleChatNavigateSection = useCallback(
    (sectionId, lastQuestion) => {
      if (sectionId === 'contact' && lastQuestion) {
        setContactPreset({
          subject:
            language === 'en'
              ? 'New freelance project inquiry'
              : 'Consulta por nuevo proyecto freelance',
          message:
            language === 'en'
              ? `Context from AI assistant chat: "${lastQuestion.slice(0, 180)}"`
              : `Contexto desde el asistente del portafolio: "${lastQuestion.slice(0, 180)}"`,
          nonce: Date.now(),
        });
      }
      scrollToElement(sectionId);
    },
    [language, scrollToElement]
  );

  return (
    <>
      <a href="#home" className="visually-hidden skip-link">
        {language === 'en' ? 'Skip to main content' : 'Ir al contenido principal'}
      </a>

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
          pointerEvents: introDone ? 'auto' : 'none',
        }}
      >
        <Sidebar />

        <div className="top-right-actions">
          <button
            type="button"
            className="start-project-btn"
            onClick={() => scrollToElement('contact')}
          >
            {translations.startProject}
          </button>
        </div>

        <main className="main-content-area" id="main-content">
          <Body onSelectProjectCategory={setActiveProjectCategory} />

          <Suspense fallback={<SectionSkeleton minHeight="420px" />}>
            <ProjectsSection
              activeCategory={activeProjectCategory}
              onSelectCategory={setActiveProjectCategory}
              onRequestSimilar={handleRequestSimilarProject}
            />
          </Suspense>

          <div className="bottom-widgets-grid">
            <Suspense fallback={<SectionSkeleton minHeight="460px" />}>
              <GoogleCalendar />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="460px" />}>
              <ContactEmail contactPreset={contactPreset} />
            </Suspense>
          </div>

          <div style={{ height: '50px' }} aria-hidden="true" />
        </main>

        <ChatGPTOverlay
          isDarkMode={true}
          onNavigateSection={handleChatNavigateSection}
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
