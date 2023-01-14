import * as Actions from "../actions"
import type { Env } from "../env"
import { envLookupValue } from "../env"
import * as Errors from "../errors"
import { evaluateGoalExp, quote } from "../evaluate"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import { refresh, refreshGoals } from "../refresh"
import { reify } from "../reify"
import { Solver } from "../solver"
import type { Value } from "../value"
import * as Values from "../value"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection"

export function evaluate(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp["@kind"]) {
    case "Var": {
      const local = envLookupValue(env, exp.name)
      if (local !== undefined) return local

      const value = envLookupValue(mod.env, exp.name)
      if (value !== undefined) return value

      throw new Errors.LangError(`[evaluate] undefined name: ${exp.name}`, {
        span: exp.span,
      })
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
        Values.PatternVar(mod.freshen("...etc")),
      )
    }

    case "Ap": {
      return Actions.doAp(
        mod,
        env,
        evaluate(mod, env, exp.target),
        exp.args.map((arg) => evaluate(mod, env, arg)),
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
      return quote(mod, env, exp.exp)
    }

    case "Unquote": {
      throw new Errors.LangError(
        `[evaluate] unquote can only be used inside quote`,
        { span: exp.span },
      )
    }

    case "Find": {
      varCollectionValidate(
        varCollectionMerge([
          varCollectionFromExp(exp.pattern),
          ...exp.goals.map(varCollectionFromGoalExp),
        ]),
      )

      const renames = new Map()
      const value = refresh(mod, renames, quote(mod, mod.env, exp.pattern))
      const goals = refreshGoals(
        mod,
        renames,
        exp.goals.map((goal) => evaluateGoalExp(mod, mod.env, goal)),
      )

      const solver = Solver.start(goals)
      const solutions = solver.solve(mod, { limit: exp.limit })

      return Values.fromArray(
        solutions.map((solution) => reify(mod, solution, value)),
      )
    }
  }
}
