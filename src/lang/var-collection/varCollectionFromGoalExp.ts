import type { GoalExp } from "../goal-exp/index.ts"
import {
  varCollectionFromExps,
  varCollectionMerge,
  type VarCollection,
} from "../var-collection/index.ts"

export function varCollectionFromGoalExp(goal: GoalExp): VarCollection {
  switch (goal["@kind"]) {
    case "Apply": {
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
