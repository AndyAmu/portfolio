import React, { useState } from 'react';

const ChatGPT = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: '¡Hola! Soy el asistente virtual de Andrés. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón flotante para móvil */}
      <button 
        className="chat-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </button>

      <div className={`chat-container ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h3>Asistente Virtual</h3>
          <button 
            className="clear-button" 
            onClick={() => setMessages([{ 
              role: 'bot', 
              content: '¡Hola! Soy el asistente virtual de Andrés. ¿En qué puedo ayudarte?' 
            }])}
          >
            <span>
              Limpiar <i className="fas fa-trash"></i>
            </span>
          </button>
        </div>
        
        {/* ... resto del contenido del chat ... */}
      </div>
    </>
  );
};

export default ChatGPT; 