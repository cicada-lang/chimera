import assert from "node:assert"
import { test } from "node:test"
import { createLexer } from "./Lexer.js"

const lexer = createLexer({
  identifier: /[_\p{Letter}][_\p{Letter}0-9]*/,
  string: /"(\\.|[^"])*"/,
  number: /\d+\.\d+|\d+|-\d+\.\d+|-\d+/,
  symbol: /[^_\p{Letter}0-9\s]/,
})

test("Lexer", () => {
  assert.deepStrictEqual(lexer(""), [])
  assert.deepStrictEqual(lexer("  "), [])
  assert.deepStrictEqual(lexer("a ->"), [
    {
      label: "identifier",
      span: { hi: 1, lo: 0 },
      value: "a",
    },
    {
      label: "symbol",
      span: { hi: 3, lo: 2 },
      value: "-",
    },
    {
      label: "symbol",
      span: { hi: 4, lo: 3 },
      value: ">",
    },
  ])
  assert.deepStrictEqual(lexer("a b c"), [
    {
      label: "identifier",
      span: { hi: 1, lo: 0 },
      value: "a",
    },
    {
      label: "identifier",
      span: { hi: 3, lo: 2 },
      value: "b",
    },
    {
      label: "identifier",
      span: { hi: 5, lo: 4 },
      value: "c",
    },
  ])
})
