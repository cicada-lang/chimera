import type { Datactor } from "../../datatype"
import * as Exps from "../../exp"
import type { GoalExp } from "../../goal-exp"
import { evaluateGoalExp } from "../../goal-exp"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

type Modify<T, R> = Omit<T, keyof R> & R

export type DatactorExp = Modify<Datactor, { goals: Array<GoalExp> }>

export function DatactorExp(
  name: string,
  args: Array<string>,
  goals: Array<GoalExp>,
): DatactorExp {
  return {
    name,
    args,
    goals,
  }
}

export class Datatype extends Stmt {
  constructor(
    public name: string,
    public datactors: Array<DatactorExp>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    for (const datactor of this.datactors) {
      mod.defineDatactor(
        this.name,
        datactor.name,
        datactor.args,
        datactor.goals.map((goal) => evaluateGoalExp(mod, goal)),
      )

      mod.defineClause(
        this.name,
        datactor.name,
        Exps.Data(
          this.name,
          datactor.name,
          datactor.args.map((name) => Exps.PatternVar(name)),
        ),
        // The `goals` will be inferred.
        [],
      )
    }
  }

  prepare(mod: Mod): void {
    mod.createDatatype(this.name)
    mod.createRelation(this.name)
  }
}
