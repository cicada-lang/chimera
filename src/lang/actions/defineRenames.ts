import type { Mod } from "../mod/index.js"
import {
  substitutionDeepWalk,
  type Substitution,
} from "../substitution/index.js"
import type * as Values from "../value/index.js"

export function defineRenames(
  mod: Mod,
  renames: Map<string, Values.PatternVar>,
  substitution: Substitution,
): void {
  for (const [name, variable] of renames.entries()) {
    mod.define(name, substitutionDeepWalk(substitution, variable))
  }
}
