import type { Exp } from "../exp"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import {
  varCollectionFromExps,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection"

export class Clause extends Stmt {
  constructor(
    public relationName: string,
    public name: string | undefined,
    public exps: Array<Exp>,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async boundNames(): Promise<Array<string>> {
    return [this.relationName]
  }

  async prepare(mod: Mod): Promise<void> {
    mod.ensureRelationOfThisMod(this.relationName)
  }

  async validate(mod: Mod): Promise<void> {
    varCollectionValidate(
      varCollectionMerge([
        varCollectionFromExps(this.exps),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )
  }

  async execute(mod: Mod): Promise<void> {
    mod.defineClause(this.relationName, this.name, this.exps, this.goals)
  }
}
