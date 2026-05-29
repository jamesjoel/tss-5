/**
 * DotWars Server Entrypoint
 * Orchestrates Express, Socket.io, and real-time multiplayer loops.
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleLobbyEvents } from './socket/lobbyHandler.js';
import { handleGameEvents } from './socket/gameHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Server health check route
app.get('/status', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    uptime: process.uptime(),
    activeMatches: Object.keys(activeRooms).length,
  });
});

const httpServer = createServer(app);

// Initialize Socket.io with open CORS for cross-device testing
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Active in-memory game room structures
const activeRooms = {};

io.on('connection', (socket) => {
  console.log(`Socket Connected: ${socket.id}`);

  // Route events to specialized modules
  handleLobbyEvents(socket, io, activeRooms);
  handleGameEvents(socket, io, activeRooms);

  socket.on('disconnect', () => {
    console.log(`Socket Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🛰  DOTWARS COSMIC MULTIPLAYER BACKEND ACTIVE  🛰`);
  console.log(`🛰  LISTENING ON PORT ${PORT}                   🛰`);
  console.log(`===============================================`);
});
