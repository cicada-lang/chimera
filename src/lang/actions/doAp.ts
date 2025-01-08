import * as Errors from "../errors/index.ts"
import { formatValue } from "../format/index.ts"
import type { Value } from "../value/index.ts"
import { applyCurried } from "./applyCurried.ts"
import { applyFn } from "./applyFn.ts"
import { applyPrimitive } from "./applyPrimitive.ts"
import { applyRelation } from "./applyRelation.ts"
import { applyTypeConstraint } from "./applyTypeConstraint.ts"

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
