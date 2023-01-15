import { doAp } from "../actions"
import type { Env } from "../env"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

export function applyPrimitive(
  mod: Mod,
  env: Env,
  target: Values.Primitive,
  args: Array<Value>,
): Value {
  if (target.arity > args.length) {
    return Values.Curried(target, target.arity, args)
  }

  const takenArgs = args.slice(0, target.arity)
  const remainArgs = args.slice(target.arity)

  const result = target.nativeFn(takenArgs, { mod, env })
  if (target.arity < args.length) {
    return doAp(mod, env, result, remainArgs)
  }

  return result
}
