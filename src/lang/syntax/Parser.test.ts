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
  identifier: /[_\p{Letter}][_\p{Letter}0-9]*/,
  string: /"(\\.|[^"])*"/,
  number: /\d+\.\d+|\d+|-\d+\.\d+|-\d+/,
  symbol: /[^_\p{Letter}0-9\s]/,
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
