import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

// example contents
const example1: string = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

// edge case where we need to rotate twice
// .#..
// ..#.
// .^..
// ....
const example2: string = `.#..
..#.
.^..
....`;

const INPUT_TEXT = inputFile;

let grid: string[][] = [];
let pos = { r: -1, c: -1 };
let dir = { r: 0, c: 0 };

let lines = INPUT_TEXT.split("\n");
lines.forEach((line, r) => {
  grid.push(line.split(""));
  if (line.includes("^")) {
    pos.r = r;
    pos.c = line.indexOf("^");
    dir = { r: -1, c: 0 };
  } else if (line.includes(">")) {
    pos.r = r;
    pos.c = line.indexOf(">");
    dir = { r: 0, c: 1 };
  } else if (line.includes("v")) {
    pos.r = r;
    pos.c = line.indexOf("v");
    dir = { r: 1, c: 0 };
  } else if (line.includes("<")) {
    pos.r = r;
    pos.c = line.indexOf("<");
    dir = { r: 0, c: -1 };
  }
});

let start_pos = { r: pos.r, c: pos.c };
let start_dir = { r: dir.r, c: dir.c };

let rows = grid.length;
let cols = grid[0].length;

let rotate = (dir: { r: number; c: number }) => {
  // ^ to >
  if (dir.r === -1 && dir.c === 0) {
    dir.r = 0;
    dir.c = 1;
  }
  // > to v
  else if (dir.r === 0 && dir.c === 1) {
    dir.r = 1;
    dir.c = 0;
  }
  // v to <
  else if (dir.r === 1 && dir.c === 0) {
    dir.r = 0;
    dir.c = -1;
  }
  // < to ^
  else if (dir.r === 0 && dir.c === -1) {
    dir.r = -1;
    dir.c = 0;
  }
};

function part1() {
  let count = 1;
  grid[pos.r][pos.c] = "X";

  while (pos.r < rows && pos.r >= 0 && pos.c < cols && pos.c >= 0) {
    if (!(pos.r + dir.r < rows && pos.r + dir.r >= 0 && pos.c + dir.c < cols && pos.c + dir.c >= 0)) {
      count++;
      grid[pos.r][pos.c] = "X";
      break;
    }

    while (grid[pos.r + dir.r][pos.c + dir.c] !== "." && grid[pos.r + dir.r][pos.c + dir.c] !== "X") {
      rotate(dir);
      if (!(pos.r + dir.r < rows && pos.r + dir.r >= 0 && pos.c + dir.c < cols && pos.c + dir.c >= 0)) {
        return count;
      }
    }

    if (grid[pos.r][pos.c] !== "X") count++;
    grid[pos.r][pos.c] = "X";
    pos.r += dir.r;
    pos.c += dir.c;
  }

  return count;
}

let checkCycle = () => {
  pos.r = start_pos.r;
  pos.c = start_pos.c;

  dir.r = start_dir.r;
  dir.c = start_dir.c;

  let visited = new Set<string>();

  while (pos.r < rows && pos.r >= 0 && pos.c < cols && pos.c >= 0) {
    // we went outside, so no cycle
    if (!(pos.r + dir.r < rows && pos.r + dir.r >= 0 && pos.c + dir.c < cols && pos.c + dir.c >= 0)) {
      return false;
    }

    let info = JSON.stringify({ pos: { x: pos.c, y: pos.r }, dir: { x: dir.c, y: dir.r } });
    // if already visited in same direction then it's a cycle
    if (visited.has(info)) return true;
    else visited.add(info);

    while (grid[pos.r + dir.r][pos.c + dir.c] === "#") {
      rotate(dir);
      if (!(pos.r + dir.r < rows && pos.r + dir.r >= 0 && pos.c + dir.c < cols && pos.c + dir.c >= 0)) {
        return false;
      }
    }

    pos.r += dir.r;
    pos.c += dir.c;
  }

  return false;
};

function part2() {
  // NOTE: only works because part1 has filled the grid with Xs
  // Xs represent path the guard takes
  let count = 0;
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < cols; ++c) {
      // only check for places the guard might go
      if (grid[r][c] === "X" && !(r === start_pos.r && c === start_pos.c)) {
        // place the obstruction and check if cycle
        grid[r][c] = "#";
        if (checkCycle()) count++;
        grid[r][c] = "X";
      }
    }
  }

  return count;
}

export default function run() {
  console.log("Day 6 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
