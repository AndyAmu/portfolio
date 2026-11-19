import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: 'Home',
    about: 'About Me',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    startProject: 'Start project',
    portfolio: 'Portfolio Andrés Amuchástegui',
    heroRole: 'Full Stack Developer',
    heroSpecialty: 'Web, Mobile & AI Specialist',
    heroTagline: 'Designing and shipping high-conversion web products, SaaS platforms, and AI automations for clients in Argentina, Chile, Brazil & Spain.',
    downloadEnglishCV: 'Download CV',
    downloadSpanishCV: 'Download CV (ES)',
    summaryTitle: 'About Me & International Track Record',
    introduction:
      'Freelance Full Stack Developer with proven experience delivering end-to-end digital solutions for international clients across Argentina, Chile, Brazil, and Spain. Specialized in B2B SaaS products, interactive logistics platforms, international WordPress/WooCommerce e-commerce (Pix & Mercado Pago), education ecosystems, and high-conversion (CRO) landing pages integrated with WhatsApp, OAuth, and AI.',
    projectsTitle: 'FEATURED PROJECTS',
    projectsSubtitle:
      'Real production work across SaaS, logistics marketplaces, legal CRO landings, education platforms, international art e-commerce, and conversational AI.',
    viewLiveSite: 'Visit live site',
    requestSimilar: 'Similar project',
    problemSolvedLabel: 'Challenge & Solution',
    keyFeaturesLabel: 'Key Features',
    viewAreaProjects: 'View projects in this area',
    appliedCasesLabel: 'Applied real cases',
    scheduleMeeting: 'SCHEDULE A MEETING',
    scheduleSub: 'Select a convenient time from the calendar below to discuss projects or job opportunities.',
    contactTitle: 'CONTACT',
    contactSubtitle:
      'Want to build a SaaS, online store, high-converting landing page, or AI automation? Write to amuchastegui.dev@gmail.com or use the form below.',
    name: 'Name',
    subject: 'Subject',
    email: 'Email',
    message: 'Message',
    sending: 'Sending...',
    sendMessage: 'Send Message',
    whatsappDirect: 'Chat on WhatsApp',
    successMessage: 'Message sent successfully!',
    errorMessage: 'Error sending message. Please try again.',
    chatPlaceholder: 'Ask about PasaTurno, Trasllat, WordPress, AI or quotes...',
    chatWelcome1: 'How can I help you today?',
    chatWelcome2: 'Ask about my freelance cases (SaaS, WooCommerce, CRO, AI) or request a quote.',
    chatWakingNotice: 'Waking up AI server on Render (may take a few seconds on first request)...',
    chatQuickNotice: 'Fast offline mode active — answering from verified portfolio base.',
    calendarLoading: 'Loading Google Calendar booking slots...',
    allRightsReserved: 'All rights reserved AND®',
  },
  es: {
    home: 'Inicio',
    about: 'Sobre Mí',
    services: 'Servicios',
    projects: 'Proyectos',
    contact: 'Contacto',
    startProject: 'Iniciar proyecto',
    portfolio: 'Portafolio Andrés Amuchástegui',
    heroRole: 'Desarrollador Full Stack',
    heroSpecialty: 'Especialista en Web, Mobile & AI',
    heroTagline: 'Diseño y desarrollo productos digitales, SaaS B2B, tiendas internacionales y automatizaciones con IA para clientes de Argentina, Chile, Brasil y España.',
    downloadEnglishCV: 'Descargar CV (EN)',
    downloadSpanishCV: 'Descargar CV',
    summaryTitle: 'Sobre Mí & Experiencia Freelance',
    introduction:
      'Desarrollador Full Stack Freelancer con experiencia comprobada entregando soluciones digitales completas de punta a punta para clientes internacionales en Argentina, Chile, Brasil y España. Especializado en productos SaaS B2B, plataformas logísticas y cotizadores, e-commerce internacional con WordPress/WooCommerce (Pix y Mercado Pago), ecosistemas educativos y landing pages de alta conversión (CRO) integradas con WhatsApp, OAuth e IA.',
    projectsTitle: 'PROYECTOS REALES',
    projectsSubtitle:
      'Casos en producción para clientes y productos propios: SaaS B2B, logística, LegalTech CRO, educación multinacional, e-commerce internacional e IA.',
    viewLiveSite: 'Ver sitio en vivo',
    requestSimilar: 'Cotizar similar',
    problemSolvedLabel: 'Problema resuelto',
    keyFeaturesLabel: 'Funcionalidades clave',
    viewAreaProjects: 'Ver proyectos de esta área',
    appliedCasesLabel: 'Casos reales aplicados',
    scheduleMeeting: 'AGENDAR UNA REUNIÓN',
    scheduleSub: 'Selecciona el horario que más te convenga en el calendario para coordinar una charla sobre tu proyecto.',
    contactTitle: 'CONTACTO',
    contactSubtitle:
      '¿Buscas lanzar un SaaS, tienda WooCommerce, landing de alta conversión o integración con IA? Escríbeme a amuchastegui.dev@gmail.com o completa el formulario.',
    name: 'Nombre',
    subject: 'Asunto',
    email: 'Email',
    message: 'Mensaje',
    sending: 'Enviando...',
    sendMessage: 'Enviar Mensaje',
    whatsappDirect: 'Hablar por WhatsApp',
    successMessage: '¡Mensaje enviado con éxito!',
    errorMessage: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
    chatPlaceholder: 'Pregúntame sobre PasaTurno, Trasllat, WordPress, IA o cotizaciones...',
    chatWelcome1: '¿En qué te puedo ayudar hoy?',
    chatWelcome2: 'Consulta por casos reales (SaaS, WooCommerce, CRO, IA) o pide presupuesto.',
    chatWakingNotice: 'Despertando servidor IA en Render (puede demorar unos segundos la primera vez)...',
    chatQuickNotice: 'Modo respuesta rápida activo — respondiendo desde la base verificada.',
    calendarLoading: 'Cargando agenda de Google Calendar...',
    allRightsReserved: 'Todos los derechos reservados AND®',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, translations: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
