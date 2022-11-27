import type { Substitution } from "../substitution"
import { SubstitutionNull } from "../substitution"

export class Solution {
  constructor(public substitution: Substitution) {}

  static initial(): Solution {
    return new Solution(SubstitutionNull())
  }

  update(options: { substitution: Substitution }): Solution {
    return new Solution(options.substitution)
  }
}
