/**
 * DotWars Boss Mechanics Engine
 * Manages unique behavior profiles and grid mutations for co-op Boss battles.
 */

import { getAIMove } from './AiPersonalities';
import { getEdgeId } from '../utils/GridGenerator';

export const BOSS_TYPES = {
  CORRUPTOR: 'CORRUPTOR',
  TIME_KEEPER: 'TIME_KEEPER',
  HIVE_MIND: 'HIVE_MIND',
};

/**
 * 1. CORRUPTOR: Destroys random lines
 * - Has a 35% chance to select a claimed edge, and "corrupt" it back to unclaimed status.
 * - If that edge was part of any captured cells, those cells lose ownership (reverted to null).
 */
export function corruptorAction(gridState, setGridState, setScores, scores) {
  const claimedEdges = Object.keys(gridState.edges).filter(e => gridState.edges[e].owner !== null);
  if (claimedEdges.length === 0 || Math.random() > 0.35) return null;

  const targetEdgeId = claimedEdges[Math.floor(Math.random() * claimedEdges.length)];
  const prevOwner = gridState.edges[targetEdgeId].owner;

  // Revert edge ownership
  const updatedEdges = {
    ...gridState.edges,
    [targetEdgeId]: { ...gridState.edges[targetEdgeId], owner: null },
  };

  const updatedCells = { ...gridState.cells };
  const updatedScores = { ...scores };

  // Revert any completed cells that relied on this edge
  Object.keys(updatedCells).forEach(cId => {
    const cell = updatedCells[cId];
    if (cell.edgeIds.includes(targetEdgeId) && cell.owner !== null) {
      const cellOwner = cell.owner;
      updatedCells[cId] = { ...cell, owner: null };

      // Deduct points
      updatedScores[cellOwner] = Math.max(0, (updatedScores[cellOwner] || 0) - 10);
    }
  });

  setGridState({
    ...gridState,
    edges: updatedEdges,
    cells: updatedCells,
  });
  setScores(updatedScores);

  return targetEdgeId; // Return corrupted edge ID to display warning in UI
}

/**
 * 2. HIVE MIND: Captures multiple areas
 * - When they capture a cell, they check all cells adjacent to it (sharing nodes or edges).
 * - If an adjacent cell has 2 or fewer remaining unclaimed edges, the Hive Mind auto-claims those edges and captures that cell!
 */
export function hiveMindSpread(gridState, completedCellId, bossPlayerId, claimEdgeFn) {
  const triggerCell = gridState.cells[completedCellId];
  if (!triggerCell) return;

  const adjacentCells = Object.keys(gridState.cells).filter(cId => {
    if (cId === completedCellId) return false;
    const cell = gridState.cells[cId];
    // Share at least one node
    return cell.nodeIds.some(nId => triggerCell.nodeIds.includes(nId));
  });

  adjacentCells.forEach(adjId => {
    const adjCell = gridState.cells[adjId];
    if (adjCell.owner !== null) return;

    const unclaimedEdges = adjCell.edgeIds.filter(eId => gridState.edges[eId].owner === null);

    // If close to completion (2 or fewer lines remaining), Hive Mind expands!
    if (unclaimedEdges.length <= 2) {
      unclaimedEdges.forEach(eId => {
        // Auto claim
        claimEdgeFn(eId, bossPlayerId);
      });
    }
  });
}

/**
 * Master engine entry to calculate Boss action execution
 */
export function getBossMove(bossType, gridState, inventory, bossId = 'boss_bot') {
  // Boss moves use Hard AI logic as their decision baseline, then layered with special actions
  const aiMove = getAIMove('HARD', gridState.edges, gridState.cells, inventory, bossId);
  return aiMove;
}
