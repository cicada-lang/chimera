import { LangError } from "../errors"
import { Goal } from "../goal"
import { Mod } from "../mod"
import { Solver } from "../solver"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class Failure extends Stmt {
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
    if (solutions.length > 0) {
      throw new LangError(`expect failure`)
    }
  }
}
