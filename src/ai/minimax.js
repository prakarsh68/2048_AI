import { moveLeft, moveRight, moveUp, moveDown } from "../utils/gameLogic";
import { evaluateGrid } from "./heuristics";

const moves = {
  left: moveLeft,
  right: moveRight,
  up: moveUp,
  down: moveDown
};

export function minimax(grid, depth, isMax) {
  let nodes = 1;

  if (depth === 0) {
    return { score: evaluateGrid(grid), nodes };
  }

  if (isMax) {
    let best = { score: -Infinity, move: null };

    for (let key in moves) {
      let newGrid = moves[key](grid);

      if (JSON.stringify(newGrid) === JSON.stringify(grid)) continue;

      let result = minimax(newGrid, depth - 1, false);
      nodes += result.nodes;

      if (result.score > best.score) {
        best = { score: result.score, move: key };
      }
    }

    return { ...best, nodes };
  } else {
    let worst = { score: Infinity };

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          let newGrid = grid.map(r => [...r]);
          newGrid[i][j] = 2;

          let result = minimax(newGrid, depth - 1, true);
          nodes += result.nodes;

          if (result.score < worst.score) {
            worst = { score: result.score };
          }
        }
      }
    }

    return { ...worst, nodes };
  }
}