function slide(row) {
  let arr = row.filter(val => val !== 0);
  while (arr.length < 4) arr.push(0);
  return arr;
}

function combine(row) {
  for (let i = 0; i < 3; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }
  return row;
}

export function moveLeft(grid) {
  return grid.map(row => slide(combine(slide(row))));
}

function reverse(grid) {
  return grid.map(row => [...row].reverse());
}

function transpose(grid) {
  return grid[0].map((_, i) => grid.map(row => row[i]));
}

export function moveRight(grid) {
  return reverse(moveLeft(reverse(grid)));
}

export function moveUp(grid) {
  return transpose(moveLeft(transpose(grid)));
}

export function moveDown(grid) {
  return transpose(moveRight(transpose(grid)));
}

export function addRandomTile(grid) {
  let empty = [];

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) empty.push({ i, j });
    });
  });

  if (!empty.length) return grid;

  let { i, j } = empty[Math.floor(Math.random() * empty.length)];
  let newGrid = grid.map(r => [...r]);
  newGrid[i][j] = Math.random() < 0.9 ? 2 : 4;

  return newGrid;
}

export function isDifferent(a, b) {
  return JSON.stringify(a) !== JSON.stringify(b);
}

// 🔥 NEW: Game Over Check
export function canMove(grid) {
  if (grid.flat().includes(0)) return true;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === grid[i][j + 1]) return true;
    }
  }

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      if (grid[i][j] === grid[i + 1][j]) return true;
    }
  }

  return false;
}