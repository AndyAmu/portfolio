import React, { useState, useEffect, useRef } from 'react';
import './styles/modernChat.css'; // Importamos el nuevo estilo
import io from 'socket.io-client';
import { useLanguage } from '../context/LanguageContext';

// Iconos para el chat
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
    <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 3L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 20L8 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 20L16 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSource, setActiveSource] = useState('local');
  const [forceGemini, setForceGemini] = useState(false);
  const socketRef = useRef(null);
  const chatBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const { language, translations } = useLanguage();

  const initializeSocket = () => {
    try {
      const ENDPOINT = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:4000' : window.location.origin);
      socketRef.current = io(ENDPOINT, {
        reconnection: true,
        reconnectionAttempts: 3,
        timeout: 10000,
        withCredentials: true,
        transports: ['websocket', 'polling'],
      });

      socketRef.current.on('connect', () => {
        console.log('🟢 Conectado al servidor');
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('🔴 Error de conexión:', error);
        setActiveSource('local');
        
        setMessages(prev => [
          ...prev,
          {
            role: 'bot',
            content: language === 'en' 
              ? '⚠️ Connection problems with the server. Please try again later.'
              : '⚠️ Hay problemas de conexión con el servidor. Por favor, intenta de nuevo más tarde.',
            timestamp: new Date().toISOString()
          }
        ]);
        scrollToBottom();
      });

      socketRef.current.on('chat message', (response) => {
        console.log('📩 Respuesta recibida:', response);
        setIsLoading(false);
        processServerResponse(response);
      });
    } catch (error) {
      console.error('⚠️ Error al inicializar socket:', error);
    }
  };

  useEffect(() => {
    setMessages([{
      role: 'bot',
      content: language === 'en'
        ? '👋 Hello! I\'m Andrés\'s virtual assistant. Ask me anything about his software engineering experience, projects, or background.'
        : '👋 Hola, soy el asistente virtual de Andrés. Pregúntame lo que necesites saber sobre su perfil profesional, experiencia o proyectos.',
      timestamp: new Date().toISOString()
    }]);
    
    initializeSocket();
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const processServerResponse = (response) => {
    if (response && typeof response === 'object' && response.content) {
      const source = response.source || 'local';
      setActiveSource(source);

      if (response.content.includes('Error:')) {
        console.log('🔴 Error detectado en respuesta:', response.content);
        setMessages(prev => [...prev, {
          role: 'bot',
          content: response.content,
          timestamp: new Date().toISOString(),
          source: source
        }]);
        return;
      }
      
      setMessages(prev => [...prev, {
        role: 'bot',
        content: response.content,
        timestamp: new Date().toISOString(),
        source: source
      }]);
      return;
    }
    
    let botResponse = '';
    
    if (typeof response === 'string') {
      botResponse = response;
    } else if (response && typeof response === 'object') {
      botResponse = response.text || response.message || 'Sin respuesta del servidor';
    } else {
      botResponse = 'Sin respuesta del servidor';
    }
    
    setActiveSource('local');
    setMessages(prev => [...prev, {
      role: 'bot',
      content: botResponse,
      timestamp: new Date().toISOString(),
      source: 'local'
    }]);
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      setTimeout(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    scrollToBottom();
    if (chatBoxRef.current) {
      const observer = new MutationObserver(scrollToBottom);
      observer.observe(chatBoxRef.current, { 
        childList: true, 
        subtree: true,
        characterData: true 
      });
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    scrollToBottom();
    
    console.log('📤 Enviando mensaje al servidor');
    
    if (!socketRef.current || !socketRef.current.connected) {
      console.log('⚠️ Socket no conectado');
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: language === 'en'
            ? '⚠️ Connection failure with the server. Please try again.'
            : '⚠️ No hay conexión con el servidor. Por favor, intenta de nuevo más tarde.',
          timestamp: new Date().toISOString()
        }]);
        setIsLoading(false);
        scrollToBottom();
      }, 500);
      return;
    }
    
    socketRef.current.emit('chat message', {
      content: input,
      forceGemini: forceGemini
    });
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  const handleSuggestionClick = (suggestionText) => {
    const userMessage = { 
      role: 'user', 
      content: suggestionText,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    scrollToBottom();
    
    if (!socketRef.current || !socketRef.current.connected) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: language === 'en'
            ? '⚠️ Connection failure with the server. Please try again.'
            : '⚠️ No hay conexión con el servidor. Por favor, intenta de nuevo más tarde.',
          timestamp: new Date().toISOString()
        }]);
        setIsLoading(false);
        scrollToBottom();
      }, 500);
      return;
    }
    
    socketRef.current.emit('chat message', {
      content: suggestionText,
      forceGemini: forceGemini
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([{
      role: 'bot',
      content: language === 'en'
        ? '👋 Hello! I\'m Andrés\'s virtual assistant. Ask me anything about his software engineering experience, projects, or background.'
        : '👋 Hola, soy el asistente virtual de Andrés. Pregúntame lo que necesites saber sobre su perfil profesional, experiencia o proyectos.',
      timestamp: new Date().toISOString()
    }]);
  };

  return (
    <div className="modern-chat-container">
      <div className="modern-chat-header">
        <div className="modern-chat-header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h2 className="modern-chat-title">{translations.virtualAssistant}</h2>
          
          <div className="chat-toggle-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: forceGemini ? '#00e5ff' : '#a0a0a0', transition: 'color 0.3s' }}>
              {language === 'en' ? 'Force AI' : 'Forzar IA'}
            </span>
            <label className="theme-switch">
              <input type="checkbox" checked={forceGemini} onChange={(e) => setForceGemini(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className={`ai-status-badge ${activeSource}`}>
            <span className="status-dot"></span>
            <span className="status-text">
              {activeSource === 'gemini' ? 'Gemini AI' : (language === 'en' ? 'Local' : 'Local')}
            </span>
          </div>
        </div>
        <div className="modern-chat-actions">
          <button 
            className="modern-chat-button" 
            onClick={handleClearChat}
            title={language === 'en' ? 'Clear chat' : 'Limpiar chat'}
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <div className="modern-chat-messages" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`modern-chat-message ${msg.role}`}>
            <div className="modern-chat-avatar">
              {msg.role === 'bot' ? <BotIcon /> : <UserIcon />}
            </div>
            <div className="modern-chat-bubble">
              {msg.role === 'bot' ? (
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        
        {messages.length <= 1 && (
          <div className="modern-chat-suggestions">
            <div 
              className="modern-chat-suggestion-card" 
              onClick={() => handleSuggestionClick(language === 'en' ? 'Tell me about Andrés\'s work experience.' : 'Cuéntame sobre la experiencia laboral de Andrés.')}
            >
              <div className="suggestion-icon">💼</div>
              <div className="suggestion-info">
                <span className="suggestion-title">{language === 'en' ? 'Work Experience' : 'Experiencia Laboral'}</span>
                <span className="suggestion-desc">{language === 'en' ? 'Details about past jobs & roles' : 'Detalles de roles y empresas'}</span>
              </div>
            </div>
            <div 
              className="modern-chat-suggestion-card" 
              onClick={() => handleSuggestionClick(language === 'en' ? 'What are Andrés\'s technical skills?' : '¿Cuáles son las habilidades técnicas de Andrés?')}
            >
              <div className="suggestion-icon">🛠️</div>
              <div className="suggestion-info">
                <span className="suggestion-title">{language === 'en' ? 'Technical Skills' : 'Habilidades Técnicas'}</span>
                <span className="suggestion-desc">{language === 'en' ? 'Languages, tools & databases' : 'Tecnologías y herramientas'}</span>
              </div>
            </div>
            <div 
              className="modern-chat-suggestion-card" 
              onClick={() => handleSuggestionClick(language === 'en' ? 'Tell me about the projects Andrés has developed.' : 'Háblame de los proyectos que ha desarrollado Andrés.')}
            >
              <div className="suggestion-icon">🚀</div>
              <div className="suggestion-info">
                <span className="suggestion-title">{language === 'en' ? 'Featured Projects' : 'Proyectos Destacados'}</span>
                <span className="suggestion-desc">{language === 'en' ? 'E-commerce, websites & apps' : 'Sitios web y aplicaciones'}</span>
              </div>
            </div>
            <div 
              className="modern-chat-suggestion-card" 
              onClick={() => {
                const el = document.getElementById('schedule');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="suggestion-icon">📅</div>
              <div className="suggestion-info">
                <span className="suggestion-title">{language === 'en' ? 'Schedule a Call' : 'Agendar una Cita'}</span>
                <span className="suggestion-desc">{language === 'en' ? 'Book a meeting on my calendar' : 'Elige un horario en el calendario'}</span>
              </div>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="modern-chat-message bot">
            <div className="modern-chat-avatar">
              <BotIcon />
            </div>
            <div className="modern-chat-typing">
              <div className="modern-chat-typing-dot"></div>
              <div className="modern-chat-typing-dot"></div>
              <div className="modern-chat-typing-dot"></div>
            </div>
          </div>
        )}
      </div>

      <div className="modern-chat-input-container">
        <textarea
          ref={textareaRef}
          className="modern-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={language === 'en' ? 'Type a message here...' : 'Escribe tu mensaje aquí...'}
          disabled={isLoading}
          rows="1"
        ></textarea>
        <button
          className="modern-chat-send-button"
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          title={language === 'en' ? 'Send message' : 'Enviar mensaje'}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatGPT;
