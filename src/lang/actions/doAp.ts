import type { Env } from "../env"
import * as Errors from "../errors"
import type { Mod } from "../mod"
import type { Value } from "../value"
import { formatValue } from "../value"
import { applyCurried } from "./applyCurried"
import { applyFn } from "./applyFn"
import { applyHyperrule } from "./applyHyperrule"
import { applyPrimitive } from "./applyPrimitive"
import { applyRelation } from "./applyRelation"
import { applyRule } from "./applyRule"
import { applyTypeConstraint } from "./applyTypeConstraint"

export function doAp(
  mod: Mod,
  env: Env,
  target: Value,
  args: Array<Value>,
): Value {
  if (target["@kind"] === "Rule") {
    return applyRule(mod, env, target, args)
  }

  if (target["@kind"] === "Hyperrule") {
    return applyHyperrule(mod, env, target, args)
  }

  if (target["@kind"] === "Fn") {
    return applyFn(mod, env, target, args)
  }

  if (target["@kind"] === "Primitive") {
    return applyPrimitive(mod, env, target, args)
  }

  if (target["@kind"] === "Curried") {
    return applyCurried(mod, env, target, args)
  }

  if (target["@kind"] === "Relation") {
    return applyRelation(mod, env, target, args)
  }

  if (target["@kind"] === "TypeConstraint") {
    return applyTypeConstraint(mod, env, target, args)
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
