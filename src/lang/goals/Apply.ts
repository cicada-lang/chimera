import { Clause } from "../clause"
import { Env, lookupValueInEnv } from "../env"
import { LangError } from "../errors"
import { Goal, GoalQueue } from "../goal"
import { Solution, solutionNames, solve } from "../solution"
import * as Values from "../value"
import { Value } from "../value"

export class Apply extends Goal {
  constructor(public name: string, public data: Value) {
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
      const queue = this.pursueClause(solution, clause)
      if (queue !== undefined) queues.push(queue)
    }

    return queues
  }

  pursueClause(solution: Solution, clause: Clause): GoalQueue | undefined {
    const usedNames = solutionNames(solution)
    const data = Values.freshenValue(usedNames, clause.exp)
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
