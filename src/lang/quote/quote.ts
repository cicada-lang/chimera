import type { Env } from "../env/index.js"
import * as Errors from "../errors/index.js"
import { evaluate } from "../evaluate/index.js"
import type { Exp } from "../exp/index.js"
import { formatExp } from "../format/index.js"
import { freshen } from "../freshen/index.js"
import type { Mod } from "../mod/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"

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

    case "Term": {
      return Values.Term(
        exp.type,
        exp.kind,
        exp.args.map((arg) => quote(mod, env, arg)),
      )
    }

    case "ListCons": {
      return Values.ListCons(quote(mod, env, exp.car), quote(mod, env, exp.cdr))
    }

    case "ListNull": {
      return Values.ListNull()
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
      throw new Errors.LangError(`[quote] can not quote: ${formatExp(exp)}`, {
        span: exp.span,
      })
    }

    case "Fn": {
      return Values.Fn(
        mod,
        env,
        exp.patterns.map((pattern) => quote(mod, env, pattern)),
        exp.stmts,
      )
    }

    case "Eval": {
      return evaluate(mod, env, exp.exp)
    }

    case "Find": {
      throw new Errors.LangError(`[quote] can not handle Exps.Find`, {
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
