import React from "react"
import './styles/BodyCards.css'
import profileImg from './image/patagonia-and.webp'
import { useLanguage } from '../context/LanguageContext'
import { DiReact, DiNodejsSmall, DiJavascript1, DiHtml5, DiCss3, DiGit, DiMongodb, DiPython, DiPhp } from 'react-icons/di'
import { SiPostman } from 'react-icons/si'
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const Body = () => {
  const { language, translations } = useLanguage();

  const cvUrls = {
    en: "https://drive.google.com/file/d/1iOtW9YSycHHFacSMtjLtw51ABcntr7aa/view?usp=drive_link",
    es: "https://drive.google.com/file/d/14-FGhRxK-rmz4bc6xiTsU7cX3yq5EbZf/view?usp=sharing"
  };

  return (
    <>
      {/* Hero Card */}
      <div id="home" className="dashboard-card hero-card">
        <div className="hero-text">
          <h1 className="hero-title">Andrés Amuchástegui</h1>
          <h2 className="hero-subtitle">
            {language === 'en' ? 'Full Stack Developer' : 'Desarrollador Full Stack'} <br/>
            {language === 'en' ? 'Web, Mobile & AI Specialist' : 'Especialista en Web, Mobile & AI'}
          </h2>
          <p className="hero-desc">
            {language === 'en' 
              ? 'Transforming ideas into digital solutions.' 
              : 'Transformando ideas en soluciones digitales.'}
          </p>
          <div style={{ marginTop: '24px' }}>
            <a target="_blank" rel="noreferrer" href={cvUrls[language]} style={{ textDecoration: 'none' }}>
              <button className="start-project-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {language === 'en' ? translations.downloadEnglishCV : translations.downloadSpanishCV}
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
              </button>
            </a>
          </div>
        </div>
        <div className="hero-image-container">
          <img src={profileImg} alt="Andres" className="hero-image" />
        </div>
      </div>

      {/* Info Card */}
      <div id="about" className="dashboard-card">
        <div className="info-card-container">
          <div className="info-grid">
            <div className="sub-card full-width">
              <h3>{language === 'en' ? 'About Me' : 'Sobre Mí'}</h3>
              <p>{translations.introduction}</p>
            </div>
          </div>

          <div className="tech-pill-container" id="skills">
            <div className="tech-pill">
              <DiJavascript1 className="tech-icon" title="JavaScript" />
              <DiReact className="tech-icon" title="React" />
              <DiNodejsSmall className="tech-icon" title="Node.js" />
              <DiHtml5 className="tech-icon" title="HTML5" />
              <DiCss3 className="tech-icon" title="CSS3" />
              <DiMongodb className="tech-icon" title="MongoDB" />
              <DiPython className="tech-icon" title="Python" />
              <DiPhp className="tech-icon" title="PHP" />
              <SiPostman className="tech-icon" title="Postman" />
              <DiGit className="tech-icon" title="Git" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="dashboard-card" style={{ marginTop: '20px' }}>
        <div className="info-card-container">
          <h2 className="info-intro" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '8px' }}>
            {language === 'en' ? 'SERVICES' : 'SERVICIOS'}
          </h2>
          <p style={{ textAlign: 'center', color: '#a1a1a1', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            {language === 'en'
              ? 'Comprehensive solutions from design to development, focusing on user experience and cutting-edge technology.'
              : 'Soluciones integrales desde el diseño hasta el desarrollo, con enfoque en experiencia de usuario y tecnología de vanguardia.'}
          </p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-box">
                <CodeIcon fontSize="large" sx={{ color: '#fff' }} />
              </div>
              <h3>{language === 'en' ? 'Frontend Development' : 'Desarrollo Frontend'}</h3>
              <p>
                {language === 'en' 
                  ? 'Modern and scalable web applications with React, TypeScript and the latest technologies. Focus on performance, accessibility and user experience.'
                  : 'Aplicaciones web modernas y escalables con React, TypeScript y las últimas tecnologías. Enfoque en rendimiento, accesibilidad y experiencia de usuario.'}
              </p>
              <div className="service-tags">
                <span className="service-tag">React</span>
                <span className="service-tag">TypeScript</span>
                <span className="service-tag">Next.js</span>
                <span className="service-tag">Tailwind CSS</span>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <WebIcon fontSize="large" sx={{ color: '#fff' }} />
              </div>
              <h3>{language === 'en' ? 'WordPress Development' : 'Desarrollo WordPress'}</h3>
              <p>
                {language === 'en'
                  ? 'Custom WordPress solutions with theme development, plugin customization, and WooCommerce integration. SEO and performance optimization.'
                  : 'Soluciones WordPress personalizadas con desarrollo de temas, personalización de plugins e integración WooCommerce. Optimización de rendimiento y SEO.'}
              </p>
              <div className="service-tags">
                <span className="service-tag">WordPress</span>
                <span className="service-tag">PHP</span>
                <span className="service-tag">WooCommerce</span>
                <span className="service-tag">Custom Themes</span>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <IntegrationInstructionsIcon fontSize="large" sx={{ color: '#fff' }} />
              </div>
              <h3>{language === 'en' ? 'Backend & AI Integration' : 'Backend & Integración IA'}</h3>
              <p>
                {language === 'en'
                  ? 'Robust backend architecture and AI-powered conversational solutions. API creation and real-time database management.'
                  : 'Arquitectura backend robusta y soluciones conversacionales impulsadas por IA. Creación de APIs y gestión de bases de datos en tiempo real.'}
              </p>
              <div className="service-tags">
                <span className="service-tag">Node.js</span>
                <span className="service-tag">Supabase</span>
                <span className="service-tag">OpenAI</span>
                <span className="service-tag">GCP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Body
