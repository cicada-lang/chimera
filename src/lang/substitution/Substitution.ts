import Immutable from "immutable"
import type { Value } from "../value"
import * as Values from "../value"

export type Substitution = Immutable.Map<string, Value>

export function substitutionEmpty(): Substitution {
  return Immutable.Map()
}

export function substitutionExtend(
  substitution: Substitution,
  name: string,
  value: Value,
): Substitution {
  return substitution.set(name, value)
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
): Value | undefined {
  return substitution.get(name)
}

export function substitutionPairs(
  substitution: Substitution,
): Array<[Values.PatternVar, Value]> {
  return substitution
    .toArray()
    .map(([name, value]) => [Values.PatternVar(name), value])
}

export function substitutionEntries(
  substitution: Substitution,
): Array<[string, Value]> {
  return substitution.toArray()
}
