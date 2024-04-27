import type { Token } from "@cicada-lang/partech"
import type { Exp } from "../exp/Exp.js"
import { choose, loopUntilFail, type ParserResult } from "./Parser.js"

export function parseExp(tokens: Array<Token>): ParserResult<Exp> {
  return choose<Exp>([parseOperator, parseOperand])(tokens)
}

export function parseOperator(tokens: Array<Token>): ParserResult<Exp> {
  throw new Error()
}

export function parseOperand(tokens: Array<Token>): ParserResult<Exp> {
  throw new Error()
}

export function parseExps(tokens: Array<Token>): ParserResult<Array<Exp>> {
  return loopUntilFail(parseExp)(tokens)
}
