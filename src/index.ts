import * as day1 from "./day1/main.js";
import * as day2 from "./day2/main.js";
import * as day3 from "./day3/main.js";
import * as day4 from "./day4/main.js";
import * as day5 from "./day5/main.js";
import * as day6 from "./day6/main.js";
import * as day7 from "./day7/main.js";
import * as day8 from "./day8/main.js";

const daysDone = ["1", "2", "3", "4", "5", "6", "7", "8"];

let runDay = (day: string) => {
  switch (day) {
    case "1":
      day1.default();
      break;
    case "2":
      day2.default();
      break;
    case "3":
      day3.default();
      break;
    case "4":
      day4.default();
      break;
    case "5":
      day5.default();
      break;
    case "6":
      day6.default();
      break;
    case "7":
      day7.default();
      break;
    case "8":
      day8.default();
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
