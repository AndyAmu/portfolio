const CONTACT_CTA_HTML = {
  es: `¿Quieres cotizar o iniciar un proyecto similar? Escríbeme en el <a href="#contact">formulario de contacto</a>, <a href="#schedule">agenda una reunión</a> o háblame por <a href="https://wa.me/543512160552" target="_blank" rel="noopener noreferrer">WhatsApp</a>.`,
  en: `Would you like to start a similar project? Reach out via the <a href="#contact">contact form</a>, <a href="#schedule">book a meeting</a>, or message on <a href="https://wa.me/543512160552" target="_blank" rel="noopener noreferrer">WhatsApp</a>.`,
};

function extLink(url, label) {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

/**
 * Client-side verified fallback response generator so the chat assistant stays 100%
 * responsive and useful even during Render Free Tier cold starts or offline states.
 */
export function getClientFallbackReply(userMessage = '', language = 'es') {
  const normalized = String(userMessage)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const enMatches = normalized.match(/\b(hello|hi|what|which|projects|project|hire|quote|experience|skills|store|landing|looking|build)\b/gi) || [];
  const esMatches = normalized.match(/\b(hola|que|cual|proyectos|proyecto|contratar|presupuesto|experiencia|habilidades|tienda|quiero|necesito|cotizar|como)\b/gi) || [];
  const lang =
    enMatches.length > esMatches.length
      ? 'en'
      : esMatches.length > enMatches.length
      ? 'es'
      : language === 'en'
      ? 'en'
      : 'es';

  if (/^(hola|holi|ola|buenos dias|buenas tardes|buenas noches|hey|hi|hello)\b/i.test(normalized)) {
    return lang === 'en'
      ? `Hi! I can walk you through Andrés's live projects (<b>PasaTurno</b>, <b>Trasllat</b>, <b>Estudio La Cámera</b>, <b>Alas Educa</b>, <b>Gustavo Fleiuss Arte</b>, <b>Condamind</b>), his freelance services, or help you request a quote.`
      : `¡Hola! Puedo contarte sobre los proyectos reales de Andrés (<b>PasaTurno</b>, <b>Trasllat</b>, <b>Estudio La Cámera</b>, <b>Alas Educa</b>, <b>Gustavo Fleiuss Arte</b>, <b>Condamind</b>), sus servicios freelance o ayudarte a iniciar un proyecto.`;
  }

  if (/(pasaturno|pasa turno|saas|b2b|turno|turnero|white.?label|suscripcion|tablero)/i.test(normalized)) {
    return lang === 'en'
      ? `For <b>B2B SaaS</b>, Andrés built ${extLink('https://www.pasaturno.com/', 'PasaTurno')} — a real-time shift-handover board replacing WhatsApp groups for hospitality, healthcare & logistics teams, with priority alerts, audit history, White-Label branding & subscriptions (React + Vite).<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>SaaS B2B</b>, Andrés desarrolló ${extLink('https://www.pasaturno.com/', 'PasaTurno')} — un tablero inteligente en tiempo real para traspaso de turnos en gastronomía, salud y logística, con alertas prioritarias, trazabilidad, auditorías de cierre, White-Label y suscripciones (React + Vite).<br><br>${CONTACT_CTA_HTML.es}`;
  }

  if (/(trasllat|mudanza|porte|logistica|cotizador|espana|barcelona|madrid|valencia|oauth|comunidad)/i.test(normalized)) {
    return lang === 'en'
      ? `In <b>interactive logistics & web apps</b>, check out ${extLink('https://www.trasllat.com/', 'Trasllat')} (Spain) — featuring a multi-step moving quote flow closing directly on WhatsApp, a B2B carrier portal, and Google OAuth authentication for automatic community discounts.<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>plataformas logísticas y cotizadores</b>, desarrolló ${extLink('https://www.trasllat.com/', 'Trasllat')} (España — Barcelona, Madrid y Valencia) con cotizador multi-paso directo a WhatsApp, portal B2B para transportistas y Comunidad con Google OAuth para descuentos automáticos.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  if (/(camera|estudio|abogad|legal|accidente|transito|landing|cro|seo|resena|google)/i.test(normalized)) {
    return lang === 'en'
      ? `For <b>high-conversion landing pages (CRO) & local SEO</b>, see ${extLink('https://www.estudiolacamera.com.ar/', 'Estudio La Cámera')} (Argentina) — built with Astro & Tailwind CSS for instant speed, pre-filled WhatsApp funnels, and +296 5.0★ Google reviews social proof.<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>landing pages de alta conversión (CRO) y SEO local</b>, destacó con ${extLink('https://www.estudiolacamera.com.ar/', 'Estudio La Cámera')} (Argentina) usando Astro + Tailwind CSS, carga ultrarrápida, embudos a WhatsApp preconfigurados y prueba social de +296 reseñas 5.0★ en Google.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  if (/(alas|educa|aviacion|piloto|chile|e.?learning|campus|curso|jetsmart)/i.test(normalized)) {
    return lang === 'en'
      ? `For <b>WordPress & multinational e-learning</b>, Andrés delivered ${extLink('https://alaseduca.com/', 'Alas Educa')} (Argentina & Chile — ANAC/DGAC/ICAO aviation academy) integrating Virtual Campus, Online Store, JetSMART CV portal, and country-segmented forms.<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>WordPress y plataformas educativas</b>, desarrolló ${extLink('https://alaseduca.com/', 'Alas Educa')} (Argentina y Chile — aviación civil ANAC/DGAC/OACI) con catálogo de carreras, Campus Virtual, Tienda Online, portal de CV (JetSMART) y formularios por país/sede.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  if (/(gus|gustavo|fleiuss|arte|galeria|brasil|brazil|woocommerce|wordpress|tienda|ecommerce|e-commerce|pix|mercado pago)/i.test(normalized)) {
    return lang === 'en'
      ? `For <b>WordPress & international WooCommerce</b>, Andrés built ${extLink('https://gustavofleiussarte.com/', 'Gustavo Fleiuss Arte')} (Brazil - PT), an editorial contemporary art gallery and online store with collection filters and local/international payments (Pix, Mercado Pago, cards).<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>WordPress y WooCommerce internacional</b>, desarrolló ${extLink('https://gustavofleiussarte.com/', 'Gustavo Fleiuss Arte')} (Brasil - PT), galería de arte contemporáneo y tienda online con catálogo filtrable y pagos vía Pix, Mercado Pago y tarjetas.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  if (/(condamind|ia\b|\bai\b|inteligencia artificial|chatbot|automatiz|openai|gemini|twilio|whatsapp)/i.test(normalized)) {
    return lang === 'en'
      ? `In <b>AI & automation</b>, Andrés worked on ${extLink('https://www.condamind.com/', 'Condamind')} — automating 24/7 customer service & booking via WhatsApp with OpenAI API, Twilio, Meta Business API, Supabase, React & GCP.<br><br>${CONTACT_CTA_HTML.en}`
      : `En <b>IA y automatización</b>, participó en ${extLink('https://www.condamind.com/', 'Condamind')} — solución conversacional para automatizar atención y turnos 24/7 por WhatsApp usando OpenAI API, Twilio, Meta Business API, Supabase, React y GCP.<br><br>${CONTACT_CTA_HTML.es}`;
  }

  if (/(proyect|portfolio|caso|freelance|servicio|service|contrat|hire|presupuest|cotiz|precio)/i.test(normalized)) {
    return lang === 'en'
      ? `Andrés delivers international freelance solutions across <b>Argentina, Chile, Brazil & Spain</b>:<ul><li>${extLink('https://www.pasaturno.com/', 'PasaTurno')} (B2B SaaS)</li><li>${extLink('https://www.trasllat.com/', 'Trasllat')} (Logistics & Google OAuth, Spain)</li><li>${extLink('https://www.estudiolacamera.com.ar/', 'Estudio La Cámera')} (CRO Landing, Argentina)</li><li>${extLink('https://alaseduca.com/', 'Alas Educa')} (WordPress E-learning, AR & CL)</li><li>${extLink('https://gustavofleiussarte.com/', 'Gustavo Fleiuss Arte')} (WooCommerce + Pix, Brazil)</li><li>${extLink('https://www.condamind.com/', 'Condamind')} (AI & WhatsApp Automation)</li></ul>${CONTACT_CTA_HTML.en}`
      : `Andrés entrega soluciones freelance en <b>Argentina, Chile, Brasil y España</b>:<ul><li>${extLink('https://www.pasaturno.com/', 'PasaTurno')} (SaaS B2B)</li><li>${extLink('https://www.trasllat.com/', 'Trasllat')} (Cotizador Logístico & OAuth, España)</li><li>${extLink('https://www.estudiolacamera.com.ar/', 'Estudio La Cámera')} (Landing CRO Astro, Argentina)</li><li>${extLink('https://alaseduca.com/', 'Alas Educa')} (WordPress Educativo, AR y CL)</li><li>${extLink('https://gustavofleiussarte.com/', 'Gustavo Fleiuss Arte')} (WooCommerce + Pix, Brasil)</li><li>${extLink('https://www.condamind.com/', 'Condamind')} (IA Conversacional WhatsApp)</li></ul>${CONTACT_CTA_HTML.es}`;
  }

  return lang === 'en'
    ? `I can recommend specific cases from Andrés's portfolio (<b>PasaTurno</b>, <b>Trasllat</b>, <b>Estudio La Cámera</b>, <b>Alas Educa</b>, <b>Gustavo Fleiuss Arte</b>, <b>Condamind</b>) or help you scope your project.<br><br>${CONTACT_CTA_HTML.en}`
    : `Puedo recomendarte casos reales del portafolio de Andrés (<b>PasaTurno</b>, <b>Trasllat</b>, <b>Estudio La Cámera</b>, <b>Alas Educa</b>, <b>Gustavo Fleiuss Arte</b>, <b>Condamind</b>) o ayudarte a cotizar tu proyecto.<br><br>${CONTACT_CTA_HTML.es}`;
}
