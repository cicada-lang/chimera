import type { Env } from "../env"
import type { Mod } from "../mod"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionPairs,
  substitutionWalk,
} from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"

export function applyTypeConstraint(
  mod: Mod,
  env: Env,
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
    if (value["@kind"] !== "PatternVar") return []
    if (value.name !== arg.name) return []

    if (target.name === typeConstraint.name) {
      return [solution]
    } else {
      return []
    }
  }

  return [
    solution.update({
      typeConstraints: [[arg, target], ...solution.typeConstraints],
      inequalities: removeInequalitiesSubsumedByTypeConstraints(
        solution,
        solution.inequalities,
        [[arg, target]],
      ),
    }),
  ]
}

export function removeInequalitiesSubsumedByTypeConstraints(
  solution: Solution,
  inequalities: Array<Substitution>,
  typeConstraints: Array<[Values.PatternVar, Values.TypeConstraint]>,
): Array<Substitution> {
  return inequalities.filter((inequality) =>
    substitutionPairs(inequality).every(
      (pair) => !pairSubsumedByTypeConstraints(solution, pair, typeConstraints),
    ),
  )
}

function pairSubsumedByTypeConstraints(
  solution: Solution,
  pair: [Values.PatternVar, Value],
  typeConstraints: Array<[Values.PatternVar, Values.TypeConstraint]>,
): boolean {
  return typeConstraints.some(([keyPatternVar, typeConstraint]) => {
    const walkedKeyPatternVar = substitutionWalk(
      solution.substitution,
      keyPatternVar,
    )

    if (walkedKeyPatternVar["@kind"] !== "PatternVar") return false

    let [variable, value] = pair
    if (variable.name !== walkedKeyPatternVar.name) return false

    value = substitutionWalk(solution.substitution, value)
    if (value["@kind"] === "PatternVar") return false

    return !typeConstraint.predicate(value)
  })
}
