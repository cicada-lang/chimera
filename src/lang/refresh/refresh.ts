import { freshen } from "../freshen/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"

// NOTE Do side-effect on `renames`.

export function refreshValues(
  renames: Map<string, Values.PatternVar>,
  values: Array<Value>,
): Array<Value> {
  return values.map((value) => refresh(renames, value))
}

export function refresh(
  renames: Map<string, Values.PatternVar>,
  value: Value,
): Value {
  switch (value["@kind"]) {
    case "PatternVar": {
      const found = renames.get(value.name)
      if (found !== undefined) return found

      const freshPatternVar = Values.PatternVar(freshen(value.name))
      renames.set(value.name, freshPatternVar)
      return freshPatternVar
    }

    case "ReifiedVar": {
      return value
    }

    case "String":
    case "Number":
    case "Boolean":
    case "Null": {
      return value
    }

    case "ListCons": {
      return Values.ListCons(
        refresh(renames, value.car),
        refresh(renames, value.cdr),
      )
    }

    case "ListNull": {
      return value
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            refresh(renames, property),
          ]),
        ),
        value.etc === undefined ? undefined : refresh(renames, value.etc),
      )
    }

    case "Term": {
      return Values.Term(
        value.name,
        value.args.map((arg) => refresh(renames, arg)),
      )
    }

    case "Relation":
    case "TypeConstraint":
    case "Fn":
    case "WithConstraints":
    case "Primitive":
    case "Curried":
    case "Goal":
    case "Solution": {
      return value
    }
  }
}
