import { solutionUpdate, type Solution } from "../solution/index.js"
import { substitutionWalk } from "../substitution/index.js"
import type * as Values from "../value/index.js"
import { removeInequalitiesSubsumedByTypeConstraints } from "./removeInequalitiesSubsumedByTypeConstraints.js"

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
