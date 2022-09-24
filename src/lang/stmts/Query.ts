import { Goal } from "../goal"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Solver } from "../solver"
import { formatSolution } from "../solution"

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
    for (const solution of solutions) {
      console.log(formatSolution(solution, this.names))
    }
  }
}
