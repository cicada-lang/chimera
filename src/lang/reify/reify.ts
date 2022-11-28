import type { Exp } from "../exp"
import {
  prepareSubstitution,
  Substitution,
  substitutionDeepWalk,
  substitutionEmpty,
} from "../substitution"

export function reify(substitution: Substitution, exp: Exp): Exp {
  exp = substitutionDeepWalk(substitution, exp)
  substitution = prepareSubstitution(substitutionEmpty(), exp)
  return substitutionDeepWalk(substitution, exp)
}
