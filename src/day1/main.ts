import getFile from "./../util/read-file.js";
// input file contents
let inputFile = getFile("./../../inputs/day1/input.txt");

// example contents
const example1: string = `3   4
4   3
2   5
1   3
3   9
3   3`;

let leftList: string[] = [];
let rightList: string[] = [];

const INPUT_TEXT = inputFile;

// parse input
let input = INPUT_TEXT.split("\n");
input.forEach((line) => {
  let tokens = line.split(/\s+/);
  if (tokens.length == 2 && tokens[0].length > 0 && tokens[1].length > 0) {
    leftList.push(tokens[0]);
    rightList.push(tokens[1]);
  }
});

function part1(): number {
  let sortedLeftList = [...leftList].sort();
  let sortedRightList = [...rightList].sort();

  let sum = 0;
  for (let i = 0; i < sortedLeftList.length; ++i) {
    sum += Math.abs(Number(sortedLeftList[i]) - Number(sortedRightList[i]));
  }

  return sum;
}

function part2(): number {
  let leftMap = new Map<string, number>();
  let rightMap = new Map<string, number>();

  for (let i = 0; i < leftList.length; i++) {
    let lv = leftList[i];
    let rv = rightList[i];

    if (leftMap.has(lv)) {
      leftMap.set(lv, leftMap.get(lv)! + 1);
    } else {
      leftMap.set(lv, 1);
    }

    if (rightMap.has(rv)) {
      rightMap.set(rv, rightMap.get(rv)! + 1);
    } else {
      rightMap.set(rv, 1);
    }
  }

  let sum = 0;
  leftMap.forEach((value, key) => {
    if (rightMap.has(key)) sum += value * Number(key) * rightMap.get(key)!;
  });

  return sum;
}

export default function run() {
  console.log("Day 1 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
