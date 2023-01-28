import type { Goal } from "../goal"
import type { Hyperrule } from "../hyperrule"
import type { Substitution } from "../substitution"
import { substitutionEmpty } from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"

export type HyperruleConstraint = {
  hyperrule: Hyperrule
  value: Value
}

export type Solution = {
  goals: Array<Goal>
  substitution: Substitution
  inequalities: Array<Substitution>
  typeConstraints: Array<[Values.PatternVar, Values.TypeConstraint]>
  hyperruleConstraints: Array<HyperruleConstraint>
}

export function createSolutionFromGoals(goals: Array<Goal>): Solution {
  return {
    goals,
    substitution: substitutionEmpty(),
    inequalities: [],
    typeConstraints: [],
    hyperruleConstraints: [],
  }
}

export function solutionUpdate(
  target: Solution,
  options: Partial<Solution>,
): Solution {
  return {
    goals: options.goals || target.goals,
    substitution: options.substitution || target.substitution,
    inequalities: options.inequalities || target.inequalities,
    typeConstraints: options.typeConstraints || target.typeConstraints,
    hyperruleConstraints:
      options.hyperruleConstraints || target.hyperruleConstraints,
  }
}
