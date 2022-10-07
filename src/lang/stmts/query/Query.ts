import * as Exps from "../../exp"
import { Mod } from "../../mod"
import { formatVariables } from "../../solution"
import { Span } from "../../span"
import { Stmt } from "../../stmt"
import { solveGoals } from "../query"

export class Query extends Stmt {
  constructor(public names: Array<string>, public goals: Array<Exps.Goal>, public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    const solutions = solveGoals(mod, this.goals)
    const results = solutions.map((solution) => formatVariables(solution, this.names))
    return results.length === 0 ? "[]" : `[ ${results.join(", ")} ]`
  }
}
