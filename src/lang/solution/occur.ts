import { Solution, walk } from "../solution"
import { Value } from "../value"

export function occur(solution: Solution, name: String, value: Value): boolean {
  value = walk(solution, value)

  switch (value.kind) {
    case "PatternVar": {
      return value.name === name
    }

    case "ListCons": {
      return occur(solution, name, value.car) || occur(solution, name, value.cdr)
    }

    case "Objekt": {
      return Object.entries(value.properties).some(([name, property]) =>
        occur(solution, name, property),
      )
    }

    default: {
      return false
    }
  }
}
