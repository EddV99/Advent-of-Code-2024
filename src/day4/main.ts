import getFile from "./../util/read-file.js";
// input file contents
let inputFile = getFile("./../../inputs/day4/input.txt");

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
  while (i < rows  && j >= 0 && str.length < target.length) {
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

function part2() {}

export default function run() {
  console.log("Day 4 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
