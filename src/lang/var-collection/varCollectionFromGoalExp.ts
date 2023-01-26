import type { GoalExp } from "../goal-exp"
import type { VarCollection } from "../var-collection"
import { varCollectionFromExps, varCollectionMerge } from "../var-collection"

export function varCollectionFromGoalExp(goal: GoalExp): VarCollection {
  switch (goal["@kind"]) {
    case "Apply": {
      return varCollectionFromExps(goal.args)
    }

    case "Conj": {
      return varCollectionMerge(goal.goals.map(varCollectionFromGoalExp))
    }

    case "Disj": {
      return varCollectionMerge(goal.goals.map(varCollectionFromGoalExp))
    }
  }
}
