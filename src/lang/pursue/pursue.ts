import { Env, envExtend } from "../env"
import * as Errors from "../errors"
import { evaluate, evaluateGoalExp } from "../evaluate"
import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { pursueEqual, pursueNotEqual } from "../pursue"
import type { Solution } from "../solution"
import * as Values from "../value"

/**

   We append the generated new goals
   to the start of the queue,
   to get depth-first search.

**/

export function pursue(
  mod: Mod,
  env: Env,
  solution: Solution,
  goal: Goal,
): Array<Solution> {
  switch (goal["@kind"]) {
    case "Apply": {
      if (goal.target["@kind"] === "Relation") {
        return goal.target.clauses.flatMap((clause) => {
          env = clause.env
          for (const name of clause.bindings) {
            env = envExtend(env, name, Values.PatternVar(mod.freshen(name)))
          }

          const value = evaluate(clause.mod, env, clause.exp)
          const goals = clause.goals.map((goal) =>
            evaluateGoalExp(clause.mod, env, goal),
          )

          const newSolution = pursueEqual(mod, solution, value, goal.arg)
          if (newSolution === undefined) return []
          return [
            newSolution.update({
              goals: [...goals, ...solution.goals],
            }),
          ]
        })
      }

      throw new Errors.LangError(
        [
          `[pursue] can not apply goal.target`,
          `  goal.target["@kind"]: ${goal.target["@kind"]}`,
        ].join("\n"),
      )
    }

    case "Equal": {
      const newSolution = pursueEqual(mod, solution, goal.left, goal.right)
      if (newSolution === undefined) return []
      return [
        newSolution.update({
          goals: [...solution.goals],
        }),
      ]
    }

    case "NotEqual": {
      const newSolution = pursueNotEqual(mod, solution, goal.left, goal.right)
      if (newSolution === undefined) return []
      return [
        newSolution.update({
          goals: [...solution.goals],
        }),
      ]
    }

    case "Conj": {
      return [
        solution.update({
          goals: [...goal.goals, ...solution.goals],
        }),
      ]
    }

    case "Disj": {
      return goal.goals.map((goal) =>
        solution.update({
          goals: [goal, ...solution.goals],
        }),
      )
    }
  }
}
