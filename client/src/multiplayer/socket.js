import { io } from 'socket.io-client';
import { useGameStore } from '../store/useGameStore';

// Default backend endpoint (change to server network IP for testing on physical Android devices)
const BACKEND_URL = 'http://localhost:4000';

class SocketService {
  socket = null;
  activeRoomId = null;

  connect(userId, username, elo) {
    if (this.socket?.connected) return;

    this.socket = io(BACKEND_URL, {
      transports: ['websocket'],
      forceNew: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket: Handshake complete with server!');
    });

    // Listen to queue matchmaking pairings
    this.socket.on('matchFound', (data) => {
      console.log('Socket: Match pairing succeeded!', data);
      this.activeRoomId = data.roomId;
      
      // Hook to Zustand store updates
      useGameStore.setState({
        activeRoomId: data.roomId,
        gameStatus: 'ACTIVE',
      });
    });

    // Sync line claims made by online opponents
    this.socket.on('onlineMoveApplied', (data) => {
      const { edgeId, claimedBy, nextTurn } = data;
      console.log(`Socket: Opponent claimed edge ${edgeId}. Next: ${nextTurn}`);
      
      const state = useGameStore.getState();
      // Apply claim natively through the store to maintain scoring mechanics
      state.claimEdge(edgeId, claimedBy);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket: Lost connection to matchmaking beacon!');
    });
  }

  joinQueue(userId, username, elo) {
    if (!this.socket) return;
    this.socket.emit('joinQueue', { userId, username, elo });
  }

  leaveQueue(userId) {
    if (!this.socket) return;
    this.socket.emit('leaveQueue', userId);
  }

  claimEdgeOnline(edgeId, userId) {
    if (!this.socket || !this.activeRoomId) return;
    this.socket.emit('claimEdgeOnline', {
      roomId: this.activeRoomId,
      userId,
      edgeId,
    });
  }

  settleMatch(score1, score2) {
    if (!this.socket || !this.activeRoomId) return;
    this.socket.emit('settleOnlineMatch', {
      roomId: this.activeRoomId,
      score1,
      score2,
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.activeRoomId = null;
    }
  }
}

export const socketService = new SocketService();
export default socketService;
