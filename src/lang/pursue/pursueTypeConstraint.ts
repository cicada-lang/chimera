import { solutionUpdate, type Solution } from "../solution/index.js"
import { substitutionWalk } from "../substitution/index.js"
import type * as Values from "../value/index.js"
import type { Value } from "../value/index.js"
import { removeInequalitiesSubsumedByTypeConstraints } from "./removeInequalitiesSubsumedByTypeConstraints.js"

export function pursueTypeConstraint(
  solution: Solution,
  target: Values.TypeConstraint,
  arg: Value,
): Array<Solution> {
  arg = substitutionWalk(solution.substitution, arg)

  if (arg["@kind"] !== "PatternVar") {
    if (target.predicate(arg)) {
      return [solution]
    } else {
      return []
    }
  }

  for (let [variable, typeConstraint] of solution.typeConstraints) {
    const value = substitutionWalk(solution.substitution, variable)

    /**
       If a `TypeConstraint` is about the `arg` variable,
       it must be the same as the `target` `TypeConstraint`.
    **/

    if (value["@kind"] === "PatternVar" && value.name === arg.name) {
      if (target.name === typeConstraint.name) {
        return [solution]
      } else {
        return []
      }
    }
  }

  return [
    solutionUpdate(solution, {
      typeConstraints: [[arg, target], ...solution.typeConstraints],
      inequalities: removeInequalitiesSubsumedByTypeConstraints(
        solution,
        solution.inequalities,
        [[arg, target]],
      ),
    }),
  ]
}
