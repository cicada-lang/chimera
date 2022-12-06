import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Mod } from "../mod"

/**

   Side-effects on `varMap`.

**/

export function refreshExp(
  mod: Mod,
  exp: Exp,
  varMap: Map<string, Exps.PatternVar>,
): Exp {
  switch (exp["@kind"]) {
    case "PatternVar": {
      const found = varMap.get(exp.name)
      if (found !== undefined) return found

      const count = mod.variableCount++
      const freshName = `${exp.name}#${count}`
      const variable = Exps.PatternVar(freshName, exp.span)
      varMap.set(exp.name, variable)
      return variable
    }

    case "ReifiedVar": {
      return exp
    }

    case "String": {
      return exp
    }

    case "Number": {
      return exp
    }

    case "Boolean": {
      return exp
    }

    case "Null": {
      return exp
    }

    case "ArrayCons": {
      return Exps.ArrayCons(
        refreshExp(mod, exp.car, varMap),
        refreshExp(mod, exp.cdr, varMap),
        exp.span,
      )
    }

    case "ArrayNull": {
      return exp
    }

    case "Objekt": {
      return Exps.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([name, property]) => [
            name,
            refreshExp(mod, property, varMap),
          ]),
        ),
        exp.etc && refreshExp(mod, exp.etc, varMap),
        exp.span,
      )
    }

    case "Data": {
      return Exps.Data(
        exp.type,
        exp.kind,
        exp.args.map((arg) => refreshExp(mod, arg, varMap)),
        exp.span,
      )
    }
  }
}
