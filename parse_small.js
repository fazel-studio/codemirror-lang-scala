import { parser } from "./src/parser.js";

const code = `  def isSuccess: Boolean = this match
    case Success(_) => true
    case Failure(_) => false`;
const tree = parser.parse(code);
let cursor = tree.cursor();
do {
    console.log(cursor.name, cursor.from, cursor.to);
} while (cursor.next());
