import { readFileSync } from "fs";
import * as path from "path";

export default function getFile(directory: string, filepath: string): string {
  filepath = path.resolve(directory, filepath);
  return readFileSync(filepath, "utf8");
}
