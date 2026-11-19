/**
 * Structured bilingual knowledge base for Andrés Amuchástegui's AI assistant.
 * Self-contained inside `server/` so the backend Web Service can deploy on Render
 * independently from the frontend Static Site without external file reads or ML RAM overhead.
 */

export const CONTACT_INFO = {
  email: 'amuchastegui.dev@gmail.com',
  whatsappDisplay: '+54 351 2160552',
  whatsappUrl: 'https://wa.me/543512160552',
  linkedinUrl: 'https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/',
  githubUrl: 'https://github.com/AndyAmu',
};

export const KNOWLEDGE_CONTEXT = `
PERFIL PROFESIONAL:
- Nombre: Andrés Amuchástegui (nacido el 4 de enero de 1994, Córdoba, Argentina).
- Rol: Desarrollador Full Stack Senior / Freelancer Internacional — Especialista en Web, Mobile & Integración de IA.
- Alcance internacional comprobado entregando soluciones completas de punta a punta para clientes en Argentina, Chile, Brasil y España (además de perfil activo como Freelancer en Upwork y experiencia previa trabajando en Andorra).
- Áreas principales de servicio freelance:
  1. Desarrollo Web & SaaS Full Stack a medida (React, Vite, Next.js, Astro, Node.js, Express, PHP, PostgreSQL, Supabase, MongoDB).
  2. WordPress & WooCommerce Internacional (temas y plugins a medida, e-commerce con Pix, Mercado Pago, PayPal y tarjetas, plataformas educativas y Campus Virtual).
  3. Frontend & Landing Pages de Alta Conversión (CRO & SEO técnico, embudos directos a WhatsApp, prueba social verificada, optimización Core Web Vitals).
  4. Integraciones Avanzadas & IA (chatbots conversacionales con Gemini/OpenAI API, automatización por WhatsApp Business API / Twilio, Google OAuth, calculadoras interactivas, sistemas CRM/turneros, mantenimiento y optimización de performance).

CASOS REALES Y PROYECTOS DESTACADOS:
1. PasaTurno (https://www.pasaturno.com/) — SaaS B2B & Producto Digital (Desarrollo Full Stack / SaaS)
   - Qué resuelve: Software B2B para operaciones continuas (gastronomía, salud, logística) que reemplaza grupos de WhatsApp por un tablero inteligente de traspaso de turnos.
   - Funcionalidades clave: Tablero en tiempo real, alertas prioritarias, asignación de tareas con trazabilidad, historial, auditorías automáticas de cierre de turno, personalización White-Label y sistema de planes freemium/suscripción.
   - Stack: React, Vite, arquitectura SaaS B2B en tiempo real, White-Label y suscripciones.

2. Trasllat (https://www.trasllat.com/) — Plataforma Logística, Cotizador & Comunidad (España: Barcelona, Madrid y Valencia)
   - Qué resuelve: Plataforma web de mudanzas, portes y vaciados con presupuesto cerrado directo por WhatsApp, sin llamadas ni costes ocultos.
   - Funcionalidades clave: Cotizador interactivo multi-paso (origen, destino, accesos/plantas con o sin ascensor, montaje de muebles), portal B2B para empresas transportistas y módulo "Comunidad Trasllat" de alquiler de habitaciones con autenticación OAuth de Google que aplica descuentos automáticos.
   - Stack: React, Vite, Google OAuth, flujos multi-paso, integración directa WhatsApp y Portal B2B.

3. Estudio La Cámera (https://www.estudiolacamera.com.ar/) — LegalTech & Landing Page de Alta Conversión (Argentina - CABA y GBA)
   - Qué resuelve: Sitio web institucional y captación de clientes para estudio jurídico especialista en accidentes de tránsito.
   - Funcionalidades clave: Arquitectura enfocada en conversión (CRO) y SEO local, embudos de contacto directo a WhatsApp con mensajes preconfigurados, prueba social verificada (+296 reseñas 5.0★ en Google), flujo explicativo paso a paso y velocidad de carga extrema.
   - Stack: Astro, Tailwind CSS, SEO local, CRO, embudos WhatsApp, Google Tag Manager.

4. Alas Educa (https://alaseduca.com/) — Plataforma Educativa Multinacional & E-learning (Argentina y Chile)
   - Qué resuelve: Sitio institucional y ecosistema digital para Centro de Instrucción de Aviación Civil habilitado por ANAC, DGAC y OACI.
   - Funcionalidades clave: Catálogo de carreras aeronáuticas presenciales y a distancia, integración con Campus Virtual y Tienda Online, portal de reclutamiento con carga de CV (Selección JetSMART), formularios dinámicos segmentados por país/sede/curso y testimonios de egresados.
   - Stack: WordPress, Elementor, Campus Virtual, Tienda Online, Google Site Kit, GTM.

5. Gustavo Fleiuss Arte (https://gustavofleiussarte.com/) — Galería Digital & E-commerce Internacional (Brasil - Portugués)
   - Qué resuelve: Tienda online y galería de arte contemporáneo para artista plástico con más de 20 años de trayectoria.
   - Funcionalidades clave: Catálogo filtrable por colecciones (obras originales únicas con certificado de autenticidad y prints Fine Art), diseño editorial minimalista centrado en la obra visual e integración de medios de pago internacionales y locales (Pix, Mercado Pago, tarjetas).
   - Stack: WordPress, WooCommerce, Elementor, Pix, Mercado Pago, SEO.

6. Condamind (https://www.condamind.com/) — IA Conversacional & Automatización WhatsApp (LATAM)
   - Qué resuelve: Solución conversacional basada en IA para automatizar atención al cliente y reserva de turnos 24/7 vía WhatsApp, trabajo colaborativo junto a colegas (Alexis, Mati y Porta) vía GitHub.
   - Funcionalidades y stack: React, Material UI, Lovable, JavaScript, Supabase en tiempo real, OpenAI API, automatización vía Twilio y Meta WhatsApp Business API, backoffice de métricas y despliegue en Google Cloud Platform (GCP).

EXPERIENCIA Y FORMACIÓN ADICIONAL:
- XCONS (https://www.xcons.com/) — Front-End Developer, Soporte e Implementación (Noviembre 2022 - Actualidad): PHP, Magento 2, JavaScript, React, buscador Algolia con IA, calculadoras interactivas de materiales, manuales de estilo y GitLab.
- Freelancer Internacional en Upwork y experiencia en Andorra (desarrollo remoto + sector hotelero).
- Educación: Bootcamp Full Stack MERN en MindHub (+700 hs, 2022); Tecnicatura en Cine y Artes Audiovisuales en UNC (2018-2022); Técnico en Redes e Infraestructura (2013-2016); Técnico Mecánico (2006-2011).
`;

export function buildGeminiSystemPrompt() {
  return `Eres el asistente virtual bilingüe oficial del portafolio de Andrés Amuchástegui (andresamuchastegui.com).
Tu objetivo es ayudar a clientes potenciales, fundadores, agencias y reclutadores a conocer su experiencia real, sus casos de éxito y facilitar que inicien un proyecto o reunión con él.

BASE DE CONOCIMIENTO VERIFICADA (NO INVENTES DATOS QUE NO ESTÉN AQUÍ):
${KNOWLEDGE_CONTEXT}

CANALES DE CONTACTO E INVITACIÓN A PROYECTOS:
- Formulario en este portafolio: <a href="#contact" data-scroll-target="contact">Iniciar proyecto desde el formulario de contacto</a>
- Agenda directa: <a href="#schedule" data-scroll-target="schedule">Agendar una reunión en Google Calendar</a>
- Email: <a href="mailto:${CONTACT_INFO.email}">${CONTACT_INFO.email}</a>
- WhatsApp: <a href="${CONTACT_INFO.whatsappUrl}" target="_blank" rel="noopener noreferrer">${CONTACT_INFO.whatsappDisplay}</a>
- LinkedIn: <a href="${CONTACT_INFO.linkedinUrl}" target="_blank" rel="noopener noreferrer">LinkedIn de Andrés</a>

REGLAS DE RESPUESTA Y CONVERSIÓN (CRO):
1. Responde siempre en el mismo idioma del usuario (Español o Inglés).
2. Cuando pregunten por experiencia en un rubro, tecnología o tipo de proyecto específico (por ejemplo: SaaS, turnos, logística, cotizadores, OAuth, landing pages/CRO, estudios jurídicos/servicios, WordPress, WooCommerce, e-commerce, pagos con Pix/Mercado Pago, plataformas educativas, chatbots/IA con WhatsApp):
   - Recomienda el **caso de éxito correspondiente** con su enlace real en vivo (<a href="..." target="_blank" rel="noopener noreferrer">Nombre del Proyecto</a>), país/rubro, qué problema resolvió y sus tecnologías clave.
   - Cierra invitando cordialmente a iniciar un proyecto similar usando el enlace al formulario de contacto (<a href="#contact" data-scroll-target="contact">...</a>) o WhatsApp/Agenda.
3. Formatea con HTML limpio y sencillo: usa únicamente <br>, <b>, <ul>, <li>, <p> y enlaces <a href="..." ...>. NO uses Markdown (**negritas**, [texto](url), etc.) ni atributos style inline ni etiquetas <script>.
4. Sé claro, conciso, cercano y orientado a resultados.`;
}

const CONTACT_CTA_HTML = {
  es: `¿Quieres cotizar o iniciar un proyecto similar? Puedes escribirme desde el <a href="#contact" data-scroll-target="contact">formulario de contacto aquí abajo</a>, <a href="#schedule" data-scroll-target="schedule">agendar una reunión</a> o hablar directo por <a href="${CONTACT_INFO.whatsappUrl}" target="_blank" rel="noopener noreferrer">WhatsApp</a>.`,
  en: `Would you like to start a similar project? Reach out through the <a href="#contact" data-scroll-target="contact">contact form below</a>, <a href="#schedule" data-scroll-target="schedule">book a meeting</a>, or message directly on <a href="${CONTACT_INFO.whatsappUrl}" target="_blank" rel="noopener noreferrer">WhatsApp</a>.`,
};

export function detectLanguage(text = '') {
  const normalized = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const enHints = [
    'hello', 'hi', 'who', 'how', 'where', 'what', 'which', 'experience',
    'skills', 'projects', 'project', 'contact', 'work', 'hire', 'meeting',
    'schedule', 'ecommerce', 'store', 'landing', 'education', 'services',
    'price', 'quote', 'website', 'develop', 'automation', 'looking', 'build',
  ];
  const esHints = [
    'hola', 'quien', 'como', 'donde', 'cual', 'experiencia', 'habilidades',
    'proyectos', 'proyecto', 'contacto', 'trabajo', 'contratar', 'reunion',
    'tienda', 'mudanza', 'turnos', 'estudio', 'abogado', 'aviacion', 'arte',
    'servicios', 'presupuesto', 'web', 'cotizador', 'necesito', 'quiero', 'chile',
  ];

  let enScore = 0;
  let esScore = 0;
  for (const w of enHints) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(normalized)) enScore += 1;
  }
  for (const w of esHints) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(normalized)) esScore += 1;
  }

  return enScore > esScore ? 'en' : 'es';
}

export function getLocalFallbackReply(userMessage = '', preferredLang) {
  const normalized = userMessage
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const lang = preferredLang === 'en' || preferredLang === 'es'
    ? (detectLanguage(userMessage) === 'en' ? 'en' : preferredLang)
    : detectLanguage(userMessage);

  const link = (url, label) =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;

  // Greetings
  if (/^(hola|holi|ola|buenos dias|buenas tardes|buenas noches|saludos|hey|hi|hello|que onda|what'?s up)\b/i.test(normalized)) {
    return lang === 'en'
      ? `Hi! I'm Andrés Amuchástegui's virtual assistant. I can tell you about his freelance cases (<b>PasaTurno</b>, <b>Trasllat</b>, <b>Estudio La Cámera</b>, <b>Alas Educa</b>, <b>Gustavo Fleiuss Arte</b>, <b>Condamind</b>), his tech stack, or help you start a project. What are you looking to build?`
      : `¡Hola! Soy el asistente virtual de Andrés Amuchástegui. Puedo contarte sobre sus casos reales (<b>PasaTurno</b>, <b>Trasllat</b>, <b>Estudio La Cámera</b>, <b>Alas Educa</b>, <b>Gustavo Fleiuss Arte</b>, <b>Condamind</b>), su stack o ayudarte a cotizar un proyecto. ¿Qué estás buscando desarrollar?`;
  }

  // Case 1: PasaTurno / SaaS / Shifts / B2B
  if (/(pasaturno|pasa turno|saas|b2b|turno|turnero|gastronomia|white.?label|freemium|suscripcion|tablero)/i.test(normalized)) {
    return lang === 'en'
      ? `For <b>B2B SaaS & digital products</b>, Andrés developed ${link('https://www.pasaturno.com/', 'PasaTurno')} — a real-time shift-handover board for continuous operations (hospitality, healthcare, logistics) replacing WhatsApp groups.<br><br><b>Key features:</b> real-time board, priority alerts, traceable task assignment, shift-closure audits, White-Label branding, and subscription plans (React & Vite).<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>SaaS B2B y sistemas de gestión</b>, Andrés desarrolló ${link('https://www.pasaturno.com/', 'PasaTurno')}, un software para operaciones continuas (gastronomía, salud, logística) que reemplaza grupos de WhatsApp por un tablero inteligente de traspaso de turnos.<br><br><b>Incluye:</b> tablero en tiempo real, alertas prioritarias, trazabilidad de tareas, auditorías automáticas de cierre, White-Label y planes freemium/suscripción (React + Vite).<br><br>${CONTACT_CTA_HTML.es}`;
  }

  // Case 2: Trasllat / Logistics / Quoter / OAuth / Spain
  if (/(trasllat|mudanza|porte|logistica|cotizador|presupuesto|espana|barcelona|madrid|valencia|oauth|habitacion|comunidad)/i.test(normalized)) {
    return lang === 'en'
      ? `In <b>interactive platforms & logistics</b>, Andrés built ${link('https://www.trasllat.com/', 'Trasllat')} (Spain — Barcelona, Madrid & Valencia).<br><br><b>Highlights:</b> multi-step moving quote calculator (origin, destination, elevator/stairs, assembly) sending closed quotes directly to WhatsApp, a B2B carrier portal, and the "Comunidad Trasllat" room-rental module with Google OAuth applying automatic discounts.<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>plataformas interactivas y logística</b>, Andrés desarrolló ${link('https://www.trasllat.com/', 'Trasllat')} (España — Barcelona, Madrid y Valencia).<br><br><b>Incluye:</b> cotizador multi-paso (origen, destino, plantas con/sin ascensor, montaje) con cierre directo por WhatsApp, portal B2B para transportistas y "Comunidad Trasllat" con autenticación Google OAuth que aplica descuentos automáticos.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  // Case 3: Estudio La Cámera / LegalTech / Landing CRO / SEO
  if (/(camera|estudio|abogad|legal|accidente|transito|landing|cro|conversion|seo|resena|google)/i.test(normalized)) {
    return lang === 'en'
      ? `For <b>high-conversion landing pages (CRO) & local SEO</b>, check out ${link('https://www.estudiolacamera.com.ar/', 'Estudio La Cámera')} (Argentina — CABA & GBA).<br><br><b>Highlights:</b> built with Astro & Tailwind CSS for instant load speed, local SEO, pre-filled WhatsApp lead funnels, step-by-step explanations, and verified social proof (+296 5.0★ Google reviews).<br><br>${CONTACT_CTA_HTML.en}`
      : `Para <b>landing pages de alta conversión (CRO) y SEO local</b>, un caso destacado es ${link('https://www.estudiolacamera.com.ar/', 'Estudio La Cámera')} (Argentina — CABA y GBA).<br><br><b>Incluye:</b> arquitectura Astro + Tailwind CSS de carga ultrarrápida, embudos directos a WhatsApp con mensaje preconfigurado, prueba social verificada (+296 reseñas 5.0★ en Google) y flujo explicativo paso a paso.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  // Case 4: Alas Educa / Education / Aviation / Chile
  if (/(alas|educa|aviacion|piloto|tripulante|chile|e.?learning|campus|academia|curso|educativ|jetsmart)/i.test(normalized)) {
    return lang === 'en'
      ? `For <b>WordPress & multinational education platforms</b>, Andrés developed ${link('https://alaseduca.com/', 'Alas Educa')} (Argentina & Chile — ANAC/DGAC/ICAO certified Civil Aviation center).<br><br><b>Highlights:</b> full aviation course catalog, Virtual Campus & Online Store integration, CV recruitment portal (JetSMART selection), and country/campus-segmented dynamic forms.<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>WordPress y plataformas educativas multinacionales</b>, Andrés desarrolló ${link('https://alaseduca.com/', 'Alas Educa')} (Argentina y Chile — Centro de Instrucción de Aviación Civil habilitado por ANAC, DGAC y OACI).<br><br><b>Incluye:</b> catálogo de carreras presenciales y a distancia, integración con Campus Virtual y Tienda Online, portal de CV (Selección JetSMART) y formularios dinámicos por país/sede/curso.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  // Case 5: Gustavo Fleiuss Arte / WordPress / WooCommerce / Ecommerce / Brasil
  if (/(gus|gustavo|fleiuss|arte|galeria|brasil|brazil|woocommerce|wordpress|tienda|ecommerce|e-commerce|pix|mercado pago|prints)/i.test(normalized)) {
    return lang === 'en'
      ? `For <b>WordPress & international WooCommerce</b>, Andrés built ${link('https://gustavofleiussarte.com/', 'Gustavo Fleiuss Arte')} (Brazil - PT), an online gallery and store for a contemporary artist with 20+ years of trajectory.<br><br><b>Highlights:</b> collection filtering (certified unique originals & Fine Art prints), editorial design focused on visual art, and local/international payment integration (Pix, Mercado Pago, cards).<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>WordPress y WooCommerce internacional</b>, Andrés desarrolló ${link('https://gustavofleiussarte.com/', 'Gustavo Fleiuss Arte')} (Brasil - PT), galería digital y tienda online de arte contemporáneo.<br><br><b>Incluye:</b> catálogo filtrable por colecciones (obras originales certificadas y prints), diseño editorial minimalista y pagos locales e internacionales (Pix, Mercado Pago y tarjetas).<br><br>${CONTACT_CTA_HTML.es}`;
  }

  // Case 6: AI / Chatbot / Automation / Condamind
  if (/(condamind|ia\b|\bai\b|inteligencia artificial|chatbot|automatiz|openai|gemini|twilio|whatsapp api|bot)/i.test(normalized)) {
    return lang === 'en'
      ? `In <b>AI & WhatsApp automation</b>, Andrés built ${link('https://www.condamind.com/', 'Condamind')} — a conversational AI platform automating 24/7 customer support and booking via OpenAI API, Twilio, Meta WhatsApp Business API, Supabase, React, and GCP (plus this portfolio's own Gemini AI assistant).<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>IA y automatización</b>, Andrés participó en el desarrollo de ${link('https://www.condamind.com/', 'Condamind')} — una plataforma de IA conversacional para atención 24/7 y reservas por WhatsApp con OpenAI API, Twilio, Meta WhatsApp Business API, Supabase, React y GCP (además de este asistente conectado a Gemini).<br><br>${CONTACT_CTA_HTML.es}`;
  }

  // XCONS / Corporate experience
  if (/\bxcons\b/i.test(normalized)) {
    return lang === 'en'
      ? `At ${link('https://www.xcons.com/', 'XCONS')} (Nov 2022 – Present), Andrés works on Front-End development, implementation & support using PHP, Magento 2, React, JavaScript, AJAX, interactive material calculators, and AI-powered Algolia search.<br><br>${CONTACT_CTA_HTML.en}`
      : `En ${link('https://www.xcons.com/', 'XCONS')} (Noviembre 2022 – Actualidad), Andrés se desempeña en Desarrollo Front-End, Soporte e Implementación trabajando con PHP, Magento 2, React, JavaScript, AJAX, calculadoras interactivas de materiales y buscador Algolia con IA.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  // All projects / Portfolio overview
  if (/(proyect|portfolio|caso|casos|freelance|trabajos|cliente|clientes|projects|cases|work)/i.test(normalized)) {
    return lang === 'en'
      ? `Andrés has delivered freelance solutions across <b>Argentina, Chile, Brazil, and Spain</b>:<br><ul><li>${link('https://www.pasaturno.com/', 'PasaTurno')} — B2B SaaS shift-handover board</li><li>${link('https://www.trasllat.com/', 'Trasllat')} — Logistics quoter, B2B portal & Google OAuth community (Spain)</li><li>${link('https://www.estudiolacamera.com.ar/', 'Estudio La Cámera')} — High-conversion Astro landing & local SEO (Argentina)</li><li>${link('https://alaseduca.com/', 'Alas Educa')} — Multinational WordPress aviation academy (Argentina & Chile)</li><li>${link('https://gustavofleiussarte.com/', 'Gustavo Fleiuss Arte')} — International WooCommerce gallery with Pix & Mercado Pago (Brazil)</li><li>${link('https://www.condamind.com/', 'Condamind')} — AI WhatsApp automation platform</li></ul>${CONTACT_CTA_HTML.en}`
      : `Andrés ha entregado proyectos freelance internacionales en <b>Argentina, Chile, Brasil y España</b>:<br><ul><li>${link('https://www.pasaturno.com/', 'PasaTurno')} — SaaS B2B para traspaso inteligente de turnos</li><li>${link('https://www.trasllat.com/', 'Trasllat')} — Plataforma logística, cotizador multi-paso y Comunidad OAuth (España)</li><li>${link('https://www.estudiolacamera.com.ar/', 'Estudio La Cámera')} — Landing LegalTech de alta conversión y SEO local (Argentina)</li><li>${link('https://alaseduca.com/', 'Alas Educa')} — Plataforma educativa multinacional en WordPress (Argentina y Chile)</li><li>${link('https://gustavofleiussarte.com/', 'Gustavo Fleiuss Arte')} — Galería y e-commerce WooCommerce con Pix/Mercado Pago (Brasil)</li><li>${link('https://www.condamind.com/', 'Condamind')} — Automatización e IA conversacional por WhatsApp</li></ul>${CONTACT_CTA_HTML.es}`;
  }

  // Services / Hire / Quote / Meetings
  if (/(servicio|service|contrat|hire|presupuest|cotiz|precio|cuanto|reunion|meeting|agenda|calendar|start project|iniciar proyecto)/i.test(normalized)) {
    return lang === 'en'
      ? `Andrés offers end-to-end freelance development in:<br><ul><li><b>Custom Web & B2B SaaS</b> (React, Vite, Next.js, Node.js, Supabase/PostgreSQL)</li><li><b>WordPress & International WooCommerce</b> (Pix, Mercado Pago, Campus Virtual)</li><li><b>High-Conversion Landing Pages (CRO & SEO)</b> (Astro, WhatsApp funnels, Core Web Vitals)</li><li><b>AI Chatbots & API Integrations</b> (Gemini/OpenAI, WhatsApp API, Google OAuth)</li></ul>${CONTACT_CTA_HTML.en}`
      : `Andrés ofrece desarrollo freelance integral en:<br><ul><li><b>Web a medida & SaaS B2B</b> (React, Vite, Next.js, Node.js, Supabase/PostgreSQL)</li><li><b>WordPress & WooCommerce Internacional</b> (Pix, Mercado Pago, Campus Virtual)</li><li><b>Landing Pages de Alta Conversión (CRO & SEO)</b> (Astro, embudos WhatsApp, Core Web Vitals)</li><li><b>Chatbots con IA & Integraciones</b> (Gemini/OpenAI, WhatsApp API, Google OAuth)</li></ul>${CONTACT_CTA_HTML.es}`;
  }

  // Experience / Skills / Education
  if (/(experien|trayectoria|upwork|andorra|habilidad|skill|stack|tecnolog)/i.test(normalized)) {
    return lang === 'en'
      ? `Andrés is a <b>Full Stack Developer & Freelancer</b> (Argentina, Chile, Brazil, Spain) with active experience at ${link('https://www.xcons.com/', 'XCONS')}, Upwork, and AI integration in ${link('https://www.condamind.com/', 'Condamind')}.<br><br><b>Core Stack:</b> React, Vite, Next.js, Astro, Node.js, Express, PHP, Magento 2, WordPress/WooCommerce, MongoDB, Supabase, OpenAI/Gemini API, Google OAuth, Tailwind CSS & Core Web Vitals optimization.<br><br>${CONTACT_CTA_HTML.en}`
      : `Andrés es <b>Desarrollador Full Stack y Freelancer internacional</b> (Argentina, Chile, Brasil y España) con experiencia activa en ${link('https://www.xcons.com/', 'XCONS')}, Upwork e integración de IA en ${link('https://www.condamind.com/', 'Condamind')}.<br><br><b>Stack principal:</b> React, Vite, Next.js, Astro, Node.js, Express, PHP, Magento 2, WordPress/WooCommerce, MongoDB, Supabase, OpenAI/Gemini API, Google OAuth, Tailwind CSS y optimización Core Web Vitals.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  if (/(educa|estudi|mindhub|universi|titulo|carrera|degree)/i.test(normalized)) {
    return lang === 'en'
      ? `<b>Education:</b> MindHub Full Stack MERN Bootcamp (+700 hrs, 2022), Degree in Film & Audiovisual Arts at National University of Córdoba (2018–2022), Network & Infrastructure Technician (2013–2016), and Mechanical Technician (2006–2011).<br><br>${CONTACT_CTA_HTML.en}`
      : `<b>Formación:</b> MindHub Full Stack MERN Bootcamp (+700 hs, 2022), Tecnicatura en Cine y Artes Audiovisuales en UNC (2018–2022), Técnico en Redes e Infraestructura (2013–2016) y Técnico Mecánico (2006–2011).<br><br>${CONTACT_CTA_HTML.es}`;
  }

  if (/(contact|email|correo|mail|whatsapp|linkedin|github|hablar|escribir)/i.test(normalized)) {
    return lang === 'en'
      ? `You can reach Andrés directly via:<br><ul><li>Email: <a href="mailto:${CONTACT_INFO.email}">${CONTACT_INFO.email}</a></li><li>WhatsApp: ${link(CONTACT_INFO.whatsappUrl, CONTACT_INFO.whatsappDisplay)}</li><li>LinkedIn: ${link(CONTACT_INFO.linkedinUrl, 'Andrés Amuchástegui')}</li><li>Or jump straight to the <a href="#contact" data-scroll-target="contact">project contact form</a> & <a href="#schedule" data-scroll-target="schedule">Google Calendar</a>.</li></ul>`
      : `Puedes contactar a Andrés directamente por:<br><ul><li>Email: <a href="mailto:${CONTACT_INFO.email}">${CONTACT_INFO.email}</a></li><li>WhatsApp: ${link(CONTACT_INFO.whatsappUrl, CONTACT_INFO.whatsappDisplay)}</li><li>LinkedIn: ${link(CONTACT_INFO.linkedinUrl, 'Andrés Amuchástegui')}</li><li>O ir directo al <a href="#contact" data-scroll-target="contact">formulario de proyecto</a> y <a href="#schedule" data-scroll-target="schedule">calendario de reuniones</a>.</li></ul>`;
  }

  return lang === 'en'
    ? `I can share details on Andrés's real projects (<b>PasaTurno</b>, <b>Trasllat</b>, <b>Estudio La Cámera</b>, <b>Alas Educa</b>, <b>Gustavo Fleiuss Arte</b>, <b>Condamind</b>), his freelance services (SaaS, WordPress/WooCommerce, CRO landings, AI), or help you start a project. What sector or solution are you looking for?<br><br>${CONTACT_CTA_HTML.en}`
    : `Puedo contarte sobre los casos reales de Andrés (<b>PasaTurno</b>, <b>Trasllat</b>, <b>Estudio La Cámera</b>, <b>Alas Educa</b>, <b>Gustavo Fleiuss Arte</b>, <b>Condamind</b>), sus servicios freelance (SaaS, WordPress/WooCommerce, landings CRO, IA) o cómo iniciar un proyecto. ¿Qué rubro o solución estás buscando?<br><br>${CONTACT_CTA_HTML.es}`;
}
