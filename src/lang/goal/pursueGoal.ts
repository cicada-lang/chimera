import { Goal, GoalQueue } from "."
import { Env } from "../env"
import { Mod } from "../mod"
import { Solution, unify } from "../solution"
import * as Values from "../value"

/**

   What is a goal?

   It is something that either _succeeds_, _fails_, or _has no value_.

   In our context:

   - succeeds: find some solutions
   - fails: no solutions
   - has no value: infinite loop

**/

export function pursueGoal(mod: Mod, env: Env, solution: Solution, goal: Goal): Array<GoalQueue> {
  switch (goal.kind) {
    case "Apply": {
      const queues: Array<GoalQueue> = []
      for (const clause of goal.relation.clauses) {
        const freshClause = Values.freshenClause(mod, clause)
        const newSolution = unify(solution, freshClause.value, goal.arg)
        if (newSolution !== undefined) {
          queues.push(new GoalQueue(newSolution, freshClause.goals))
        }
      }

      return queues
    }

    case "Unifiable": {
      const newSolution = unify(solution, goal.left, goal.right)
      if (newSolution !== undefined) {
        return [new GoalQueue(newSolution, [])]
      } else {
        return []
      }
    }
  }
}
