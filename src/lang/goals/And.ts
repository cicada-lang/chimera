import { Goal, GoalQueue } from "../goal"
import { Solution } from "../solution"
import { Env } from "../env"

export class And extends Goal {
  constructor(public goals: Array<Goal>) {
    super()
  }

  evaluate(env: Env, solution: Solution): Array<GoalQueue> {
    return [new GoalQueue(solution, this.goals)]
  }
}
