import type * as Exps from "../exp"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import { refreshExp } from "../refresh"

/**

   Side-effects on `varMap`.

**/

export function refreshGoal(
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
