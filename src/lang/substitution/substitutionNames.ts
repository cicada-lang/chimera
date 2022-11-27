import type { Substitution } from "../substitution"

export function substitutionNames(substitution: Substitution): Array<string> {
  return Array.from(substitution.keys())
}
