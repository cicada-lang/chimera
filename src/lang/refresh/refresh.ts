import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

// NOTE Do side-effect on `renames`.

export function refresh(
  mod: Mod,
  renames: Map<string, Values.PatternVar>,
  value: Value,
): Value {
  switch (value["@kind"]) {
    case "PatternVar": {
      const found = renames.get(value.name)
      if (found !== undefined) return found

      const freshPatternVar = Values.PatternVar(mod.freshen(value.name))
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
        refresh(mod, renames, value.car),
        refresh(mod, renames, value.cdr),
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
            refresh(mod, renames, property),
          ]),
        ),
      )
    }

    case "Term": {
      return Values.Term(
        value.name,
        value.args.map((arg) => refresh(mod, renames, arg)),
      )
    }

    case "Relation":
    case "TypeConstraint":
    case "RewriteRule":
    case "Fn": {
      return value
    }
  }
}
