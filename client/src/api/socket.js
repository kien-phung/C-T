import { io } from 'socket.io-client';

// Build Socket URL similar to axiosClient logic
const protocol = window.location.protocol;
const hostname = window.location.hostname;
let SOCKET_URL = `${protocol}//${hostname}:4040`;

// Production domains: use same origin (proxied via Nginx)
if (hostname.includes('thanhtoanct.com') || hostname.includes('yourdomain.com')) {
  SOCKET_URL = `${protocol}//${hostname}`;
}

// Single shared socket instance
export const socket = io(SOCKET_URL, {
  path: '/api/socket.io/',
  transports: ['websocket'],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

// Optional: basic logging
const ENABLE_SOCKET_LOG = false;
socket.on('connect', () => {
  if (ENABLE_SOCKET_LOG) console.log('🔌 Socket connected:', socket.id);
});
socket.on('disconnect', (reason) => {
  if (ENABLE_SOCKET_LOG) console.log('🔌 Socket disconnected:', reason);
});