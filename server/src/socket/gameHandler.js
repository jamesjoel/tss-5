/**
 * DotWars Real-Time Game Handler
 */

import { calculateEloShift } from '../services/EloEngine.js';

export function handleGameEvents(socket, io, activeRooms) {
  
  // Player reconnecting to an active match room
  socket.on('reconnectToMatch', (data) => {
    const { roomId, userId } = data;
    const room = activeRooms[roomId];

    if (room) {
      console.log(`Game: Player ${userId} reconnected to room ${roomId}.`);
      
      // Update socket connection reference
      if (room.player1.userId === userId) {
        room.player1.socketId = socket.id;
      } else if (room.player2.userId === userId) {
        room.player2.socketId = socket.id;
      }

      socket.join(roomId);
      
      // Return full board state restoration packet
      socket.emit('matchRestored', {
        roomId,
        gameState: room.gameState,
        opponent: room.player1.userId === userId ? room.player2.username : room.player1.username,
      });
    } else {
      socket.emit('restoreFailed', { message: 'Room has expired or does not exist.' });
    }
  });

  // Player submitting a line claim move
  socket.on('claimEdgeOnline', (data) => {
    const { roomId, userId, edgeId } = data;
    const room = activeRooms[roomId];

    if (!room) return;

    // Validate turn
    if (room.gameState.turn !== userId) {
      socket.emit('invalidMove', { message: 'Command rejected: Out of turn sequence!' });
      return;
    }

    console.log(`Game Room ${roomId}: User ${userId} claimed edge ${edgeId}`);

    // Synchronize local board changes (edges array, cell completions, turn cycling)
    // Server acts as referee to broadcast changes
    // Add to moves log
    room.gameState.moves.push({ userId, edgeId });

    // Swap turn
    const nextTurn = room.player1.userId === userId ? room.player2.userId : room.player1.userId;
    room.gameState.turn = nextTurn;

    // Broadcast update
    io.to(roomId).emit('onlineMoveApplied', {
      edgeId,
      claimedBy: userId,
      nextTurn,
    });
  });

  // Game over settlement
  socket.on('settleOnlineMatch', (data) => {
    const { roomId, score1, score2 } = data;
    const room = activeRooms[roomId];

    if (!room) return;

    // Determine winner
    const p1Id = room.player1.userId;
    const p2Id = room.player2.userId;

    const winnerId = score1 > score2 ? p1Id : score1 < score2 ? p2Id : 'DRAW';
    
    let eloResult = null;
    if (winnerId !== 'DRAW') {
      const outcome = winnerId === p1Id ? 1.0 : 0.0;
      eloResult = calculateEloShift(room.player1.elo, room.player2.elo, outcome);
      
      console.log(`Game Over: ELO adjustment applied:
        ${room.player1.username}: ${room.player1.elo} -> ${eloResult.nextRatingA} (${eloResult.shiftA} ELO)
        ${room.player2.username}: ${room.player2.elo} -> ${eloResult.nextRatingB} (${eloResult.shiftB} ELO)
      `);
    }

    io.to(roomId).emit('onlineMatchSummary', {
      winnerId,
      eloResult,
    });

    // Cleanup Room memory
    delete activeRooms[roomId];
  });
}
