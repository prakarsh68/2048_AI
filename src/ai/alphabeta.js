import { moveLeft, moveRight, moveUp, moveDown, isDifferent } from "../utils/gameLogic";
import { evaluateGrid } from "./heuristics";

const moveFuncs = {
  up: moveUp,
  down: moveDown,
  left: moveLeft,
  right: moveRight,
};

/**
 * Alpha-Beta Pruning Optimized for 2048
 */
export function alphaBeta(grid, depth, alpha, beta, isMax) {
  let totalNodes = 1;

  // 1. Base Case: Game over or Depth reached
  // We check depth first for performance
  if (depth === 0) {
    return { score: evaluateGrid(grid), nodes: 1 };
  }

  // 🤖 MAX PLAYER (The AI trying to win)
  if (isMax) {
    let best = { score: -Infinity, move: null };
    let movedAny = false;

    for (const direction in moveFuncs) {
      const nextGrid = moveFuncs[direction](grid);

      // 🏎️ Optimization: Fast fail for invalid moves
      if (!isDifferent(grid, nextGrid)) continue;
      
      movedAny = true;
      const result = alphaBeta(nextGrid, depth - 1, alpha, beta, false);
      totalNodes += result.nodes;

      if (result.score > best.score) {
        best = { score: result.score, move: direction };
      }

      alpha = Math.max(alpha, best.score);
      if (beta <= alpha) break; // ✂️ Prune
    }

    // If no moves possible, it's a dead end (low score)
    if (!movedAny) return { score: -1e6, nodes: 1 };

    return { ...best, nodes: totalNodes };
  } 
  
  // 🎲 MIN PLAYER (The Computer spawning tiles)
  else {
    let worst = { score: Infinity };
    const emptyCells = [];

    // Find all empty spots
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 0) emptyCells.push({ r, c });
      }
    }

    // 🏎️ Optimization: If too many empty cells, only simulate a subset 
    // to prevent tree explosion, or focus on the 'worst' positions.
    for (const cell of emptyCells) {
      const nextGrid = grid.map(row => [...row]);
      nextGrid[cell.r][cell.c] = 2; // Usually simulate a '2' as it's 90% likely

      const result = alphaBeta(nextGrid, depth - 1, alpha, beta, true);
      totalNodes += result.nodes;

      if (result.score < worst.score) {
        worst = { score: result.score };
      }

      beta = Math.min(beta, worst.score);
      if (beta <= alpha) break; // ✂️ Prune
    }

    return { ...worst, nodes: totalNodes };
  }
}