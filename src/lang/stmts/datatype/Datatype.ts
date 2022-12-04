import type { Datactor } from "../../datatype"
import type { GoalExp } from "../../goal-exp"
import * as GoalExps from "../../goal-exp"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

type Modify<T, R> = Omit<T, keyof R> & R

export class Datatype extends Stmt {
  constructor(
    public name: string,
    public datactors: Array<Modify<Datactor, { goals: Array<GoalExp> }>>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    for (const datactor of this.datactors) {
      const goals = datactor.goals.map((goal) =>
        GoalExps.evaluateGoalExp(mod, goal),
      )
      mod.defineDatactor(this.name, datactor.name, datactor.args, goals)
    }
  }

  prepare(mod: Mod): void {
    mod.createDatatype(this.name)
  }
}
