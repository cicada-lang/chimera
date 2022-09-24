import { Env } from "../env"
import { evaluate, Exp } from "../exp"
import { Goal, GoalQueue } from "../goal"
import { Solution, solve } from "../solution"

export class Unifiable extends Goal {
  constructor(public left: Exp, public right: Exp) {
    super()
  }

  pursue(env: Env, solution: Solution): Array<GoalQueue> {
    const left = evaluate(env, this.left)
    const right = evaluate(env, this.right)
    const newSolution = solve(solution, left, right)
    if (newSolution !== undefined) {
      return [new GoalQueue(newSolution, [])]
    } else {
      return []
    }
  }
}
