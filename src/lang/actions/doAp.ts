import * as Errors from "../errors/index.js"
import { formatValue } from "../format/index.js"
import type { Value } from "../value/index.js"
import { applyCurried } from "./applyCurried.js"
import { applyFn } from "./applyFn.js"
import { applyPrimitive } from "./applyPrimitive.js"
import { applyRelation } from "./applyRelation.js"
import { applyTypeConstraint } from "./applyTypeConstraint.js"

export function doAp(target: Value, args: Array<Value>): Value {
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
