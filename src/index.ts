import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, delimitedIndent } from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight"
import { parser } from "./parser.js"
import type { SyntaxNode } from "@lezer/common"
import type { EditorState } from "@codemirror/state"

function foldBlockLike(node: SyntaxNode, state: EditorState) {
  let firstLine = state.doc.lineAt(node.from);
  let lastLine = state.doc.lineAt(node.to);
  return firstLine.number < lastLine.number ? {from: firstLine.to, to: lastLine.from - 1} : null;
}

const configuredParser = parser.configure({
  props: [
    styleTags({
      "package import export": t.moduleKeyword,
      "class trait object enum": t.definitionKeyword,
      "case given extension": t.definitionKeyword,
      "def val var type": t.definitionKeyword,
      "lazy val": t.definitionKeyword,
      "if else while do for match try catch finally return throw yield then": t.controlKeyword,
      "abstract final sealed open": t.modifier,
      "private protected override implicit": t.modifier,
      "inline transparent opaque": t.modifier,
      "using derives extends with": t.modifier,
      "new super this": t.self,
      "true false null": t.atom,
      "Unit Nothing Any String Int Boolean": t.typeName,
      TypeIdentifier: t.typeName,
      Identifier: t.variableName,
      Number: t.number,
      String: t.string,
      InterpolatedString: t.special(t.string),
      XmlLiteral: t.string,
      XmlAttribute: t.attributeName,
      XmlTag: t.tagName,
      LineComment: t.lineComment,
      BlockComment: t.blockComment,
      ScaladocComment: t.docComment,
      Scaladoc: t.docComment,
      Annotation: t.annotation,
      "\"(\" \")\"": t.paren,
      "\"[\" \"]\"": t.squareBracket,
      "\"{\" \"}\"": t.brace,
      "\".\" \",\" \";\" \":\"": t.punctuation,
      "\"=\"": t.definitionOperator,
      "\"=>\" \"->\" \"<-\"": t.operator,
      "\"==\" \"!=\" \"<\" \">\" \"<=\" \">=\" \"&&\" \"||\" \"!\"": t.operator,
      "\"+\" \"-\" \"*\" \"/\" \"%\" \"^\" \"::\" \"#\" \"=>>\" \"?=>\"": t.operator,
      "\"|\" \"&\"": t.operator,
      "\"_\"": t.punctuation
    }),
    indentNodeProp.add({
      Block: delimitedIndent({ closing: "}" }),
      TemplateBody: delimitedIndent({ closing: "}" }),
      MatchBlock: delimitedIndent({ closing: "}" }),
      ForExpr: delimitedIndent({ closing: ")" }),
      ParenBlock: delimitedIndent({ closing: ")" })
    }),
    foldNodeProp.add({
      Block: foldBlockLike,
      TemplateBody: foldBlockLike,
      MatchBlock: foldBlockLike,
      EnumBody: foldBlockLike,
      IndentBlock: foldBlockLike
    })
  ]
})

export const scalaLanguage = LRLanguage.define({
  parser: configuredParser,
  languageData: {
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    closeBrackets: { brackets: ["(", "[", "{", '"'] }
  }
})

export function scala() {
  return new LanguageSupport(scalaLanguage)
}
