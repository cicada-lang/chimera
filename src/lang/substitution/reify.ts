import type { Exp } from "../exp"
import {
  Substitution,
  substitutionDeepWalk,
  SubstitutionNull,
  substitutionReify,
} from "../substitution"

export function reify(substitution: Substitution, exp: Exp): Exp {
  exp = substitutionDeepWalk(substitution, exp)
  substitution = substitutionReify(SubstitutionNull(), exp)
  return substitutionDeepWalk(substitution, exp)
}
