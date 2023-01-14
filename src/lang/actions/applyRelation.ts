import type { Env } from "../env"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import { Solver } from "../solver"
import type { Value } from "../value"
import * as Values from "../value"

export function applyRelation(
  mod: Mod,
  env: Env,
  target: Values.Relation,
  args: Array<Value>,
): Value {
  const goal = Goals.Apply(target.name, target, args)
  const solver = Solver.start([goal])
  const solutions = solver.solve(mod, { limit: Infinity })
  if (solutions.length === 0) {
    return Values.Boolean(false)
  } else {
    return Values.Boolean(true)
  }
}
