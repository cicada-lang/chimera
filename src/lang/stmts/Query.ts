import { Goal } from "../goal"
import { Mod } from "../mod"
import { formatSolutions } from "../solution"
import { Solver } from "../solver"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class Query extends Stmt {
  constructor(
    public names: Array<string>,
    public goals: Array<Goal>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const solver = Solver.forGoals(this.goals)
    const solutions = solver.solve(mod.env)
    const success = solutions.length > 0
    const properties = [
      `"success": ${success}`,
      `"count": ${solutions.length}`,
      `"solutions": [${formatSolutions(solutions, this.names)}]`,
    ]
    console.log(`{ ${properties.join(", ")} }`)
  }
}
