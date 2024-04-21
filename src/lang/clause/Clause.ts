import type { Env } from "../env/index.js"
import type { Exp } from "../exp/index.js"
import type { GoalExp } from "../goal-exp/index.js"
import type { Mod } from "../mod/index.js"

export type Clause = {
  mod: Mod
  env: Env
  name: string
  patterns: Array<Exp>
  goals: Array<GoalExp>
}

export function Clause(
  mod: Mod,
  env: Env,
  name: string,
  patterns: Array<Exp>,
  goals: Array<GoalExp>,
): Clause {
  return {
    mod,
    env,
    name,
    patterns,
    goals,
  }
}
