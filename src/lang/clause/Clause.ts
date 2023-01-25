import type { Goal } from "../goal"
import type { Value } from "../value"

export type Clause = {
  name: string
  patterns: Array<Value>
  goals: Array<Goal>
}

export function Clause(
  name: string,
  patterns: Array<Value>,
  goals: Array<Goal>,
): Clause {
  return {
    name,
    patterns,
    goals,
  }
}
