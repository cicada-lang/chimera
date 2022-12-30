import { Env, envLookupValue } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import * as Values from "../value"
import { collectVarsFromExps, Value } from "../value"

export function quote(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp["@kind"]) {
    case "Var": {
      const local = envLookupValue(env, exp.name)
      if (local !== undefined) return local

      const value = envLookupValue(mod.env, exp.name)
      if (value !== undefined) return value

      return Values.PatternVar(exp.name)
    }

    case "String": {
      return Values.String(exp.data)
    }

    case "Number": {
      return Values.Number(exp.data)
    }

    case "Boolean": {
      return Values.Boolean(exp.data)
    }

    case "Null": {
      return Values.Null()
    }

    case "ArrayCons": {
      return Values.ArrayCons(
        quote(mod, env, exp.car),
        quote(mod, env, exp.cdr),
      )
    }

    case "ArrayNull": {
      return Values.ArrayNull()
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([key, property]) => [
            key,
            quote(mod, env, property),
          ]),
        ),
        Values.PatternVar(mod.freshen("...etc")),
      )
    }

    case "Term": {
      return Values.Term(
        exp.name,
        exp.args.map((arg) => quote(mod, env, arg)),
      )
    }

    case "Fn": {
      return Values.Fn(
        mod,
        env,
        collectVarsFromExps(exp.patterns),
        exp.patterns,
        exp.stmts,
      )
    }
  }
}
