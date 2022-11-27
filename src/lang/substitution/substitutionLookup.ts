import type { Exp } from "../exp"
import type { Substitution } from "../substitution"

export function substitutionLookup(
  substitution: Substitution,
  name: string,
): Exp | undefined {
  while (substitution["@kind"] !== "SubstitutionNull") {
    if (substitution.name === name) {
      return substitution.exp
    } else {
      substitution = substitution.rest
    }
  }
}
