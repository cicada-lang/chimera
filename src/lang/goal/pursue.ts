import { Env, lookupValueInEnv } from "../env"
import { LangError } from "../errors"
import { Goal, GoalQueue } from "../goal"
import { Mod } from "../mod"
import { Solution, solve } from "../solution"
import * as Values from "../value"

export function pursue(
  mod: Mod,
  env: Env,
  solution: Solution,
  goal: Goal,
): Array<GoalQueue> {
  switch (goal.kind) {
    case "Apply": {
      let relation = lookupValueInEnv(env, goal.name)
      if (relation === undefined) {
        throw new LangError(`Undefined relation name: ${goal.name}`)
      }

      Values.assertRelation(relation)
      const queues: Array<GoalQueue> = []
      for (let clause of relation.clauses) {
        // NOTE side-effects on usedNames
        clause = Values.freshenClause(mod, clause)
        const newSolution = solve(solution, clause.value, goal.arg)

        if (newSolution !== undefined) {
          queues.push(new GoalQueue(newSolution, clause.goals))
        }
      }

      return queues
    }

    case "Unifiable": {
      const newSolution = solve(solution, goal.left, goal.right)
      if (newSolution !== undefined) {
        return [new GoalQueue(newSolution, [])]
      } else {
        return []
      }
    }
  }
}
