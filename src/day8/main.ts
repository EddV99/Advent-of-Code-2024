import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile("./../../inputs/day8/input.txt");

// example contents
const example1: string = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const example2: string = `.aa.`;

const INPUT_TEXT = inputFile;

// parse input
let lines = INPUT_TEXT.trim().split("\n");

let row = lines[0].length;
let col = lines.length;

let r = 0;
let c = 0;
let map = new Map<string, { r: number; c: number }[]>();

lines.forEach((line) => {
  c = 0;
  for (let i = 0; i < line.length; ++i) {
    if (line[i] != ".") {
      if (map.has(line[i])) {
        map.get(line[i])!.push({ r: r, c: c });
      } else {
        map.set(line[i], [{ r: r, c: c }]);
      }
    }
    c++;
  }
  r++;
});

function inBounds(r: number, c: number) {
  return r >= 0 && r < row && c >= 0 && c < col;
}

function part1() {
  let count = 0;
  let antinodes = new Set<string>();

  map.forEach((v, k) => {
    for (let i = 0; i < v.length; ++i) {
      for (let j = i + 1; j < v.length; ++j) {
        if (i !== j) {
          let p1 = v[i];
          let p2 = v[j];

          let diff1 = { r: p2.r - p1.r, c: p2.c - p1.c };
          let diff2 = { r: p1.r - p2.r, c: p1.c - p2.c };

          let pos = { r: diff1.r + p2.r, c: diff1.c + p2.c };
          let posStr = JSON.stringify(pos);
          if (inBounds(pos.r, pos.c) && !antinodes.has(posStr)) {
            count++;
            antinodes.add(posStr);
          }

          pos = { r: diff2.r + p1.r, c: diff2.c + p1.c };
          posStr = JSON.stringify(pos);
          if (inBounds(pos.r, pos.c) && !antinodes.has(posStr)) {
            count++;
            antinodes.add(posStr);
          }
        }
      }
    }
  });

  return count;
}

function part2() {}

export default function run() {
  console.log("Day 8 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
