import type { Caze } from "../caze"
import { envMerge } from "../env"
import * as Errors from "../errors"
import { formatValue } from "../format"
import { match } from "../match"
import { quote } from "../quote"
import {
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionEntries,
} from "../substitution"
import type { Value } from "../value"
import { catchReturnValue } from "./catchReturnValue"

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
