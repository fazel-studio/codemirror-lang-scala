# @fazelstudio/codemirror-lang-scala

[![NPM version](https://img.shields.io/npm/v/@fazelstudio/codemirror-lang-scala.svg)](https://www.npmjs.com/package/@fazelstudio/codemirror-lang-scala)

This package implements Scala (`.scala`, `.sc`) language support for the
[CodeMirror](https://codemirror.net/) code editor: a full Lezer grammar covering
Scala 3 features including classes, traits, objects, enums, case classes, pattern
matching, for-comprehensions, string interpolation, XML literals, generics with
variance, union/intersection types, type lambdas, contextual abstractions (`given`/`using`),
extension methods, opaque types, and Scaladoc documentation comments — with syntax
highlighting compatible with any CodeMirror 6 theme.

This code is released under an MIT license.

## Features

- Full Scala 3 syntax support (including optional braces / significant indentation)
- Pattern matching with case classes, guards, alternatives, and bindings
- String interpolation (`s"..."`, `f"..."`, `raw"..."`)
- XML literals
- Generics with variance annotations (`+T`, `-T`)
- Union types (`|`) and intersection types (`&`)
- Type lambdas (`[X] =>> List[X]`)
- Contextual abstractions (`given`, `using`)
- Extension methods
- Opaque type aliases
- Scaladoc documentation comments

## Usage

```js
import { EditorView, basicSetup } from "codemirror"
import { scala } from "@fazelstudio/codemirror-lang-scala"

new EditorView({
  parent: document.body,
  doc: `@main def run(): Unit = println("Hello, Scala!")`,
  extensions: [basicSetup, scala()],
})
```

## API

### `scala(config?) → LanguageSupport`

Create a Scala language support extension.

### `scalaLanguage: LRLanguage`

The underlying `LRLanguage` instance.

## Known limitations

- Smart-cast/type-inference analysis is out of scope — this package only provides
  syntax highlighting and parsing, not type checking.
- Scaladoc tag content is highlighted as part of the doc comment block, not parsed
  into structured fields, in v0.1.
- XML literal parsing supports basic tags but may have limitations with complex
  nested expressions.
