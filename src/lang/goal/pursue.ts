import { Env, lookupValueInEnv } from "../env"
import { LangError } from "../errors"
import { Goal, GoalQueue } from "../goal"
import { Mod } from "../mod"
import { Solution, solutionNames, solve } from "../solution"
import * as Values from "../value"
import { Value } from "../value"

export function pursueGoal(
  mod: Mod,
  env: Env,
  solution: Solution,
  goal: Goal,
): Array<GoalQueue> {
  switch (goal.kind) {
    case "Apply": {
      const relation = lookupValueInEnv(env, goal.name)
      if (relation === undefined) {
        throw new LangError(`Undefined relation name: ${goal.name}`)
      }

      Values.assertRelation(relation)
      const arg = goal.value
      const queues: Array<GoalQueue> = []
      for (const clause of relation.clauses) {
        const queue = pursueClause(env, solution, arg, clause)
        if (queue !== undefined) queues.push(queue)
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

function pursueClause(
  env: Env,
  solution: Solution,
  arg: Value,
  clause: Values.Clause,
): GoalQueue | undefined {
  const usedNames = new Set(solutionNames(solution))
  const pattern = Values.freshenValue(usedNames, clause.value)

  const newSolution = solve(solution, pattern, arg)
  if (newSolution === undefined) return undefined

  return new GoalQueue(newSolution, clause.goals)
}
