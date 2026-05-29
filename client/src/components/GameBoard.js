import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText, G } from 'react-native-svg';
import { useGameStore } from '../store/useGameStore';
import COLORS from '../constants/Colors';
import { findClosestEdge, getCellCenter } from '../utils/Geometry';

const VIEWBOX_PADDING = 22;

const hexToRgba = (hex, opacity) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const getOwnerColor = owner => COLORS.players[owner] || COLORS.cyan;

const getBoardMetrics = (nodes, boardSize) => {
  const nodeList = Object.values(nodes);

  if (nodeList.length === 0) {
    return {
      viewBox: '0 0 1 1',
      originX: 0,
      originY: 0,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    };
  }

  const xs = nodeList.map(n => n.x);
  const ys = nodeList.map(n => n.y);
  const originX = Math.min(...xs) - VIEWBOX_PADDING;
  const originY = Math.min(...ys) - VIEWBOX_PADDING;
  const width = Math.max(...xs) - Math.min(...xs) + VIEWBOX_PADDING * 2;
  const height = Math.max(...ys) - Math.min(...ys) + VIEWBOX_PADDING * 2;
  const scale = Math.min(boardSize / width, boardSize / height);
  const offsetX = (boardSize - width * scale) / 2;
  const offsetY = (boardSize - height * scale) / 2;

  return {
    viewBox: `${originX} ${originY} ${width} ${height}`,
    originX,
    originY,
    scale,
    offsetX,
    offsetY,
  };
};

/**
 * GameBoard Component
 * Renders the vector-based grid (Square, Tri, Hex) and captures player line-claims.
 */
export const GameBoard = ({ onClaim }) => {
  const { gridState, currentPlayer, activeParticles } = useGameStore();
  const { nodes, edges, cells } = gridState;
  const { width } = useWindowDimensions();

  // Width of grid area relative to screen width
  const boardSize = Math.min(Math.max(width - 32, 240), 420);
  const boardMetrics = React.useMemo(
    () => getBoardMetrics(nodes, boardSize),
    [nodes, boardSize]
  );

  // Handle taps on the SVG board
  const handleBoardTouch = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    const gridX =
      (locationX - boardMetrics.offsetX) / boardMetrics.scale + boardMetrics.originX;
    const gridY =
      (locationY - boardMetrics.offsetY) / boardMetrics.scale + boardMetrics.originY;
    
    // Find closest unclaimed edge within a 26px threshold
    const targetEdgeId = findClosestEdge(
      gridX,
      gridY,
      edges,
      nodes,
      30 / boardMetrics.scale
    );
    
    if (targetEdgeId) {
      if (onClaim) {
        onClaim(targetEdgeId);
      } else {
        // Fallback to direct claim
        useGameStore.getState().claimEdge(targetEdgeId, currentPlayer);
      }
    }
  };

  // Helper to color cells based on ownership and type
  const getCellFill = (cell) => {
    if (cell.owner) {
      return hexToRgba(getOwnerColor(cell.owner), 0.16);
    }

    // Special cell types color representation
    switch (cell.type) {
      case 'OBSTACLE': return '#140c21';
      case 'TRAP': return '#ff003c0b'; // red tint
      case 'BONUS': return '#00ffcc0b'; // cyan tint
      case 'CHAIN': return '#ffcc000b'; // gold tint
      case 'MULTIPLIER': return '#cc00ff0b'; // purple tint
      default: return 'transparent';
    }
  };

  const getCellStroke = (cell) => {
    if (cell.owner) return 'transparent';
    switch (cell.type) {
      case 'OBSTACLE': return COLORS.neutralNode;
      case 'TRAP': return 'rgba(255, 42, 42, 0.4)';
      case 'BONUS': return 'rgba(0, 255, 204, 0.4)';
      case 'CHAIN': return 'rgba(255, 204, 0, 0.4)';
      case 'MULTIPLIER': return 'rgba(179, 0, 255, 0.4)';
      default: return 'transparent';
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.boardWrapper, { width: boardSize, height: boardSize }]}
        onStartShouldSetResponder={() => true}
        onResponderRelease={handleBoardTouch}
      >
        <Svg
          width={boardSize}
          height={boardSize}
          viewBox={boardMetrics.viewBox}
          preserveAspectRatio="xMidYMid meet"
          style={StyleSheet.absoluteFill}
        >
          {/* 1. DRAW CELL POLYGONS */}
          {Object.keys(cells).map(cellId => {
            const cell = cells[cellId];
            const pointsStr = cell.nodeIds
              .map(nId => {
                const n = nodes[nId];
                return n ? `${n.x},${n.y}` : '';
              })
              .filter(p => p !== '')
              .join(' ');

            const center = getCellCenter(cell.nodeIds, nodes);

            return (
              <G key={cellId}>
                <Polygon
                  points={pointsStr}
                  fill={getCellFill(cell)}
                  stroke={getCellStroke(cell)}
                  strokeWidth={cell.owner ? 0 : 1}
                  strokeDasharray={cell.type !== 'NORMAL' && cell.type !== 'OBSTACLE' ? '4,4' : undefined}
                />
                
                {/* Captured cells are shown by fill color; special cells keep compact labels. */}
                {!cell.owner && cell.type !== 'NORMAL' ? (
                  <SvgText
                    x={center.x}
                    y={center.y + 4}
                    fontSize="10"
                    fontWeight="bold"
                    fill={
                      cell.type === 'OBSTACLE' ? COLORS.textMuted :
                      cell.type === 'TRAP' ? COLORS.trap :
                      cell.type === 'BONUS' ? COLORS.bonus :
                      cell.type === 'CHAIN' ? COLORS.chain :
                      COLORS.multiplier
                    }
                    textAnchor="middle"
                  >
                    {cell.type === 'OBSTACLE' ? '█' : cell.type.substring(0, 4)}
                  </SvgText>
                ) : null}
              </G>
            );
          })}

          {/* 2. DRAW EDGES */}
          {Object.keys(edges).map(edgeId => {
            const edge = edges[edgeId];
            const n1 = nodes[edge.n1];
            const n2 = nodes[edge.n2];

            if (!n1 || !n2) return null;

            const isClaimed = edge.owner !== null;
            const strokeColor = isClaimed ? COLORS.players[edge.owner] : COLORS.neutralLine;
            const strokeWidth = isClaimed ? 4 : 2;

            return (
              <Line
                key={edgeId}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
            );
          })}

          {/* 3. DRAW NODES */}
          {Object.keys(nodes).map(nodeId => {
            const node = nodes[nodeId];
            const radius = node.isBlocked ? 5 : 4;
            const fill = node.isBlocked ? COLORS.trap : COLORS.neutralNode;

            return (
              <Circle
                key={nodeId}
                cx={node.x}
                cy={node.y}
                r={radius}
                fill={fill}
                stroke={node.isBlocked ? '#ffffff' : 'transparent'}
                strokeWidth={node.isBlocked ? 1 : 0}
              />
            );
          })}

          {/* 4. RENDER PHYSICS PARTICLES (SVG thread acceleration) */}
          {activeParticles.map(p => (
            <Circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={2 * p.life}
              fill={p.color}
              opacity={p.life}
            />
          ))}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  boardWrapper: {
    backgroundColor: COLORS.bgDark,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
});

export default GameBoard;
