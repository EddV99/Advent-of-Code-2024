import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

// example contents
const example1: string = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

const example2: string = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`;

const example3: string = `AAA
ABA
AAA`;

const INPUT_TEXT = inputFile;

class Pos {
  r: number;
  c: number;

  constructor(r: number, c: number) {
    this.r = r;
    this.c = c;
  }
}

class Fence {
  area: number;
  perimeter: number;

  constructor(area: number, perimeter: number) {
    this.area = area;
    this.perimeter = perimeter;
  }
}

// parse input
let lines = INPUT_TEXT.trim().split("\n");

let garden: string[][] = [];

lines.forEach((line, r) => {
  let plants = line.trim().split("");
  garden.push([]);
  plants.forEach((plant, c) => {
    garden[r].push(plant);
  });
});

let rows = garden.length;
let cols = garden[0].length;
let dirs = [new Pos(-1, 0), new Pos(0, 1), new Pos(1, 0), new Pos(0, -1)];

let visited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));

function inBounds(r: number, c: number) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

function countEdge(plant: string, r: number, c: number): number {
  let count = 0;
  dirs.forEach((d) => {
    let pos = new Pos(d.r + r, d.c + c);
    if (!inBounds(pos.r, pos.c) || garden[pos.r][pos.c] !== plant) {
      count++;
    }
  });
  return count;
}

function dfs(plant: string, fence: Fence, r: number, c: number) {
  visited[r][c] = true;

  dirs.forEach((d) => {
    let pos = new Pos(d.r + r, d.c + c);

    if (inBounds(pos.r, pos.c) && garden[pos.r][pos.c] === plant && !visited[pos.r][pos.c]) {
      fence.perimeter += countEdge(plant, pos.r, pos.c);
      fence.area++;
      dfs(plant, fence, pos.r, pos.c);
    }
  });
}

function part1() {
  let result = 0;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (!visited[i][j]) {
        let fence = new Fence(1, countEdge(garden[i][j], i, j));
        dfs(garden[i][j], fence, i, j);
        result += fence.perimeter * fence.area;
      }
    }
  }

  return result;
}

function countCorner(plant: string, r: number, c: number) {
  let count = 0;

  let isSame = (r: number, c: number) => {
    if (!inBounds(r, c)) return false;
    else return garden[r][c] === plant;
  };

  let dirs = [
    [
      { dr: 0, dc: -1 },
      { dr: -1, dc: -1 },
      { dr: -1, dc: 0 },
    ],
    [
      { dr: 0, dc: 1 },
      { dr: -1, dc: 1 },
      { dr: -1, dc: 0 },
    ],
    [
      { dr: 0, dc: -1 },
      { dr: 1, dc: -1 },
      { dr: 1, dc: 0 },
    ],
    [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: 0 },
    ],
  ];

  dirs.forEach((d) => {
    if (isSame(d[0].dr + r, d[0].dc + c) && !isSame(d[1].dr + r, d[1].dc + c) && isSame(d[2].dr + r, d[2].dc + c))
      count++;
    if (!isSame(d[0].dr + r, d[0].dc + c) && !isSame(d[2].dr + r, d[2].dc + c)) count++;
  });

  return count;
}

function dfs2(plant: string, fence: Fence, r: number, c: number) {
  visited[r][c] = true;

  dirs.forEach((d) => {
    let pos = new Pos(d.r + r, d.c + c);

    if (inBounds(pos.r, pos.c) && garden[pos.r][pos.c] === plant && !visited[pos.r][pos.c]) {
      fence.perimeter += countCorner(plant, pos.r, pos.c);
      fence.area++;
      dfs2(plant, fence, pos.r, pos.c);
    }
  });
}

function part2() {
  let result = 0;
  visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (!visited[i][j]) {
        let fence = new Fence(1, countCorner(garden[i][j], i, j));
        dfs2(garden[i][j], fence, i, j);
        result += fence.perimeter * fence.area;
      }
    }
  }

  return result;
}

export default function run() {
  console.log("Day 12 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
