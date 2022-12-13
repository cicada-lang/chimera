import type { Goal } from "../goal"
import type { Substitution } from "../substitution"
import { substitutionEmpty } from "../substitution"
import type * as Values from "../value"

export class Solution {
  constructor(
    public goals: Array<Goal>,
    public substitution: Substitution,
    public inequalities: Array<Substitution>,
    public typeConstraints: Array<[Values.PatternVar, Values.TypeConstraint]>,
  ) {}

  static initial(goals: Array<Goal>): Solution {
    return new Solution(goals, substitutionEmpty(), [], [])
  }

  update(options: {
    goals?: Array<Goal>
    substitution?: Substitution
    inequalities?: Array<Substitution>
    typeConstraints?: Array<[Values.PatternVar, Values.TypeConstraint]>
  }): Solution {
    return new Solution(
      options.goals || this.goals,
      options.substitution || this.substitution,
      options.inequalities || this.inequalities,
      options.typeConstraints || this.typeConstraints,
    )
  }
}
