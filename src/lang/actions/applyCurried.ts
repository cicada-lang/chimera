import { doAp } from "../actions"
import type { Env } from "../env"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

export function applyCurried(
  mod: Mod,
  env: Env,
  target: Values.Curried,
  args: Array<Value>,
): Value {
  if (target.arity > target.args.length + args.length) {
    return Values.Curried(target.target, target.arity, [
      ...target.args,
      ...args,
    ])
  }

  const takenArgs = [...target.args, ...args].slice(0, target.arity)
  const remainArgs = args.slice(target.arity - target.args.length)

  const result = doAp(mod, env, target.target, takenArgs)
  if (target.arity < target.args.length + args.length) {
    return doAp(mod, env, result, remainArgs)
  }

  return result
}
