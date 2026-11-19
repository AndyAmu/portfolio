import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles/modernChat.css';
import io from 'socket.io-client';
import { useLanguage } from '../context/LanguageContext';
import GSAPText from './GSAPText';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StopIcon from '@mui/icons-material/Stop';
import CloseIcon from '@mui/icons-material/Close';
import { getClientFallbackReply } from '../utils/chatFallback';

function resolveApiBaseUrl() {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:4000';
  }
  return typeof window !== 'undefined' ? window.location.origin : '';
}

const ChatGPTOverlay = ({ isDarkMode = true, onNavigateSection }) => {
  const { language, translations } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWakingServer, setIsWakingServer] = useState(false);
  const [backendStatus, setBackendStatus] = useState('waking'); // 'waking' | 'ready' | 'fallback'
  const [isChatOpen, setIsChatOpen] = useState(false);

  const socketRef = useRef(null);
  const chatBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const pendingTimeoutRef = useRef(null);
  const wakingTimerRef = useRef(null);
  const lastUserMsgRef = useRef('');
  const languageRef = useRef(language);
  const apiBaseUrl = useRef(resolveApiBaseUrl());

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const clearPendingWatchdog = () => {
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
    if (wakingTimerRef.current) {
      clearTimeout(wakingTimerRef.current);
      wakingTimerRef.current = null;
    }
  };

  const appendBotReply = useCallback((content, source = 'local') => {
    clearPendingWatchdog();
    setIsLoading(false);
    setIsWakingServer(false);
    setMessages((prev) => [
      ...prev,
      {
        role: 'bot',
        content,
        timestamp: new Date().toISOString(),
        source,
      },
    ]);
  }, []);

  // Silent Render health probe + Socket initialization
  useEffect(() => {
    let mounted = true;
    const baseUrl = apiBaseUrl.current;

    const probeHealth = async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`${baseUrl}/api/health`, {
          method: 'GET',
          signal: controller.signal,
        });
        clearTimeout(timer);

        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || !contentType.includes('application/json')) {
          if (mounted) setBackendStatus('fallback');
          return false;
        }
        const data = await res.json();
        if (mounted && data?.status === 'ok') {
          setBackendStatus('ready');
          return true;
        }
      } catch {
        if (mounted) setBackendStatus('fallback');
      }
      return false;
    };

    const connectSocket = () => {
      try {
        const socket = io(baseUrl, {
          reconnection: true,
          reconnectionAttempts: 3,
          timeout: 20000,
          withCredentials: true,
          transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
          if (mounted) setBackendStatus('ready');
        });

        socket.on('connect_error', () => {
          if (mounted) setBackendStatus((prev) => (prev === 'ready' ? 'ready' : 'fallback'));
        });

        socket.on('chat message', (response) => {
          if (!mounted) return;
          const content =
            response && typeof response === 'object' && response.content
              ? response.content
              : typeof response === 'string'
              ? response
              : getClientFallbackReply(lastUserMsgRef.current, languageRef.current);
          appendBotReply(content, response?.source || 'gemini');
        });

        socketRef.current = socket;
      } catch {
        if (mounted) setBackendStatus('fallback');
      }
    };

    probeHealth().then((healthy) => {
      if (mounted && healthy) {
        connectSocket();
      }
    });

    return () => {
      mounted = false;
      clearPendingWatchdog();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [appendBotReply]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading, isChatOpen]);

  const sendViaHttpOrFallback = async (userText, currentMessagesSnapshot = []) => {
    const baseUrl = apiBaseUrl.current;
    const controller = new AbortController();
    wakingTimerRef.current = setTimeout(() => setIsWakingServer(true), 2200);
    const timeoutTimer = setTimeout(() => controller.abort(), 14000);

    try {
      const historyPayload = currentMessagesSnapshot.slice(-6).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(m.content || '').replace(/<[^>]+>/g, ' ').slice(0, 800) }],
      }));

      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          language: languageRef.current,
          forceGemini: true,
        }),
        signal: controller.signal,
      });

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        throw new Error('API unavailable');
      }

      const data = await res.json();
      setBackendStatus('ready');
      appendBotReply(
        data.content || getClientFallbackReply(userText, languageRef.current),
        data.source || 'gemini'
      );
    } catch {
      setBackendStatus('fallback');
      appendBotReply(getClientFallbackReply(userText, languageRef.current), 'local');
    } finally {
      clearTimeout(timeoutTimer);
      clearPendingWatchdog();
    }
  };

  const sendMessageText = (rawText) => {
    const cleanText = rawText.trim();
    if (!cleanText || isLoading) return;

    if (!isChatOpen) setIsChatOpen(true);

    const historySnapshot = messages;
    lastUserMsgRef.current = cleanText;
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: cleanText, timestamp: new Date().toISOString() },
    ]);
    setInput('');
    setIsLoading(true);
    setIsWakingServer(false);

    if (socketRef.current && socketRef.current.connected) {
      wakingTimerRef.current = setTimeout(() => setIsWakingServer(true), 2500);
      pendingTimeoutRef.current = setTimeout(() => {
        clearPendingWatchdog();
        sendViaHttpOrFallback(cleanText, historySnapshot);
      }, 12000);

      socketRef.current.emit('chat message', {
        content: cleanText,
        language: languageRef.current,
        forceGemini: true,
      });
      return;
    }

    sendViaHttpOrFallback(cleanText, historySnapshot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageText(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (e.nativeEvent?.isComposing || e.keyCode === 229) {
        return;
      }
      sendMessageText(input);
    }
  };

  const handleBubbleClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      setIsChatOpen(false);
      if (onNavigateSection) {
        onNavigateSection(targetId, lastUserMsgRef.current);
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const quickPrompts =
    language === 'en'
      ? [
          'What B2B SaaS or WordPress cases have you built?',
          'Tell me about Trasllat and Estudio La Cámera',
          'Do you build AI chatbots & WhatsApp flows?',
        ]
      : [
          '¿Qué proyectos hiciste en SaaS o WooCommerce?',
          'Cuéntame sobre Trasllat y Estudio La Cámera',
          '¿Haces integraciones con IA y WhatsApp?',
        ];

  const formatBotContent = (content) => {
    let formatted = String(content || '').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
  };

  const statusText =
    backendStatus === 'ready'
      ? language === 'en'
        ? 'AI Assistant Ready'
        : 'Asistente IA Activo'
      : backendStatus === 'waking'
      ? language === 'en'
        ? 'Connecting AI...'
        : 'Conectando IA...'
      : language === 'en'
      ? 'Instant Portfolio Mode'
      : 'Modo Respuesta Rápida';

  return (
    <>
      <div
        className={`chat-backdrop ${isChatOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`}
        onClick={() => setIsChatOpen(false)}
        aria-hidden={!isChatOpen}
      />

      <div
        className={`floating-chat-container ${isChatOpen ? 'chat-active' : ''} ${
          isDarkMode ? 'dark' : 'light'
        }`}
        role="region"
        aria-label={language === 'en' ? 'Virtual assistant chat' : 'Chat asistente virtual'}
      >
        <div className="chat-glow" aria-hidden="true" />

        {isChatOpen && (
          <div className="chat-top-bar">
            <span className="chat-status-pill">
              <span
                className={`chat-status-dot ${
                  backendStatus === 'waking'
                    ? 'waking'
                    : backendStatus === 'fallback'
                    ? 'fallback'
                    : ''
                }`}
                aria-hidden="true"
              />
              {statusText}
            </span>

            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setIsChatOpen(false)}
              aria-label={language === 'en' ? 'Close chat' : 'Cerrar chat'}
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        )}

        {isChatOpen && (
          <div className="chat-overlay-messages" ref={chatBoxRef} onClick={handleBubbleClick}>
            {messages.length === 0 && (
              <div className="chat-overlay-welcome">
                <p>
                  <b>{translations.chatWelcome1}</b>
                </p>
                <p>{translations.chatWelcome2}</p>

                <div className="chat-quick-prompts">
                  {quickPrompts.map((promptText) => (
                    <button
                      key={promptText}
                      type="button"
                      className="chat-quick-btn"
                      onClick={() => sendMessageText(promptText)}
                    >
                      {promptText}
                    </button>
                  ))}
                </div>
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
                <div className="chat-typing-box" aria-live="polite">
                  {isWakingServer && (
                    <span className="chat-waking-text">{translations.chatWakingNotice}</span>
                  )}
                  <div className="chat-typing-indicator" aria-label="Cargando respuesta">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <form className="floating-input-wrapper" onSubmit={handleSubmit}>
          <label htmlFor="portfolio-chat-input" className="visually-hidden">
            {translations.chatPlaceholder}
          </label>
          <textarea
            id="portfolio-chat-input"
            ref={textareaRef}
            className="floating-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsChatOpen(true)}
            placeholder={translations.chatPlaceholder}
            disabled={isLoading}
            rows={1}
          />
          <button
            type="submit"
            className="floating-send-btn"
            disabled={!input.trim() && !isLoading}
            aria-label={language === 'en' ? 'Send message to assistant' : 'Enviar mensaje al asistente'}
          >
            {isLoading ? <StopIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatGPTOverlay;
