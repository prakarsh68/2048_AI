import { moveLeft, moveRight, moveUp, moveDown, isDifferent } from "../utils/gameLogic";
import { evaluateGrid } from "./heuristics";

const moveFuncs = {
  up: moveUp,
  down: moveDown,
  left: moveLeft,
  right: moveRight,
};

/**
 * Minimax Algorithm for 2048
 * Warning: Without pruning, depth > 3 may cause significant lag.
 */
export function minimax(grid, depth, isMax) {
  // 1. Base Case: Leaf Node
  if (depth === 0) {
    return { score: evaluateGrid(grid), nodes: 1 };
  }

  let totalNodes = 1;

  // 🤖 MAXIMIZER: The AI choosing the best move
  if (isMax) {
    let best = { score: -Infinity, move: null };
    let canMoveAnywhere = false;

    for (const direction in moveFuncs) {
      const nextGrid = moveFuncs[direction](grid);

      // 🏎️ Optimization: Skip moves that don't change the board
      if (!isDifferent(grid, nextGrid)) continue;
      
      canMoveAnywhere = true;
      const result = minimax(nextGrid, depth - 1, false);
      totalNodes += result.nodes;

      if (result.score > best.score) {
        best = { score: result.score, move: direction };
      }
    }

    // If no moves are possible, this is a Game Over state
    if (!canMoveAnywhere) {
      return { score: -1e6, nodes: 1 }; 
    }

    return { ...best, nodes: totalNodes };
  } 

  // 🎲 MINIMIZER: The Game spawning a random '2' tile
  else {
    let worstScore = Infinity;

    // Find all empty spaces to simulate a tile spawn
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 0) {
          // 🏎️ Optimization: Only clone the row/grid when necessary
          const nextGrid = grid.map(row => [...row]);
          nextGrid[r][c] = 2; 

          const result = minimax(nextGrid, depth - 1, true);
          totalNodes += result.nodes;

          if (result.score < worstScore) {
            worstScore = result.score;
          }
        }
      }
    }

    // If board was full (no empty cells), evaluate current state
    if (worstScore === Infinity) return { score: evaluateGrid(grid), nodes: 1 };

    return { score: worstScore, nodes: totalNodes };
  }
}