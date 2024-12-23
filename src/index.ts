import * as day01 from "./day01/main.js";
import * as day02 from "./day02/main.js";
import * as day03 from "./day03/main.js";
import * as day04 from "./day04/main.js";
import * as day05 from "./day05/main.js";
import * as day06 from "./day06/main.js";
import * as day07 from "./day07/main.js";
import * as day08 from "./day08/main.js";
import * as day09 from "./day09/main.js";
import * as day10 from "./day10/main.js";
import * as day11 from "./day11/main.js";
import * as day12 from "./day12/main.js";
import * as day13 from "./day13/main.js";
import * as day14 from "./day14/main.js";

const daysDone = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];

let runDay = (day: string) => {
  switch (day) {
    case "1":
      day01.default();
      break;
    case "2":
      day02.default();
      break;
    case "3":
      day03.default();
      break;
    case "4":
      day04.default();
      break;
    case "5":
      day05.default();
      break;
    case "6":
      day06.default();
      break;
    case "7":
      day07.default();
      break;
    case "8":
      day08.default();
      break;
    case "9":
      day09.default();
      break;
    case "10":
      day10.default();
      break;
    case "11":
      day11.default();
      break;
    case "12":
      day12.default();
      break;
    case "13":
      day13.default();
      break;
    case "14":
      day14.default();
      break;
    default:
      console.log(`day${day} hasn't been done`);
  }
};

// get command line args (first two are filepaths)
const args = process.argv.slice(2);

// run only selected days
if (args.length > 0) {
  args.forEach((day) => {
    // remove leading zeros
    day = day.replace(/^0+/, "");
    runDay(day);
  });
} else {
  daysDone.forEach((day) => {
    runDay(day);
  });
}
