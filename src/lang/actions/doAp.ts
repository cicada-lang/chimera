import * as Errors from "../errors"
import { formatValue } from "../format"
import type { Value } from "../value"
import { applyCurried } from "./applyCurried"
import { applyFn } from "./applyFn"
import { applyHyperrule } from "./applyHyperrule"
import { applyPrimitive } from "./applyPrimitive"
import { applyRelation } from "./applyRelation"
import { applyRule } from "./applyRule"
import { applyTypeConstraint } from "./applyTypeConstraint"

export function doAp(target: Value, args: Array<Value>): Value {
  if (target["@kind"] === "Rule") {
    return applyRule(target, args)
  }

  if (target["@kind"] === "Hyperrule") {
    return applyHyperrule(target, args)
  }

  if (target["@kind"] === "Fn") {
    return applyFn(target, args)
  }

  if (target["@kind"] === "Primitive") {
    return applyPrimitive(target, args)
  }

  if (target["@kind"] === "Curried") {
    return applyCurried(target, args)
  }

  if (target["@kind"] === "Relation") {
    return applyRelation(target, args)
  }

  if (target["@kind"] === "TypeConstraint") {
    return applyTypeConstraint(target, args)
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
