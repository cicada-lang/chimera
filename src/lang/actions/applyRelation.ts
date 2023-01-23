import * as Errors from "../errors"
import { formatValue } from "../format"
import * as Goals from "../goal"
import { Solver } from "../solver"
import type { Value } from "../value"
import * as Values from "../value"

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

  const goal = Goals.Apply(target.name, target, args)
  const solver = Solver.start([goal])
  const solutions = solver.solve({ limit: Infinity })
  if (solutions.length === 0) {
    return Values.Boolean(false)
  } else {
    return Values.Boolean(true)
  }
}
