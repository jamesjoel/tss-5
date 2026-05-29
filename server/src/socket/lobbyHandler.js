/**
 * DotWars Matchmaking Queue Coordinator
 */

const matchmakingQueue = [];

export function handleLobbyEvents(socket, io, activeRooms) {
  // Join the ranked PvP queue
  socket.on('joinQueue', (data) => {
    const { userId, username, elo } = data;
    
    // Check if already in queue
    const exists = matchmakingQueue.find(p => p.userId === userId);
    if (exists) return;

    const playerNode = {
      socketId: socket.id,
      userId,
      username,
      elo: elo || 1500,
      joinedAt: Date.now(),
    };

    console.log(`Lobby: Player ${username} [${playerNode.elo} ELO] entered matching queue.`);
    
    // Try to find matching candidate within ELO range (±150 Elo)
    const matchIndex = matchmakingQueue.findIndex(candidate => {
      return Math.abs(candidate.elo - playerNode.elo) <= 150;
    });

    if (matchIndex !== -1) {
      // Match found!
      const opponent = matchmakingQueue.splice(matchIndex, 1)[0];
      const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

      console.log(`Lobby: Match established! Room ${roomId} paired ${username} vs ${opponent.username}`);

      // Save room configurations
      activeRooms[roomId] = {
        id: roomId,
        player1: playerNode,
        player2: opponent,
        gameState: {
          gridType: 'SQUARE',
          rows: 4,
          cols: 4,
          turn: playerNode.userId,
          moves: [],
          scores: { [playerNode.userId]: 0, [opponent.userId]: 0 },
        },
      };

      // Force sockets to join socket channel room
      const opponentSocket = io.sockets.sockets.get(opponent.socketId);
      if (opponentSocket) opponentSocket.join(roomId);
      socket.join(roomId);

      // Emit event
      io.to(roomId).emit('matchFound', {
        roomId,
        player1: { userId: playerNode.userId, username: playerNode.username, elo: playerNode.elo },
        player2: { userId: opponent.userId, username: opponent.username, elo: opponent.elo },
        firstTurn: playerNode.userId,
      });

    } else {
      // Hold in queue
      matchmakingQueue.push(playerNode);
      socket.emit('queueWaiting', { searchActive: true });
    }
  });

  // Remove player from queue on demand
  socket.on('leaveQueue', (userId) => {
    const idx = matchmakingQueue.findIndex(p => p.userId === userId);
    if (idx !== -1) {
      matchmakingQueue.splice(idx, 1);
      socket.emit('queueCancelled', { searchActive: false });
      console.log(`Lobby: Player ${userId} left the matchmaking queue.`);
    }
  });

  // Disconnect handler cleaning
  socket.on('disconnect', () => {
    const idx = matchmakingQueue.findIndex(p => p.socketId === socket.id);
    if (idx !== -1) {
      matchmakingQueue.splice(idx, 1);
      console.log(`Lobby: Disconnected socket removed from queue.`);
    }
  });
}
