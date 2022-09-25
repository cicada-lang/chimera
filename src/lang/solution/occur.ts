import { Solution, walk } from "../solution"
import { Value } from "../value"

export function occur(solution: Solution, name: String, value: Value): boolean {
  value = walk(solution, value)

  switch (value.kind) {
    case "Var": {
      return value.name === name
    }

    case "Arrai": {
      return value.elements.some((element) => occur(solution, name, element))
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
