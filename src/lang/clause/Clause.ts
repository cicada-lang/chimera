import type { Env } from "../env"
import type { Exp } from "../exp"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"

export type Clause = {
  mod: Mod
  env: Env
  vars: Set<string>
  name: string
  exp: Exp
  goals: Array<GoalExp>
}

export function Clause(
  mod: Mod,
  env: Env,
  vars: Set<string>,
  name: string,
  exp: Exp,
  goals: Array<GoalExp>,
): Clause {
  return {
    mod,
    env,
    vars,
    name,
    exp,
    goals,
  }
}
