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
let lines = INPUT.split("\n");
function part1() {
  // anything greater than 2 is unsafe
  const tolerance = 3;
  // only increasing or decreasing
  let increasing = false;
  // check if first time
  let firstCheck = true;

  let safeCount = 0;
  lines.forEach((line) => {
    let nums = line.split(" ");
    if (firstCheck) {
      firstCheck = false;
      increasing = Number(nums[0]) < Number(nums[1]);
    }

    for (let i = 0; i + 1 < nums.length; i++) {
      if (Number(nums[i]) === Number(nums[i + 1])) break;
      if (Number(nums[i]) > Number(nums[i + 1]) && increasing) break;
      if (Number(nums[i]) < Number(nums[i + 1]) && !increasing) break;
      let x = Math.abs(Number(nums[i]) - Number(nums[i + 1]));
      if (x > tolerance) break;
      if (i + 1 == nums.length - 1) safeCount++;
    }

    firstCheck = true;
  });

  return safeCount;
}

function part2() {}

export default function run() {
  console.log("Day 2 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
