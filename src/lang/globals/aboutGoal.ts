import * as Goals from "../goal"
import { createSolutionFromGoals, solutionUpdate } from "../solution"
import { solve } from "../solve"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutGoal(globals: GlobalStore): void {
  globals.primitive("Equal", 2, ([x, y]) => {
    return Values.Goal(Goals.Equal(x, y))
  })

  globals.primitive("NotEqual", 2, ([x, y]) => {
    return Values.Goal(Goals.NotEqual(x, y))
  })

  globals.primitive("satisfy", 1, ([goal]) => {
    Values.assertValue(goal, "Goal", { who: "satisfy" })

    const solutions = solve(createSolutionFromGoals([goal.goal]), {
      limit: Infinity,
    })

    return Values.Boolean(solutions.length !== 0)
  })

  globals.primitive("solvable", 2, ([solution, goal]) => {
    Values.assertValue(solution, "Solution", { who: "solvable" })
    Values.assertValue(goal, "Goal", { who: "solvable" })

    const solutions = solve(
      solutionUpdate(solution.solution, {
        goals: [goal.goal, ...solution.solution.goals],
      }),
      {
        limit: Infinity,
      },
    )

    return Values.Boolean(solutions.length !== 0)
  })

  globals.primitive("conj", 1, ([value]) => {
    return Values.Goal(
      Goals.Conj(
        Values.toArray(value).map((value) => {
          Values.assertValue(value, "Goal", { who: "conj" })
          return value.goal
        }),
      ),
    )
  })

  globals.primitive("disj", 1, ([value]) => {
    return Values.Goal(
      Goals.Disj(
        Values.toArray(value).map((value) => {
          Values.assertValue(value, "Goal", { who: "disj" })
          return value.goal
        }),
      ),
    )
  })
}
