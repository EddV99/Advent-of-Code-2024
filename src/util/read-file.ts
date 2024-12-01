import { readFileSync } from "fs";
import * as path from "path";

export default function getFile(filepath: string): string {
  filepath = path.resolve(import.meta.dirname, filepath);
  return readFileSync(filepath, "utf8");
}
