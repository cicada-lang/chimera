import { indent } from "../../utils/indent"
import { formatArgs } from "../format"
import type { GoalExp } from "../goal-exp"

export function formatGoalExp(goal: GoalExp): string {
  switch (goal["@kind"]) {
    case "Apply": {
      return `${goal.name}${formatArgs(goal.args)}`
    }

    case "Conj": {
      const goals = goal.goals.map(formatGoalExp)
      return `conj {\n${indent(goals.join("\n"))}\n}`
    }

    case "Disj": {
      const goals = goal.goals.map(formatGoalExp)
      return `disj {\n${indent(goals.join("\n"))}\n}`
    }
  }
}
