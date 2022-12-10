import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import { refreshValue } from "../refresh"
import type * as Values from "../value"

/**

   Side-effects on `varMap`.

**/

export function refreshGoal(
  mod: Mod,
  goal: Goal,
  varMap: Map<string, Values.PatternVar>,
): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      // NOTE Should not recurse on the `relation`.
      return Goals.Apply(
        goal.name,
        goal.relation,
        refreshValue(mod, goal.arg, varMap),
      )
    }

    case "Equal": {
      return Goals.Equal(
        refreshValue(mod, goal.left, varMap),
        refreshValue(mod, goal.right, varMap),
      )
    }

    case "NotEqual": {
      return Goals.NotEqual(
        refreshValue(mod, goal.left, varMap),
        refreshValue(mod, goal.right, varMap),
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
