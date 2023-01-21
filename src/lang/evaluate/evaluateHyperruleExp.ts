import type { Env } from "../env"
import type { Hyperrule } from "../hyperrule"
import * as Hyperrules from "../hyperrule"
import type { HyperruleExp } from "../hyperrule-exp"
import type { Mod } from "../mod"
import * as Values from "../value"
import { evaluate } from "./evaluate"

export function evaluateHyperruleExp(
  mod: Mod,
  env: Env,
  hyperrule: HyperruleExp,
): Hyperrule {
  switch (hyperrule["@kind"]) {
    case "Simplify": {
      return Hyperrules.Simplify(
        mod,
        env,
        hyperrule.from,
        hyperrule.to,
        hyperrule.guard,
      )
    }

    case "Propagate": {
      return Hyperrules.Propagate(
        mod,
        env,
        hyperrule.from,
        hyperrule.to,
        hyperrule.guard,
      )
    }

    case "List": {
      return Hyperrules.List(
        hyperrule.hyperrules.map((hyperrule) =>
          evaluateHyperruleExp(mod, env, hyperrule),
        ),
      )
    }

    case "Use": {
      const value = evaluate(mod, env, hyperrule.exp)
      Values.assertValue(value, "Hyperrule", {
        who: "evaluateHyperruleExp Use",
      })

      return Hyperrules.List([value.hyperrule])
    }
  }
}
