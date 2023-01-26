import type { Mod } from "../mod"
import { Substitution, substitutionDeepWalk } from "../substitution"
import type * as Values from "../value"

export function defineRenames(
  mod: Mod,
  renames: Map<string, Values.PatternVar>,
  substitution: Substitution,
): void {
  for (const [name, variable] of renames.entries()) {
    mod.define(name, substitutionDeepWalk(substitution, variable))
  }
}
