import type { Hyperrule } from "../hyperrule"
import type { Mod } from "../mod"
import { refresh } from "../refresh"
import { guardReject } from "../rewrite"
import { substitutionDeepWalk, substitutionEmpty } from "../substitution"
import type { Value } from "../value"
import { propagate } from "./propagate"
import { simplify } from "./simplify"

export function hyperrewriteOneStep(
  mod: Mod,
  hyperrule: Hyperrule,
  values: Array<Value>,
): Array<Value> | undefined {
  switch (hyperrule["@kind"]) {
    case "Simplify":
    case "Propagate": {
      const renames = new Map()
      const from = hyperrule.from.map((value) => refresh(mod, renames, value))
      const result =
        hyperrule["@kind"] === "Simplify"
          ? simplify(mod, substitutionEmpty(), from, values)
          : propagate(mod, substitutionEmpty(), from, values)

      if (result === undefined) {
        return undefined
      }

      if (
        hyperrule.guard !== undefined &&
        guardReject(
          hyperrule.mod,
          hyperrule.env,
          hyperrule.guard,
          result.substitution,
          renames,
        )
      ) {
        return undefined
      }

      const to = hyperrule.to.map((value) =>
        substitutionDeepWalk(result.substitution, refresh(mod, renames, value)),
      )

      return [...result.values, ...to]
    }

    case "List": {
      for (const subHyperrule of hyperrule.hyperrules) {
        const results = hyperrewriteOneStep(mod, subHyperrule, values)
        if (results !== undefined) {
          return results
        }
      }

      return undefined
    }
  }
}
