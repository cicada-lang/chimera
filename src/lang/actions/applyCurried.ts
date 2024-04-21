import { doAp } from "../actions/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"

export function applyCurried(
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

  const result = doAp(target.target, takenArgs)
  if (target.arity < target.args.length + args.length) {
    return doAp(result, remainArgs)
  }

  return result
}
