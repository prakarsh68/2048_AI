/**
 * 🏆 Weight Matrix (The "Snake" Pattern)
 * This is the secret sauce. It tells the AI that tiles in the 
 * corners are worth significantly more than tiles in the middle.
 */
const WEIGHT_MATRIX = [
  [2048, 1024, 512, 256],
  [16,   32,   64,  128],
  [8,    4,    2,   1],
  [0.5,  0.2,  0.1, 0.05]
];

function getWeightedScore(grid) {
  let score = 0;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      score += grid[r][c] * WEIGHT_MATRIX[r][c];
    }
  }
  return score;
}

/**
 * 🧊 Smoothness: Penalizes adjacent tiles that have a large 
 * difference in value. We use Log2 to make the penalty relative.
 */
function getSmoothness(grid) {
  let smoothness = 0;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] !== 0) {
        const val = Math.log2(grid[r][c]);
        // Check right neighbor
        if (c < 3 && grid[r][c + 1] !== 0) {
          smoothness -= Math.abs(val - Math.log2(grid[r][c + 1]));
        }
        // Check bottom neighbor
        if (r < 3 && grid[r + 1][c] !== 0) {
          smoothness -= Math.abs(val - Math.log2(grid[r + 1][c]));
        }
      }
    }
  }
  return smoothness;
}

/**
 * 📉 Monotonicity: Ensures tiles increase or decrease in a 
 * steady direction (up/down and left/right).
 */
function getMonotonicity(grid) {
  let totals = [0, 0, 0, 0]; // up, down, left, right

  // Left/Right monotonicity
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      const current = grid[r][c] !== 0 ? Math.log2(grid[r][c]) : 0;
      const next = grid[r][c + 1] !== 0 ? Math.log2(grid[r][c + 1]) : 0;
      if (current > next) totals[0] += next - current;
      else totals[1] += current - next;
    }
  }

  // Up/Down monotonicity
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      const current = grid[r][c] !== 0 ? Math.log2(grid[r][c]) : 0;
      const next = grid[r + 1][c] !== 0 ? Math.log2(grid[r + 1][c]) : 0;
      if (current > next) totals[2] += next - current;
      else totals[3] += current - next;
    }
  }

  return Math.max(totals[0], totals[1]) + Math.max(totals[2], totals[3]);
}

function getEmptyTiles(grid) {
  let count = 0;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) count++;
    }
  }
  // Using log helps prioritize the "last few" empty slots more heavily
  return count > 0 ? Math.log(count) : 0;
}

export function evaluateGrid(grid) {
  // Check for game over (no empty tiles and no merges)
  // This is handled by return -Infinity in minimax/alphabeta usually

  return (
    getWeightedScore(grid) * 1.0 +
    getSmoothness(grid)    * 0.2 +
    getMonotonicity(grid)  * 1.5 +
    getEmptyTiles(grid)    * 2.5
  );
}