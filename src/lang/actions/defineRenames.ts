import type { Mod } from "../mod/index.ts"
import {
  substitutionDeepWalk,
  type Substitution,
} from "../substitution/index.ts"
import type * as Values from "../value/index.ts"

export function defineRenames(
  mod: Mod,
  renames: Map<string, Values.PatternVar>,
  substitution: Substitution,
): void {
  for (const [name, variable] of renames.entries()) {
    mod.define(name, substitutionDeepWalk(substitution, variable))
  }
}
