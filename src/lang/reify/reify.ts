import type { Exp } from "../exp"
import {
  Substitution,
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionReify,
} from "../substitution"

export function reify(substitution: Substitution, exp: Exp): Exp {
  exp = substitutionDeepWalk(substitution, exp)
  substitution = substitutionReify(substitutionEmpty(), exp)
  return substitutionDeepWalk(substitution, exp)
}
