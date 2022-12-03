import type { Exp } from "../../exp"
import * as Exps from "../../exp"

export type QueryPattern = QueryPatternNames | QueryPatternName

export type QueryPatternNames = {
  "@kind": "QueryPatternNames"
  names: Array<string>
}

export function QueryPatternNames(names: Array<string>): QueryPatternNames {
  return {
    "@kind": "QueryPatternNames",
    names,
  }
}

export type QueryPatternName = {
  "@kind": "QueryPatternName"
  name: string
}

export function QueryPatternName(name: string): QueryPatternName {
  return {
    "@kind": "QueryPatternName",
    name,
  }
}

export function queryPatternToExp(pattern: QueryPattern): Exp {
  switch (pattern["@kind"]) {
    case "QueryPatternName": {
      return Exps.PatternVar(pattern.name)
    }

    case "QueryPatternNames": {
      let exp: Exp = Exps.ArrayNull()
      for (const name of [...pattern.names].reverse()) {
        exp = Exps.ArrayCons(Exps.PatternVar(name), exp)
      }

      return exp
    }
  }
}
