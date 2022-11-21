import type { Exp } from "../exp"
import { Solution, walk } from "../solution"

export function occur(solution: Solution, name: String, exp: Exp): boolean {
  exp = walk(solution, exp)

  switch (exp["@kind"]) {
    case "PatternVar": {
      return exp.name === name
    }

    case "ListCons": {
      return occur(solution, name, exp.car) || occur(solution, name, exp.cdr)
    }

    case "Objekt": {
      return Object.values(exp.properties).some((property) =>
        occur(solution, name, property),
      )
    }

    default: {
      return false
    }
  }
}
