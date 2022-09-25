import { Goal } from "../goal"
import { Mod } from "../mod"
import { formatSolution } from "../solution"
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
    const s = solutions
      .map((solution) => formatSolution(solution, this.names))
      .join(", ")

    console.log(`{ "solutions": [${s}] }`)
  }
}
