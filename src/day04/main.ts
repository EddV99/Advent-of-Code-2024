import getFile from "./../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

// example contents
const example1: string = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const example2: string = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;

const INPUT_TEXT = inputFile;

// parse data
let data = INPUT_TEXT.split("\n").filter((line) => line.trim() !== "");
let rows = data.length;
let cols = data[0].length;
let done = new Array(rows).fill(false).map(() => Array(cols).fill(false));

let target = "XMAS";
let targetBackwards = "SAMX";

function checkHorizontal(r: number, c: number) {
  let str = "";
  let i = c;
  while (i < cols && i < c + target.length) {
    str += data[r][i];
    i++;
  }
  if (str === target || str === targetBackwards) return 1;
  return 0;
}

function checkVertical(r: number, c: number) {
  let str = "";
  let i = r;
  while (i < rows && i < r + target.length) {
    str += data[i][c];
    i++;
  }
  if (str === target || str === targetBackwards) return 1;
  return 0;
}

function checkDia(r: number, c: number) {
  let count = 0;
  let str = "";

  let i = r;
  let j = c;

  while (i < rows && j < cols && str.length < target.length) {
    str += data[i][j];
    i++;
    j++;
  }
  if (str === target || str === targetBackwards) count++;

  str = "";
  i = r;
  j = c;
  while (i < rows && j >= 0 && str.length < target.length) {
    str += data[i][j];
    i++;
    j--;
  }

  if (str === target || str === targetBackwards) count++;
  return count;
}

function countXMAS(r: number, c: number) {
  let result = 0;

  result += checkHorizontal(r, c);
  result += checkVertical(r, c);
  result += checkDia(r, c);

  return result;
}

function part1() {
  let result = 0;
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < cols; ++c) {
      result += countXMAS(r, c);
    }
  }

  return result;
}

function countXMAS2(r: number, c: number) {
  if (data[r][c] !== "A") return 0;

  let str = "";

  // check one diagonal first
  if (r - 1 >= 0 && c - 1 >= 0) str += data[r - 1][c - 1];
  str += data[r][c];
  if (r + 1 < rows && c + 1 < cols) str += data[r + 1][c + 1];
  if (str !== "MAS" && str !== "SAM") return 0;

  // check other diagonal
  str = "";
  if (r - 1 >= 0 && c + 1 < cols) str += data[r - 1][c + 1];
  str += data[r][c];
  if (r + 1 < rows && c - 1 >= 0) str += data[r + 1][c - 1];
  if (str !== "MAS" && str !== "SAM") return 0;

  return 1;
}

function part2() {
  let result = 0;
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < cols; ++c) {
      result += countXMAS2(r, c);
    }
  }

  return result;
}

export default function run() {
  console.log("Day 4 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
