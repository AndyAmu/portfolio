import React from 'react';
import './styles/BodyCards.css';
import profileImg from './image/patagonia-and.webp';
import { useLanguage } from '../context/LanguageContext';
import {
  DiReact,
  DiNodejsSmall,
  DiJavascript1,
  DiHtml5,
  DiCss3,
  DiGit,
  DiMongodb,
  DiPython,
  DiPhp,
} from 'react-icons/di';
import { SiPostman } from 'react-icons/si';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const Body = ({ onSelectProjectCategory }) => {
  const { language, translations } = useLanguage();

  const cvUrls = {
    en: 'https://drive.google.com/file/d/1iOtW9YSycHHFacSMtjLtw51ABcntr7aa/view?usp=drive_link',
    es: 'https://drive.google.com/file/d/14-FGhRxK-rmz4bc6xiTsU7cX3yq5EbZf/view?usp=sharing',
  };

  const handleViewCategory = (categoryId) => {
    if (onSelectProjectCategory) {
      onSelectProjectCategory(categoryId);
    }
    const projectsEl = document.getElementById('projects');
    const container = document.querySelector('.main-content-area');
    if (projectsEl && container) {
      container.scrollTo({
        top: projectsEl.offsetTop - 32,
        behavior: 'smooth',
      });
    } else if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Card */}
      <section id="home" className="dashboard-card hero-card" aria-labelledby="hero-heading">
        <div className="hero-text">
          <h1 id="hero-heading" className="hero-title">
            Andrés Amuchástegui
          </h1>
          <h2 className="hero-subtitle">
            {translations.heroRole}
            <br />
            {translations.heroSpecialty}
          </h2>
          <p className="hero-desc">{translations.heroTagline}</p>

          <div className="hero-cta-row">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={cvUrls[language]}
              style={{ textDecoration: 'none' }}
            >
              <button
                type="button"
                className="start-project-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                {language === 'en' ? translations.downloadEnglishCV : translations.downloadSpanishCV}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width="1.15em"
                  height="1.15em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                  />
                </svg>
              </button>
            </a>

            <button
              type="button"
              className="hero-secondary-btn"
              onClick={() => handleViewCategory('all')}
            >
              {language === 'en' ? 'Explore projects' : 'Ver proyectos'} ↓
            </button>
          </div>
        </div>

        <div className="hero-image-container">
          <img
            src={profileImg}
            alt="Andrés Amuchástegui en la Patagonia"
            className="hero-image"
            width={750}
            height={1000}
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </section>

      {/* Info / About Card */}
      <section id="about" className="dashboard-card" aria-labelledby="about-heading">
        <div className="info-card-container">
          <div className="info-grid">
            <div className="sub-card full-width">
              <h3 id="about-heading">{translations.summaryTitle}</h3>
              <p>{translations.introduction}</p>
              <div className="summary-proof-row" aria-label="International markets and specialties">
                <span className="summary-proof-badge">🇦🇷 Argentina</span>
                <span className="summary-proof-badge">🇨🇱 Chile</span>
                <span className="summary-proof-badge">🇧🇷 Brasil</span>
                <span className="summary-proof-badge">🇪🇸 España</span>
                <span className="summary-proof-badge">SaaS B2B · WooCommerce · CRO · IA</span>
              </div>
            </div>
          </div>

          <div className="tech-pill-container" id="skills">
            <div className="tech-pill" aria-label="Core technology stack">
              <DiJavascript1 className="tech-icon" title="JavaScript" aria-label="JavaScript" />
              <DiReact className="tech-icon" title="React" aria-label="React" />
              <DiNodejsSmall className="tech-icon" title="Node.js" aria-label="Node.js" />
              <DiHtml5 className="tech-icon" title="HTML5" aria-label="HTML5" />
              <DiCss3 className="tech-icon" title="CSS3" aria-label="CSS3" />
              <DiMongodb className="tech-icon" title="MongoDB" aria-label="MongoDB" />
              <DiPython className="tech-icon" title="Python" aria-label="Python" />
              <DiPhp className="tech-icon" title="PHP" aria-label="PHP" />
              <SiPostman className="tech-icon" title="Postman" aria-label="Postman" />
              <DiGit className="tech-icon" title="Git" aria-label="Git" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="dashboard-card" aria-labelledby="services-heading">
        <div className="info-card-container">
          <h2
            id="services-heading"
            className="info-intro"
            style={{ textAlign: 'center', fontSize: '2.3rem', marginBottom: '4px' }}
          >
            {language === 'en' ? 'SERVICES' : 'SERVICIOS'}
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: '#a8a8b2',
              maxWidth: '640px',
              margin: '0 auto 24px',
              lineHeight: 1.55,
            }}
          >
            {language === 'en'
              ? 'End-to-end digital products backed by live freelance work across Argentina, Chile, Brazil & Spain.'
              : 'Soluciones integrales desde diseño hasta producción, respaldadas por casos reales en Argentina, Chile, Brasil y España.'}
          </p>

          <div className="services-grid">
            {/* 1. Frontend & CRO */}
            <article className="service-card">
              <div className="service-icon-box" aria-hidden="true">
                <CodeIcon fontSize="large" sx={{ color: '#fff' }} />
              </div>
              <h3>{language === 'en' ? 'Frontend & Conversion (CRO)' : 'Frontend & Conversión (CRO)'}</h3>
              <p>
                {language === 'en'
                  ? 'High-speed web apps and conversion-focused landing pages with React, Astro, and Tailwind CSS. Built for local SEO, Core Web Vitals, and WhatsApp lead funnels.'
                  : 'Aplicaciones modernas con React y landings ultrarrápidas en Astro orientadas a conversión (CRO), SEO local, velocidad extrema y embudos a WhatsApp.'}
              </p>
              <div className="service-tags">
                <span className="service-tag">React &amp; Vite</span>
                <span className="service-tag">Astro</span>
                <span className="service-tag">Tailwind CSS</span>
                <span className="service-tag">SEO / CRO</span>
              </div>

              <div className="service-cases-box">
                <span className="service-cases-label">{translations.appliedCasesLabel}</span>
                <div className="service-cases-pills">
                  <a
                    href="https://www.estudiolacamera.com.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-case-link"
                  >
                    🇦🇷 Estudio La Cámera
                  </a>
                  <a
                    href="https://www.trasllat.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-case-link"
                  >
                    🇪🇸 Trasllat
                  </a>
                </div>
                <button
                  type="button"
                  className="service-area-btn"
                  onClick={() => handleViewCategory('frontend')}
                >
                  {translations.viewAreaProjects} →
                </button>
              </div>
            </article>

            {/* 2. WordPress & International E-commerce */}
            <article className="service-card">
              <div className="service-icon-box" aria-hidden="true">
                <WebIcon fontSize="large" sx={{ color: '#fff' }} />
              </div>
              <h3>
                {language === 'en'
                  ? 'WordPress & E-commerce'
                  : 'WordPress & E-commerce'}
              </h3>
              <p>
                {language === 'en'
                  ? 'Custom WordPress platforms, educational ecosystems with Virtual Campus, and international WooCommerce stores with Pix, Mercado Pago & multi-currency support.'
                  : 'Ecosistemas WordPress a medida, plataformas educativas con Campus Virtual y tiendas WooCommerce internacionales con Pix, Mercado Pago y tarjetas.'}
              </p>
              <div className="service-tags">
                <span className="service-tag">WordPress</span>
                <span className="service-tag">WooCommerce</span>
                <span className="service-tag">PHP</span>
                <span className="service-tag">Pix &amp; Mercado Pago</span>
              </div>

              <div className="service-cases-box">
                <span className="service-cases-label">{translations.appliedCasesLabel}</span>
                <div className="service-cases-pills">
                  <a
                    href="https://alaseduca.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-case-link"
                  >
                    🇦🇷🇨🇱 Alas Educa
                  </a>
                  <a
                    href="https://gustavofleiussarte.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-case-link"
                  >
                    🇧🇷 Gustavo Fleiuss
                  </a>
                </div>
                <button
                  type="button"
                  className="service-area-btn"
                  onClick={() => handleViewCategory('wordpress')}
                >
                  {translations.viewAreaProjects} →
                </button>
              </div>
            </article>

            {/* 3. SaaS Full Stack, Backend & AI */}
            <article className="service-card">
              <div className="service-icon-box" aria-hidden="true">
                <IntegrationInstructionsIcon fontSize="large" sx={{ color: '#fff' }} />
              </div>
              <h3>
                {language === 'en'
                  ? 'SaaS, Backend & AI Integration'
                  : 'SaaS, Backend & Integración IA'}
              </h3>
              <p>
                {language === 'en'
                  ? 'Full Stack B2B SaaS products, Google OAuth & subscription systems, real-time boards, and AI-powered WhatsApp automation with OpenAI, Gemini & Twilio.'
                  : 'Productos SaaS B2B en tiempo real, flujos con Google OAuth y suscripciones, portales B2B y automatizaciones con IA (OpenAI/Gemini) y WhatsApp API.'}
              </p>
              <div className="service-tags">
                <span className="service-tag">Node.js &amp; SaaS</span>
                <span className="service-tag">Google OAuth</span>
                <span className="service-tag">Supabase</span>
                <span className="service-tag">OpenAI / Gemini</span>
              </div>

              <div className="service-cases-box">
                <span className="service-cases-label">{translations.appliedCasesLabel}</span>
                <div className="service-cases-pills">
                  <a
                    href="https://www.pasaturno.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-case-link"
                  >
                    B2B · PasaTurno
                  </a>
                  <a
                    href="https://www.condamind.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-case-link"
                  >
                    IA · Condamind
                  </a>
                </div>
                <button
                  type="button"
                  className="service-area-btn"
                  onClick={() => handleViewCategory('saas')}
                >
                  {translations.viewAreaProjects} →
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Body;
