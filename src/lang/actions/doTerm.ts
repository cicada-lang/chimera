import * as Errors from "../errors"
import type { Mod } from "../mod"
import { rewrite } from "../rewrite"
import type { Value } from "../value"

export function doTerm(mod: Mod, target: Value, args: Array<Value>): Value {
  if (target["@kind"] === "RewriteRule") {
    if (args.length !== 1) {
      throw new Errors.LangError(
        [
          `[doTerm] the number of arguments of RewriteRule must be 1`,
          `  args.length: ${args.length}`,
        ].join("\n"),
      )
    }

    return rewrite(mod, target.rule, args[0])
  }

  throw new Errors.LangError(
    [
      `[doTerm] can not apply target`,
      `  target['@kind']: ${target["@kind"]}`,
    ].join("\n"),
  )
}
