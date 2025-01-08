import * as Actions from "../actions/index.ts"
import { Caze } from "../caze/index.ts"
import type { Env } from "../env/index.ts"
import * as Errors from "../errors/index.ts"
import { evaluateGoalExp } from "../evaluate/index.ts"
import type { Exp } from "../exp/index.ts"
import { find } from "../find/index.ts"
import { freshen } from "../freshen/index.ts"
import type { Mod } from "../mod/index.ts"
import { quote } from "../quote/index.ts"
import { refresh, refreshGoals } from "../refresh/index.ts"
import type { Value } from "../value/index.ts"
import * as Values from "../value/index.ts"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection/index.ts"
import { lookup } from "./lookup.ts"

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
        exp.args.map((arg) => evaluate(mod, env, arg)),
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
