import { doAp } from "../actions/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"

export function applyPrimitive(
  target: Values.Primitive,
  args: Array<Value>,
): Value {
  if (target.arity !== undefined && target.arity > args.length) {
    return Values.Curried(target, target.arity, args)
  }

  const takenArgs = args.slice(0, target.arity)
  const remainArgs = args.slice(target.arity)

  const result = target.nativeFn(takenArgs)
  if (target.arity < args.length) {
    return doAp(result, remainArgs)
  }

  return result
}
