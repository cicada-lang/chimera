import { Env } from "../env"
import { Mod } from "../mod"
import { GoalQueue } from "../goal"
import { Solution } from "../solution"

export abstract class Goal {
  abstract pursue(mod: Mod, env: Env, solution: Solution): Array<GoalQueue>
}
