import { solutionUpdate, type Solution } from "../solution/index.ts"
import { substitutionWalk } from "../substitution/index.ts"
import type * as Values from "../value/index.ts"
import { removeInequalitiesSubsumedByTypeConstraints } from "./removeInequalitiesSubsumedByTypeConstraints.ts"

export function maintainTypeConstraints(
  solution: Solution | undefined,
): Solution | undefined {
  if (solution === undefined) {
    return undefined
  }

  const typeConstraints: Array<[Values.PatternVar, Values.TypeConstraint]> = []
  for (const [variable, typeConstraint] of solution.typeConstraints) {
    const value = substitutionWalk(solution.substitution, variable)
    if (value["@kind"] === "PatternVar") {
      typeConstraints.push([value, typeConstraint])
    } else if (!typeConstraint.predicate(value)) {
      return undefined
    }
  }

  return solutionUpdate(solution, {
    typeConstraints,
    inequalities: removeInequalitiesSubsumedByTypeConstraints(
      solution,
      solution.inequalities,
      typeConstraints,
    ),
  })
}
