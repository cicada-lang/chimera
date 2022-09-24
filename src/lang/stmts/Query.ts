import { Goal } from "../goal"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Solver } from "../solver"

export type QueryBinding = QueryBindingName

export type QueryBindingName = {
  kind: "QueryBindingName"
  name: string
}

export function QueryBindingName(name: string): QueryBindingName {
  return {
    kind: "QueryBindingName",
    name,
  }
}

export class Query extends Stmt {
  constructor(
    public bindings: Array<QueryBinding>,
    public goals: Array<Goal>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const solver = Solver.forGoals(this.goals)
    const solutions = solver.solve(mod.env)
    for (const solution of solutions) {
      console.log(solution)
    }
  }
}
