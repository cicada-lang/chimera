import { envMerge } from "../env"
import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import { hyperrewrite } from "../hyperrewrite"
import { match } from "../match"
import type { Mod } from "../mod"
import { rewrite } from "../rewrite"
import {
  substitutionDeepWalk,
  substitutionEmpty,
  substitutionEntries,
} from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"
import { formatValue } from "../value"

export function doTerm(mod: Mod, target: Value, args: Array<Value>): Value {
  if (target["@kind"] === "Rule") {
    if (args.length !== 1) {
      throw new Errors.LangError(
        [
          `[doTerm] the number of arguments of Rule must be 1`,
          `  args.length: ${args.length}`,
        ].join("\n"),
      )
    }

    return rewrite(mod, target.rule, args[0])
  }

  if (target["@kind"] === "Hyperrule") {
    if (args.length !== 1) {
      throw new Errors.LangError(
        [
          `[doTerm] the number of arguments of Hyperrule must be 1`,
          `  args.length: ${args.length}`,
        ].join("\n"),
      )
    }

    return Values.fromArray(
      hyperrewrite(mod, target.hyperrule, Values.toArray(args[0])),
    )
  }

  if (target["@kind"] === "Fn") {
    const mod = target.mod.copy()
    mod.env = envMerge(mod.env, target.env)

    let substitution = substitutionEmpty()
    for (const [index, pattern] of target.patterns.entries()) {
      const arg = args[index]
      if (arg === undefined) {
        throw new Errors.LangError(
          [
            `[doTerm] not enough arguments`,
            `  pattern: ${formatValue(pattern)}`,
          ].join("\n"),
        )
      }

      const newSubstitution = match(mod, substitution, pattern, arg)
      if (newSubstitution === undefined) {
        throw new Errors.LangError(
          [
            `[doTerm] fail to match pattern with arg`,
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

    mod.executeStmtsSync(target.stmts)
    const result = evaluate(mod, mod.env, target.ret)

    if (target.patterns.length < args.length) {
      const restArgs = args.slice(0, target.patterns.length)
      return doTerm(mod, result, restArgs)
    } else {
      return result
    }
  }

  throw new Errors.LangError(
    [
      `[doTerm] can not apply target`,
      `  target['@kind']: ${target["@kind"]}`,
    ].join("\n"),
  )
}
