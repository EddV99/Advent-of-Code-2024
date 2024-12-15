import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile("input.txt");

// example contents
const example1: string = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const INPUT_TEXT = inputFile;

// parse input
let zeros: { r: number; c: number }[] = [];
let grid: number[][] = INPUT_TEXT.trimEnd()
  .split("\n")
  .map((n, r) =>
    n.split("").map((num, c) => {
      let number = Number(num);
      if (number === 0) {
        zeros.push({ r: r, c: c });
      }
      return number;
    })
  );

let dfs = (r: number, c: number, count: number, visited: Set<string>): number => {
  if (count === 9) {
    let pos = JSON.stringify({ r: r, c: c });
    if (visited.has(pos)) return 0;

    visited.add(pos);
    return 1;
  }

  let result = 0;
  if (r + 1 < grid.length && grid[r + 1][c] - grid[r][c] === 1) {
    result += dfs(r + 1, c, count + 1, visited);
  }
  if (r - 1 >= 0 && grid[r - 1][c] - grid[r][c] === 1) {
    result += dfs(r - 1, c, count + 1, visited);
  }
  if (c + 1 < grid[0].length && grid[r][c + 1] - grid[r][c] === 1) {
    result += dfs(r, c + 1, count + 1, visited);
  }
  if (c - 1 >= 0 && grid[r][c - 1] - grid[r][c] === 1) {
    result += dfs(r, c - 1, count + 1, visited);
  }

  return result;
};

function part1() {
  let result = 0;

  zeros.forEach((pos) => {
    let visited = new Set<string>();
    result += dfs(pos.r, pos.c, 0, visited);
  });

  return result;
}

let dfs2 = (r: number, c: number, count: number): number => {
  if (count === 9) {
    return 1;
  }

  let result = 0;
  if (r + 1 < grid.length && grid[r + 1][c] - grid[r][c] === 1) {
    result += dfs2(r + 1, c, count + 1);
  }
  if (r - 1 >= 0 && grid[r - 1][c] - grid[r][c] === 1) {
    result += dfs2(r - 1, c, count + 1);
  }
  if (c + 1 < grid[0].length && grid[r][c + 1] - grid[r][c] === 1) {
    result += dfs2(r, c + 1, count + 1);
  }
  if (c - 1 >= 0 && grid[r][c - 1] - grid[r][c] === 1) {
    result += dfs2(r, c - 1, count + 1);
  }

  return result;
};

function part2() {
  let result = 0;

  zeros.forEach((pos) => {
    result += dfs2(pos.r, pos.c, 0);
  });

  return result;
}

export default function run() {
  console.log("Day 10 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
