import { Clause } from "../clause"
import { Env, lookupValueInEnv } from "../env"
import { LangError } from "../errors"
import { evaluate, Exp } from "../exp"
import { Goal, GoalQueue } from "../goal"
import { Solution, solutionNames, solve } from "../solution"
import * as Values from "../value"
import { Value } from "../value"

export class Apply extends Goal {
  constructor(public name: string, public exp: Exp) {
    super()
  }

  pursue(env: Env, solution: Solution): Array<GoalQueue> {
    const relation = lookupValueInEnv(env, this.name)
    if (relation === undefined) {
      throw new LangError(`Undefined name: ${this.name}`)
    }

    Values.assertRelation(relation)
    const arg = evaluate(env, this.exp)
    const queues: Array<GoalQueue> = []
    for (const clause of relation.clauses) {
      const queue = this.pursueClause(env, solution, arg, clause)
      if (queue !== undefined) queues.push(queue)
    }

    return queues
  }

  pursueClause(
    env: Env,
    solution: Solution,
    arg: Value,
    clause: Clause,
  ): GoalQueue | undefined {
    const value = evaluate(env, clause.exp)
    const usedNames = new Set(solutionNames(solution))
    const pattern = Values.freshenValue(usedNames, value)

    const newSolution = solve(solution, pattern, arg)
    if (newSolution === undefined) return undefined

    switch (clause.kind) {
      case "Rule": {
        return new GoalQueue(newSolution, clause.goals)
      }
    }
  }
}
