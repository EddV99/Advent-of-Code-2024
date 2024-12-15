import getFile from "../util/read-file.js";

const inputFile = getFile("input.txt");
const example1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const example2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const INPUT = inputFile;

// parse input
let lines = INPUT.split("\n").filter((line) => line.trim() !== "");

function isNumeric(str: string) {
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

function doMulIns(line: string): number {
  let result = 0;

  for (let i = 0; i < line.length; ++i) {
    if (line.substring(i, i + 4) === "mul(") {
      i = i + 4;

      let num1 = "";
      while (isNumeric(line[i])) {
        num1 += line[i];
        i++;
      }
      if (num1.length <= 0 || num1.length > 3) continue;

      if (line[i] !== ",") continue;
      i++;

      let num2 = "";
      while (isNumeric(line[i])) {
        num2 += line[i];
        i++;
      }
      if (num2.length <= 0 || num2.length > 3) continue;

      if (line[i] !== ")") continue;

      result += Number(num1) * Number(num2);
    }
  }

  return result;
}

function part1() {
  let result = 0;

  lines.forEach((line) => {
    result += doMulIns(line);
  });

  return result;
}

function doMulInsWithCond(line: string, start: { toggled: boolean }): number {
  let result = 0;

  for (let i = 0; i < line.length; ++i) {
    if (line.substring(i, i + 4) === "do()") {
      i = i + 4;
      start.toggled = true;
    }
    if (line.substring(i, i + 7) === "don't()") {
      i = i + 7;
      start.toggled = false;
    }
    if (line.substring(i, i + 4) === "mul(") {
      i = i + 4;

      let num1 = "";
      while (isNumeric(line[i])) {
        num1 += line[i];
        i++;
      }
      if (num1.length <= 0 || num1.length > 3) continue;

      if (line[i] !== ",") continue;
      i++;

      let num2 = "";
      while (isNumeric(line[i])) {
        num2 += line[i];
        i++;
      }
      if (num2.length <= 0 || num2.length > 3) continue;

      if (line[i] !== ")") continue;

      if (start.toggled) result += Number(num1) * Number(num2);
    }
  }

  return result;
}

function part2() {
  let result = 0;
  let start = { toggled: true };

  lines.forEach((line) => {
    result += doMulInsWithCond(line, start);
  });

  return result;
}

export default function run() {
  console.log("Day 3 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
