import { moveLeft, moveRight, moveUp, moveDown } from "../utils/gameLogic";
import { evaluateGrid } from "./heuristics";

// 🔥 Define moves properly (fix for your error)
const moves = {
  left: moveLeft,
  right: moveRight,
  up: moveUp,
  down: moveDown
};

export function alphaBeta(grid, depth, alpha, beta, isMax) {
  let nodes = 1; // 📊 count nodes

  // 🧠 Base case
  if (depth === 0) {
    return { score: evaluateGrid(grid), nodes };
  }

  // 🤖 MAX PLAYER (AI)
  if (isMax) {
    let best = { score: -Infinity, move: null };

    for (let key in moves) {
      let newGrid = moves[key](grid);

      // Skip invalid move
      if (JSON.stringify(newGrid) === JSON.stringify(grid)) continue;

      let result = alphaBeta(newGrid, depth - 1, alpha, beta, false);
      nodes += result.nodes;

      if (result.score > best.score) {
        best = { score: result.score, move: key };
      }

      // 🔥 Alpha update
      alpha = Math.max(alpha, best.score);

      // ✂️ PRUNING
      if (beta <= alpha) break;
    }

    return { ...best, nodes };
  }

  // 🎲 MIN PLAYER (random tile placement)
  else {
    let worst = { score: Infinity };

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          let newGrid = grid.map(r => [...r]);
          newGrid[i][j] = 2; // simulate worst-case tile

          let result = alphaBeta(newGrid, depth - 1, alpha, beta, true);
          nodes += result.nodes;

          if (result.score < worst.score) {
            worst = { score: result.score };
          }

          // 🔥 Beta update
          beta = Math.min(beta, worst.score);

          // ✂️ PRUNING
          if (beta <= alpha) break;
        }
      }
    }

    return { ...worst, nodes };
  }
}