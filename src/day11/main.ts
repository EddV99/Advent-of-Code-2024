import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

// example contents
const example1: string = `0 1 10 99 999`;
const example2: string = `125 17`;
const example3: string = `0`;

const INPUT_TEXT = inputFile;

// parse input
let nums = INPUT_TEXT.trimEnd().split(" ");

let map = new Map<string, number>();
for (let i = 0; i < nums.length; ++i) map.set(nums[i], map.get(nums[i]) === undefined ? 1 : map.get(nums[i])! + 1);

function stoneTransformCount(n: number): number {
  let stones = [...nums];

  for (let x = 0; x < n; ++x) {
    let newStones: string[] = [];
    for (let i = 0; i < stones.length; ++i) {
      if (stones[i] === "0") {
        newStones.push("1");
      } else if (stones[i].length % 2 === 0) {
        let left = stones[i].substring(0, stones[i].length / 2);
        let right = Number(stones[i].substring(stones[i].length / 2)).toString(); // remove leading zeros
        newStones.push(left);
        newStones.push(right);
      } else {
        newStones.push((Number(stones[i]) * 2024).toString());
      }
    }

    stones = newStones;
  }

  return stones.length;
}

function part1() {
  return stoneTransformCount(25);
}

function stoneTransformCount2(n: number): number {
  for (let i = 0; i < n; ++i) {
    let newMap = new Map<string, number>();

    map.forEach((v, k) => {
      if (k === "0") {
        newMap.set("1", newMap.get("1") === undefined ? v : newMap.get("1")! + v);
      } else if (k.length % 2 === 0) {
        let left = k.substring(0, k.length / 2);
        let right = Number(k.substring(k.length / 2)).toString(); // remove leading zeros
        newMap.set(left, newMap.get(left) === undefined ? v : newMap.get(left)! + v);
        newMap.set(right, newMap.get(right) === undefined ? v : newMap.get(right)! + v);
      } else {
        let x = (Number(k) * 2024).toString();
        newMap.set(x, newMap.get(x) === undefined ? v : newMap.get(x)! + v);
      }
    });

    map = newMap;
  }

  let sum = 0;
  map.forEach((v) => (sum += v));

  return sum;
}

function part2() {
  return stoneTransformCount2(75);
}

export default function run() {
  console.log("Day 11 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
