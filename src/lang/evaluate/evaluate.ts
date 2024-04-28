import * as Actions from "../actions/index.js"
import { Caze } from "../caze/index.js"
import type { Env } from "../env/index.js"
import * as Errors from "../errors/index.js"
import { evaluateGoalExp } from "../evaluate/index.js"
import type { Exp } from "../exp/index.js"
import { find } from "../find/index.js"
import { freshen } from "../freshen/index.js"
import type { Mod } from "../mod/index.js"
import { quote } from "../quote/index.js"
import { refresh, refreshGoals } from "../refresh/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection/index.js"
import { lookup } from "./lookup.js"

export function evaluate(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp["@kind"]) {
    case "Var": {
      const value = lookup(mod, env, exp.name)
      if (value === undefined) {
        throw new Errors.LangError(`[evaluate] undefined name: ${exp.name}`, {
          span: exp.span,
        })
      }

      return value
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
        exp.args.map(arg => evaluate(mod, env, arg))
      )
    }

    case "ListCons": {
      return Values.ListCons(
        evaluate(mod, env, exp.car),
        evaluate(mod, env, exp.cdr),
      )
    }

    case "ListNull": {
      return Values.ListNull()
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([key, property]) => [
            key,
            evaluate(mod, env, property),
          ]),
        ),
        Values.PatternVar(freshen("...etc")),
      )
    }

    case "Dot": {
      return Actions.doDot(evaluate(mod, env, exp.target), exp.name)
    }

    case "Ap": {
      return Actions.doAp(
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

    case "Eval": {
      return evaluate(mod, env, exp.exp)
    }

    case "Find": {
      varCollectionValidate(
        varCollectionMerge([
          varCollectionFromExp(exp.pattern),
          ...exp.goals.map(varCollectionFromGoalExp),
        ]),
      )

      const renames = new Map()
      const pattern = refresh(renames, quote(mod, mod.env, exp.pattern))
      const goals = refreshGoals(
        renames,
        exp.goals.map((goal) => evaluateGoalExp(mod, mod.env, goal)),
      )
      return Values.fromArray(find(exp.limit, pattern, goals))
    }

    case "And": {
      for (const arg of exp.exps) {
        const value = evaluate(mod, env, arg)
        Values.assertValue(value, "Boolean", { who: "evaluate And" })
        if (value.data === false) {
          return Values.Boolean(false)
        }
      }

      return Values.Boolean(true)
    }

    case "Or": {
      for (const arg of exp.exps) {
        const value = evaluate(mod, env, arg)
        Values.assertValue(value, "Boolean", { who: "evaluate And" })
        if (value.data === true) {
          return Values.Boolean(true)
        }
      }

      return Values.Boolean(false)
    }

    case "Not": {
      const value = evaluate(mod, env, exp.exp)
      Values.assertValue(value, "Boolean", { who: "evaluate Not" })
      return Values.Boolean(!value.data)
    }

    case "If": {
      const target = evaluate(mod, env, exp.target)
      Values.assertValue(target, "Boolean", { who: "evaluate If" })
      if (target.data) {
        return evaluate(mod, env, exp.thenExp)
      } else {
        return evaluate(mod, env, exp.elseExp)
      }
    }

    case "Match": {
      return Actions.doMatch(
        evaluate(mod, env, exp.target),
        exp.cazes.map((caze) => Caze(mod, env, caze.pattern, caze.stmts)),
      )
    }
  }
}
