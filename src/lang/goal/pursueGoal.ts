import { Goal, GoalQueue } from "."
import * as Exps from "../exp"
import { Mod } from "../mod"
import { Solution, unify } from "../solution"

/**

   What is a goal?

   It is something that either _succeeds_, _fails_, or _has no value_.

   In our context:

   - succeeds: find some solutions
   - fails: no solutions
   - has no value: infinite loop

**/

export function pursueGoal(
  mod: Mod,
  solution: Solution,
  goal: Goal,
): Array<GoalQueue> {
  switch (goal.kind) {
    case "Apply": {
      return goal.relation.clauses.flatMap((clause) => {
        const { exp, goals } = Exps.freshenClause(mod, clause)
        const newSolution = unify(solution, exp, goal.arg)
        return newSolution ? [new GoalQueue(newSolution, goals)] : []
      })
    }

    case "Unifiable": {
      const newSolution = unify(solution, goal.left, goal.right)
      return newSolution ? [new GoalQueue(newSolution, [])] : []
    }
  }
}
