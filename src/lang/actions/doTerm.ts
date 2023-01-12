import { applyFn } from "../actions"
import * as Errors from "../errors"
import { hyperrewrite } from "../hyperrewrite"
import type { Mod } from "../mod"
import { rewrite } from "../rewrite"
import type { Value } from "../value"
import * as Values from "../value"

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
    return applyFn(target, args)
  }

  throw new Errors.LangError(
    [
      `[doTerm] can not apply target`,
      `  target['@kind']: ${target["@kind"]}`,
    ].join("\n"),
  )
}
