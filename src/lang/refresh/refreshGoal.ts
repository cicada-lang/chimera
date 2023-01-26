import type { Goal } from "../goal"
import * as Goals from "../goal"
import type * as Values from "../value"
import { refresh, refreshValues } from "./refresh"

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
    case "Term": {
      return Goals.Term(
        goal.name,
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
