import * as day1 from "./day1/main.js";
import * as day2 from "./day2/main.js";

const daysDone = ["1"];

let runDay = (day: string) => {
  switch (day) {
    case "1":
      day1.default();
      break;
    case "2":
      day2.default();
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
