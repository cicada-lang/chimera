import { indent } from "../../utils/indent"
import { Clause as createClause } from "../clause"
import * as Errors from "../errors"
import { evaluateGoalExp, quote } from "../evaluate"
import type { Exp } from "../exp"
import { formatArgs, formatGoalExp } from "../format"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import * as Values from "../value"
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

    defineClause(mod, this.relationName, this.name, this.exps, this.goals)
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

function defineClause(
  mod: Mod,
  name: string,
  clauseName: string | undefined,
  exps: Array<Exp>,
  goals: Array<GoalExp> = [],
): void {
  const relation = mod.find(name)

  if (relation === undefined) {
    throw new Errors.LangError(
      `[defineClause] undefined relation name: ${name}`,
    )
  }

  Values.assertValue(relation, "Relation", { who: "defineClause" })

  if (relation.arity !== undefined) {
    if (exps.length !== relation.arity) {
      throw new Errors.LangError(
        [
          `[Mod.defineClause] arity mismatch`,
          `  name: ${name}`,
          `  relation.arity: ${relation.arity}`,
          `  exps.length: ${exps.length}`,
        ].join("\n"),
      )
    }
  }

  relation.arity = exps.length

  const clause = createClause(
    clauseName || relation.clauses.length.toString(),
    exps.map((exp) => quote(mod, mod.env, exp)),
    goals.map((goal) => evaluateGoalExp(mod, mod.env, goal)),
  )

  /**

     NOTE We do side-effect on `relation` in `env`,
     TODO Can we still copy `Mod` safely -- need for `Fn`'s `Mod`.

  **/

  relation.clauses.push(clause)

  mod.define(relation.name, relation)
}
