import { indent } from "../../utils/indent"
import { formatGoal } from "../goal"
import type { Reification } from "../reify"
import { formatValue } from "../value"

export function formatReification(reification: Reification): string {
  if (reification.constraints.length === 0) {
    return formatValue(reification.value)
  }

  const value = formatValue(reification.value)
  const constraints = reification.constraints.map(formatGoal)
  if (isLargeConstraints(constraints)) {
    return `${value} with {\n${constraints
      .map((constraint) => indent(constraint))
      .join("\n")}\n}`
  } else {
    return `${value} with { ${constraints.join(" ")} }`
  }
}

function isLargeConstraints(constraints: Array<string>): boolean {
  return (
    constraints.some((constraint) => constraint.includes("\n")) ||
    constraints.join("  ").length >= 60
  )
}
