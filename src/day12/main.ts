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

let printA = (grid: any[][]) => {
  grid.forEach((l) => {
    console.log(...l);
  });
};

function dfs(plant: string, fence: Fence, r: number, c: number) {
  visited[r][c] = true;

  //printA(visited);

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
        //console.log(garden[i][j], fence.area, fence.perimeter, fence.perimeter * fence.area);
        result += fence.perimeter * fence.area;
      }
    }
  }

  return result;
}

function part2() {}

export default function run() {
  console.log("Day 12 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
