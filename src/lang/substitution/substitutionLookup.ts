import type { Exp } from "../exp"
import type { Substitution } from "../substitution"

export function substitutionLookup(
  substitution: Substitution,
  name: string,
): Exp | undefined {
  return substitution.get(name)
}
