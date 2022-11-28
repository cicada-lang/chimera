import type { Exp } from "../exp"
import { prepareSubstitution } from "../reify"
import { Substitution, substitutionDeepWalk } from "../substitution"

export type Reification = {
  exp: Exp
}

export function Reification(exp: Exp): Reification {
  return { exp }
}

export function reify(substitution: Substitution, exp: Exp): Reification {
  exp = substitutionDeepWalk(substitution, exp)
  const substitutionWithReifiedVars = prepareSubstitution(exp)
  return Reification(substitutionDeepWalk(substitutionWithReifiedVars, exp))
}
