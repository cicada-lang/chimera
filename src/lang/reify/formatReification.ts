import { indent } from "../../utils/indent.ts"
import { formatExp } from "../exp/index.ts"
import { formatGoal } from "../goal/index.ts"
import type { Reification } from "../reify/index.ts"

export function formatReification(reification: Reification): string {
  if (reification.constraints.length === 0) {
    return formatExp(reification.exp)
  }

  const exp = formatExp(reification.exp)
  const constraints = reification.constraints.map(formatGoal)
  if (isLargeConstraints(constraints)) {
    return `${exp} with {\n${constraints
      .map((constraint) => indent(constraint))
      .join("\n")}\n}`
  } else {
    return `${exp} with { ${constraints.join("  ")} }`
  }
}

function isLargeConstraints(constraints: Array<string>): boolean {
  return (
    constraints.some((constraint) => constraint.includes("\n")) ||
    constraints.join("  ").length >= 60
  )
}
