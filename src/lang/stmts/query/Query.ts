import * as Exps from "../../exp"
import { Mod } from "../../mod"
import { formatVariable, formatVariables } from "../../solution"
import { Solver } from "../../solver"
import { Span } from "../../span"
import { Stmt } from "../../stmt"
import { QueryPattern } from "../query"

export class Query extends Stmt {
  constructor(public pattern: QueryPattern, public goals: Array<Exps.Goal>, public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    const goals = this.goals.map((goal) => Exps.evaluateGoal(mod.env, goal))
    const solver = Solver.fromGoals(goals)
    const solutions = solver.solve(mod, mod.env, { limit: undefined })
    const pattern = this.pattern

    switch (pattern.kind) {
      case "QueryPatternNames": {
        const results = solutions.map((solution) => formatVariables(solution, pattern.names))
        return results.length === 0 ? "[]" : `[ ${results.join(", ")} ]`
      }

      case "QueryPatternName": {
        const results = solutions.map((solution) => formatVariable(solution, pattern.name))
        return results.length === 0 ? "[]" : `[ ${results.join(", ")} ]`
      }
    }
  }
}
