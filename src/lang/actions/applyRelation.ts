import * as Errors from "../errors/index.js"
import { formatValue } from "../format/index.js"
import * as Goals from "../goal/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"

export function applyRelation(
  target: Values.Relation,
  args: Array<Value>,
): Value {
  if (target.arity !== undefined && target.arity > args.length) {
    return Values.Curried(target, target.arity, args)
  }

  if (target.arity !== undefined && target.arity < args.length) {
    throw new Errors.LangError(
      [
        `[applyRelation] too many arguments`,
        `  target.name: ${target.name}`,
        `  target.arity: ${target.arity}`,
        `  args.length: ${args.length}`,
        `  args: ${args.map(formatValue).join(", ")}`,
      ].join("\n"),
    )
  }

  return Values.Goal(Goals.Apply(target, args))
}
