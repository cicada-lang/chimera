import { Env } from "../env"
import { GoalQueue } from "../goal"
import { Solution } from "../solution"

export abstract class Goal {
  abstract evaluate(env: Env, solution: Solution): Array<GoalQueue>
}
