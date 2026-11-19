import React from 'react';
import './styles/ProjectsSection.css';
import { PROJECT_CATEGORIES, PROJECTS_DATA } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';

const ProjectMockupContent = ({ project, language }) => {
  switch (project.previewType) {
    case 'pasaturno':
      return (
        <div className="mockup-grid-2">
          <div className="mockup-tile" style={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <span className="mockup-kicker">
              {language === 'en' ? 'Active Shift Board' : 'Tablero Turno Activo'}
            </span>
            <span className="mockup-title">
              {language === 'en' ? 'Priority Handover' : 'Traspaso Prioritario'}
            </span>
            <div className="mockup-pills-row">
              <span className="mockup-pill">Real-Time</span>
              <span className="mockup-pill">Audit Log</span>
            </div>
          </div>
          <div className="mockup-tile">
            <span className="mockup-kicker">White-Label SaaS</span>
            <span className="mockup-title">
              {language === 'en' ? 'Zero WhatsApp Chaos' : 'Cero Grupos WhatsApp'}
            </span>
            <div className="mockup-pills-row">
              <span className="mockup-pill">Freemium</span>
              <span className="mockup-pill">Pro</span>
            </div>
          </div>
        </div>
      );

    case 'trasllat':
      return (
        <div className="mockup-hero-box" style={{ borderColor: 'rgba(52, 211, 153, 0.3)' }}>
          <span className="mockup-kicker">Barcelona · Madrid · Valencia</span>
          <span className="mockup-title">
            {language === 'en'
              ? 'Multi-Step Moving Quoter → WhatsApp'
              : 'Cotizador Multi-Paso → Presupuesto WhatsApp'}
          </span>
          <div className="mockup-pills-row">
            <span className="mockup-pill">Google OAuth -10%</span>
            <span className="mockup-pill">Comunidad</span>
            <span className="mockup-pill">Portal B2B</span>
          </div>
        </div>
      );

    case 'lacamera':
      return (
        <div className="mockup-hero-box" style={{ borderColor: 'rgba(251, 191, 36, 0.32)' }}>
          <span className="mockup-kicker">LegalTech CRO · CABA &amp; GBA</span>
          <span className="mockup-title">
            ★ 5.0 Google (+296 {language === 'en' ? 'verified reviews' : 'reseñas verificadas'})
          </span>
          <div className="mockup-pills-row">
            <span className="mockup-pill">Astro Speed</span>
            <span className="mockup-pill">Local SEO</span>
            <span className="mockup-pill">WhatsApp Funnel</span>
          </div>
        </div>
      );

    case 'alaseduca':
      return (
        <div className="mockup-grid-2">
          <div className="mockup-tile" style={{ borderColor: 'rgba(96, 165, 250, 0.3)' }}>
            <span className="mockup-kicker">ANAC · DGAC · OACI</span>
            <span className="mockup-title">Argentina &amp; Chile</span>
            <div className="mockup-pills-row">
              <span className="mockup-pill">Campus Virtual</span>
            </div>
          </div>
          <div className="mockup-tile">
            <span className="mockup-kicker">Recruitment</span>
            <span className="mockup-title">
              {language === 'en' ? 'JetSMART CV Portal' : 'Portal CV JetSMART'}
            </span>
            <div className="mockup-pills-row">
              <span className="mockup-pill">
                {language === 'en' ? 'Online Store' : 'Tienda'}
              </span>
            </div>
          </div>
        </div>
      );

    case 'gusart':
      return (
        <div className="mockup-hero-box" style={{ borderColor: 'rgba(192, 132, 252, 0.3)' }}>
          <span className="mockup-kicker">
            {language === 'en' ? '20+ Years · Brazil Gallery' : '+20 Años · Galería Brasil (PT)'}
          </span>
          <span className="mockup-title">
            {language === 'en'
              ? 'Certified Originals & Fine Art Prints'
              : 'Obras Únicas Certificadas & Prints'}
          </span>
          <div className="mockup-pills-row">
            <span className="mockup-pill">WooCommerce</span>
            <span className="mockup-pill">Pix</span>
            <span className="mockup-pill">Mercado Pago</span>
          </div>
        </div>
      );

    case 'condamind':
      return (
        <div className="mockup-hero-box" style={{ borderColor: 'rgba(45, 212, 191, 0.3)' }}>
          <span className="mockup-kicker">OpenAI API · Twilio · Meta Business</span>
          <span className="mockup-title">
            {language === 'en'
              ? '24/7 Conversational AI WhatsApp Booking'
              : 'Atención & Turnos 24/7 con IA en WhatsApp'}
          </span>
          <div className="mockup-pills-row">
            <span className="mockup-pill">Supabase</span>
            <span className="mockup-pill">GCP</span>
            <span className="mockup-pill">Backoffice</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="mockup-hero-box">
          <span className="mockup-kicker">{project.area[language]}</span>
          <span className="mockup-title">{project.title}</span>
        </div>
      );
  }
};

const ProjectsSection = ({ activeCategory, onSelectCategory, onRequestSimilar }) => {
  const { language, translations } = useLanguage();

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.categories.includes(activeCategory));

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => p.categories.includes(categoryId)).length;
  };

  return (
    <section
      id="projects"
      className="dashboard-card"
      aria-labelledby="projects-heading"
    >
      <div className="info-card-container">
        <div className="projects-section-header">
          <h2
            id="projects-heading"
            className="info-intro"
            style={{ textAlign: 'center', fontSize: '2.3rem', marginBottom: 0 }}
          >
            {translations.projectsTitle}
          </h2>
          <p className="projects-subtitle">{translations.projectsSubtitle}</p>

          <div
            className="projects-filter-bar"
            role="group"
            aria-label={language === 'en' ? 'Filter projects by area' : 'Filtrar proyectos por área'}
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  className={`project-filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectCategory(category.id)}
                >
                  <span>{category.label[language]}</span>
                  <span className="project-filter-count">({getCategoryCount(category.id)})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-preview-frame">
                <div className="preview-chrome" aria-hidden="true">
                  <div className="preview-dots">
                    <span className="preview-dot" />
                    <span className="preview-dot" />
                    <span className="preview-dot" />
                  </div>
                  <span className="preview-url-pill">{project.domainLabel}</span>
                  <span className="preview-country-chip">{project.countryCode}</span>
                </div>

                {project.previewImage ? (
                  <img
                    src={project.previewImage}
                    alt={`${project.title} — ${project.type[language]}`}
                    className="preview-image"
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="preview-stage" aria-hidden="true">
                    <ProjectMockupContent project={project} language={language} />
                  </div>
                )}
              </div>

              <div className="project-card-body">
                <div className="project-meta-top">
                  <span className="project-area-badge">{project.area[language]}</span>
                  <span className="project-country-text">{project.country[language]}</span>
                </div>

                <div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-type">{project.type[language]}</p>
                </div>

                <div
                  className="project-problem-box"
                  style={{ borderLeftColor: project.accentColor || 'rgba(255,255,255,0.28)' }}
                >
                  <span className="project-sublabel">{translations.problemSolvedLabel}</span>
                  <p className="project-problem-text">{project.problem[language]}</p>
                </div>

                <div>
                  <span className="project-sublabel">{translations.keyFeaturesLabel}</span>
                  <ul className="project-features-list">
                    {project.features[language].map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-stack-row" aria-label="Technology stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="project-stack-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions-row">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-btn"
                    aria-label={`${translations.viewLiveSite}: ${project.title}`}
                  >
                    <span>{translations.viewLiveSite}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <button
                    type="button"
                    className="project-quote-btn"
                    onClick={() => onRequestSimilar && onRequestSimilar(project)}
                  >
                    {translations.requestSimilar}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
