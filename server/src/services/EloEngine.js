/**
 * DotWars ELO Engine
 * Computes standard chess-style Elo transitions and ranked matching thresholds.
 */

const K_FACTOR = 32;

/**
 * Calculates ELO shifts based on match results
 * @param {number} ratingA Current ELO rating of Player A
 * @param {number} ratingB Current ELO rating of Player B
 * @param {number} scoreA Actual score A: 1.0 (win), 0.5 (draw), 0.0 (loss)
 * @returns {Object} { nextRatingA, nextRatingB, shift }
 */
export function calculateEloShift(ratingA, ratingB, scoreA) {
  // Expected probability
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

  const scoreB = 1.0 - scoreA;

  const nextRatingA = Math.round(ratingA + K_FACTOR * (scoreA - expectedA));
  const nextRatingB = Math.round(ratingB + K_FACTOR * (scoreB - expectedB));

  return {
    nextRatingA: Math.max(100, nextRatingA), // prevent falling below floor
    nextRatingB: Math.max(100, nextRatingB),
    shiftA: nextRatingA - ratingA,
    shiftB: nextRatingB - ratingB,
  };
}

/**
 * Categorize player into divisions based on Elo points
 */
export function getRankTier(elo) {
  if (elo >= 2200) return 'GRANDMASTER';
  if (elo >= 1900) return 'MASTER';
  if (elo >= 1600) return 'DIAMOND';
  if (elo >= 1300) return 'GOLD';
  if (elo >= 1000) return 'SILVER';
  return 'BRONZE';
}
