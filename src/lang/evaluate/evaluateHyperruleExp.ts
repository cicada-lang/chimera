import type { Env } from "../env"
import { quote } from "../evaluate"
import type { Hyperrule } from "../hyperrule"
import * as Hyperrules from "../hyperrule"
import type { HyperruleExp } from "../hyperrule-exp"
import type { Mod } from "../mod"

export function evaluateHyperruleExp(
  mod: Mod,
  env: Env,
  hyperrule: HyperruleExp,
): Hyperrule {
  switch (hyperrule["@kind"]) {
    case "Case": {
      return Hyperrules.Case(
        hyperrule.from.map((hyperrule) => quote(mod, env, hyperrule)),
        hyperrule.to.map((hyperrule) => quote(mod, env, hyperrule)),
      )
    }

    case "List": {
      return Hyperrules.List(
        hyperrule.hyperrules.map((hyperrule) =>
          evaluateHyperruleExp(mod, env, hyperrule),
        ),
      )
    }
  }
}
