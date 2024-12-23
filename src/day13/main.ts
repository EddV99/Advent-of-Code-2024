import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

// example contents
const example1: string = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

const INPUT_TEXT = inputFile;

// parse input
let lines = INPUT_TEXT.split("\n");

interface setup {
  a: { x: number; y: number };
  b: { x: number; y: number };
  prize: { x: number; y: number };
}

let clawMachines: setup[] = [];

let i = 0;
do {
  let setup: setup = {
    a: {
      x: 0,
      y: 0,
    },
    b: {
      x: 0,
      y: 0,
    },
    prize: {
      x: 0,
      y: 0,
    },
  };

  let a = lines[i].split(" ");
  let x = a[2].substring(2, a[2].length - 1);
  let y = a[3].substring(2);
  setup.a.x = Number(x);
  setup.a.y = Number(y);

  let b = lines[i + 1].split(" ");
  x = b[2].substring(2, b[2].length - 1);
  y = b[3].substring(2);
  setup.b.x = Number(x);
  setup.b.y = Number(y);

  let result = lines[i + 2].split(" ");
  x = result[1].substring(2, result[1].length - 1);
  y = result[2].substring(2);
  setup.prize.x = Number(x);
  setup.prize.y = Number(y);

  clawMachines.push(setup);
  i += 4;
} while (i + 3 <= lines.length);

function part1() {
  let isOver = (pos: { x: number; y: number }, target: { x: number; y: number }) => {
    return pos.x > target.x || pos.y > target.y;
  };
  let hit = (pos: { x: number; y: number }, target: { x: number; y: number }) => {
    return pos.x === target.x && pos.y === target.y;
  };
  let price = (a: number, b: number) => a * 3 + b;

  let prices = 0;

  clawMachines.forEach((cm) => {
    let getPos = (a: number, b: number) => {
      return { x: cm.a.x * a + cm.b.x * b, y: cm.a.y * a + cm.b.y * b };
    };

    let minPrice = Number.MAX_VALUE;

    let aMax = Math.ceil(Math.min(cm.prize.x / cm.a.x, cm.prize.y / cm.a.y));
    let bMax = Math.ceil(Math.min(cm.prize.x / cm.b.x, cm.prize.y / cm.b.y));

    for (let i = 0; i < aMax; i++) {
      for (let j = 1; j < bMax; j++) {
        let pos = getPos(i, j);
        if (isOver(pos, cm.prize)) break;
        if (hit(pos, cm.prize) && price(i, j) < minPrice) minPrice = price(i, j);
      }
    }

    for (let i = 0; i < bMax; i++) {
      for (let j = 1; j < aMax; j++) {
        let pos = getPos(j, i);

        if (isOver(pos, cm.prize)) break;
        if (hit(pos, cm.prize) && price(j, i) < minPrice) minPrice = price(j, i);
      }
    }

    if (minPrice !== Number.MAX_VALUE) prices += minPrice;
  });

  return prices;
}

function part2() {
  let hit = (pos: { x: number; y: number }, target: { x: number; y: number }) => {
    return pos.x === target.x && pos.y === target.y;
  };

  let prices = 0;
  clawMachines.forEach((cm) => {
    let getPos = (a: number, b: number) => {
      return { x: cm.a.x * a + cm.b.x * b, y: cm.a.y * a + cm.b.y * b };
    };

    let error = 10000000000000;
    let a = Math.floor(
      (cm.b.x * (cm.prize.y + error) - cm.b.y * (cm.prize.x + error)) / (cm.a.y * cm.b.x - cm.a.x * cm.b.y),
    );
    let b = Math.floor(
      (cm.a.x * (cm.prize.y + error) - cm.a.y * (cm.prize.x + error)) / (cm.a.x * cm.b.y - cm.a.y * cm.b.x),
    );

    if (hit(getPos(a, b), { x: cm.prize.x + error, y: cm.prize.y + error })) {
      prices += a * 3 + b;
    }
  });

  return prices;
}

export default function run() {
  console.log("Day 13 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
