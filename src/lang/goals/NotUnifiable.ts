import { Env } from "../env"
import { Goal, GoalQueue } from "../goal"
import { Solution, solve } from "../solution"
import { Value } from "../value"

export class NotUnifiable extends Goal {
  constructor(public left: Value, public right: Value) {
    super()
  }

  pursue(env: Env, solution: Solution): Array<GoalQueue> {
    const newSolution = solve(solution, this.left, this.right)
    if (newSolution !== undefined) {
      return []
    } else {
      return [new GoalQueue(solution, [])]
    }
  }
}
