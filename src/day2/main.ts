import getFile from "../util/read-file.js";

const inputFile = getFile("../../inputs/day2/input.txt");
const example1 = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const INPUT = inputFile;

// parse input
let lines = INPUT.split("\n").filter((line) => line.trim() !== "");

function isValid(nums: string[]) {
  let onlyInc = true;
  let onlyDec = true;
  let tolerance = 3;
  let bad = false;

  for (let i = 0; i < nums.length - 1; i++) {
    let diff = Math.abs(Number(nums[i + 1]) - Number(nums[i]));
    if (diff > tolerance || diff < 1) bad = true;
    if (Number(nums[i]) > Number(nums[i + 1])) onlyInc = false;
    if (Number(nums[i]) < Number(nums[i + 1])) onlyDec = false;
  }

  return !bad && (onlyInc || onlyDec);
}

function part1() {
  let safeCount = 0;
  lines.forEach((line) => {
    let nums = line.split(" ");
    if (nums.length > 0) {
      if (isValid(nums)) safeCount++;
    }
  });

  return safeCount;
}

function part2() {
  let count = 0;

  lines.forEach((line) => {
    let nums = line.split(" ");

    if (!isValid(nums)) {
      for (let i = 0; i < nums.length; i++) {
        let newNums = [...nums];
        newNums.splice(i, 1);
        if (isValid(newNums)) {
          count++;
          break;
        }
      }
    } else {
      count++;
    }
  });
  return count;
}

export default function run() {
  console.log("Day 2 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
