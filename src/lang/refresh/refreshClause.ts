import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import { Clause } from "../relation"

/**
   Side-effects.
**/

export function refreshClause(
  mod: Mod,
  clause: Clause,
  varMap: Map<string, Exps.PatternVar> = new Map(),
): Clause {
  return Clause(
    clause.name,
    refreshExp(mod, clause.exp, varMap),
    clause.goals.map((goal) => refreshGoal(mod, goal, varMap)),
  )
}

function refreshGoal(
  mod: Mod,
  goal: Goal,
  varMap: Map<string, Exps.PatternVar>,
): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      // NOTE Should not recurse on the `relation`.
      return Goals.Apply(
        goal.name,
        goal.relation,
        refreshExp(mod, goal.arg, varMap),
      )
    }

    case "Equal": {
      return Goals.Equal(
        refreshExp(mod, goal.left, varMap),
        refreshExp(mod, goal.right, varMap),
      )
    }

    case "NotEqual": {
      return Goals.NotEqual(
        refreshExp(mod, goal.left, varMap),
        refreshExp(mod, goal.right, varMap),
      )
    }

    case "Conj": {
      return Goals.Conj(
        goal.goals.map((goal) => refreshGoal(mod, goal, varMap)),
      )
    }

    case "Disj": {
      return Goals.Disj(
        goal.goals.map((goal) => refreshGoal(mod, goal, varMap)),
      )
    }
  }
}

function refreshExp(
  mod: Mod,
  exp: Exp,
  varMap: Map<string, Exps.PatternVar>,
): Exp {
  switch (exp["@kind"]) {
    case "PatternVar": {
      const found = varMap.get(exp.name)
      if (found !== undefined) return found

      const count = mod.variableCount
      mod.variableCount++

      const freshName = `${exp.name}_${count}`
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
