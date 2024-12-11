import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile("./../../inputs/day6/input.txt");

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
      break;
    }
    let oncoming = grid[pos.r + dir.r][pos.c + dir.c];
    // oncoming is an obsticle
    if (oncoming !== "." && oncoming !== "X") {
      rotate(dir);
    }
    if (grid[pos.r][pos.c] !== "X") count++;
    grid[pos.r][pos.c] = "X";
    pos.r += dir.r;
    pos.c += dir.c;
  }

  return count;
}

function part2() {}

export default function run() {
  console.log("Day 6 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
