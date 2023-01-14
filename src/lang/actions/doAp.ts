import * as Errors from "../errors"
import type { Mod } from "../mod"
import type { Value } from "../value"
import { formatValue } from "../value"
import { applyFn } from "./applyFn"
import { applyHyperrule } from "./applyHyperrule"
import { applyPrimitive } from "./applyPrimitive"
import { applyRelation } from "./applyRelation"
import { applyRule } from "./applyRule"

export function doAp(mod: Mod, target: Value, args: Array<Value>): Value {
  if (target["@kind"] === "Rule") {
    return applyRule(mod, target, args)
  }

  if (target["@kind"] === "Hyperrule") {
    return applyHyperrule(mod, target, args)
  }

  if (target["@kind"] === "Fn") {
    return applyFn(mod, target, args)
  }

  if (target["@kind"] === "Primitive") {
    return applyPrimitive(mod, target, args)
  }

  if (target["@kind"] === "Relation") {
    return applyRelation(mod, target, args)
  }

  throw new Errors.LangError(
    [
      `[doAp] can not apply target`,
      `  target['@kind']: ${target["@kind"]}`,
      `  target: ${formatValue(target)}`,
      `  args: ${args.map(formatValue).join(", ")}`,
    ].join("\n"),
  )
}
