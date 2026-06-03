export const respuestas = {
  default: "👋 Hola, soy el asistente virtual de Andrés. ¿En qué puedo ayudarte hoy?",

  // Nuevas preguntas del usuario
  hola: {
    keywords: ["hola", "ola", "hla", "hi", "hello", "hey"],
    response: "👋 ¡Hola! Soy el asistente virtual de Andrés. ¿Qué tal? ¿En qué puedo ayudarte?"
  },

  holaQuePuedesHacer: {
    keywords: [
      "hola que puedes hacer", "hola qué puedes hacer", "ola que haces", "hi what can you do", 
      "hello what can you do", "que puedes hacer", "qué puedes hacer", "what can you do"
    ],
    response: "👋 ¡Hola! Puedo contarte sobre Andrés: sus proyectos, habilidades, experiencia, estudios o cómo contactarlo. ¿Qué te gustaría saber?"
  },

  queOnda: {
    keywords: ["que onda", "qué onda", "q onda", "whats up", "what’s up", "sup"],
    response: "😎 ¿Qué onda? Soy el asistente de Andrés. Puedo darte info sobre su trabajo, habilidades o proyectos. ¿Qué te interesa?"
  },

  holaQueHaces: {
    keywords: [
      "hola que haces", "hola qué haces", "ola que haces", "hi what do you do", 
      "hello what do you do", "que haces", "qué haces", "what do you do"
    ],
    response: "👋 ¡Hola! Estoy aquí para ayudarte con info sobre Andrés. Puedo hablarte de su experiencia como desarrollador, sus proyectos o sus habilidades. ¿Qué quieres saber?"
  },

  holaQueMeDicesDeAndres: {
    keywords: [
      "hola que me dices de andres", "hola qué me dices de andrés", "hi tell me about andres", 
      "hello what about andres", "que me dices de andres", "qué me dices de andrés", 
      "tell me about andres"
    ],
    response: "👋 ¡Hola! Te cuento: Andrés Amuchástegui es un desarrollador Full Stack de Córdoba, Argentina, especializado en MERN (MongoDB, Express, React, Node.js). Tiene 31 años, un background en artes audiovisuales y mucha pasión por la tecnología. ¿Qué más te gustaría saber de él?"
  },

  holaKpo: {
    keywords: ["hola kpo", "ola capo", "hola capo", "hi bro", "hello dude"],
    response: "👋 ¡Hola, kpo! Soy el asistente de Andrés, un desarrollador Full Stack copado de Córdoba. ¿Qué querés saber de él? Proyectos, skills, o algo más?"
  },

  queHay: {
    keywords: ["que hay", "qué hay", "q hay", "whats there", "what’s there", "what’s up"],
    response: "😊 ¿Qué hay? Acá estoy para contarte sobre Andrés: sus trabajos en XCONS, sus proyectos freelance, o sus habilidades con React y Node.js. ¿Qué te pinta?"
  },

  // Categorías existentes actualizadas con nueva info
  informacionPersonal: {
    keywords: [
      "quien es", "quién es", "kien es", "quen es", "quien", "quién", "kien", "quen", 
      "presentación", "presentacion", "presentalo", "preséntalo", "presentar", "presenta", 
      "conocer", "conoser", "conoce", "saber de", "saber quién es", "saber quien es", 
      "quien eres", "quién eres", "información", "informacion", "info", "datos", "dato",
      "who is", "whois", "who’s", "whos", "introduce", "introduction", "present", 
      "tell me about", "about him", "about", "know him", "know", "personal info", "info", "details"
    ],
    response: `
👨‍💻 **¿Quién es Andrés Amuchástegui?**  
📍 Córdoba, Argentina  
💼 Desarrollador Full Stack especializado en el stack MERN (MongoDB, Express, React, Node.js).  
🎨 Con formación en cine y artes audiovisuales.  
🤖 Usa herramientas de IA como ChatGPT en su día a día para crear soluciones inteligentes.  
🚀 Siempre a la vanguardia con nuevas tecnologías y buenas prácticas de desarrollo.  
💡 Creativo, autodidacta y resolutivo.  
`
  },

  edad: {
    keywords: [
      "años", "anos", "edad", "hedad", "cuantos años", "cuántos años", "quantos años", 
      "cuantos anos", "cuántos anos", "cuando nació", "cuándo nació", "quando nació", 
      "nacimiento", "nacio", "nacío", "cumpleaños", "cumpleanos", "cuantos tiene", 
      "qué edad", "que edad", "edad tiene",
      "age", "how old", "howold", "years old", "years", "born", "when born", "birth", "birthday", "how many years"
    ],
    response: "🎂 Andrés tiene **31 años**. Nació en 1994 en Córdoba, Argentina."
  },

  proyectos: {
    keywords: [
      "proyectos", "proyeto", "proyect", "trabajó", "trabajo", "trabajado", "desarrolló", 
      "desarrollo", "desarollo", "portafolio", "portfolio", "proyectos hechos", "qué hizo", 
      "que hizo", "trabajos", "cosas hechas", "proyectos realizados", "realizó", "realizo", "hizo",
      "projects", "project", "worked on", "work", "developed", "portfolio", "portafolio", 
      "what he did", "what did he do", "jobs", "things done", "completed projects", "done", "made",
      "gus art", "chiringuito", "fleiuss"
    ],
    response: `
🚧 **Proyectos destacados**  
1. **Gustavo Fleiuss Arte (Gus Art)** – Galería digital y e-commerce (WordPress, WooCommerce, Mercado Pago, PayPal).  
2. **Chiringuito (Valencia)** – Sitio web bilingüe Mobile-First (React, Vite, Tailwind CSS).  
3. **Condamind** – Solución conversacional con IA (trabajo colaborativo vía GitHub junto a Alexis, Mati y Porta).  
4. **XCONS** – Apps web con React, Node.js, PHP y Magento 2.  
📌 ¿Querés más detalles sobre alguno?
    `
  },

  estudios: {
    keywords: [
      "estudios", "estudio", "estudió", "formación", "formacion", "educación", "educacion", 
      "educa", "carrera", "carreras", "título", "titulo", "titulos", "aprendió", "aprendio", 
      "preparación", "preparacion", "qué estudió", "que estudio", "dónde estudió", "donde estudio", 
      "academia", "académico",
      "studies", "study", "studied", "education", "training", "career", "degree", "degrees", 
      "learned", "preparation", "what studied", "where studied", "academic", "schooling"
    ],
    response: `
🎓 **Formación Académica**  
1. **MindHub Bootcamp** (2022): +700 horas en Desarrollo Full Stack (MERN).  
2. **Univ. Nacional de Córdoba** (2018-2022): Tecnicatura en Cine y Artes Audiovisuales.  
3. **Inst. Dr. Bernardo Houssay** (2013-2016): Técnico en Redes e Infraestructura.  
4. **Inst. La Falda** (2006-2011): Técnico Mecánico.  
📚 Siempre actualizándose en tecnologías modernas."
    `
  },

  experiencia: {
    keywords: [
      "experiencia", "esperiencia", "trabajado", "laboral", "profesional", "trayectoria", 
      "historial", "currículo", "curriculo", "cv", "qué ha hecho", "que ha hecho", "dónde trabajó", 
      "donde trabajo", "empleo", "empleos", "jobs",
      "experience", "expirience", "worked", "work history", "professional", "career path", 
      "background", "resume", "cv", "what he’s done", "where worked", "jobs", "employment",
      "upwork", "andorra", "freelance"
    ],
    response: `
💼 **Experiencia Profesional**  
1. **Desarrollador Full-Stack** (Nov 2022 - Actualidad): Trabajo continuado en XCONS (React, Node.js, PHP, Magento 2).  
2. **Freelancer en Upwork**: Perfil aprobado y activo gestionando proyectos a nivel internacional.  
3. **Experiencia en Andorra**: Ejerciendo como desarrollador remoto y sumando experiencia en el sector hotelero.  
4. **CONDAMIND** (Jun 2023 - Mar 2025): Proyecto colaborativo de IA junto a Alexis, Mati y Porta.  
🌟 Especializado en optimización y soluciones escalables.
    `
  },

  habilidades: {
    keywords: [
      "sabe", "saber", "hacer", "habilidades", "abilidad", "skills", "tecnologías", "tecnologia", 
      "tecnolojia", "stack", "herramientas", "tools", "qué sabe", "que sabe", "conoce", 
      "conocimientos", "capacidades", "destrezas",
      "knows", "can do", "skills", "abilities", "tech", "technologies", "technology", "stack", 
      "tools", "what he knows", "knowledge", "capabilities", "expertise"
    ],
    response: `
🛠 **Habilidades Técnicas**  
- **Frontend**: React, JavaScript (ES6+), HTML5, CSS3, Redux, Material UI.  
- **Backend**: Node.js, Express, PHP, Magento 2.  
- **Bases de Datos**: MongoDB, MySQL.  
- **Herramientas**: Git, GitHub, APIs REST, AJAX.  
- **Extras**: Diseño audiovisual, optimización UX/UI.  
💡 Proactivo y adaptable."
    `
  },

  contacto: {
    keywords: [
      "contacto", "kontacto", "contactar", "email", "correo", "correos", "comunicar", "mensaje", 
      "mensajes", "cómo contactar", "como contactar", "dónde escribir", "donde escribir", "hablar con", 
      "contacto de", "teléfono", "telefono",
      "contact", "kontact", "email", "mail", "message", "how to contact", "how contact", "reach", 
      "get in touch", "talk to", "phone", "telephone"
    ],
    response: `
📬 **Contacto**  
- **Email**: amuchastegui.dev@gmail.com  
- **LinkedIn**: [Andrés Amuchástegui](https://www.linkedin.com/in/andrés-amuchástegui)  
- **Portfolio**: Usa el formulario aquí mismo.  
✨ Disponibilidad inmediata."
    `
  },

  fueraDeContexto: {
    response: "🤔 Lo siento, eso se me escapa. ¿Querés saber algo sobre los proyectos, experiencia o habilidades de Andrés?"
  }
};

export const obtenerRespuesta = (mensaje) => {
  mensaje = mensaje.toLowerCase();
  
  // Primero busca coincidencias exactas en las keywords
  for (const categoria in respuestas) {
    if (categoria === 'default' || categoria === 'fueraDeContexto') continue;
    
    const { keywords } = respuestas[categoria];
    if (keywords && keywords.some(keyword => mensaje.includes(keyword))) {
      return respuestas[categoria].response;
    }
  }
  
  // Si no encuentra coincidencias exactas, busca si la pregunta menciona a Andrés
  if (mensaje.includes("andrés") || mensaje.includes("andres")) {
    // Intenta encontrar una coincidencia parcial
    for (const categoria in respuestas) {
      if (categoria === 'default' || categoria === 'fueraDeContexto') continue;
      
      const { keywords } = respuestas[categoria];
      if (keywords && keywords.some(keyword => 
        mensaje.split(' ').some(word => keyword.includes(word))
      )) {
        return respuestas[categoria].response;
      }
    }
  }
  
  // Si aún no encuentra nada, devuelve la respuesta por defecto
  return respuestas.fueraDeContexto.response;
}; 