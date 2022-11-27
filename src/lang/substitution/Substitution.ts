import Immutable from "immutable"
import type { Exp } from "../exp"

export type Substitution = Immutable.Map<string, Exp>

export function substitutionEmpty(): Substitution {
  return Immutable.Map()
}

export function substitutionExtend(
  substitution: Substitution,
  name: string,
  exp: Exp,
): Substitution {
  return substitution.set(name, exp)
}
