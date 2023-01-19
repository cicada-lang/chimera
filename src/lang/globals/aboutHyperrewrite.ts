import { hyperrewriteManySteps } from "../hyperrewrite"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutHyperrewrite(globals: GlobalStore): Promise<void> {
  globals.primitive(
    "hyperrewriteManySteps",
    3,
    ([limit, hyperrule, target], { mod, env }) => {
      Values.assertValue(limit, "Number", { who: "hyperrewriteManySteps" })
      Values.assertValue(hyperrule, "Hyperrule", {
        who: "hyperrewriteManySteps",
      })

      const results = hyperrewriteManySteps(
        limit.data,
        hyperrule.hyperrule,
        Values.toArray(target),
      )

      return Values.fromArray(results.map(Values.fromArray))
    },
  )
}
