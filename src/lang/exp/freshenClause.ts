import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import { Clause } from "../relation"

/**
   Side-effects.
**/

export function freshenClause(
  mod: Mod,
  clause: Clause,
  varMap: Map<string, Exps.PatternVar> = new Map(),
): Clause {
  return Clause(
    clause.name,
    freshenExp(mod, clause.exp, varMap),
    clause.goals.map((goal) => freshenGoal(mod, goal, varMap)),
  )
}

function freshenGoal(
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
        freshenExp(mod, goal.arg, varMap),
      )
    }

    case "Unifiable": {
      return Goals.Unifiable(
        freshenExp(mod, goal.left, varMap),
        freshenExp(mod, goal.right, varMap),
      )
    }
  }
}

function freshenExp(
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
      const variable = Exps.PatternVar(freshName)
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

    case "ListCons": {
      return Exps.ListCons(
        freshenExp(mod, exp.car, varMap),
        freshenExp(mod, exp.cdr, varMap),
      )
    }

    case "ListNull": {
      return exp
    }

    case "Objekt": {
      return Exps.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([name, property]) => [
            name,
            freshenExp(mod, property, varMap),
          ]),
        ),
      )
    }
  }
}
