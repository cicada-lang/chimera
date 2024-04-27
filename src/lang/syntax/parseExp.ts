import type { Token } from "@cicada-lang/partech"
import type { Exp } from "../exp/Exp.js"
import type { ParserResult } from "./Parser.js"

export function parseExp(tokens: Array<Token>): ParserResult<Exp> {
  throw new Error()
}

// parseOperator
// parseOperand

export function parseExps(tokens: Array<Token>): ParserResult<Array<Exp>> {
  throw new Error()
}
