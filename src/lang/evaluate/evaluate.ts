import * as Actions from "../actions"
import type { Env } from "../env"
import * as Errors from "../errors"
import {
  evaluateGoalExp,
  evaluateHyperruleExp,
  evaluateRuleExp,
  lookup,
  quote,
} from "../evaluate"
import type { Exp } from "../exp"
import { find } from "../find"
import { freshen } from "../freshen"
import * as Hyperrules from "../hyperrule"
import type { Mod } from "../mod"
import { refresh, refreshGoals } from "../refresh"
import * as Rules from "../rule"
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
        Values.PatternVar(freshen("...etc")),
      )
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

    case "Quote": {
      return quote(mod, env, exp.exp)
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

    case "RuleList": {
      return Values.Rule(
        Rules.List(exp.rules.map((rule) => evaluateRuleExp(mod, env, rule))),
      )
    }

    case "HyperruleList": {
      return Values.Hyperrule(
        Hyperrules.List(
          exp.hyperrules.map((hyperrule) =>
            evaluateHyperruleExp(mod, env, hyperrule),
          ),
        ),
      )
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
  }
}
