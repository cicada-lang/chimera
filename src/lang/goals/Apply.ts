import { Clause } from "../clause"
import { Env } from "../env"
import { Goal, GoalQueue } from "../goal"
import { Solution, solve } from "../solution"
import { Value } from "../value"

export class Apply extends Goal {
  constructor(public clauses: Array<Clause>, public data: Value) {
    super()
  }

  evaluate(env: Env, solution: Solution): Array<GoalQueue> {
    const queues: Array<GoalQueue> = []
    for (const clause of this.clauses) {
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
