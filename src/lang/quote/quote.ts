import type { Env } from "../env"
import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import { freshen } from "../freshen"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"
import { createTermHeadFromExp } from "./createTermHeadFromExp"

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
        Values.PatternVar(freshen("...etc")),
      )
    }

    case "Dot": {
      throw new Errors.LangError(`[quote] can not handle Exps.Dot`, {
        span: exp.span,
      })
    }

    case "Ap": {
      const { prefix, name } = createTermHeadFromExp(exp.target)
      const args = exp.args.map((arg) => quote(mod, env, arg))
      return Values.Term(prefix, name, args)
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
      throw new Errors.LangError(`[quote] can not handle nested quote`, {
        span: exp.span,
      })
    }

    case "Eval": {
      return evaluate(mod, env, exp.exp)
    }

    case "Find": {
      throw new Errors.LangError(`[quote] can not handle Exps.Find`, {
        span: exp.span,
      })
    }

    case "RuleList": {
      throw new Errors.LangError(`[quote] can not handle Exps.RuleList`, {
        span: exp.span,
      })
    }

    case "HyperruleList": {
      throw new Errors.LangError(`[quote] can not handle Exps.HyperruleList`, {
        span: exp.span,
      })
    }

    case "And": {
      throw new Errors.LangError(`[quote] can not handle Exps.And`, {
        span: exp.span,
      })
    }

    case "Or": {
      throw new Errors.LangError(`[quote] can not handle Exps.Or`, {
        span: exp.span,
      })
    }

    case "Not": {
      throw new Errors.LangError(`[quote] can not handle Exps.Not`, {
        span: exp.span,
      })
    }

    case "If": {
      throw new Errors.LangError(`[quote] can not handle Exps.If`, {
        span: exp.span,
      })
    }

    case "Match": {
      throw new Errors.LangError(`[quote] can not handle Exps.Match`, {
        span: exp.span,
      })
    }
  }
}
