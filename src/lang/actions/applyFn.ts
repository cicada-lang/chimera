import { doAp } from "../actions/index.js"
import { envMerge } from "../env/index.js"
import * as Errors from "../errors/index.js"
import { formatValue } from "../format/index.js"
import { match } from "../match/index.js"
import type { Mod } from "../mod/index.js"
import {
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionEntries,
} from "../substitution/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"
import { catchReturnValue } from "./catchReturnValue.js"

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
