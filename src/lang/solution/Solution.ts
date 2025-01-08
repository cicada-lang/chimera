import type { Goal } from "../goal/index.ts"
import type { Substitution } from "../substitution/index.ts"
import { substitutionEmpty } from "../substitution/index.ts"
import type * as Values from "../value/index.ts"

export type Solution = {
  goals: Array<Goal>
  substitution: Substitution
  inequalities: Array<Substitution>
  typeConstraints: Array<[Values.PatternVar, Values.TypeConstraint]>
}

export function createSolutionFromGoals(goals: Array<Goal>): Solution {
  return {
    goals,
    substitution: substitutionEmpty(),
    inequalities: [],
    typeConstraints: [],
  }
}

export function createEmptySolution(): Solution {
  return {
    goals: [],
    substitution: substitutionEmpty(),
    inequalities: [],
    typeConstraints: [],
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
  }
}
