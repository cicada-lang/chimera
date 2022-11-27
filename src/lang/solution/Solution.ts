import type { Substitution } from "../substitution"
import { substitutionEmpty } from "../substitution"

export class Solution {
  constructor(public substitution: Substitution) {}

  static initial(): Solution {
    return new Solution(substitutionEmpty())
  }

  update(options: { substitution: Substitution }): Solution {
    return new Solution(options.substitution)
  }
}
