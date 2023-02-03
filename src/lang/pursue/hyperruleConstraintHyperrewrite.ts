import type { Goal } from "../goal"
import { hyperrewrite } from "../hyperrewrite"
import { HyperruleConstraint, Solution } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type * as Values from "../value"

export function hyperruleConstraintHyperrewrite(
  solution: Solution,
  hyperruleConstraint: HyperruleConstraint,
):
  | { hyperruleConstraint: HyperruleConstraint; goals: Array<Goal> }
  | undefined {
  hyperruleConstraint = hyperruleConstraintDeepWalk(
    solution,
    hyperruleConstraint,
  )

  const context = { solution }

  let values = hyperrewrite(
    context,
    hyperruleConstraint.target.hyperrule,
    hyperruleConstraint.values,
  )

  if (values === false) {
    return undefined
  }

  const goals = values
    .filter((value): value is Values.Goal => value["@kind"] === "Goal")
    .map((value) => value.goal)

  values = values.filter((value) => value["@kind"] !== "Goal")

  return {
    hyperruleConstraint: HyperruleConstraint(
      hyperruleConstraint.target,
      values,
    ),
    goals,
  }
}

function hyperruleConstraintDeepWalk(
  solution: Solution,
  hyperruleConstraint: HyperruleConstraint,
): HyperruleConstraint {
  return HyperruleConstraint(
    hyperruleConstraint.target,
    hyperruleConstraint.values.map((value) =>
      substitutionDeepWalk(solution.substitution, value),
    ),
  )
}
