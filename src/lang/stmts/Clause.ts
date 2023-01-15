import { indent } from "../../utils/indent"
import { Exp, formatArgs } from "../exp"
import { formatGoalExp, GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import { Relation } from "../value"
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
    public span: Span,
  ) {
    super()
  }

  prepareSync(mod: Mod): void {
    ensureRelationOfThisMod(mod, this.relationName)
  }

  executeSync(mod: Mod): void {
    varCollectionValidate(
      varCollectionMerge([
        varCollectionFromExps(this.exps),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )

    mod.defineClause(this.relationName, this.name, this.exps, this.goals)
  }

  format(): string {
    if (this.goals.length === 0 && this.name === undefined) {
      return `${this.relationName}${formatArgs(this.exps)}`
    }

    if (this.goals.length === 0 && this.name !== undefined) {
      return `${this.relationName}${formatArgs(this.exps)} -- ${this.name}`
    }

    const goals = this.goals.map(formatGoalExp)

    return `${this.relationName}${formatArgs(this.exps)} -- ${
      this.name
    } {\n${indent(goals.join("\n"))}\n}`
  }
}

function ensureRelationOfThisMod(mod: Mod, name: string): void {
  const value = mod.find(name)

  if (
    value !== undefined &&
    value["@kind"] === "Relation" &&
    value.mod === mod
  ) {
    return
  }

  mod.define(name, Relation(mod, name, undefined, []))
}
