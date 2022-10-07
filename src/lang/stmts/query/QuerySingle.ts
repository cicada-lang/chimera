import * as Exps from "../../exp"
import { Mod } from "../../mod"
import { formatVariable } from "../../solution"
import { Span } from "../../span"
import { Stmt } from "../../stmt"
import { query } from "../query"

export class QuerySingle extends Stmt {
  constructor(public name: string, public goals: Array<Exps.Goal>, public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    const solutions = query(mod, this.goals)
    const results = solutions.map((solution) => formatVariable(solution, this.name))
    return results.length === 0 ? "[]" : `[ ${results.join(", ")} ]`
  }
}
