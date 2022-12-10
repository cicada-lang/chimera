import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

export function evaluate(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp["@kind"]) {
    case "PatternVar": {
      return Values.PatternVar(exp.name)
    }

    case "ReifiedVar": {
      return Values.ReifiedVar(exp.count)
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
        evaluate(mod, env, exp.car),
        evaluate(mod, env, exp.cdr),
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
            evaluate(mod, env, property),
          ]),
        ),
        exp.etc ? evaluate(mod, env, exp.etc) : undefined,
      )
    }

    case "Data": {
      return Values.Data(
        exp.type,
        exp.kind,
        exp.args.map((arg) => evaluate(mod, env, arg)),
      )
    }
  }
}
