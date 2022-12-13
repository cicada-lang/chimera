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
      inequalities: removeSubsumedInequalities(solution, arg.name, target),
    }),
  ]
}

function removeSubsumedInequalities(
  solution: Solution,
  name: string,
  typeConstraint: Values.TypeConstraint,
): Array<Substitution> {
  return solution.inequalities.filter((inequality) =>
    substitutionPairs(inequality).every(
      (pair) =>
        !pairSubsumedByTypeConstraint(solution, pair, name, typeConstraint),
    ),
  )
}

function pairSubsumedByTypeConstraint(
  solution: Solution,
  pair: [Values.PatternVar, Value],
  name: string,
  typeConstraint: Values.TypeConstraint,
): boolean {
  let [variable, value] = pair
  if (variable.name !== name) return false

  value = substitutionWalk(solution.substitution, value)
  if (value["@kind"] === "PatternVar") return false

  return !typeConstraint.predicate(value)
}
