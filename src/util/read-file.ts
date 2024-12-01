import { readFile } from "fs";
import * as path from "path";

export default function getFile(filepath: string): string {
  let fileContents: string = "";
  filepath = path.resolve(import.meta.dirname, filepath);

  console.log(filepath);

  readFile(filepath, "utf8", (err, data) => {
    if (err) {
      console.error("Error getting file: ", err);
      return;
    }
    fileContents = data;
  });

  return fileContents;
}
