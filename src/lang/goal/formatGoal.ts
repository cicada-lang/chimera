import type { Goal } from "../goal"
import { formatValue } from "../value"

export function formatGoal(goal: Goal): string {
  switch (goal["@kind"]) {
    case "Apply": {
      return `${goal.name} ${formatValue(goal.arg)}`
    }

    case "Equal": {
      return `${formatValue(goal.left)} = ${formatValue(goal.right)}`
    }

    case "NotEqual": {
      return `${formatValue(goal.left)} != ${formatValue(goal.right)}`
    }

    case "Conj": {
      const goals = goal.goals.map(formatGoal).join(" ")
      return `conj { ${goals} }`
    }

    case "Disj": {
      const goals = goal.goals.map(formatGoal).join(" ")
      return `disj { ${goals} }`
    }
  }
}
