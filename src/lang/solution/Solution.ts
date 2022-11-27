import type { Substitution } from "../substitution"
import { substitutionEmpty } from "../substitution"

export class Solution {
  constructor(
    public substitution: Substitution,
    public inequalities: Array<Substitution>,
  ) {}

  static initial(): Solution {
    return new Solution(substitutionEmpty(), [])
  }

  update(options: {
    substitution?: Substitution
    inequalities?: Array<Substitution>
  }): Solution {
    return new Solution(
      options.substitution || this.substitution,
      options.inequalities || this.inequalities,
    )
  }
}
