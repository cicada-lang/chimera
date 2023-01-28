import { freshen } from "../freshen"
import type { Value } from "../value"
import * as Values from "../value"

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

    case "ArrayCons": {
      return Values.ArrayCons(
        refresh(renames, value.car),
        refresh(renames, value.cdr),
      )
    }

    case "ArrayNull": {
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
        value.prefix,
        value.name,
        value.args.map((arg) => refresh(renames, arg)),
      )
    }

    case "Relation":
    case "TypeConstraint":
    case "Rule":
    case "Hyperrule":
    case "Fn":
    case "WithConstraints":
    case "Primitive":
    case "Curried":
    case "Goal": {
      return value
    }
  }
}
