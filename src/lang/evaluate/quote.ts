import type { Env } from "../env"
import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

export function quote(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp["@kind"]) {
    case "Var": {
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
        exp.patterns.map((pattern) => quote(mod, env, pattern)),
        exp.stmts,
      )
    }

    case "Quote": {
      throw new Errors.ElaborationError(`[quote] can not handle nested quote`, {
        span: exp.span,
      })
    }

    case "Unquote": {
      return evaluate(mod, env, exp.exp)
    }

    case "Find": {
      throw new Errors.ElaborationError(`[quote] can not handle Exps.Find`, {
        span: exp.span,
      })
    }
  }
}
