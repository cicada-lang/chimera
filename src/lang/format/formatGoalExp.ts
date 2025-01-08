import { indent } from "../../utils/indent.ts"
import { formatArgs, formatExp } from "../format/index.ts"
import type { GoalExp } from "../goal-exp/index.ts"

export function formatGoalExp(goal: GoalExp): string {
  switch (goal["@kind"]) {
    case "Apply": {
      return `${formatExp(goal.target)}${formatArgs(goal.args)}`
    }

    case "Equal": {
      return `${formatExp(goal.left)} = ${formatExp(goal.right)}`
    }

    case "NotEqual": {
      return `${formatExp(goal.left)} != ${formatExp(goal.right)}`
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
