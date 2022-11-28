import type { Exp } from "../exp"
import { prepareSubstitution } from "../reify"
import { Substitution, substitutionDeepWalk } from "../substitution"

export function reify(substitution: Substitution, exp: Exp): Exp {
  exp = substitutionDeepWalk(substitution, exp)
  const substitutionWithReifiedVars = prepareSubstitution(exp)
  return substitutionDeepWalk(substitutionWithReifiedVars, exp)
}
