import React, { useState, useEffect, useRef } from 'react';
import './styles/modernChat.css'; // Importamos el nuevo estilo
import io from 'socket.io-client';
import { obtenerRespuesta } from '../utils/responses';

// Importar las imágenes
import gptIcon from './image/gpt.png';
import deepseekIcon from './image/deepseek.svg';

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
  const [chatType, setChatType] = useState('local');
  const [apiError, setApiError] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const socketRef = useRef(null);
  const lastUserInputRef = useRef('');
  const chatBoxRef = useRef(null);
  const textareaRef = useRef(null);

  const getMensajeBienvenida = (tipo) => {
    switch(tipo) {
      case 'chatgpt':
        return '¡Hola! Estás usando ChatGPT. Este chat utiliza la API de OpenAI para responder tus preguntas.';
      case 'deepseek':
        return '¡Hola! Estás usando Deepseek. Este chat utiliza la API de Deepseek para responder tus preguntas.';
      case 'local':
        return '¡Hola! Estás usando el Chat Local. Puedes preguntarme sobre Andrés, sus proyectos, tecnologías o cualquier otra cosa.';
      default:
        return '¡Hola! Soy el asistente virtual de Andrés. ¿En qué puedo ayudarte?';
    }
  };

  const initializeSocket = () => {
    try {
      socketRef.current = io('http://localhost:4000', {
        reconnection: true,
        reconnectionAttempts: 3,
        timeout: 10000
      });

      socketRef.current.on('connect', () => {
        console.log('🟢 Conectado al servidor');
        setApiError(false);
        setErrorMessageShown(false);
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('🔴 Error de conexión:', error);
        setApiError(true);
        
        if (!errorMessageShown && (chatType === 'chatgpt' || chatType === 'deepseek')) {
          setErrorMessageShown(true);
          
          const hasErrorMessage = messages.some(
            msg => msg.role === 'bot' && 
            (msg.content.includes('Error de conexión') || 
             msg.content.includes('Utilizando Chat Local') ||
             msg.content.includes('servicios externos'))
          );
          
          if (!hasErrorMessage) {
            setMessages(prev => [
              ...prev,
              {
                role: 'bot',
                content: '⚠️ Hay problemas de conexión con los servicios externos. Puedes seguir usando este chat, pero si no recibes respuestas, selecciona la opción "Chat Local".',
                timestamp: new Date().toISOString()
              }
            ]);
            scrollToBottom();
          }
        }
      });

      socketRef.current.on('chat message', (response) => {
        console.log('📩 Respuesta recibida:', response);
        setIsLoading(false);
        
        processServerResponse(response);
      });
    } catch (error) {
      console.error('⚠️ Error al inicializar socket:', error);
      setApiError(true);
    }
  };

  useEffect(() => {
    setMessages([{
      role: 'bot',
      content: getMensajeBienvenida('local'),
      timestamp: new Date().toISOString()
    }]);
    
    initializeSocket();
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const processServerResponse = (response) => {
    if (response && typeof response === 'object' && response.content) {
      if (response.content.includes('Error:')) {
        console.log('🔴 Error detectado en respuesta:', response.content);
        
        setMessages(prev => [...prev, {
          role: 'bot',
          content: response.content,
          timestamp: new Date().toISOString()
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'bot',
            content: "Parece que hay problemas con este servicio. ¿Te gustaría cambiar al chat local? Puedes seleccionar 'Chat Local' arriba.",
            timestamp: new Date().toISOString()
          }]);
        }, 1000);
        
        return;
      }
      
      setMessages(prev => [...prev, {
        role: 'bot',
        content: response.content,
        timestamp: new Date().toISOString()
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
    
    if (botResponse === 'Sin respuesta del servidor') {
      botResponse = "No se pudo obtener respuesta del servidor. ¿Te gustaría intentar con el chat local?";
    }
    
    setMessages(prev => [...prev, {
      role: 'bot',
      content: botResponse,
      timestamp: new Date().toISOString()
    }]);
  };

  // Función para hacer scroll hacia abajo
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      // Usar setTimeout para asegurar que el DOM se ha actualizado
      setTimeout(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }, 100);
    }
  };

  // Hacer scroll cuando se añadan nuevos mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Función auxiliar para forzar scroll después de la renderización
  useEffect(() => {
    // Scroll inicial
    scrollToBottom();
    
    // Configurar MutationObserver para detectar cambios en el contenido del chat
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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  // Función para manejar el envío de mensajes
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    lastUserInputRef.current = input;
    
    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Forzar scroll después de enviar un mensaje
    scrollToBottom();
    
    console.log(`📤 Enviando mensaje en modo ${chatType}`);
    
    if ((chatType === 'chatgpt' || chatType === 'deepseek') && (apiError || !socketRef.current || !socketRef.current.connected)) {
      console.log('⚠️ Usando chat externo sin conexión');
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: `⚠️ El servicio de ${getChatTypeName()} no está disponible en este momento. Por favor, selecciona la opción "Chat Local" o vuelve a intentarlo más tarde.`,
          timestamp: new Date().toISOString()
        }]);
        setIsLoading(false);
        scrollToBottom();
      }, 500);
      return;
    }
    
    if (chatType === 'local' || apiError) {
      handleLocalChat(input);
    } else {
      handleExternalChat(input);
    }
  };
  
  const handleLocalChat = (message) => {
    console.log('🏠 Procesando chat local');
    setTimeout(() => {
      const respuesta = obtenerRespuesta(message);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: respuesta,
        timestamp: new Date().toISOString()
      }]);
      setIsLoading(false);
      // Forzar scroll después de recibir respuesta
      scrollToBottom();
    }, 500);
  };
  
  const handleExternalChat = (message) => {
    console.log(`🌐 Enviando a ${chatType}`);
    if (!socketRef.current || !socketRef.current.connected) {
      console.log('⚠️ Socket no conectado, usando chat local');
      setApiError(true);
      
      handleLocalChat(message);
      return;
    }
    
    socketRef.current.emit('chat message', {
      content: message,
      chatType: chatType
    });
    
    setTimeout(() => {
      if (isLoading) {
        console.log('⏱️ Timeout, usando chat local');
        handleLocalChat(message);
      }
    }, 10000);
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
      content: getMensajeBienvenida(chatType),
      timestamp: new Date().toISOString()
    }]);
  };

  const handleChatTypeChange = (newType) => {
    if (newType !== chatType) {
      console.log(`🔄 Cambiando tipo de chat a: ${newType}`);
      
      setChatType(newType);
      setMessages([{
        role: 'bot',
        content: getMensajeBienvenida(newType),
        timestamp: new Date().toISOString()
      }]);
      
      if ((newType === 'chatgpt' || newType === 'deepseek') && apiError) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'bot',
            content: `⚠️ Aviso: El servicio de ${getChatTypeName(newType)} podría no estar disponible. Puedes intentar usarlo, pero si no obtienes respuesta, por favor selecciona "Chat Local".`,
            timestamp: new Date().toISOString()
          }]);
          scrollToBottom();
        }, 1000);
      }
    }
  };

  const getChatTypeName = (type = chatType) => {
    switch(type) {
      case 'chatgpt':
        return 'ChatGPT';
      case 'deepseek':
        return 'Deepseek';
      case 'local':
        return 'Chat Local';
      default:
        return '';
    }
  };

  return (
    <div className="modern-chat-container">
      <div className="modern-chat-header">
        <div className="modern-chat-header-left">
          <h2 className="modern-chat-title">Asistente Virtual</h2>
          <div className={`modern-chat-model-badge ${(chatType !== 'local' && apiError) ? 'error-status' : 'success-status'}`}>
            {getChatTypeName()}
          </div>
          <div className="modern-chat-model-selector">
            <button 
              className={`modern-chat-button ${chatType === 'local' ? 'active' : ''}`}
              onClick={() => handleChatTypeChange('local')}
              title="Chat Local (Siempre disponible)"
            >
              Chat Local
            </button>
            <button 
              className={`modern-chat-button ${chatType === 'deepseek' ? 'active' : ''}`}
              onClick={() => handleChatTypeChange('deepseek')}
              title={apiError ? "Deepseek (Intentar conectar)" : "Chat Deepseek"}
            >
              Deepseek
            </button>
            <button 
              className={`modern-chat-button ${chatType === 'chatgpt' ? 'active' : ''}`}
              onClick={() => handleChatTypeChange('chatgpt')}
              title={apiError ? "ChatGPT (Intentar conectar)" : "ChatGPT"}
            >
              ChatGPT
            </button>
          </div>
        </div>
        <div className="modern-chat-actions">
          <button 
            className="modern-chat-button" 
            onClick={handleClearChat}
            title="Limpiar chat"
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
              {msg.content}
            </div>
          </div>
        ))}
        
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
          placeholder="Escribe tu mensaje aquí..."
          disabled={isLoading}
          rows="1"
        ></textarea>
        <button
          className="modern-chat-send-button"
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          title="Enviar mensaje"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatGPT;