import { Clause } from "../clause"
import { Env, lookupValueInEnv } from "../env"
import { LangError } from "../errors"
import { Goal, GoalQueue } from "../goal"
import { Solution, solve } from "../solution"
import { Value } from "../value"
import * as Values from "../value"

export class Apply extends Goal {
  constructor(public name: string, public data: Value) {
    super()
  }

  evaluate(env: Env, solution: Solution): Array<GoalQueue> {
    const value = lookupValueInEnv(env, this.name)
    if (value === undefined) {
      throw new LangError(`Undefined name: ${this.name}`)
    }

    Values.assertRelation(value)
    const queues: Array<GoalQueue> = []
    for (const clause of value.clauses) {
      const queue = this.evaluateClause(solution, clause)
      if (queue !== undefined) queues.push(queue)
    }

    return queues
  }

  evaluateClause(solution: Solution, clause: Clause): GoalQueue | undefined {
    // const data = freshenValue(clause.data)
    const data = clause.data
    const newSolution = solve(solution, data, this.data)
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
