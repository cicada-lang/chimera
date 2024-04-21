import type { Goal } from "../goal/index.js"
import * as Goals from "../goal/index.js"
import type * as Values from "../value/index.js"
import { refresh, refreshValues } from "./refresh.js"

export function refreshGoals(
  renames: Map<string, Values.PatternVar>,
  goals: Array<Goal>,
): Array<Goal> {
  return goals.map((goal) => refreshGoal(renames, goal))
}

export function refreshGoal(
  renames: Map<string, Values.PatternVar>,
  goal: Goal,
): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      return Goals.Apply(
        refresh(renames, goal.target),
        refreshValues(renames, goal.args),
      )
    }

    case "Equal": {
      return Goals.Equal(
        refresh(renames, goal.left),
        refresh(renames, goal.right),
      )
    }

    case "NotEqual": {
      return Goals.NotEqual(
        refresh(renames, goal.left),
        refresh(renames, goal.right),
      )
    }

    case "Conj": {
      return Goals.Conj(refreshGoals(renames, goal.goals))
    }

    case "Disj": {
      return Goals.Disj(refreshGoals(renames, goal.goals))
    }
  }
}
