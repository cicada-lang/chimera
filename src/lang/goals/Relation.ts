import { Clause } from "../clause"
import { Goal, GoalQueue } from "../goal"
import { Solution, solve } from "../solution"
import { Value } from "../value"

export class Relation extends Goal {
  constructor(public data: Value, public clauses: Array<Clause>) {
    super()
  }

  evaluate(solution: Solution): Array<GoalQueue> {
    const queues: Array<GoalQueue> = []

    for (const clause of this.clauses) {
      // const data = freshenValue(clause.data)
      const data = clause.data
      const newSolution = solve(solution, data, this.data)
      if (newSolution !== undefined) {
        switch (clause.kind) {
          case "Fact": {
            queues.push(new GoalQueue(newSolution, []))
            continue
          }

          case "Rule": {
            queues.push(new GoalQueue(newSolution, clause.premises))
            continue
          }
        }
      }
    }

    return queues
  }
}
