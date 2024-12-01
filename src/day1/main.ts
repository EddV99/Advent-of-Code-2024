import getFile from "./../util/read-file.js";

// input file contents
let inputText = getFile("./../../inputs/day1/input.txt");

// example contents
const example1: string = `3   4
4   3
2   5
1   3
3   9
3   3`;

let leftList: string[] = [];
let rightList: string[] = [];

// parse input
let input = inputText.split("\n");
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
  return 0;
}

export default function run() {
  console.log("Day 1 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
}
