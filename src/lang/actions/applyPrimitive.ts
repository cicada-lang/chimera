import { doAp } from "../actions"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

export function applyPrimitive(
  mod: Mod,
  target: Values.Primitive,
  args: Array<Value>,
): Value {
  if (target.arity > target.curried.length + args.length) {
    return Values.Primitive(target.name, target.arity, target.nativeFn, [
      ...target.curried,
      ...args,
    ])
  }

  if (target.arity < target.curried.length + args.length) {
    return doAp(
      mod,
      target.nativeFn([...target.curried, ...args].slice(0, target.arity)),
      args.slice(target.arity - target.curried.length),
    )
  }

  return target.nativeFn([...target.curried, ...args])
}
