import * as pt from "@cicada-lang/partech"
import * as grammars from "./grammars/index.js"
import * as matchers from "./matchers/index.js"

export const parseStmts = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "stmts"),
  matcher: matchers.stmts_matcher,
})
