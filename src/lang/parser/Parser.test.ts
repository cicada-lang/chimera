import assert from "node:assert"
import { test } from "node:test"
import { createLexer } from "./Lexer.js"
import {
  choose,
  literal,
  loopUntil,
  startsWith,
  type ParserResult,
  type Token,
} from "./index.js"

type Sexp = string | Array<Sexp>

function parseSexp(tokens: Array<Token>): ParserResult<Sexp> {
  return choose<Sexp>([parseSymbol, parseList])(tokens)
}

function parseSymbol(tokens: Array<Token>): ParserResult<string> {
  return literal("identifier")(tokens)
}

function parseList(tokens: Array<Token>): ParserResult<Array<Sexp>> {
  return startsWith(
    literal("symbol", "("),
    loopUntil(parseSexp, literal("symbol", ")")),
  )(tokens)
}

const lexer = createLexer({
  identifier: /^\s*([_\p{Letter}][_\p{Letter}0-9]*)\s*/u,
  string: /^\s*("(\\.|[^"])*")\s*/,
  number: /^\s*(\d+\.\d+|\d+|-\d+\.\d+|-\d+)\s*/,
  symbol: /^\s*([^_\p{Letter}0-9\s])\s*/u,
})

test("Parser", () => {
  {
    const tokens = lexer("a")
    assert.deepStrictEqual(parseSexp(tokens), ["a", []])
  }

  {
    const tokens = lexer("(a)")
    assert.deepStrictEqual(parseSexp(tokens), [["a"], []])
  }

  {
    const tokens = lexer("(a b c)")
    assert.deepStrictEqual(parseSexp(tokens), [["a", "b", "c"], []])
  }

  {
    const tokens = lexer("((a b c) (a b c) (a b c))")
    assert.deepStrictEqual(parseSexp(tokens), [
      [
        ["a", "b", "c"],
        ["a", "b", "c"],
        ["a", "b", "c"],
      ],
      [],
    ])
  }
})
