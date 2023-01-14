import type { Mod } from "../mod"
import type { Solution } from "../solution"
import { substitutionWalk } from "../substitution"
import type * as Values from "../value"
import { removeInequalitiesSubsumedByTypeConstraints } from "./removeInequalitiesSubsumedByTypeConstraints"

export function maintaintypeConstraints(
  mod: Mod,
  solution: Solution | undefined,
): Solution | undefined {
  if (solution === undefined) return undefined

  const typeConstraints: Array<[Values.PatternVar, Values.TypeConstraint]> = []
  for (const [variable, typeConstraint] of solution.typeConstraints) {
    const value = substitutionWalk(solution.substitution, variable)
    if (value["@kind"] === "PatternVar") {
      typeConstraints.push([value, typeConstraint])
    } else if (!typeConstraint.predicate(value)) {
      return undefined
    }
  }

  return solution.update({
    typeConstraints,
    inequalities: removeInequalitiesSubsumedByTypeConstraints(
      solution,
      solution.inequalities,
      typeConstraints,
    ),
  })
}
