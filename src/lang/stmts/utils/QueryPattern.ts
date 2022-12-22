import type { Exp } from "../../exp"
import * as Exps from "../../exp"
import type { Span } from "../../span"

export type QueryPattern = QueryPatternNames | QueryPatternName

export type QueryPatternNames = {
  "@kind": "QueryPatternNames"
  names: Array<string>
  span: Span
}

export function QueryPatternNames(
  names: Array<string>,
  span: Span,
): QueryPatternNames {
  return {
    "@kind": "QueryPatternNames",
    names,
    span,
  }
}

export type QueryPatternName = {
  "@kind": "QueryPatternName"
  name: string
  span: Span
}

export function QueryPatternName(name: string, span: Span): QueryPatternName {
  return {
    "@kind": "QueryPatternName",
    name,
    span,
  }
}

export function queryPatternToExp(pattern: QueryPattern): Exp {
  switch (pattern["@kind"]) {
    case "QueryPatternName": {
      return Exps.Var(pattern.name, pattern.span)
    }

    case "QueryPatternNames": {
      let exp: Exp = Exps.ArrayNull(pattern.span)
      for (const name of [...pattern.names].reverse()) {
        exp = Exps.ArrayCons(Exps.Var(name, pattern.span), exp, pattern.span)
      }

      return exp
    }
  }
}

export function queryPatternNames(pattern: QueryPattern): Array<string> {
  switch (pattern["@kind"]) {
    case "QueryPatternName": {
      return [pattern.name]
    }

    case "QueryPatternNames": {
      return pattern.names
    }
  }
}
