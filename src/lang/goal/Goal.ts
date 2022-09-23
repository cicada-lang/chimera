import { GoalQueue } from "../goal"
import { Solution } from "../solution"
import { Env } from "../env"

export abstract class Goal {
  abstract evaluate(env: Env, solution: Solution): Array<GoalQueue>
}
