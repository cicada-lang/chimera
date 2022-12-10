import { indent } from "../../../utils/indent"
import type { Goal } from "../../goal"
import { formatGoal } from "../../goal"
import type { Solution } from "../../solution"
import type { Solver } from "../../solver"
import { substitutionPairs } from "../../substitution"
import { formatValue } from "../../value"

export function formatSolver(solver: Solver): string {
  const solutions = solver.partialSolutions.map(formatSolution)
  if (solutions.length === 0) {
    return `step {}`
  }

  return `step {\n${indent(solutions.join("\n\n"))}\n}`
}

function formatSolution(solution: Solution): string {
  const body = [
    formatSubstitutionPairs(
      substitutionPairs(solution.substitution).map(
        ([left, right]) => `${formatValue(left)} = ${formatValue(right)}`,
      ),
    ),
    formatGoals(solution.goals),
  ]
  return `solution {\n${indent(body.join("\n"))}\n}`
}

function formatSubstitutionPairs(parts: Array<string>): string {
  if (parts.length === 0) {
    return `substitution {}`
  }

  if (isLarge(parts)) {
    return `substitution {\n${indent(parts.join("\n"))}\n}`
  } else {
    return `substitution { ${parts.join(" ")} }`
  }
}

function formatGoals(goals: Array<Goal>): string {
  const parts = goals.map(formatGoal)
  if (parts.length === 0) {
    return `goals {}`
  }

  if (isLarge(parts)) {
    return `goals {\n${indent(parts.join("\n"))}\n}`
  } else {
    return `goals { ${parts.join(" ")} }`
  }
}

function isLarge(parts: Array<string>): boolean {
  return (
    parts.some((part) => part.includes("\n")) || parts.join(", ").length >= 60
  )
}
