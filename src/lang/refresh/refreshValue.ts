import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

/**

   Side-effects on `varMap`.

**/

export function refreshValue(
  mod: Mod,
  value: Value,
  varMap: Map<string, Values.PatternVar>,
): Value {
  switch (value["@kind"]) {
    case "PatternVar": {
      const found = varMap.get(value.name)
      if (found !== undefined) return found

      const variable = Values.PatternVar(mod.freshen(value.name))
      varMap.set(value.name, variable)
      return variable
    }

    case "ReifiedVar": {
      return value
    }

    case "String": {
      return value
    }

    case "Number": {
      return value
    }

    case "Boolean": {
      return value
    }

    case "Null": {
      return value
    }

    case "ArrayCons": {
      return Values.ArrayCons(
        refreshValue(mod, value.car, varMap),
        refreshValue(mod, value.cdr, varMap),
      )
    }

    case "ArrayNull": {
      return value
    }

    case "Objekt": {
      const etc = value.etc || Values.PatternVar(mod.freshen("...etc"))

      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            refreshValue(mod, property, varMap),
          ]),
        ),
        refreshValue(mod, etc, varMap),
      )
    }

    case "Data": {
      return Values.Data(
        value.type,
        value.kind,
        value.args.map((arg) => refreshValue(mod, arg, varMap)),
      )
    }

    case "Relation": {
      return value
    }
  }
}
