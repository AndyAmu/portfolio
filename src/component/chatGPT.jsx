import React, { useState, useEffect, useRef } from 'react';
import { 
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Avatar,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Chip
} from '@mui/material';
import { 
  Send as SendIcon, 
  Delete as DeleteIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import io from 'socket.io-client';
import './styles/chatGPT.css';
// Importar las imágenes
import gptIcon from './image/gpt.png';
import deepseekIcon from './image/deepseek.svg';
import { obtenerRespuesta } from '../utils/responses';

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatType, setChatType] = useState('local');
  const [apiError, setApiError] = useState(false);
  const socketRef = useRef(null);
  const lastUserInputRef = useRef('');

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

  useEffect(() => {
    setMessages([{
      role: 'bot',
      content: getMensajeBienvenida('local')
    }]);
    
    initializeSocket();
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

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
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('🔴 Error de conexión:', error);
        setApiError(true);
        
        setMessages(prev => [
          ...prev,
          {
            role: 'bot',
            content: '⚠️ Error de conexión con el servidor. Los chats ChatGPT y Deepseek no están disponibles en este momento. Usando Chat Local automáticamente.'
          }
        ]);
        
        setChatType('local');
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

  const processServerResponse = (response) => {
    if (response && typeof response === 'object' && response.content) {
      if (response.content.includes('Error:')) {
        console.log('🔴 Error detectado en respuesta:', response.content);
        
        setMessages(prev => [...prev, {
          role: 'bot',
          content: response.content
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'bot',
            content: "Parece que hay problemas con este servicio. ¿Te gustaría cambiar al chat local? Puedes seleccionar 'Chat Local' arriba."
          }]);
        }, 1000);
        
        return;
      }
      
      setMessages(prev => [...prev, {
        role: 'bot',
        content: response.content
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
      content: botResponse
    }]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    lastUserInputRef.current = input;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    console.log(`📤 Enviando mensaje en modo ${chatType}`);
    
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
        content: respuesta
      }]);
      setIsLoading(false);
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
      content: getMensajeBienvenida(chatType)
    }]);
  };

  const handleChatTypeChange = (event, newType) => {
    if (newType !== null) {
      console.log(`🔄 Cambiando tipo de chat a: ${newType}`);
      
      if (apiError && (newType === 'chatgpt' || newType === 'deepseek')) {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: '⚠️ Los servicios externos no están disponibles en este momento. Por favor, usa el Chat Local mientras resolvemos el problema.'
        }]);
        return;
      }
      
      setChatType(newType);
      setMessages([{
        role: 'bot',
        content: getMensajeBienvenida(newType)
      }]);
    }
  };

  const getChatTypeName = () => {
    switch(chatType) {
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
    <Box 
      className="chat-container"
      sx={{ 
        position: 'relative',
        zIndex: 1000,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        border: 1,
        borderColor: 'primary.main'
      }}
    >
      <Stack 
        direction="row" 
        sx={{ 
          p: 2,
          borderBottom: 1,
          borderColor: 'primary.main',
          backgroundColor: 'background.default'
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" color="primary">
            Chat Virtual
          </Typography>
          <Chip 
            label={getChatTypeName()}
            color={apiError ? "error" : "primary"}
            size="small"
            sx={{ ml: 1 }}
          />
          <ToggleButtonGroup
            value={chatType}
            exclusive
            onChange={handleChatTypeChange}
            size="small"
          >
            <ToggleButton value="local">
              <Tooltip title="Chat Local (Siempre disponible)">
                <ChatIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton 
              value="deepseek" 
              disabled={apiError}
            >
              <Tooltip title={apiError ? "Deepseek no disponible" : "Chat Deepseek"}>
                <Box
                  component="img"
                  src={deepseekIcon}
                  alt="Deepseek"
                  sx={{ 
                    width: 36, 
                    height: 24,
                    filter: chatType === 'deepseek' ? 'brightness(0) invert(1)' : 'none',
                    opacity: apiError ? 0.5 : 1
                  }}
                />
              </Tooltip>
            </ToggleButton>
            <ToggleButton 
              value="chatgpt"
              disabled={apiError}
            >
              <Tooltip title={apiError ? "ChatGPT no disponible" : "ChatGPT"}>
                <Box
                  component="img"
                  src={gptIcon}
                  alt="ChatGPT"
                  sx={{ 
                    width: 36, 
                    height: 22,
                    filter: chatType === 'chatgpt' ? 'brightness(0) invert(1)' : 'none',
                    opacity: apiError ? 0.5 : 1
                  }}
                />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <IconButton
          onClick={handleClearChat}
          color="primary"
          size="small"
          title="Limpiar chat"
        >
          <DeleteIcon />
        </IconButton>
      </Stack>

      <Box 
        className="chat-box"
        sx={{ 
          height: '350px',
          overflow: 'auto',
          p: 2,
          backgroundColor: 'background.default'
        }}
      >
        {messages.map((msg, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            sx={{
              mb: 2,
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                maxWidth: '80%',
                backgroundColor: msg.role === 'user' ? 'primary.main' : 'background.paper',
                color: msg.role === 'user' ? 'common.white' : 'text.primary',
                p: 1.5,
                borderRadius: 2,
                boxShadow: 1
              }}
            >
              <Avatar 
                sx={{ 
                  width: 28, 
                  height: 28,
                  bgcolor: msg.role === 'user' ? 'primary.dark' : 'primary.main'
                }}
              >
                {msg.role === 'bot' ? <BotIcon /> : <PersonIcon />}
              </Avatar>
              <Typography variant="body1">{msg.content}</Typography>
            </Box>
          </Stack>
        ))}
        
        {isLoading && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: 'background.paper'
            }}
          >
            <Avatar 
              sx={{ 
                width: 28, 
                height: 28,
                bgcolor: 'primary.main'
              }}
            >
              <BotIcon />
            </Avatar>
            <CircularProgress size={20} color="primary" />
          </Stack>
        )}
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'primary.main',
          backgroundColor: 'background.paper'
        }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje aquí..."
          disabled={isLoading}
          size="small"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'primary.main',
              },
              '&:hover fieldset': {
                borderColor: 'primary.light',
              }
            }
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          sx={{ alignSelf: 'flex-end' }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ChatGPT;