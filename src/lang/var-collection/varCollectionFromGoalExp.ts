import type { GoalExp } from "../goal-exp"
import type { VarCollection } from "../var-collection"
import { varCollectionFromExps, varCollectionMerge } from "../var-collection"

export function varCollectionFromGoalExp(goal: GoalExp): VarCollection {
  switch (goal["@kind"]) {
    case "Term": {
      return varCollectionFromExps(goal.args)
    }

    case "Equal": {
      return varCollectionFromExps([goal.left, goal.right])
    }

    case "NotEqual": {
      return varCollectionFromExps([goal.left, goal.right])
    }

    case "Conj": {
      return varCollectionMerge(goal.goals.map(varCollectionFromGoalExp))
    }

    case "Disj": {
      return varCollectionMerge(goal.goals.map(varCollectionFromGoalExp))
    }
  }
}
