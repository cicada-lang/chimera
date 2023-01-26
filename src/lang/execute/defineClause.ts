import { Clause as createClause } from "../clause"
import * as Errors from "../errors"
import type { Exp } from "../exp"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import * as Values from "../value"

export function defineClause(
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
    mod,
    mod.env,
    clauseName || relation.clauses.length.toString(),
    exps,
    goals,
  )

  /**

     NOTE We do side-effect on `relation` in `env`,
     TODO Can we still copy `Mod` safely -- need for `Fn`'s `Mod`.

  **/

  relation.clauses.push(clause)

  mod.define(relation.name, relation)
}
