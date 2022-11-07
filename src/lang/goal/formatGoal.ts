import { formatExp } from "../exp"
import { Goal } from "../goal"

export function formatGoal(goal: Goal): string {
  switch (goal.kind) {
    case "Apply": {
      return `${goal.name} ${formatExp(goal.arg)}`
    }

    case "Unifiable": {
      return `${formatExp(goal.left)} = ${formatExp(goal.right)}`
    }
  }
}
