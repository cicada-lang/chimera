import type { Exp } from "../exp"
import { Substitution, substitutionLookup } from "../substitution"

export function substitutionWalk(substitution: Substitution, exp: Exp): Exp {
  while (exp["@kind"] === "PatternVar") {
    const found = substitutionLookup(substitution, exp.name)
    if (found === undefined) return exp
    exp = found
  }

  return exp
}
