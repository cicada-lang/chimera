import type { Env } from "../env"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import type { Value } from "../value"

export type Clause = {
  mod: Mod
  env: Env
  name: string
  patterns: Array<Value>
  goals: Array<GoalExp>
}

export function Clause(
  mod: Mod,
  env: Env,
  name: string,
  patterns: Array<Value>,
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
