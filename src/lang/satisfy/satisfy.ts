import type { Goal } from "../goal"
import { Solver } from "../solver"

export function satisfy(goal: Goal): boolean {
  if (goal["@kind"] === "Apply" && goal.target["@kind"] === "TypeConstraint") {
    return goal.target.predicate(goal.args[0])
  }

  const solver = Solver.start([goal])
  const solutions = solver.solve({ limit: Infinity })
  return solutions.length !== 0
}
