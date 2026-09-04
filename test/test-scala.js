import { parser } from "../src/parser.js"
import { fileTests } from "@lezer/generator/dist/test"
import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"

const caseFile = path.join(path.dirname(fileURLToPath(import.meta.url)), "cases.txt")
const caseText = fs.readFileSync(caseFile, "utf8")
const tests = fileTests(caseText, "cases.txt")

describe("scala", () => {
  for (let {name, run} of tests) {
    it(name, () => run(parser))
  }
})
