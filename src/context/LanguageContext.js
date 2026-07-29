import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: "Home",
    chat: "Chat",
    contact: "Contact",
    cv: "Cv",
    portfolio: "Portfolio Andrés Amuchástegui",
    greeting: "Hi, I'm Andrés",
    introduction: "I am a developer passionate about creating technological solutions that make a difference. I am motivated by helping people and businesses bring their projects to life, automate their processes, and solve complex problems through clean and efficient code. I enjoy transforming ideas into digital tools that provide real value.",
    downloadEnglishCV: "Download CV",
    downloadSpanishCV: "Download Spanish CV",
    virtualAssistant: "VIRTUAL ASSISTANT",
    chatIntro: "Hi! I'm your virtual assistant. You can ask me about Andrés, his projects, technologies, or anything else. I'm here to help!",
    recommendations: "RECOMMENDATIONS LINKEDIN",
    recommendationsDesc: "These are recommendations on Linkedin",
    contactAndres: "Contact Andrés",
    technologies: "TECHNOLOGIES",
    scheduleMeeting: "SCHEDULE A MEETING",
    scheduleSub: "Select a convenient time from the calendar below to discuss projects or job opportunities.",
    contactSubtitle: "Do you have any questions or proposals? Send a direct message!",
    name: "Name",
    email: "Email",
    message: "Message",
    sending: "Sending...",
    sendMessage: "Send Message",
    successMessage: "Message sent successfully!",
    errorMessage: "Error sending message. Please try again.",
    allRightsReserved: "All rights reserved AND®"
  },
  es: {
    home: "Inicio",
    chat: "Chat",
    contact: "Contacto",
    cv: "Cv",
    portfolio: "Portafolio Andrés Amuchástegui",
    greeting: "Hola, soy Andrés",
    introduction: "Soy un desarrollador apasionado por crear soluciones tecnológicas que marquen la diferencia. Me motiva ayudar a las personas y empresas a dar vida a sus proyectos, automatizar sus procesos y resolver problemas complejos mediante código limpio y eficiente. Disfruto transformar ideas en herramientas digitales que aporten valor real.",
    downloadEnglishCV: "Descargar CV",
    downloadSpanishCV: "Descargar CV",
    virtualAssistant: "ASISTENTE VIRTUAL",
    technologies: "TECNOLOGIAS",
    chatIntro: "¡Hola! Soy tu asistente virtual. Puedes preguntarme sobre Andrés, sus proyectos, tecnologías o cualquier otra cosa. ¡Estoy aquí para ayudarte!",
    recommendations: "RECOMENDACIONES LINKEDIN",
    recommendationsDesc: "Estas son las recomendaciones en Linkedin",
    contactAndres: "Contacta a Andrés",
    scheduleMeeting: "AGENDAR UNA REUNIÓN",
    scheduleSub: "Selecciona el horario que más te convenga en el calendario de abajo para coordinar una charla sobre proyectos o trabajo.",
    contactSubtitle: "¿Tienes alguna pregunta o propuesta? ¡Envía un mensaje directo!",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    sending: "Enviando...",
    sendMessage: "Enviar Mensaje",
    successMessage: "¡Mensaje enviado con éxito!",
    errorMessage: "Error al enviar el mensaje. Por favor, intenta nuevamente.",
    allRightsReserved: "Todos los derechos reservados AND®"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations: translations[language] }}>
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