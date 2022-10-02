import { Solution, walk } from "../solution"
import * as Values from "../value"
import { Value } from "../value"

export function deepWalk(solution: Solution, value: Value): Value {
  value = walk(solution, value)

  switch (value.kind) {
    case "Cons": {
      return Values.Cons(deepWalk(solution, value.car), deepWalk(solution, value.cdr))
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
