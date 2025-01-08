import type { Env } from "../env/index.ts"
import type { Exp } from "../exp/index.ts"
import type { GoalExp } from "../goal-exp/index.ts"
import type { Mod } from "../mod/index.ts"

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
