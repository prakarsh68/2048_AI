function getEmptyTiles(grid) {
  return grid.flat().filter(x => x === 0).length;
}

function getMaxTile(grid) {
  return Math.max(...grid.flat());
}

function getSmoothness(grid) {
  let score = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] && grid[i][j + 1]) {
        score -= Math.abs(grid[i][j] - grid[i][j + 1]);
      }
    }
  }
  return score;
}

function getMonotonicity(grid) {
  let score = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] >= grid[i][j + 1]) score++;
    }
  }
  return score;
}

export function evaluateGrid(grid) {
  return (
    getEmptyTiles(grid) * 100 +
    getSmoothness(grid) * 0.1 +
    getMaxTile(grid) * 1 +
    getMonotonicity(grid) * 10
  );
}