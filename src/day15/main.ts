import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

const useExample = false;

// example contents
const example1: string = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;
const example2: string = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

let INPUT_TEXT = "";
if (useExample) {
  INPUT_TEXT = example2;
} else {
  INPUT_TEXT = inputFile;
}
interface Pos {
  r: number;
  c: number;
}

function newPos(r: number, c: number) {
  return { r: r, c: c };
}

let grid: string[][] = [];
let gridWide: string[][] = [];
let movements: string[] = [];
let parsingGrid = true;
let pos: { r: number; c: number } = { r: 0, c: 0 };
let posW: { r: number; c: number } = { r: 0, c: 0 };
let dirs = new Map<string, Pos>();
dirs.set(">", { r: 0, c: 1 });
dirs.set("v", { r: 1, c: 0 });
dirs.set("<", { r: 0, c: -1 });
dirs.set("^", { r: -1, c: 0 });

INPUT_TEXT.trim()
  .split("\n")
  .forEach((line, r) => {
    if (line === "") {
      parsingGrid = false;
    } else if (parsingGrid) {
      let wideLine = line.replaceAll("#", "##");
      wideLine = wideLine.replaceAll("O", "[]");
      wideLine = wideLine.replaceAll(".", "..");
      wideLine = wideLine.replaceAll("@", "@.");
      let rowWide = wideLine.split("");
      if (rowWide.includes("@")) {
        posW.r = r;
        posW.c = rowWide.indexOf("@");
      }
      gridWide.push(rowWide);

      let row = line.split("");
      if (row.includes("@")) {
        pos.r = r;
        pos.c = row.indexOf("@");
      }
      grid.push(row);
    } else {
      movements.push(...line.split(""));
    }
  });

let move = (pos: Pos, dir: string) => {
  if (grid[pos.r][pos.c] === "#" || grid[pos.r][pos.c] === ".") return;

  let d = dirs.get(dir)!;
  move({ r: pos.r + d.r, c: pos.c + d.c }, dir);
  if (grid[pos.r + d.r][pos.c + d.c] === ".") {
    grid[pos.r + d.r][pos.c + d.c] = grid[pos.r][pos.c];
    grid[pos.r][pos.c] = ".";
    pos.r += d.r;
    pos.c += d.c;
  }
};

// parse input
function part1() {
  movements.forEach((m) => {
    move(pos, m);
  });
  let gps = 0;
  grid.forEach((row, r) => {
    row.forEach((e, c) => {
      if (e === "O") {
        gps += 100 * r + c;
      }
    });
  });

  return gps;
}

let getAllMoving = (pos: Pos, dir: Pos): Pos[] => {
  // positions to check if valid
  let a = newPos(pos.r, pos.c);
  let check: Pos[] = [a];
  let result: Pos[] = [a];
  let checked = new Set<string>();

  while (check.length) {
    let current = check.pop()!;

    let str = JSON.stringify(current);
    if (checked.has(str)) continue;
    else checked.add(str);

    let to = gridWide[current.r + dir.r][current.c + dir.c];
    if (to === ".") {
      continue;
    }

    if (to === "#") {
      result = [];
      return result;
    }

    if (to === "[") {
      // add [
      let left = newPos(current.r + dir.r, current.c + dir.c);
      result.push(left);
      if (dir.c !== 1) check.push(left);

      // add ]
      let right = newPos(current.r + dir.r, current.c + dir.c + 1);
      check.push(right);
      result.push(right);
    }

    if (to === "]") {
      // add ]
      let right = newPos(current.r + dir.r, current.c + dir.c);
      result.push(right);
      if (dir.c !== -1) check.push(right);

      // add [
      let left = newPos(current.r + dir.r, current.c + dir.c - 1);
      result.push(left);
      check.push(left);
    }
  }

  return result;
};

function part2() {
  movements.forEach((m) => {
    let dir = dirs.get(m)!;
    let needToMove = getAllMoving(posW, dir);
    let did = new Set<string>();

    while (needToMove.length) {
      let current = needToMove.pop()!;

      let str = JSON.stringify(current);
      if (did.has(str)) continue;

      if (gridWide[current.r + dir.r][current.c + dir.c] === ".") {
        did.add(str);
        if (gridWide[current.r][current.c] === "@") {
          posW.r = current.r + dir.r;
          posW.c = current.c + dir.c;
        }
        gridWide[current.r + dir.r][current.c + dir.c] = gridWide[current.r][current.c];
        gridWide[current.r][current.c] = ".";
      } else {
        needToMove.splice(0, 0, current);
      }
    }
  });

  let gps = 0;
  gridWide.forEach((row, r) => {
    row.forEach((e, c) => {
      if (e === "[") {
        gps += 100 * r + c;
      }
    });
  });

  return gps;
}

export default function run() {
  console.log("Day 15 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
