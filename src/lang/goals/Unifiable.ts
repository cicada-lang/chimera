import { Goal, GoalQueue } from "../goal"
import { Solution, solve } from "../solution"
import { Value } from "../value"
import { Env } from "../env"

export class Unifiable extends Goal {
  constructor(public left: Value, public right: Value) {
    super()
  }

  evaluate(env: Env, solution: Solution): Array<GoalQueue> {
    const newSolution = solve(solution, this.left, this.right)
    if (newSolution !== undefined) {
      return [new GoalQueue(newSolution, [])]
    } else {
      return []
    }
  }
}