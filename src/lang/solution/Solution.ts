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

export class Solution {
  constructor(
    public goals: Array<Goal>,
    public substitution: Substitution,
    public inequalities: Array<Substitution>,
    public typeConstraints: Array<[Values.PatternVar, Values.TypeConstraint]>,
    public hyperruleConstraints: Array<HyperruleConstraint>,
  ) {}

  static initial(goals: Array<Goal>): Solution {
    return new Solution(goals, substitutionEmpty(), [], [], [])
  }

  update(options: {
    goals?: Array<Goal>
    substitution?: Substitution
    inequalities?: Array<Substitution>
    typeConstraints?: Array<[Values.PatternVar, Values.TypeConstraint]>
    hyperruleConstraints?: Array<HyperruleConstraint>
  }): Solution {
    return new Solution(
      options.goals || this.goals,
      options.substitution || this.substitution,
      options.inequalities || this.inequalities,
      options.typeConstraints || this.typeConstraints,
      options.hyperruleConstraints || this.hyperruleConstraints,
    )
  }
}
