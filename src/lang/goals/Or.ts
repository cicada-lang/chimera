import { Env } from "../env"
import { Goal, GoalQueue } from "../goal"
import { Solution } from "../solution"

export class Or extends Goal {
  constructor(public goals: Array<Goal>) {
    super()
  }

  evaluate(env: Env, solution: Solution): Array<GoalQueue> {
    return this.goals.map((goal) => new GoalQueue(solution, [goal]))
  }
}
