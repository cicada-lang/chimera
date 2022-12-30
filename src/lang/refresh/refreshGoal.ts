import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import type * as Values from "../value"
import { refresh, refreshValues } from "./refresh"

export function refreshGoals(
  mod: Mod,
  renames: Map<string, Values.PatternVar>,
  goals: Array<Goal>,
): Array<Goal> {
  return goals.map((goal) => refreshGoal(mod, renames, goal))
}

export function refreshGoal(
  mod: Mod,
  renames: Map<string, Values.PatternVar>,
  goal: Goal,
): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      return Goals.Apply(
        goal.name,
        refresh(mod, renames, goal.target),
        refreshValues(mod, renames, goal.args),
      )
    }

    case "Equal": {
      return Goals.Equal(
        refresh(mod, renames, goal.left),
        refresh(mod, renames, goal.right),
      )
    }

    case "NotEqual": {
      return Goals.NotEqual(
        refresh(mod, renames, goal.left),
        refresh(mod, renames, goal.right),
      )
    }

    case "Conj": {
      return Goals.Conj(refreshGoals(mod, renames, goal.goals))
    }

    case "Disj": {
      return Goals.Disj(refreshGoals(mod, renames, goal.goals))
    }
  }
}
