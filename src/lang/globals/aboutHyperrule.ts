import { hyperrewrite, hyperrewriteManySteps } from "../hyperrewrite"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutHyperrule(globals: GlobalStore): void {
  globals.primitive("hyperrewrite", 2, ([hyperrule, target]) => {
    Values.assertValue(hyperrule, "Hyperrule", { who: "hyperrewrite" })
    const result = hyperrewrite(hyperrule.hyperrule, Values.toArray(target))
    if (result === false) {
      return Values.Boolean(false)
    }

    return Values.fromArray(result)
  })

  globals.primitive(
    "hyperrewriteManySteps",
    3,
    ([limit, hyperrule, target]) => {
      Values.assertValue(limit, "Number", { who: "hyperrewriteManySteps" })
      Values.assertValue(hyperrule, "Hyperrule", {
        who: "hyperrewriteManySteps",
      })

      const results = hyperrewriteManySteps(
        limit.data,
        hyperrule.hyperrule,
        Values.toArray(target),
      )

      return Values.fromArray(
        results.map((result) => {
          if (result === false) {
            return Values.Boolean(false)
          }

          return Values.fromArray(result)
        }),
      )
    },
  )
}