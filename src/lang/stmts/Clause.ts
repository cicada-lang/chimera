import type { Exp } from "../exp"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection"

export class Clause extends Stmt {
  constructor(
    public name: string,
    public clauseName: string | undefined,
    public exps: Array<Exp>,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async boundNames(): Promise<Array<string>> {
    return [this.name]
  }

  async execute(mod: Mod): Promise<void> {
    varCollectionValidate(
      varCollectionMerge([
        ...this.exps.map((exp) => varCollectionFromExp(exp)),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )

    mod.defineClause(this.name, this.clauseName, this.exps, this.goals)
  }

  async prepare(mod: Mod): Promise<void> {
    mod.defineRelation(this.name)
  }
}
