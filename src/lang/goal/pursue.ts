import { Env, lookupValueInEnv } from "../env"
import { LangError } from "../errors"
import { Goal, GoalQueue } from "../goal"
import { Mod } from "../mod"
import { Solution, unify } from "../solution"
import * as Values from "../value"

/**

   What is a goal?

   It is something that either _succeeds_, _fails_, or _has no value_.

   TODO interpret the above in our context. 

**/

export function pursue(mod: Mod, env: Env, solution: Solution, goal: Goal): Array<GoalQueue> {
  switch (goal.kind) {
    case "Apply": {
      let relation = lookupValueInEnv(env, goal.name)
      if (relation === undefined) {
        throw new LangError(`Undefined relation name: ${goal.name}`)
      }

      Values.assertRelation(relation)

      const queues: Array<GoalQueue> = []
      for (const clause of relation.clauses) {
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
