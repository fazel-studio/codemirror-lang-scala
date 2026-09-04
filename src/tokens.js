import { ExternalTokenizer, ContextTracker } from "@lezer/lr"
import { INDENT, DEDENT } from "./parser.terms.js"

const newline = 10, carriageReturn = 13, space = 32, tab = 9

class Context {
  constructor(parent, indent) {
    this.parent = parent
    this.indent = indent
    this.hash = parent ? (parent.hash * 31 + indent) | 0 : indent
  }
}

const top = new Context(null, 0)

export const trackIndent = new ContextTracker({
  start: top,
  shift(context, term, stack, input) {
    if (term == INDENT) {
      let indent = 0
      let pos = stack.pos - 1
      while (pos >= 0) {
        let ch = input.read(pos, pos + 1).charCodeAt(0)
        if (ch == 10 || ch == 13) break
        pos--
      }
      pos++
      // now pos is at the start of the line
      while (pos < stack.pos) {
        let ch = input.read(pos, pos + 1).charCodeAt(0)
        if (ch == 32) indent++
        else if (ch == 9) indent += 8 - (indent % 8)
        pos++
      }
      return new Context(context, indent)
    }
    if (term == DEDENT) {
      return context.parent || top
    }
    return context
  },
  hash(context) { return context.hash }
})

export const indent = new ExternalTokenizer((input, stack) => {
  const cur = stack.context ? stack.context.indent : 0

  if (input.next < 0 && cur > 0) {
    if (stack.canShift(DEDENT)) {
      input.acceptToken(DEDENT, 0)
      return
    }
  }

  const prev = input.peek(-1)
  // Only check at start of line (after newline) or at start of file
  if (prev != newline && prev != carriageReturn && prev != -1) return

  let indent = 0
  let chars = 0
  let pos = input.pos

  // Count indent spaces/t.tabs
  while (input.next == space || input.next == tab) {
    if (input.next == space) indent++
    else indent += 8 - (indent % 8)
    input.advance()
    chars++
  }

  // Ignore blank lines (only whitespace and then newline or eof)
  if (input.next == newline || input.next == carriageReturn || input.next < 0) {
    return
  }
  // Ignore lines that are only comments? For now, treat as blank if starts with // after indent
  // Check for // after indent
  if (input.next == 47 && input.peek(1) == 47) { // '/'
    return
  }
  if (input.next == 47 && input.peek(1) == 42) { // '/*'
    return
  }

  if (indent > cur) {
    // Only emit INDENT if we can shift it
    if (stack.canShift(INDENT)) {
      input.acceptToken(INDENT)
    }
  } else if (indent < cur) {
    if (stack.canShift(DEDENT)) {
      // For DEDENT, don't consume the indent spaces (put them back)
      input.acceptToken(DEDENT, -chars)
    }
  }
  // If equal, do nothing (no token)
}, { contextual: true })
