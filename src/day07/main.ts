import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

// example contents
const example1: string = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const INPUT_TEXT = inputFile;

// parse the input
let equations: { result: number; nums: number[] }[] = [];

let lines = INPUT_TEXT.split("\n");
lines.forEach((line) => {
  let split = line.split(": ");
  if (split[0].length > 0) {
    let nums: number[] = [];
    split[1].split(" ").forEach((num) => {
      nums.push(Number(num.trim()));
    });

    equations.push({ result: Number(split[0]), nums: nums });
  }
});

//console.log(equations);
//  0 1 2  3
// 0 1 2  3  4
// 1 3 44 11 11

function isPossible(sum: number, index: number, nums: number[], target: number, m: number): boolean {
  if (index === m - 1) return sum === target;
  return (
    isPossible(sum + nums[index + 1], index + 1, nums, target, m) ||
    isPossible(sum * nums[index + 1], index + 1, nums, target, m)
  );
}

function part1() {
  let count = 0;

  equations.forEach((equation) => {
    if (isPossible(equation.nums[0], 0, equation.nums, equation.result, equation.nums.length)) {
      count += equation.result;
    }
  });

  return count;
}

function combine(num1: number, num2: number): number {
  let y = num2;

  let p = 0;
  while (y > 0) {
    y = Math.floor(y / 10);
    p++;
  }

  return num1 * Math.pow(10, p) + num2;
}

function isPossible2(sum: number, index: number, nums: number[], target: number, m: number): boolean {
  if (index === m - 1) return sum === target;
  return (
    isPossible2(sum + nums[index + 1], index + 1, nums, target, m) ||
    isPossible2(sum * nums[index + 1], index + 1, nums, target, m) ||
    isPossible2(combine(sum, nums[index + 1]), index + 1, nums, target, m)
  );
}

function part2() {
  let count = 0;

  equations.forEach((equation) => {
    if (isPossible2(equation.nums[0], 0, equation.nums, equation.result, equation.nums.length)) {
      count += equation.result;
    }
  });

  return count;
}

export default function run() {
  console.log("Day 7 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
