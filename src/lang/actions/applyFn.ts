import { doAp } from "../actions/index.ts"
import { envMerge } from "../env/index.ts"
import * as Errors from "../errors/index.ts"
import { formatValue } from "../format/index.ts"
import { match } from "../match/index.ts"
import type { Mod } from "../mod/index.ts"
import {
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionEntries,
} from "../substitution/index.ts"
import type { Value } from "../value/index.ts"
import * as Values from "../value/index.ts"
import { catchReturnValue } from "./catchReturnValue.ts"

export function applyFn(target: Values.Fn, args: Array<Value>): Value {
  const mod = target.mod.copy()
  mod.env = envMerge(mod.env, target.env)
  matchPatterns(mod, target.patterns, args)

  if (target.patterns.length > args.length) {
    return Values.Curried(target, target.patterns.length, args)
  }

  const remainArgs = args.slice(target.patterns.length)
  const result = catchReturnValue(mod, target.stmts)
  if (target.patterns.length < args.length) {
    return doAp(result, remainArgs)
  }

  return result
}

function matchPatterns(
  mod: Mod,
  patterns: Array<Value>,
  args: Array<Value>,
): void {
  let substitution = substitutionEmpty()

  for (const [index, pattern] of patterns.entries()) {
    const arg = args[index]
    if (arg === undefined) {
      break
    }

    const newSubstitution = match(substitution, pattern, arg)
    if (newSubstitution === undefined) {
      throw new Errors.LangError(
        [
          `[matchPatterns] fail to match pattern with arg`,
          `  pattern: ${formatValue(pattern)}`,
          `  arg: ${formatValue(arg)}`,
        ].join("\n"),
      )
    }

    substitution = newSubstitution
  }

  for (const [name, value] of substitutionEntries(substitution)) {
    mod.define(name, substitutionDeepWalk(substitution, value))
  }
}
