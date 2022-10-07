import { Goal } from "../goal"
import { formatValue } from "../value"

export function formatGoal(goal: Goal): string {
  switch (goal.kind) {
    case "Apply": {
      return `${goal.name} ${formatValue(goal.arg)}`
    }

    case "Unifiable": {
      return `unify ${formatValue(goal.left)} = ${formatValue(goal.right)}`
    }
  }
}
