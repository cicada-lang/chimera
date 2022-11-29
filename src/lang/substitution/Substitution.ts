import Immutable from "immutable"
import type { Exp } from "../exp"
import * as Exps from "../exp"

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

export function substitutionPrefix(
  long: Substitution,
  short: Substitution,
): Substitution {
  return long.deleteAll(short.keys())
}

export function substitutionEqual(
  left: Substitution,
  right: Substitution,
): boolean {
  return left === right
}

export function substitutionLength(substitution: Substitution): number {
  return substitution.size
}

export function substitutionNames(substitution: Substitution): Array<string> {
  return Array.from(substitution.keys())
}

export function substitutionLookup(
  substitution: Substitution,
  name: string,
): Exp | undefined {
  return substitution.get(name)
}

export function substitutionPairs(
  substitution: Substitution,
): Array<[Exp, Exp]> {
  return substitution
    .toArray()
    .map(([name, exp]) => [Exps.PatternVar(name), exp])
}
