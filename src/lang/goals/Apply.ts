import { Clause } from "../clause"
import { Env, lookupValueInEnv } from "../env"
import { LangError } from "../errors"
import { evaluate, Exp } from "../exp"
import { Goal, GoalQueue } from "../goal"
import { Solution, solutionNames, solve } from "../solution"
import * as Values from "../value"

export class Apply extends Goal {
  constructor(public name: string, public exp: Exp) {
    super()
  }

  pursue(env: Env, solution: Solution): Array<GoalQueue> {
    const value = lookupValueInEnv(env, this.name)
    if (value === undefined) {
      throw new LangError(`Undefined name: ${this.name}`)
    }

    Values.assertRelation(value)
    const queues: Array<GoalQueue> = []
    for (const clause of value.clauses) {
      const queue = this.pursueClause(env, solution, clause)
      if (queue !== undefined) queues.push(queue)
    }

    return queues
  }

  pursueClause(
    env: Env,
    solution: Solution,
    clause: Clause,
  ): GoalQueue | undefined {
    const value = evaluate(env, this.exp)
    const clauseValue = evaluate(env, clause.exp)

    const usedNames = solutionNames(solution)
    const freshValue = Values.freshenValue(usedNames, clauseValue)

    const newSolution = solve(solution, freshValue, value)
    if (newSolution === undefined) return undefined

    switch (clause.kind) {
      case "Fact": {
        return new GoalQueue(newSolution, [])
      }

      case "Rule": {
        return new GoalQueue(newSolution, clause.premises)
      }
    }
  }
}
