import type { Mod } from "../mod"
import { refreshExp, refreshGoal } from "../refresh"
import { Clause } from "../relation"

export function refreshClause(mod: Mod, clause: Clause): Clause {
  const varMap = new Map()
  return Clause(
    clause.name,
    refreshExp(mod, clause.exp, varMap),
    clause.goals.map((goal) => refreshGoal(mod, goal, varMap)),
  )
}
