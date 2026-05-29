/**
 * DotWars Grid Generator
 * Handles mathematical generation of Nodes, Edges, and Cells for:
 * - Square Grids
 * - Triangular Grids
 * - Hexagonal Grids
 * - Irregular / Evolving Grids with obstacles, traps, and bonus squares
 */

export const GRID_TYPES = {
  SQUARE: 'SQUARE',
  TRIANGLE: 'TRIANGLE',
  HEXAGON: 'HEXAGON',
  IRREGULAR: 'IRREGULAR',
};

export const CELL_TYPES = {
  NORMAL: 'NORMAL',
  OBSTACLE: 'OBSTACLE', // Blocked cell that cannot be captured
  TRAP: 'TRAP',         // Deducts points when captured
  BONUS: 'BONUS',       // Gives extra points
  CHAIN: 'CHAIN',       // Auto-triggers another turn even if no cell completes, or triggers nearby lines
  MULTIPLIER: 'MULTIPLIER', // Multiplies combo
};

/**
 * Helper to generate unique string keys for edges to ensure bidirectionality
 */
export function getEdgeId(node1Id, node2Id) {
  const [first, second] = [String(node1Id), String(node2Id)].sort();
  return `e_${first}__${second}`;
}

/**
 * Rounds numbers to solve floating point matching issues
 */
const roundTo = (num, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

/**
 * Generate a standard Square grid
 */
function generateSquareGrid(rows, cols, spacing = 80, padding = 40) {
  const nodes = {};
  const edges = {};
  const cells = {};

  // 1. Generate Nodes
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const id = `n_${r}_${c}`;
      nodes[id] = {
        id,
        x: padding + c * spacing,
        y: padding + r * spacing,
        isBlocked: false,
      };
    }
  }

  // 2. Generate Edges (Horizontal and Vertical)
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const current = `n_${r}_${c}`;

      // Horizontal edge to right
      if (c < cols) {
        const right = `n_${r}_${c + 1}`;
        const edgeId = getEdgeId(current, right);
        edges[edgeId] = {
          id: edgeId,
          n1: current,
          n2: right,
          owner: null,
          isGhost: false,
        };
      }

      // Vertical edge to bottom
      if (r < rows) {
        const bottom = `n_${r + 1}_${c}`;
        const edgeId = getEdgeId(current, bottom);
        edges[edgeId] = {
          id: edgeId,
          n1: current,
          n2: bottom,
          owner: null,
          isGhost: false,
        };
      }
    }
  }

  // 3. Generate Cells (each square is 1 cell)
  let cellIndex = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cId = `c_${cellIndex++}`;
      
      const topLeft = `n_${r}_${c}`;
      const topRight = `n_${r}_${c + 1}`;
      const bottomLeft = `n_${r + 1}_${c}`;
      const bottomRight = `n_${r + 1}_${c + 1}`;

      const topEdge = getEdgeId(topLeft, topRight);
      const rightEdge = getEdgeId(topRight, bottomRight);
      const bottomEdge = getEdgeId(bottomLeft, bottomRight);
      const leftEdge = getEdgeId(topLeft, bottomLeft);

      // Randomly assign special types to maintain high interest
      let type = CELL_TYPES.NORMAL;
      const rand = Math.random();
      if (rand < 0.08) type = CELL_TYPES.TRAP;
      else if (rand < 0.16) type = CELL_TYPES.BONUS;
      else if (rand < 0.22) type = CELL_TYPES.CHAIN;
      else if (rand < 0.26) type = CELL_TYPES.MULTIPLIER;

      cells[cId] = {
        id: cId,
        nodeIds: [topLeft, topRight, bottomRight, bottomLeft],
        edgeIds: [topEdge, rightEdge, bottomEdge, leftEdge],
        owner: null,
        type,
      };
    }
  }

  return { nodes, edges, cells };
}

/**
 * Generate a Triangular grid
 */
function generateTriangleGrid(rows, cols, spacing = 80, padding = 40) {
  const nodes = {};
  const edges = {};
  const cells = {};

  const triHeight = spacing * (Math.sqrt(3) / 2);

  // 1. Generate Nodes
  for (let r = 0; r <= rows; r++) {
    const rowOffset = (r % 2) * (spacing / 2);
    for (let c = 0; c <= cols; c++) {
      const id = `n_${r}_${c}`;
      nodes[id] = {
        id,
        x: padding + c * spacing + rowOffset,
        y: padding + r * triHeight,
        isBlocked: false,
      };
    }
  }

  // 2. Generate Edges (Horizontal, Diagonal Right, Diagonal Left)
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const current = `n_${r}_${c}`;

      // Horizontal edge to right
      if (c < cols) {
        const right = `n_${r}_${c + 1}`;
        const edgeId = getEdgeId(current, right);
        edges[edgeId] = { id: edgeId, n1: current, n2: right, owner: null, isGhost: false };
      }

      if (r < rows) {
        // We connect rows using triangles
        const bottomSame = `n_${r + 1}_${c}`;
        const edgeIdSame = getEdgeId(current, bottomSame);
        edges[edgeIdSame] = { id: edgeIdSame, n1: current, n2: bottomSame, owner: null, isGhost: false };

        if (r % 2 === 0) {
          if (c < cols) {
            const bottomNext = `n_${r + 1}_${c + 1}`;
            const edgeIdNext = getEdgeId(current, bottomNext);
            edges[edgeIdNext] = { id: edgeIdNext, n1: current, n2: bottomNext, owner: null, isGhost: false };
          }
        } else {
          if (c > 0) {
            const bottomPrev = `n_${r + 1}_${c - 1}`;
            const edgeIdPrev = getEdgeId(current, bottomPrev);
            edges[edgeIdPrev] = { id: edgeIdPrev, n1: current, n2: bottomPrev, owner: null, isGhost: false };
          }
        }
      }
    }
  }

  // 3. Generate Cells (Triangles)
  let cellIndex = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n_curr = `n_${r}_${c}`;
      const n_right = `n_${r}_${c + 1}`;
      const n_bot = `n_${r + 1}_${c}`;
      const n_bot_next = `n_${r + 1}_${c + 1}`;
      const n_bot_prev = c > 0 ? `n_${r + 1}_${c - 1}` : null;

      // Upward and Downward triangles vary by even/odd row structures
      if (r % 2 === 0) {
        // Triangle 1 (Upward): curr -> right -> bot_next
        if (n_bot_next) {
          const cId1 = `c_${cellIndex++}`;
          const e1 = getEdgeId(n_curr, n_right);
          const e2 = getEdgeId(n_right, n_bot_next);
          const e3 = getEdgeId(n_curr, n_bot_next);
          
          let type = Math.random() < 0.15 ? CELL_TYPES.BONUS : CELL_TYPES.NORMAL;

          cells[cId1] = {
            id: cId1,
            nodeIds: [n_curr, n_right, n_bot_next],
            edgeIds: [e1, e2, e3],
            owner: null,
            type,
          };
        }

        // Triangle 2 (Downward): curr -> bot -> bot_next
        if (n_bot_next) {
          const cId2 = `c_${cellIndex++}`;
          const e1 = getEdgeId(n_curr, n_bot);
          const e2 = getEdgeId(n_bot, n_bot_next);
          const e3 = getEdgeId(n_curr, n_bot_next);

          cells[cId2] = {
            id: cId2,
            nodeIds: [n_curr, n_bot, n_bot_next],
            edgeIds: [e1, e2, e3],
            owner: null,
            type: CELL_TYPES.NORMAL,
          };
        }
      } else {
        // Odd rows
        // Triangle 1: curr -> bot_prev -> bot
        if (n_bot_prev) {
          const cId1 = `c_${cellIndex++}`;
          const e1 = getEdgeId(n_curr, n_bot_prev);
          const e2 = getEdgeId(n_bot_prev, n_bot);
          const e3 = getEdgeId(n_curr, n_bot);

          cells[cId1] = {
            id: cId1,
            nodeIds: [n_curr, n_bot_prev, n_bot],
            edgeIds: [e1, e2, e3],
            owner: null,
            type: CELL_TYPES.NORMAL,
          };
        }

        // Triangle 2: curr -> right -> bot
        const cId2 = `c_${cellIndex++}`;
        const e1 = getEdgeId(n_curr, n_right);
        const e2 = getEdgeId(n_right, n_bot);
        const e3 = getEdgeId(n_curr, n_bot);

        cells[cId2] = {
          id: cId2,
          nodeIds: [n_curr, n_right, n_bot],
          edgeIds: [e1, e2, e3],
          owner: null,
          type: CELL_TYPES.NORMAL,
        };
      }
    }
  }

  return { nodes, edges, cells };
}

/**
 * Generate a Hexagonal grid
 * Hexagon vertices are calculated mathematically and overlapping nodes/edges are merged
 */
function generateHexagonGrid(rows, cols, radius = 50, padding = 60) {
  const nodes = {};
  const edges = {};
  const cells = {};

  const hexWidth = radius * 1.732; // sqrt(3)
  const hexHeight = radius * 2;

  let nodeCounter = 0;
  const nodeMap = []; // Tracks x,y coordinates to merge adjacent vertices

  // Helper to register node or get existing one to merge overlapping polygon corners
  function getOrRegisterNode(x, y) {
    const rx = roundTo(x, 1);
    const ry = roundTo(y, 1);
    const found = nodeMap.find(n => Math.abs(n.x - rx) < 5 && Math.abs(n.y - ry) < 5);
    if (found) return found.id;

    const id = `n_${nodeCounter++}`;
    const newNode = { id, x: rx, y: ry, isBlocked: false };
    nodes[id] = newNode;
    nodeMap.push(newNode);
    return id;
  }

  let cellIndex = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cId = `c_${cellIndex++}`;

      // Center coordinates of this Hexagon cell
      const cx = padding + c * hexWidth + (r % 2) * (hexWidth / 2);
      const cy = padding + r * hexHeight * 0.75;

      const cellNodeIds = [];
      const cellEdgeIds = [];

      // Calculate the 6 vertices of the Hexagon
      for (let i = 0; i < 6; i++) {
        const angleRad = (Math.PI / 180) * (i * 60 - 30); // 30-deg rotation to render flat-topped hexes
        const nx = cx + radius * Math.cos(angleRad);
        const ny = cy + radius * Math.sin(angleRad);
        const nodeId = getOrRegisterNode(nx, ny);
        cellNodeIds.push(nodeId);
      }

      // Construct the 6 edges
      for (let i = 0; i < 6; i++) {
        const n1 = cellNodeIds[i];
        const n2 = cellNodeIds[(i + 1) % 6];
        const edgeId = getEdgeId(n1, n2);

        if (!edges[edgeId]) {
          edges[edgeId] = {
            id: edgeId,
            n1,
            n2,
            owner: null,
            isGhost: false,
          };
        }
        cellEdgeIds.push(edgeId);
      }

      let type = CELL_TYPES.NORMAL;
      const rand = Math.random();
      if (rand < 0.1) type = CELL_TYPES.OBSTACLE; // Hex obstacles look incredible on board!
      else if (rand < 0.2) type = CELL_TYPES.BONUS;
      else if (rand < 0.28) type = CELL_TYPES.TRAP;

      cells[cId] = {
        id: cId,
        nodeIds: cellNodeIds,
        edgeIds: cellEdgeIds,
        owner: null,
        type,
      };
    }
  }

  return { nodes, edges, cells };
}

/**
 * Generate an Irregular Grid with evolving characteristics
 * Standard square template but we block nodes, add obstacles, and randomly delete edges.
 */
function generateIrregularGrid(rows, cols, spacing = 80, padding = 40) {
  const grid = generateSquareGrid(rows, cols, spacing, padding);

  // 1. Create obstacles in 15% of cells
  Object.keys(grid.cells).forEach(cellId => {
    if (Math.random() < 0.15) {
      grid.cells[cellId].type = CELL_TYPES.OBSTACLE;
      // An obstacle cell means its constituent edges cannot be clicked/claimed!
      // We block them to signify they cannot be modified.
    }
  });

  // 2. Block 10% of nodes (and deactivate all adjacent edges)
  const nodeKeys = Object.keys(grid.nodes);
  const numBlockedNodes = Math.floor(nodeKeys.length * 0.08);
  for (let i = 0; i < numBlockedNodes; i++) {
    const randKey = nodeKeys[Math.floor(Math.random() * nodeKeys.length)];
    grid.nodes[randKey].isBlocked = true;

    // Delete or deactivate all edges containing this node
    Object.keys(grid.edges).forEach(edgeId => {
      const edge = grid.edges[edgeId];
      if (edge.n1 === randKey || edge.n2 === randKey) {
        delete grid.edges[edgeId];
      }
    });

    // Also eliminate any cells that relied on these edges
    Object.keys(grid.cells).forEach(cellId => {
      const cell = grid.cells[cellId];
      if (cell.nodeIds.includes(randKey)) {
        delete grid.cells[cellId];
      }
    });
  }

  return grid;
}

/**
 * Master API to construct boards
 */
export function generateGrid(type, rows, cols, size = 70, padding = 50) {
  switch (type) {
    case GRID_TYPES.SQUARE:
      return generateSquareGrid(rows, cols, size, padding);
    case GRID_TYPES.TRIANGLE:
      return generateTriangleGrid(rows, cols, size, padding);
    case GRID_TYPES.HEXAGON:
      return generateHexagonGrid(rows, cols, size, padding);
    case GRID_TYPES.IRREGULAR:
      return generateIrregularGrid(rows, cols, size, padding);
    default:
      return generateSquareGrid(rows, cols, size, padding);
  }
}
