import { parser } from "./src/parser.js";
import fs from "fs";

const code = fs.readFileSync("../../Notron/test/test_indent.scala", "utf-8");
const tree = parser.parse(code);
console.log(tree.toString());
