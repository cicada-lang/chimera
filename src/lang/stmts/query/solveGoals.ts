import * as Exps from "../../exp"
import { Mod } from "../../mod"
import { Solution } from "../../solution"
import { Solver } from "../../solver"

export function solveGoals(mod: Mod, goals: Array<Exps.Goal>): Array<Solution> {
  const solver = Solver.fromGoals(goals.map((goal) => Exps.evaluateGoal(mod.env, goal)))
  const solutions = solver.solve(mod, mod.env, { limit: undefined })
  return solutions
}
