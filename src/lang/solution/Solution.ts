import Immutable from "immutable"
import type { Goal } from "../goal"
import type { Substitution } from "../substitution"
import { substitutionEmpty } from "../substitution"
import type { TypeConstraint } from "../value"

export class Solution {
  constructor(
    public goals: Array<Goal>,
    public substitution: Substitution,
    public inequalities: Array<Substitution>,
    public typeConstraints: Immutable.Map<string, TypeConstraint>,
  ) {}

  static initial(goals: Array<Goal>): Solution {
    return new Solution(goals, substitutionEmpty(), [], Immutable.Map())
  }

  update(options: {
    goals?: Array<Goal>
    substitution?: Substitution
    inequalities?: Array<Substitution>
    typeConstraints?: Immutable.Map<string, TypeConstraint>
  }): Solution {
    return new Solution(
      options.goals || this.goals,
      options.substitution || this.substitution,
      options.inequalities || this.inequalities,
      options.typeConstraints || this.typeConstraints,
    )
  }
}
