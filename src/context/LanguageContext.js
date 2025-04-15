import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: "Home",
    chat: "Chat",
    contact: "CONTACT",
    portfolio: "My Portfolio",
    greeting: "Hi, I'm Andrés",
    introduction: "I am a person with good predisposition, creative and passionate. Here you can see my full CV.",
    downloadEnglishCV: "Download English CV",
    downloadSpanishCV: "Download Spanish CV",
    virtualAssistant: "VIRTUAL ASSISTANT",
    chatIntro: "Hi! I'm your virtual assistant. You can ask me about Andrés, his projects, technologies, or anything else. I'm here to help!",
    recommendations: "RECOMMENDATIONS LINKEDIN",
    recommendationsDesc: "These are recommendations on Linkedin",
    contactAndres: "Contact Andrés",
    technologies: "TECHNOLOGIES",
    contactSubtitle: "Do you have any questions or proposals? Send a direct message!",
    name: "Name",
    email: "Email",
    message: "Message",
    sending: "Sending...",
    sendMessage: "Send Message",
    successMessage: "Message sent successfully!",
    errorMessage: "Error sending message. Please try again."
  },
  es: {
    home: "Inicio",
    chat: "Chat",
    contact: "CONTACTO",
    portfolio: "Mi Portafolio",
    greeting: "Hola, soy Andrés",
    introduction: "Soy una persona con buena predisposición, creativa y apasionada. Aquí puedes ver mi CV completo.",
    downloadEnglishCV: "Descargar CV en Inglés",
    downloadSpanishCV: "Descargar CV en Español",
    virtualAssistant: "ASISTENTE VIRTUAL",
    technologies: "TECNOLOGIAS",
    chatIntro: "¡Hola! Soy tu asistente virtual. Puedes preguntarme sobre Andrés, sus proyectos, tecnologías o cualquier otra cosa. ¡Estoy aquí para ayudarte!",
    recommendations: "RECOMENDACIONES LINKEDIN",
    recommendationsDesc: "Estas son las recomendaciones en Linkedin",
    contactAndres: "Contacta a Andrés",
    contactSubtitle: "¿Tienes alguna pregunta o propuesta? ¡Envía un mensaje directo!",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    sending: "Enviando...",
    sendMessage: "Enviar Mensaje",
    successMessage: "¡Mensaje enviado con éxito!",
    errorMessage: "Error al enviar el mensaje. Por favor, intenta nuevamente."
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

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