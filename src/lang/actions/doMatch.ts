import type { Caze } from "../caze/index.ts"
import { envMerge } from "../env/index.ts"
import * as Errors from "../errors/index.ts"
import { formatValue } from "../format/index.ts"
import { match } from "../match/index.ts"
import { quote } from "../quote/index.ts"
import {
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionEntries,
} from "../substitution/index.ts"
import type { Value } from "../value/index.ts"
import { catchReturnValue } from "./catchReturnValue.ts"

export function doMatch(target: Value, cazes: Array<Caze>): Value {
  for (const caze of cazes) {
    const mod = caze.mod.copy()
    mod.env = envMerge(mod.env, caze.env)

    const pattern = quote(mod, mod.env, caze.pattern)
    const substitution = match(substitutionEmpty(), pattern, target)
    if (substitution === undefined) continue

    for (const [name, value] of substitutionEntries(substitution)) {
      mod.define(name, substitutionDeepWalk(substitution, value))
    }

    return catchReturnValue(mod, caze.stmts)
  }

  const patterns = cazes.map((caze) =>
    formatValue(quote(caze.mod, caze.env, caze.pattern)),
  )

  throw new Errors.LangError(
    [
      `[doMatch] pattern mismatch`,
      `  target: ${formatValue(target)}`,
      `  patterns: ${patterns.join(", ")}`,
    ].join("\n"),
  )
}
