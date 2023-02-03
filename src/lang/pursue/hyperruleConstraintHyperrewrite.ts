import { hyperrewrite } from "../hyperrewrite"
import { HyperruleConstraint } from "../solution"

export function hyperruleConstraintHyperrewrite(
  hyperruleConstraint: HyperruleConstraint,
): HyperruleConstraint | undefined {
  const values = hyperrewrite(
    hyperruleConstraint.target.hyperrule,
    hyperruleConstraint.values,
  )

  if (values === false) {
    return undefined
  }

  return HyperruleConstraint(hyperruleConstraint.target, values)
}
