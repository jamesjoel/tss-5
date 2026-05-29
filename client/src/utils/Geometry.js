/**
 * DotWars Geometry Utilities
 * High performance mathematical helpers for vector calculations and bounding boxes.
 */

/**
 * Calculates center of a set of coordinate points
 * Used to draw capture markers, animations, or score combos inside cells
 * @param {Array} nodeIds List of node IDs
 * @param {Object} nodes Map of node definitions { x, y }
 */
export function getCellCenter(nodeIds, nodes) {
  let sumX = 0;
  let sumY = 0;
  let validCount = 0;

  nodeIds.forEach(id => {
    const node = nodes[id];
    if (node) {
      sumX += node.x;
      sumY += node.y;
      validCount++;
    }
  });

  if (validCount === 0) return { x: 0, y: 0 };
  return {
    x: sumX / validCount,
    y: sumY / validCount,
  };
}

/**
 * Compute the distance from a tapped coordinate to a line segment
 * Used to detect which edge is clicked with high accuracy and high tolerance
 */
export function getDistanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Segment length squared
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) {
    // x1,y1 is equal to x2,y2
    const diffX = px - x1;
    const diffY = py - y1;
    return Math.sqrt(diffX * diffX + diffY * diffY);
  }

  // Projection fraction t along segment
  let t = ((px - x1) * dx + (py - y1) * dy) / l2;
  t = Math.max(0, Math.min(1, t)); // Clamp projection to segment bounds

  const projX = x1 + t * dx;
  const projY = y1 + t * dy;

  const diffX = px - projX;
  const diffY = py - projY;

  return Math.sqrt(diffX * diffX + diffY * diffY);
}

/**
 * Find the closest edge in the grid within a specific hit-tolerance
 * @param {number} tapX Coordinate clicked
 * @param {number} tapY Coordinate clicked
 * @param {Object} edges Map of all active grid edges
 * @param {Object} nodes Map of all active grid nodes
 * @param {number} threshold Max distance in pixels (e.g. 24)
 * @returns {string|null} Closest Edge ID or null
 */
export function findClosestEdge(tapX, tapY, edges, nodes, threshold = 25) {
  let closestEdgeId = null;
  let minDistance = Infinity;

  Object.keys(edges).forEach(edgeId => {
    const edge = edges[edgeId];
    // Ignore already claimed lines
    if (edge.owner !== null) return;

    const n1 = nodes[edge.n1];
    const n2 = nodes[edge.n2];

    if (n1 && n2) {
      const dist = getDistanceToSegment(tapX, tapY, n1.x, n1.y, n2.x, n2.y);
      if (dist < minDistance && dist <= threshold) {
        minDistance = dist;
        closestEdgeId = edgeId;
      }
    }
  });

  return closestEdgeId;
}
