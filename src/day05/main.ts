import getFile from "./../util/read-file.js";
// input file contents
let inputFile = getFile("input.txt");

// example contents
const example1: string = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const INPUT_TEXT = inputFile;

let inputArray = INPUT_TEXT.split("\n");
let splitIndex = inputArray.findIndex((v) => v.trim() === "");

let pageOrderRules = inputArray.slice(0, splitIndex);
let pagesPerUpdate = inputArray.slice(splitIndex + 1);

// parse the page order rules into a map
let rules = new Map<string, string[]>();
pageOrderRules.forEach((line) => {
  let nums = line.split("|");
  if (rules.has(nums[0])) rules.get(nums[0])!.push(nums[1]);
  else rules.set(nums[0], [nums[1]]);
});

function part1() {
  let count = 0;

  pagesPerUpdate.forEach((line) => {
    let pages = line.split(",");
    let isValid = true;

    for (let i = pages.length - 1; i >= 0; --i) {
      let page = pages[i];
      if (rules.has(page)) {
        let x = rules.get!(page);
        for (let j = i - 1; j >= 0; j--) {
          if (x!.includes(pages[j])) {
            isValid = false;
            break;
          }
        }
      }
      if (!isValid) break;
    }

    if (isValid) {
      count += Number(pages[Math.floor(pages.length / 2)]);
    }
  });

  return count;
}

function part2() {
  let count = 0;

  pagesPerUpdate.forEach((line) => {
    let pages = line.split(",");

    let valid = true;

    for (let i = 0; i < pages.length; ++i) {
      let page = pages[i];
      if (rules.has(page)) {
        for (let j = i + 1; j < pages.length; ++j) {
          if (rules.get(pages[j])?.includes(pages[i])) {
            valid = false;
            let t = pages[i];
            pages[i] = pages[j];
            pages[j] = t;
          }
        }
      }
    }

    if (!valid) count += Number(pages[Math.floor(pages.length / 2)]);
  });

  return count;
}

export default function run() {
  console.log("Day 5 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
