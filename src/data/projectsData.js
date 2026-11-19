/**
 * Modular & extensible catalog of freelance and product projects.
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Copy one of the commented templates at the bottom of `PROJECTS_DATA`.
 * 2. Pick one or more category IDs from `PROJECT_CATEGORIES`:
 *    'saas' | 'wordpress' | 'frontend' | 'ai'
 * 3. Optional: add an optimized WebP screenshot under `src/component/image/projects/`
 *    and pass it to `previewImage`. When omitted, `ProjectPreview` renders a
 *    lightweight UI mockup tailored to `previewType` with 0 KB extra payload.
 */

export const PROJECT_CATEGORIES = [
  { id: 'all', label: { es: 'Todos', en: 'All' } },
  { id: 'saas', label: { es: 'SaaS & Full Stack', en: 'SaaS & Full Stack' } },
  { id: 'wordpress', label: { es: 'WordPress & E-commerce', en: 'WordPress & E-commerce' } },
  { id: 'frontend', label: { es: 'Frontend & Conversión', en: 'Frontend & Conversion' } },
  { id: 'ai', label: { es: 'IA & Automatización', en: 'AI & Automation' } },
];

export const PROJECTS_DATA = [
  {
    id: 'pasaturno',
    featured: true,
    categories: ['saas', 'frontend'],
    title: 'PasaTurno',
    liveUrl: 'https://www.pasaturno.com/',
    domainLabel: 'pasaturno.com',
    country: { es: 'Global · B2B', en: 'Global · B2B' },
    countryCode: 'B2B',
    type: {
      es: 'SaaS B2B & Producto Digital',
      en: 'B2B SaaS & Digital Product',
    },
    area: {
      es: 'Desarrollo Full Stack / SaaS',
      en: 'Full Stack / SaaS Development',
    },
    problem: {
      es: 'Software B2B para operaciones continuas (gastronomía, salud, logística) que reemplaza grupos de WhatsApp por un tablero inteligente de traspaso de turnos.',
      en: 'B2B software for continuous-operation teams (hospitality, healthcare, logistics) replacing chaotic WhatsApp groups with a smart shift-handover board.',
    },
    features: {
      es: [
        'Tablero en tiempo real y alertas prioritarias',
        'Asignación de tareas con trazabilidad e historial completo',
        'Auditorías automáticas de cierre de turno',
        'Personalización White-Label y planes freemium/suscripción',
      ],
      en: [
        'Real-time shift board with priority alerts',
        'Task assignment with full traceability and audit history',
        'Automated end-of-shift closure audits',
        'White-Label workspace branding & freemium/subscription plans',
      ],
    },
    stack: ['React', 'Vite', 'SaaS B2B', 'Real-Time Sync', 'White-Label', 'Subscriptions'],
    previewType: 'pasaturno',
    previewImage: null,
    accentColor: '#38bdf8',
  },
  {
    id: 'trasllat',
    featured: true,
    categories: ['saas', 'frontend'],
    title: 'Trasllat',
    liveUrl: 'https://www.trasllat.com/',
    domainLabel: 'trasllat.com',
    country: { es: 'España (BCN · MAD · VLC)', en: 'Spain (BCN · MAD · VLC)' },
    countryCode: 'ES',
    type: {
      es: 'Plataforma Logística, Cotizador & Comunidad',
      en: 'Logistics Platform, Quoter & Community',
    },
    area: {
      es: 'Desarrollo Frontend & Full Stack / Flujos Interactivos',
      en: 'Frontend & Full Stack / Interactive Flows',
    },
    problem: {
      es: 'Plataforma de mudanzas, portes y vaciados en Barcelona, Madrid y Valencia que elimina llamadas y costes ocultos cerrando presupuestos directo por WhatsApp.',
      en: 'Moving, courier, and clearance platform across Barcelona, Madrid, and Valencia eliminating phone back-and-forth with instant WhatsApp-ready quotes.',
    },
    features: {
      es: [
        'Cotizador multi-paso (origen, destino, plantas con/sin ascensor, montaje)',
        'Portal B2B dedicado para empresas transportistas',
        'Módulo "Comunidad Trasllat" de alquiler de habitaciones',
        'Login con Google OAuth y aplicación automática de descuentos',
      ],
      en: [
        'Multi-step quote calculator (origin, destination, floor/elevator access, assembly)',
        'Dedicated B2B portal for carrier partners',
        '"Comunidad Trasllat" room-rental partner module',
        'Google OAuth login triggering automatic community discounts',
      ],
    },
    stack: ['React', 'Vite', 'Google OAuth', 'WhatsApp API', 'Multi-Step Flow', 'B2B Portal'],
    previewType: 'trasllat',
    previewImage: null,
    accentColor: '#34d399',
  },
  {
    id: 'estudio-la-camera',
    featured: true,
    categories: ['frontend'],
    title: 'Estudio La Cámera',
    liveUrl: 'https://www.estudiolacamera.com.ar/',
    domainLabel: 'estudiolacamera.com.ar',
    country: { es: 'Argentina (CABA & GBA)', en: 'Argentina (CABA & GBA)' },
    countryCode: 'AR',
    type: {
      es: 'LegalTech & Landing Page de Alta Conversión (CRO)',
      en: 'LegalTech & High-Conversion Landing Page (CRO)',
    },
    area: {
      es: 'Desarrollo Frontend & Optimización SEO/CRO',
      en: 'Frontend Development & SEO/CRO Optimization',
    },
    problem: {
      es: 'Sitio institucional y de captación de leads para estudio jurídico especialista en accidentes de tránsito en CABA y GBA, enfocado en confianza inmediata.',
      en: 'Lead-generation website for a traffic-accident law firm in Buenos Aires (CABA & GBA), engineered for immediate trust and mobile conversion.',
    },
    features: {
      es: [
        'Arquitectura orientada a conversión (CRO) y SEO local',
        'Embudos directos a WhatsApp con mensajes preconfigurados',
        'Prueba social verificada (+296 reseñas 5.0★ en Google)',
        'Flujo explicativo paso a paso y velocidad de carga extrema',
      ],
      en: [
        'Conversion-first architecture (CRO) & local SEO',
        'Pre-filled WhatsApp consultation funnels',
        'Verified social proof integration (+296 5.0★ Google reviews)',
        'Step-by-step claim walkthrough with ultra-fast Astro delivery',
      ],
    },
    stack: ['Astro', 'Tailwind CSS', 'Local SEO', 'CRO', 'WhatsApp Funnels', 'GTM'],
    previewType: 'lacamera',
    previewImage: null,
    accentColor: '#fbbf24',
  },
  {
    id: 'alas-educa',
    featured: true,
    categories: ['wordpress', 'frontend'],
    title: 'Alas Educa',
    liveUrl: 'https://alaseduca.com/',
    domainLabel: 'alaseduca.com',
    country: { es: 'Argentina & Chile', en: 'Argentina & Chile' },
    countryCode: 'AR/CL',
    type: {
      es: 'Plataforma Educativa Multinacional & E-learning',
      en: 'Multinational Education & E-learning Platform',
    },
    area: {
      es: 'Desarrollo WordPress & Plataformas Educativas',
      en: 'WordPress & E-learning Platform Development',
    },
    problem: {
      es: 'Ecosistema digital para Centro de Instrucción de Aviación Civil habilitado por ANAC, DGAC y OACI con operación simultánea en Argentina y Chile.',
      en: 'Digital ecosystem for an ANAC, DGAC, and ICAO-certified Civil Aviation Training Center operating across Argentina and Chile.',
    },
    features: {
      es: [
        'Catálogo de carreras aeronáuticas presenciales y a distancia',
        'Integración con Campus Virtual y Tienda Online',
        'Portal de reclutamiento con carga de CV (Selección JetSMART)',
        'Formularios dinámicos por país/sede/curso y testimonios',
      ],
      en: [
        'On-site and online aviation career catalog',
        'Virtual Campus & Online Store integration',
        'Recruitment portal with CV upload (JetSMART selection)',
        'Dynamic forms segmented by country/campus/course & alumni reviews',
      ],
    },
    stack: ['WordPress', 'Elementor', 'Campus Virtual', 'E-commerce', 'Google Site Kit', 'GTM'],
    previewType: 'alaseduca',
    previewImage: null,
    accentColor: '#60a5fa',
  },
  {
    id: 'gustavo-fleiuss-arte',
    featured: true,
    categories: ['wordpress'],
    title: 'Gustavo Fleiuss Arte',
    liveUrl: 'https://gustavofleiussarte.com/',
    domainLabel: 'gustavofleiussarte.com',
    country: { es: 'Brasil (PT)', en: 'Brazil (PT)' },
    countryCode: 'BR',
    type: {
      es: 'Galería Digital & E-commerce Internacional',
      en: 'Digital Gallery & International E-commerce',
    },
    area: {
      es: 'Desarrollo WordPress & WooCommerce Internacional',
      en: 'WordPress & International WooCommerce Development',
    },
    problem: {
      es: 'Tienda online y galería de arte contemporáneo para artista plástico con +20 años de trayectoria, preparada para vender originales y prints en Brasil y el exterior.',
      en: 'Contemporary art gallery and e-commerce for a visual artist with 20+ years of trajectory, selling certified originals and fine-art prints.',
    },
    features: {
      es: [
        'Catálogo filtrable por colecciones (originales con certificado y prints)',
        'Diseño editorial minimalista centrado en la obra visual',
        'Pagos locales e internacionales (Pix, Mercado Pago, tarjetas)',
        'Optimización SEO y arquitectura escalable en WooCommerce',
      ],
      en: [
        'Collection-filterable catalog (certified originals & fine-art prints)',
        'Minimalist editorial layout centered on artwork presentation',
        'Local & international checkout (Pix, Mercado Pago, cards)',
        'SEO setup & scalable WooCommerce store management',
      ],
    },
    stack: ['WordPress', 'WooCommerce', 'Elementor', 'Pix & Mercado Pago', 'Multi-Currency', 'SEO'],
    previewType: 'gusart',
    previewImage: null,
    accentColor: '#c084fc',
  },
  {
    id: 'condamind',
    featured: false,
    categories: ['ai', 'saas'],
    title: 'Condamind',
    liveUrl: 'https://www.condamind.com/',
    domainLabel: 'condamind.com',
    country: { es: 'LATAM · SaaS IA', en: 'LATAM · AI SaaS' },
    countryCode: 'AI',
    type: {
      es: 'Asistente Conversacional IA & Automatización WhatsApp',
      en: 'Conversational AI & WhatsApp Automation',
    },
    area: {
      es: 'Desarrollo Frontend & Integración IA',
      en: 'Frontend Development & AI Integration',
    },
    problem: {
      es: 'Automatización de atención al cliente y reserva de turnos 24/7 por WhatsApp mediante agentes conversacionales contextuales y panel de métricas.',
      en: '24/7 WhatsApp customer support and appointment-booking automation powered by contextual AI flows and real-time operational dashboards.',
    },
    features: {
      es: [
        'Flujos conversacionales con OpenAI API entrenados por cliente',
        'Automatización de turnos vía Twilio y Meta WhatsApp Business API',
        'Base de datos en tiempo real con Supabase y deploy en GCP',
        'Backoffice de pedidos, métricas y conversaciones en React',
      ],
      en: [
        'Contextual conversational flows powered by OpenAI API',
        'Appointment automation via Twilio & Meta WhatsApp Business API',
        'Real-time Supabase backend and GCP cloud infrastructure',
        'React + Material UI backoffice for orders & conversation metrics',
      ],
    },
    stack: ['React', 'Material UI', 'OpenAI API', 'Supabase', 'Twilio & Meta API', 'GCP'],
    previewType: 'condamind',
    previewImage: null,
    accentColor: '#2dd4bf',
  },

  /* ============================================================================
   * PLANTILLAS COMENTADAS PARA ESCALAR EL PORTAFOLIO (COPIAR Y DESCOMENTAR)
   * ============================================================================
   *
   * 1) PLANTILLA: TIENDA E-COMMERCE A MEDIDA
   * {
   *   id: 'nombre-ecommerce',
   *   featured: false,
   *   categories: ['wordpress'], // o ['saas', 'frontend'] si es headless/custom
   *   title: 'Nombre de la Tienda',
   *   liveUrl: 'https://ejemplo-tienda.com/',
   *   domainLabel: 'ejemplo-tienda.com',
   *   country: { es: 'Argentina', en: 'Argentina' },
   *   countryCode: 'AR',
   *   type: { es: 'E-commerce a Medida', en: 'Custom E-commerce' },
   *   area: { es: 'WordPress & WooCommerce / Full Stack', en: 'WordPress & WooCommerce / Full Stack' },
   *   problem: {
   *     es: 'Descripción breve del reto de ventas/catálogo resuelto.',
   *     en: 'Brief description of the sales/catalog challenge solved.',
   *   },
   *   features: {
   *     es: ['Catálogo con variantes', 'Checkout optimizado + Mercado Pago/Stripe', 'Sincronización de stock'],
   *     en: ['Variant catalog', 'Optimized checkout + Mercado Pago/Stripe', 'Inventory sync'],
   *   },
   *   stack: ['WooCommerce', 'PHP', 'Mercado Pago', 'SEO'],
   *   previewType: 'generic',
   *   previewImage: null, // o import imgWebp from '../component/image/...'
   *   accentColor: '#c084fc',
   * },
   *
   * 2) PLANTILLA: LANDING PAGE DE LANZAMIENTO (CRO)
   * {
   *   id: 'landing-lanzamiento',
   *   featured: false,
   *   categories: ['frontend'],
   *   title: 'Campaña / Producto',
   *   liveUrl: 'https://landing-ejemplo.com/',
   *   domainLabel: 'landing-ejemplo.com',
   *   country: { es: 'España / LATAM', en: 'Spain / LATAM' },
   *   countryCode: 'ES',
   *   type: { es: 'Landing Page de Lanzamiento', en: 'Product Launch Landing Page' },
   *   area: { es: 'Frontend & Conversión (CRO)', en: 'Frontend & Conversion (CRO)' },
   *   problem: {
   *     es: 'Captación de leads/preventas para lanzamiento con carga <1s y medición de eventos.',
   *     en: 'Lead & pre-order capture with sub-second load speed and event tracking.',
   *   },
   *   features: {
   *     es: ['Copy orientado a conversión y prueba social', 'Formulario / CTA a WhatsApp', 'Google Analytics & Pixel'],
   *     en: ['Conversion copy & social proof', 'WhatsApp / lead form CTA', 'Analytics & Pixel tracking'],
   *   },
   *   stack: ['Astro', 'React', 'Tailwind CSS', 'CRO', 'GTM'],
   *   previewType: 'generic',
   *   previewImage: null,
   *   accentColor: '#fbbf24',
   * },
   *
   * 3) PLANTILLA: SISTEMA INTERNO DE GESTIÓN (CRM / TURNERO)
   * {
   *   id: 'sistema-crm-turnero',
   *   featured: false,
   *   categories: ['saas'],
   *   title: 'Sistema Interno / CRM',
   *   liveUrl: 'https://app-ejemplo.com/',
   *   domainLabel: 'app-ejemplo.com',
   *   country: { es: 'Global · B2B', en: 'Global · B2B' },
   *   countryCode: 'B2B',
   *   type: { es: 'Sistema Interno (CRM / Turnero)', en: 'Internal Management System (CRM)' },
   *   area: { es: 'Desarrollo Full Stack / SaaS', en: 'Full Stack / SaaS Development' },
   *   problem: {
   *     es: 'Centralización de clientes, agenda de turnos y métricas operativas en tiempo real.',
   *     en: 'Centralized client records, appointment scheduling, and operational metrics.',
   *   },
   *   features: {
   *     es: ['Roles y permisos por usuario', 'Agenda y recordatorios automáticos', 'Reportes exportables'],
   *     en: ['Role-based access control', 'Automated scheduling & reminders', 'Exportable dashboards'],
   *   },
   *   stack: ['React', 'Node.js', 'PostgreSQL / Supabase', 'REST API'],
   *   previewType: 'generic',
   *   previewImage: null,
   *   accentColor: '#38bdf8',
   * },
   *
   * 4) PLANTILLA: INTEGRACIÓN DE CHATBOT CON IA
   * {
   *   id: 'chatbot-ia-whatsapp',
   *   featured: false,
   *   categories: ['ai'],
   *   title: 'Agente IA & Automatización',
   *   liveUrl: 'https://ejemplo-bot.com/',
   *   domainLabel: 'ejemplo-bot.com',
   *   country: { es: 'LATAM / Global', en: 'LATAM / Global' },
   *   countryCode: 'AI',
   *   type: { es: 'Chatbot IA & Flujos Automatizados', en: 'AI Chatbot & Workflow Automation' },
   *   area: { es: 'IA & Automatización', en: 'AI & Automation' },
   *   problem: {
   *     es: 'Calificación automática de consultas y agenda 24/7 conectada a CRM/WhatsApp.',
   *     en: 'Automated 24/7 lead qualification and booking connected to CRM/WhatsApp.',
   *   },
   *   features: {
   *     es: ['Respuestas con base de conocimiento propia', 'Derivación a humano y webhook a CRM', 'Soporte multicanal'],
   *     en: ['Custom knowledge-base responses', 'Human handoff & CRM webhooks', 'Multichannel support'],
   *   },
   *   stack: ['OpenAI / Gemini API', 'Node.js', 'WhatsApp Business API', 'Webhooks'],
   *   previewType: 'generic',
   *   previewImage: null,
   *   accentColor: '#2dd4bf',
   * },
   *
   * 5) PLANTILLA: MANTENIMIENTO Y OPTIMIZACIÓN WEB (WPO / SEO)
   * {
   *   id: 'optimizacion-wpo-seo',
   *   featured: false,
   *   categories: ['frontend', 'wordpress'],
   *   title: 'Auditoría & Optimización Web',
   *   liveUrl: 'https://cliente-optimizado.com/',
   *   domainLabel: 'cliente-optimizado.com',
   *   country: { es: 'Remoto', en: 'Remote' },
   *   countryCode: 'WPO',
   *   type: { es: 'Performance, SEO Técnico & Mantenimiento', en: 'Performance, Technical SEO & Maintenance' },
   *   area: { es: 'Optimización Web', en: 'Web Optimization' },
   *   problem: {
   *     es: 'Reducción de tiempos de carga (LCP/INP), corrección de caídas y mejora de indexación.',
   *     en: 'Faster Core Web Vitals (LCP/INP), uptime stabilization, and SEO indexing fixes.',
   *   },
   *   features: {
   *     es: ['Optimización de Core Web Vitals (+90 Lighthouse)', 'Compresión WebP y caché CDN', 'Monitoreo y seguridad'],
   *     en: ['Core Web Vitals optimization (90+ Lighthouse)', 'WebP compression & CDN caching', 'Uptime & security'],
   *   },
   *   stack: ['Core Web Vitals', 'Technical SEO', 'CDN', 'WebP'],
   *   previewType: 'generic',
   *   previewImage: null,
   *   accentColor: '#34d399',
   * },
   */
];
