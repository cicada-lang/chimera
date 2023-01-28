import { stringHash } from "src/utils/stringHash"
import { formatValue } from "../format"
import type { Goal } from "../goal"

export function formatGoal(goal: Goal): string {
  switch (goal["@kind"]) {
    case "Apply": {
      const args = goal.args.map((arg) => formatValue(arg)).join(", ")

      if (goal.target["@kind"] === "TypeConstraint") {
        return `${goal.target.name}(${args})`
      }

      if (goal.target["@kind"] === "Relation") {
        return `${goal.target.name}(${args})`
      }

      if (goal.target["@kind"] === "Hyperrule") {
        if (goal.target.name === undefined) {
          return `$AnonymousHyperruleConstraint(${stringHash(
            formatValue(goal.target),
          )})(${args})`
        }

        return `${goal.target.name}(${args})`
      }

      return `${formatValue(goal.target)}(${args})`
    }

    case "Equal": {
      return `Equal(${formatValue(goal.left)}, ${formatValue(goal.right)})`
    }

    case "NotEqual": {
      return `NotEqual(${formatValue(goal.left)}, ${formatValue(goal.right)})`
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
