import { Server } from 'socket.io';
import { CLIENT_URL, NODE_ENV } from '../configs/constants.js';

let io: Server | null = null;

const getAllowedOrigins = (): string[] => {
  if (NODE_ENV === 'development') return ['*'];
  try {
    return CLIENT_URL.split(',').map(u => u.trim()).filter(Boolean);
  } catch {
    return ['*'];
  }
};

export const initSocket = (httpServer: any): Server => {
  const origins = getAllowedOrigins();
  io = new Server(httpServer, {
    cors: {
      origin: (origin, cb) => {
        if (NODE_ENV === 'development') return cb(null, true);
        if (!origin || origins.includes(origin)) return cb(null, true);
        cb(new Error('Not allowed by CORS'));
      },
      methods: ['GET','POST','PUT','PATCH','DELETE'],
      allowedHeaders: ['Content-Type','Authorization'],
      credentials: true,
    },
    // Use API path so it can be proxied by Nginx under /api
    path: '/api/socket.io/',
  });

  io.on('connection', (socket) => {
    // Basic heartbeat/logging
    socket.on('ping', () => socket.emit('pong'));
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};