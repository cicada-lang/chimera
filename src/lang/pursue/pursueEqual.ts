import { Solution, solutionUpdate } from "../solution"
import { substitutionEqual } from "../substitution"
import { unify } from "../unify"
import type { Value } from "../value"
import { maintainInequalities } from "./maintainInequalities"
import { maintainTypeConstraints } from "./maintainTypeConstraints"

export function pursueEqual(
  solution: Solution,
  left: Value,
  right: Value,
): Solution | undefined {
  const substitution = unify(solution.substitution, left, right)

  if (substitution === undefined) {
    return undefined
  }

  if (substitutionEqual(substitution, solution.substitution)) {
    return solution
  }

  let newSolution: Solution | undefined = solutionUpdate(solution, {
    substitution,
  })

  newSolution = maintainInequalities(newSolution)
  newSolution = maintainTypeConstraints(newSolution)

  return newSolution
}
