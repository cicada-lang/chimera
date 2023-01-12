import { doTerm } from "../actions"
import { envMerge } from "../env"
import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import { match } from "../match"
import { ReturnValue } from "../stmts"
import {
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionEntries,
} from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"
import { formatValue } from "../value"

export function applyFn(target: Values.Fn, args: Array<Value>): Value {
  const mod = target.mod.copy()

  mod.env = envMerge(mod.env, target.env)

  let substitution = substitutionEmpty()
  for (const [index, pattern] of target.patterns.entries()) {
    const arg = args[index]
    if (arg === undefined) {
      throw new Errors.LangError(
        [
          `[applyFn] not enough arguments`,
          `  pattern: ${formatValue(pattern)}`,
        ].join("\n"),
      )
    }

    const newSubstitution = match(mod, substitution, pattern, arg)
    if (newSubstitution === undefined) {
      throw new Errors.LangError(
        [
          `[applyFn] fail to match pattern with arg`,
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

  try {
    mod.executeStmtsSync(target.stmts)
    const value = evaluate(mod, mod.env, target.ret)
    return target.patterns.length < args.length
      ? doTerm(mod, value, args.slice(0, target.patterns.length))
      : value
  } catch (error) {
    if (error instanceof ReturnValue) {
      const value = error.value
      return target.patterns.length < args.length
        ? doTerm(mod, value, args.slice(0, target.patterns.length))
        : value
    }

    throw error
  }
}
