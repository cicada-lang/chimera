import { Env } from "../env"
import { LangError } from "../errors"
import { evaluate } from "../exp"
import { Goal, GoalQueue } from "../goal"
import { Mod } from "../mod"
import { Clause } from "../relation"
import { Solution, solutionNames, solve } from "../solution"
import * as Values from "../value"
import { Value } from "../value"

export function pursue(
  mod: Mod,
  env: Env,
  solution: Solution,
  goal: Goal,
): Array<GoalQueue> {
  switch (goal.kind) {
    case "Apply": {
      const relation = mod.relations.get(goal.name)
      if (relation === undefined) {
        throw new LangError(`Undefined relation name: ${goal.name}`)
      }

      const arg = evaluate(env, goal.exp)
      const queues: Array<GoalQueue> = []
      for (const clause of relation.clauses) {
        const queue = pursueClause(env, solution, arg, clause)
        if (queue !== undefined) queues.push(queue)
      }

      return queues
    }

    case "Unifiable": {
      const left = evaluate(env, goal.left)
      const right = evaluate(env, goal.right)
      const newSolution = solve(solution, left, right)
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
  clause: Clause,
): GoalQueue | undefined {
  const value = evaluate(env, clause.exp)
  const usedNames = new Set(solutionNames(solution))
  const pattern = Values.freshenValue(usedNames, value)

  const newSolution = solve(solution, pattern, arg)
  if (newSolution === undefined) return undefined

  return new GoalQueue(newSolution, clause.goals)
}
