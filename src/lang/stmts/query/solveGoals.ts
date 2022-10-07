import * as Exps from "../../exp"
import { Mod } from "../../mod"
import { formatVariable, Solution } from "../../solution"
import { Solver } from "../../solver"

export function solveGoals(mod: Mod, goals: Array<Exps.Goal>): Array<Solution> {
  const solver = Solver.forGoals(goals.map((goal) => Exps.evaluateGoal(mod.env, goal)))
  const solutions = solver.solve(mod, mod.env)
  return solutions
}

export function formatSolutions(solutions: Array<Solution>, name: string): string {
  const results = solutions.map((solution) => formatVariable(solution, name))
  return results.length === 0 ? "[]" : `[ ${results.join(", ")} ]`
}
