# Changelog

## 0.1.0

- Initial release: full Lezer grammar for Scala 3
- Support for package/import, class/trait/object/enum/sealed/given/extension/opaque type/export
- Generics with variance, bounds, union/intersection types, type lambdas
- Functions with default params, by-name, using clauses, function types
- Pattern matching, for-comprehensions, control flow
- Lambdas, partial functions
- String interpolation (s/f/raw, multiline)
- XML literals
- Scaladoc comments
- Optional braces / significant indentation (brace-style and colon-style)
- Syntax highlighting and indentation/folding

## 0.1.4
- Fix EOF dedent bug causing indentation-based blocks to incorrectly consume the entire rest of the file and break folding

## 0.1.3
- Update package.json metadata (organization, repository URL, author info)
- Clean up test files and reorganize internal agent instruction modules

## 0.1.2
- Fix grammar conflict causing aggressive parsing of indented blocks inside braced blocks
- Fix folding arrows appearing on single-line expressions inside braced blocks

## 0.1.1
- Fix runtime crash caused by literal operators in styleTags (`!=`, `==`)
- Standardize block folding using `foldBlockLike` helper
