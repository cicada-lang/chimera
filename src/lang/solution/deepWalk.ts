import { Solution, walk } from "../solution"
import * as Values from "../value"
import { Value } from "../value"

export function deepWalk(solution: Solution, value: Value): Value {
  value = walk(solution, value)

  switch (value.kind) {
    case "Arrai": {
      return Values.Arrai(value.elements.map((element) => deepWalk(solution, element)))
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            deepWalk(solution, property),
          ]),
        ),
      )
    }

    default: {
      return value
    }
  }
}
