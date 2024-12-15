import getFile from "../util/read-file.js";
// input file contents
let inputFile = getFile(import.meta.dirname, "input.txt");

// example contents
const example1: string = `2333133121414131402`;
const example2: string = `12345`;

const INPUT_TEXT = inputFile;

// parse input
let diskMap = INPUT_TEXT.trim();

let isFileSize = true;
let id = 0;
let diskMapID: number[] = [];
const FREE = -1;

class Space {
  size: number;
  isFree: boolean;
  id: number | undefined;
  constructor(isFree: boolean, size: number, id?: number) {
    this.size = size;
    this.isFree = isFree;
    this.id = id;
  }
}

let memory: Space[] = [];

for (let i = 0; i < diskMap.length; ++i) {
  let size = Number(diskMap[i]);

  for (let j = 0; j < size; ++j) {
    if (isFileSize) {
      diskMapID.push(id);
    } else {
      diskMapID.push(FREE);
    }
  }

  if (isFileSize) {
    memory.push(new Space(false, size, id));
    id++;
  } else {
    memory.push(new Space(true, size));
  }

  isFileSize = !isFileSize;
}

function part1() {
  let result = 0;
  let map = [...diskMapID];
  let l = 0;
  let r = map.length - 1;

  while (map[l] !== FREE) l++;
  while (map[r] === FREE) r--;

  while (l < r) {
    map[l] = map[r];
    map[r] = FREE;
    while (map[l] !== FREE) l++;
    while (map[r] === FREE) r--;
  }

  let p = 0;
  for (let i = 0; i < map.length; ++i) {
    if (map[i] !== FREE) {
      result += p * map[i];
    }
    p++;
  }

  return result;
}

function part2() {
  let result = 0;

  let r = memory.length - 1;
  while (memory[r].isFree) r--;

  let id: number = memory[r].id!;

  while (id >= 0) {
    for (let l = 0; l < r; ++l) {
      if (memory[l].isFree && memory[r].size <= memory[l].size) {
        let left = memory[l].size - memory[r].size;
        memory[l].id = memory[r].id;
        memory[l].isFree = false;
        memory[l].size = memory[r].size;

        memory[r].isFree = true;
        memory[r].id = undefined;

        if (left > 0) {
          if (memory[l + 1].isFree) memory[l + 1].size += left;
          else memory.splice(l + 1, 0, new Space(true, left));
        }

        break;
      }
    }

    id--;
    while (r >= 0 && (memory[r] === undefined || memory[r].id !== id)) r--;
  }

  let p = 0;
  memory.forEach((m) => {
    if (!m.isFree) {
      for (let i = p; i < p + m.size; ++i) {
        result += i * m.id!;
      }
    }
    p += m.size;
  });

  return result;
}

export default function run() {
  console.log("Day 9 Solution");
  console.log("Part 1:\n", part1());
  console.log("Part 2:\n", part2());
  console.log();
}
