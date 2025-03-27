const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); // Carga las variables de entorno

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
}));
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes

// Servir los archivos estáticos del frontend (carpeta build)
app.use(express.static(path.join(__dirname, '../build')));

// Ruta principal para el frontend (necesario para React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

// Configuración de APIs
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const HF_API_KEY = process.env.HF_API_KEY;

// URLs de las APIs
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const HF_API_URL = 'https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5';

async function getDeepseekResponse(message) {
  try {
    console.log('Enviando solicitud a Deepseek:', {
      message,
      apiUrl: DEEPSEEK_API_URL,
      hasApiKey: !!DEEPSEEK_API_KEY,
    });

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente virtual que responde preguntas sobre Andrés Amuchástegui, un desarrollador Full Stack.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Respuesta de Deepseek:', response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error detallado de Deepseek:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    if (error.response?.status === 401) {
      throw new Error('Error de autenticación con Deepseek. Verifica tu API key.');
    } else if (error.response?.status === 429) {
      throw new Error('Demasiadas solicitudes a Deepseek. Intenta más tarde.');
    } else {
      throw new Error(`Error al llamar a Deepseek: ${error.message}`);
    }
  }
}

async function getChatGPTResponse(message, retryCount = 0) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente virtual que responde preguntas sobre Andrés Amuchástegui.
            Información sobre Andrés:
            - Es un desarrollador Full Stack
            - Tiene experiencia en React, Node.js y otras tecnologías modernas
            - Trabaja en XCONS
            - Tiene background en artes audiovisuales
            - Tiene 31 años
            - Es de Córdoba, Argentina
            Solo responde preguntas relacionadas con Andrés y su perfil profesional.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error en ChatGPT:', error.response?.status);

    if (error.response?.status === 429 && retryCount < 3) {
      console.log(`Reintentando en 10 segundos... (intento ${retryCount + 1})`);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      return getChatGPTResponse(message, retryCount + 1);
    }

    if (error.response?.status === 429) {
      throw new Error('El servicio está ocupado en este momento. Por favor, intenta de nuevo en unos minutos o usa el chat local.');
    }

    throw new Error(`Error con ChatGPT: ${error.message}`);
  }
}

function obtenerRespuesta(mensaje) {
  mensaje = mensaje.toLowerCase();

  const respuestas = {
    default: 'Hola, soy el asistente virtual de Andrés. ¿En qué puedo ayudarte?',

    informacionPersonal: {
      keywords: ['quien es', 'quién es', 'quien', 'quién', 'presentación', 'preséntalo', 'presentalo', 'conocer'],
      response:
        'Andrés Amuchástegui es un desarrollador Full Stack de 29 años, originario de Córdoba, Argentina. Combina su formación en desarrollo web con un background en artes audiovisuales.',
    },

    experiencia: {
      keywords: ['experiencia', 'trabajado', 'laboral', 'trabajo', 'profesional'],
      response:
        'Andrés cuenta con experiencia significativa en desarrollo web. Actualmente trabaja en XCONS como desarrollador Full Stack, donde utiliza tecnologías como React y Node.js.',
    },

    habilidades: {
      keywords: ['sabe', 'hacer', 'habilidades', 'tecnologías', 'tecnologia', 'stack', 'herramientas'],
      response:
        'Las principales habilidades técnicas de Andrés incluyen:\n- Frontend: React, JavaScript, HTML5, CSS3\n- Backend: Node.js, Express\n- Bases de datos: MongoDB\n- Herramientas: Git, GitHub\n- Diseño: Conocimientos en diseño audiovisual',
    },

    estudios: {
      keywords: ['estudios', 'estudió', 'formación', 'formacion', 'educación', 'educacion', 'carrera'],
      response:
        'Andrés tiene formación en Desarrollo Web Full Stack y un background en Artes Audiovisuales. Constantemente se mantiene actualizado en las últimas tecnologías web.',
    },

    contacto: {
      keywords: ['contacto', 'contactar', 'email', 'correo', 'comunicar', 'mensaje'],
      response: 'Puedes contactar a Andrés a través de su email: amuchastegui1994@gmail.com',
    },

    fueraDeContexto: {
      response:
        'Lo siento, esa pregunta está fuera de mi conocimiento. ¿Te gustaría saber algo específico sobre la experiencia profesional, proyectos o habilidades de Andrés?',
    },
  };

  for (const categoria in respuestas) {
    if (categoria === 'default' || categoria === 'fueraDeContexto') continue;

    const { keywords } = respuestas[categoria];
    if (keywords && keywords.some((keyword) => mensaje.includes(keyword))) {
      return respuestas[categoria].response;
    }
  }

  if (mensaje.includes('andrés') || mensaje.includes('andres')) {
    return respuestas.fueraDeContexto.response;
  }

  return respuestas.fueraDeContexto.response;
}

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('change chat type', (chatType) => {
    let welcomeMessage = '';
    switch (chatType) {
      case 'chatgpt':
        welcomeMessage = '👋 Ahora estás usando ChatGPT. ¿En qué puedo ayudarte?';
        break;
      case 'deepseek':
        welcomeMessage = '👋 Ahora estás usando Deepseek. ¿En qué puedo ayudarte?';
        break;
      case 'local':
        welcomeMessage = '👋 Ahora estás usando el Chat Local. ¿En qué puedo ayudarte?';
        break;
    }

    socket.emit('chat cleared');
    socket.emit('chat message', {
      role: 'bot',
      content: welcomeMessage,
    });
  });

  socket.on('chat message', async (msg) => {
    try {
      console.log('Mensaje recibido:', msg);
      let response;

      switch (msg.chatType) {
        case 'chatgpt':
          if (!OPENAI_API_KEY) throw new Error('API key de ChatGPT no configurada');
          response = await getChatGPTResponse(msg.content);
          break;
        case 'deepseek':
          if (!DEEPSEEK_API_KEY) throw new Error('API key de Deepseek no configurada');
          response = await getDeepseekResponse(msg.content);
          break;
        case 'local':
          response = obtenerRespuesta(msg.content);
          break;
        default:
          throw new Error('Tipo de chat no válido');
      }

      io.emit('chat message', {
        role: 'bot',
        content: response,
      });
    } catch (error) {
      console.error('Error:', error);
      socket.emit('chat message', {
        role: 'bot',
        content: `Error: ${error.message}`,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`
    🚀 Servidor de chat iniciado:
    - Puerto: ${PORT}
    - ChatGPT configurado: ${!!OPENAI_API_KEY}
    - Deepseek configurado: ${!!DEEPSEEK_API_KEY}
    - HuggingFace configurado: ${!!HF_API_KEY}
  `);
});