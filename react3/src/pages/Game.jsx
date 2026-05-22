import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
const socket = io.connect("http://192.168.0.104:3000")
const DotGame = ({ rows = 5, cols = 5 }) => {
  const cellSize = 60;
  const padding = 30;
  const [lines, setLines] = useState({}); // Stores clicked lines like "0-0-h": true

  const handleLineClick = (id) => {
    // console.log(id)
    
    if (lines[id]) return; // Already clicked
    socket.emit("serv", id);
    setLines({ ...lines, [id]: true });
  };

  useEffect(()=>{
    socket.on("usertoclient", (id)=>{
        setLines({ ...lines, [id]: true });
    })
    
  },[])

  return (
    <svg 
      width={(cols * cellSize) + (padding * 2)} 
      height={(rows * cellSize) + (padding * 2)}
    >
      <g transform={`translate(${padding}, ${padding})`}>
        {/* 1. Draw Horizontal Lines */}
        {Array.from({ length: rows + 1 }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const id = `h-${r}-${c}`;
            return (
              <line
                key={id}
                x1={c * cellSize} y1={r * cellSize}
                x2={(c + 1) * cellSize} y2={r * cellSize}
                stroke={lines[id] ? "black" : "#eee"}
                strokeWidth="6"
                style={{ cursor: 'pointer' }}
                onClick={() => handleLineClick(id)}
              />
            );
          })
        )}

        {/* 2. Draw Vertical Lines */}
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols + 1 }).map((_, c) => {
            const id = `v-${r}-${c}`;
            return (
              <line
                key={id}
                x1={c * cellSize} y1={r * cellSize}
                x2={c * cellSize} y2={(r + 1) * cellSize}
                stroke={lines[id] ? "black" : "#eee"}
                strokeWidth="6"
                style={{ cursor: 'pointer' }}
                onClick={() => handleLineClick(id)}
              />
            );
          })
        )}

        {/* 3. Draw Dots (on top of lines) */}
        {Array.from({ length: rows + 1 }).map((_, r) =>
          Array.from({ length: cols + 1 }).map((_, c) => (
            <circle
              key={`dot-${r}-${c}`}
              cx={c * cellSize}
              cy={r * cellSize}
              r="6"
              fill="#555"
            />
          ))
        )}
      </g>
    </svg>
  );
};

export default DotGame