import { GoalQueue } from "../goal"
import { Solution } from "../solution"

export abstract class Goal {
  abstract evaluate(solution: Solution): Array<GoalQueue>
}
