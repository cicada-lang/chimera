import type { GoalExp } from "../goal-exp"
import type { VarCollection } from "../var-collection"
import { varCollectionFromExp, varCollectionMerge } from "../var-collection"

export function varCollectionFromGoalExp(goal: GoalExp): VarCollection {
  switch (goal["@kind"]) {
    case "Apply": {
      return varCollectionFromExp(goal.arg)
    }

    case "Equal": {
      return varCollectionMerge([
        varCollectionFromExp(goal.left),
        varCollectionFromExp(goal.right),
      ])
    }

    case "NotEqual": {
      return varCollectionMerge([
        varCollectionFromExp(goal.left),
        varCollectionFromExp(goal.right),
      ])
    }

    case "Conj": {
      return varCollectionMerge(goal.goals.map(varCollectionFromGoalExp))
    }

    case "Disj": {
      return varCollectionMerge(goal.goals.map(varCollectionFromGoalExp))
    }
  }
}
