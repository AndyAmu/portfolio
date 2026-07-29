import React, { useState, useEffect, useRef } from 'react';
import './styles/modernChat.css';
import io from 'socket.io-client';
import { useLanguage } from '../context/LanguageContext';
import GSAPText from './GSAPText';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StopIcon from '@mui/icons-material/Stop';

const ChatGPTOverlay = ({ isDarkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSource, setActiveSource] = useState('local');
  const [forceGemini, setForceGemini] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const socketRef = useRef(null);
  const chatBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const { language } = useLanguage();

  const initializeSocket = () => {
    try {
      const ENDPOINT = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:4000' : window.location.origin);
      socketRef.current = io(ENDPOINT, {
        reconnection: true,
        reconnectionAttempts: 3,
        timeout: 30000,
        withCredentials: true,
        transports: ['websocket', 'polling'],
      });

      socketRef.current.on('connect_error', (error) => {
        setActiveSource('local');
        setIsLoading(false);
      });

      socketRef.current.on('chat message', (response) => {
        setIsLoading(false);
        processServerResponse(response);
      });
    } catch (error) {
      console.error('Error al inicializar socket:', error);
    }
  };

  useEffect(() => {
    initializeSocket();
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const processServerResponse = (response) => {
    if (response && typeof response === 'object' && response.content) {
      setActiveSource(response.source || 'local');
      setMessages(prev => [...prev, {
        role: 'bot',
        content: response.content,
        timestamp: new Date().toISOString(),
        source: response.source || 'local'
      }]);
      return;
    }
    
    let botResponse = typeof response === 'string' ? response : (response?.text || response?.message || 'Sin respuesta');
    setActiveSource('local');
    setMessages(prev => [...prev, { role: 'bot', content: botResponse, timestamp: new Date().toISOString() }]);
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isChatOpen]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    if (!isChatOpen) {
      setIsChatOpen(true);
    }

    setMessages(prev => [...prev, { role: 'user', content: input, timestamp: new Date().toISOString() }]);
    setInput('');
    setIsLoading(true);
    
    if (!socketRef.current || !socketRef.current.connected) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: language === 'en' ? '⚠️ Connection failure.' : '⚠️ Falla de conexión.',
          timestamp: new Date().toISOString()
        }]);
        setIsLoading(false);
      }, 500);
      return;
    }
    
    socketRef.current.emit('chat message', {
      content: input,
      forceGemini: forceGemini
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatBotContent = (content) => {
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
  };

  return (
    <>
      {/* Backdrop overlay when chat is open */}
      <div 
        className={`chat-backdrop ${isChatOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`} 
        onClick={() => setIsChatOpen(false)}
      />

      <div className={`floating-chat-container ${isChatOpen ? 'chat-active' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
        
        {/* Glow effect at the bottom */}
        <div className="chat-glow" />

        {isChatOpen && (
          <div className="chat-overlay-messages" ref={chatBoxRef}>
            {messages.length === 0 && (
              <div className="chat-overlay-welcome">
                <p>
                  {language === 'en' 
                    ? 'How can I help you today?' 
                    : '¿En qué te puedo ayudar hoy?'}
                </p>
                <p>
                  {language === 'en'
                    ? 'Shall we discuss my projects or skills?'
                    : '¿Hablamos de mis proyectos o habilidades?'}
                </p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message-row ${msg.role}`}>
                <div className="chat-bubble">
                  {msg.role === 'bot' ? (
                    <GSAPText text={formatBotContent(msg.content)} />
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message-row bot">
                <div className="chat-typing-indicator">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="floating-input-wrapper">
          <textarea
            ref={textareaRef}
            className="floating-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsChatOpen(true)}
            placeholder={language === 'en' ? 'Tell me how I can help...' : 'Contame en qué te ayudo...'}
            disabled={isLoading}
            rows={1}
          />
          <button
            className="floating-send-btn"
            onClick={handleSendMessage}
            disabled={!input.trim() && !isLoading}
          >
            {isLoading ? <StopIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatGPTOverlay;
