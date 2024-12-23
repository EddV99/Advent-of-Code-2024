import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

const useExample = false;

// example contents
const example1: string = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

let INPUT_TEXT = "";
let rows = 0;
let cols = 0;
if (useExample) {
  INPUT_TEXT = example1;
  rows = 7;
  cols = 11;
} else {
  INPUT_TEXT = inputFile;
  rows = 103;
  cols = 101;
}

interface Robot {
  pos: { x: number; y: number };
  vel: { dx: number; dy: number };
}
const emptyRobot = (): Robot => {
  return { pos: { x: NaN, y: NaN }, vel: { dx: NaN, dy: NaN } };
};

let robots: Robot[] = [];

INPUT_TEXT.trim()
  .split("\n")
  .forEach((line) => {
    let r: Robot = emptyRobot();
    let t = line.split(" ");
    let pos = t[0].substring(2).split(",");
    r.pos.x = Number(pos[0]);
    r.pos.y = Number(pos[1]);

    let vel = t[1].substring(2).split(",");
    r.vel.dx = Number(vel[0]);
    r.vel.dy = Number(vel[1]);

    robots.push(r);
  });

// mod with no negative number answers
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// parse input
function part1() {
  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  let t = 100;
  let midH = Math.floor(rows / 2);
  let midV = Math.floor(cols / 2);

  let isQ1 = (pos: { x: number; y: number }) => pos.x < midV && pos.y < midH;
  let isQ2 = (pos: { x: number; y: number }) => pos.x > midV && pos.y < midH;
  let isQ3 = (pos: { x: number; y: number }) => pos.x < midV && pos.y > midH;
  let isQ4 = (pos: { x: number; y: number }) => pos.x > midV && pos.y > midH;

  robots.forEach((r) => {
    let finalPos = { x: mod(r.vel.dx * t + r.pos.x, cols), y: mod(r.vel.dy * t + r.pos.y, rows) };
    if (isQ1(finalPos)) q1++;
    else if (isQ2(finalPos)) q2++;
    else if (isQ3(finalPos)) q3++;
    else if (isQ4(finalPos)) q4++;
  });

  return q1 * q2 * q3 * q4;
}

let printArray = (arr: boolean[][]) => {
  arr.forEach((line) => {
    let p = "";
    line.forEach((v) => {
      p += v ? "X" : " ";
    });
    console.log(p);
  });
};

function part2() {
  let midH = Math.floor(rows / 2);
  let midV = Math.floor(cols / 2);

  /*
   * Did a for loop and printed to console to find the tree.
   * Actually just piped the output to a file and used vim to
   * search for a continuous "XXXXXXXXX"
   */
  //for (let t = 1; t < 10000; t++) {
  //  const grid: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  //
  //  robots.forEach((r) => {
  //    let finalPos = { x: mod(r.vel.dx * t + r.pos.x, cols), y: mod(r.vel.dy * t + r.pos.y, rows) };
  //    grid[finalPos.y][finalPos.x] = true;
  //  });
  //
  //  console.log(`t is ${t}`);
  //  printArray(grid);
  //  console.log();
  //}

  const grid: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  let t = 7892;

  robots.forEach((r) => {
    let finalPos = { x: mod(r.vel.dx * t + r.pos.x, cols), y: mod(r.vel.dy * t + r.pos.y, rows) };
    grid[finalPos.y][finalPos.x] = true;
  });
  // uncomment to see the easter egg
  // printArray(grid);
  return t;
}

export default function run() {
  console.log("Day 14 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
