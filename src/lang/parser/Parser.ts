import type { Token } from "./index.js"

export type ParserResult<A> = [A, Array<Token>]

export type Parser<A> = (tokens: Array<Token>) => ParserResult<A>

export function choose<A>(parsers: Array<Parser<A>>): Parser<A> {
  return (tokens) => {
    for (const parser of parsers) {
      try {
        return parser(tokens)
      } catch (_error) {
        //
      }
    }

    throw new Error(`[choose]`)
  }
}

export function loopUntil<A>(
  parser: Parser<A>,
  end: Parser<any>,
): Parser<Array<A>> {
  return (tokens) => {
    const list: Array<A> = []
    while (true) {
      try {
        const [_, remain] = end(tokens)
        return [list, remain]
      } catch (_error) {
        const [element, remain] = parser(tokens)
        list.push(element)
        tokens = remain
      }
    }
  }
}

export function literal(label: string, value?: string): Parser<string> {
  return (tokens) => {
    const [token] = tokens
    if (token === undefined) {
      throw new Error("[literal]")
    }

    if (token.label !== label) {
      throw new Error("[literal]")
    }

    if (value !== undefined) {
      if (token.value !== value) {
        throw new Error("[literal]")
      }
    }

    return [token.value, tokens.slice(1)]
  }
}

export function startsWith<A>(
  start: Parser<any>,
  parser: Parser<A>,
): Parser<A> {
  return (tokens) => {
    const [_, remain] = start(tokens)
    return parser(remain)
  }
}
