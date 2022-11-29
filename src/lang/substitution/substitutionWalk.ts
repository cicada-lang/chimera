import type { Exp } from "../exp/index.ts"
import { Substitution, substitutionLookup } from "../substitution/index.ts"

export function substitutionWalk(substitution: Substitution, exp: Exp): Exp {
  while (exp["@kind"] === "PatternVar") {
    const found = substitutionLookup(substitution, exp.name)
    if (found === undefined) return exp
    exp = found
  }

  return exp
}
