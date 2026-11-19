import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';
import {
  buildGeminiSystemPrompt,
  getLocalFallbackReply,
} from './knowledgeBase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from server/.env or root .env (Render injects process.env directly)
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 4000;

const extraOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const allowedOrigins = [
  'https://andresamuchastegui.com',
  'https://www.andresamuchastegui.com',
  'https://portfolio-f3m9.onrender.com',
  'http://localhost:3000',
  'http://localhost:4000',
  ...extraOrigins,
];

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(origin)) return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return true;
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '16kb' }));

const SYSTEM_PROMPT = buildGeminiSystemPrompt();

/**
 * Lightweight health check endpoint for Render zero-downtime probes,
 * external uptime monitors, and frontend silent pre-warming.
 */
app.get('/api/health', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    status: 'ok',
    service: 'portfolio-chat-api',
    aiConfigured: Boolean(process.env.GEMINI_API_KEY),
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

async function getGeminiResponse(userMessage, history = [], options = {}) {
  const { forceGemini = false, preferredLang } = options;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const localReply = getLocalFallbackReply(userMessage, preferredLang);
    return { content: localReply, source: 'local' };
  }

  const sanitizedHistory = Array.isArray(history) ? history.slice(-8) : [];
  const contents = [
    ...sanitizedHistory,
    {
      role: 'user',
      parts: [{ text: String(userMessage).slice(0, 1200) }],
    },
  ];

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        generationConfig: {
          temperature: 0.65,
          maxOutputTokens: 700,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        timeout: 22000,
      }
    );

    const candidateText =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response from Gemini API');
    }

    return { content: candidateText, source: 'gemini' };
  } catch (error) {
    console.error('Gemini API error:', error.message);

    // Always try graceful local fallback first unless caller explicitly expects AI error
    const fallbackReply = getLocalFallbackReply(userMessage, preferredLang);
    if (forceGemini && error.response?.status === 429) {
      return {
        content: fallbackReply,
        source: 'local',
        notice: 'rate_limit_fallback',
      };
    }

    return { content: fallbackReply, source: 'local' };
  }
}

/**
 * HTTP REST fallback endpoint so chat remains functional even if WebSocket
 * handshakes are delayed during a Render Free Tier cold start or proxy block.
 */
app.post('/api/chat', async (req, res) => {
  const { message, history = [], language, forceGemini = true } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const result = await getGeminiResponse(message.trim(), history, {
    forceGemini,
    preferredLang: language,
  });

  return res.status(200).json({
    content: result.content,
    type: 'bot',
    source: result.source,
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOptions.origin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.history = [];

  socket.on('chat message', async (msg) => {
    const content = typeof msg?.content === 'string' ? msg.content.trim() : '';
    if (!content) return;

    const result = await getGeminiResponse(content, socket.history, {
      forceGemini: msg?.forceGemini ?? true,
      preferredLang: msg?.language,
    });

    if (result.source === 'gemini') {
      socket.history.push(
        { role: 'user', parts: [{ text: content.slice(0, 1200) }] },
        { role: 'model', parts: [{ text: result.content }] }
      );
      if (socket.history.length > 10) {
        socket.history.splice(0, socket.history.length - 10);
      }
    }

    socket.emit('chat message', {
      content: result.content,
      type: 'bot',
      source: result.source,
    });
  });
});

// Monolithic fallback when deployed together; disabled on standalone API Web Service
if (process.env.NODE_ENV === 'production' && process.env.DISABLE_STATIC !== 'true') {
  const buildPath = path.join(__dirname, '..', 'build');
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
  }
}

server.listen(PORT, () => {
  console.log(`Chat API server listening on port ${PORT} (lightweight mode)`);
});
