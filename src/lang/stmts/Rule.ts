import { Exp } from "../exp"
import { Goal } from "../goal"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class Rule extends Stmt {
  constructor(
    public name: string,
    public clauseName: string | undefined,
    public exp: Exp,
    public goals: Array<Goal>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    mod.defineClause(this.name, this.clauseName, this.exp, this.goals)
  }
}
