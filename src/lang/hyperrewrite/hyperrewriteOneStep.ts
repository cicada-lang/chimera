import { envMerge } from "../env"
import { evaluate, quote } from "../evaluate"
import type { Hyperrule } from "../hyperrule"
import { refresh } from "../refresh"
import { substitutionDeepWalk, substitutionEmpty } from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"
import type { Propagation } from "./propagate"
import { propagate } from "./propagate"
import { simplify } from "./simplify"

export function hyperrewriteOneStep(
  hyperrule: Hyperrule,
  values: Array<Value>,
  appliedPropagations: Array<Propagation>,
): Array<Value> | undefined {
  switch (hyperrule["@kind"]) {
    case "Simplify": {
      const mod = hyperrule.mod.copy()
      mod.env = envMerge(mod.env, hyperrule.env)

      const renames = new Map()
      const from = hyperrule.from.map((exp) =>
        refresh(mod, renames, quote(mod, mod.env, exp)),
      )

      const result = simplify(mod, substitutionEmpty(), from, values)

      if (result === undefined) {
        return undefined
      }

      for (const [name, variable] of renames.entries()) {
        mod.define(name, substitutionDeepWalk(result.substitution, variable))
      }

      if (hyperrule.guard !== undefined) {
        const ok = evaluate(mod, mod.env, hyperrule.guard)
        Values.assertValue(ok, "Boolean", { who: "hyperrewriteOneStep" })
        if (!ok.data) {
          return undefined
        }
      }

      const to = hyperrule.to.map((exp) =>
        substitutionDeepWalk(
          result.substitution,
          refresh(mod, renames, quote(mod, mod.env, exp)),
        ),
      )

      return [...result.remainValues, ...to]
    }

    case "Propagate": {
      const mod = hyperrule.mod.copy()
      mod.env = envMerge(mod.env, hyperrule.env)

      const renames = new Map()
      const from = hyperrule.from.map((exp) =>
        refresh(mod, renames, quote(mod, mod.env, exp)),
      )

      const result = propagate(
        mod,
        hyperrule,
        substitutionEmpty(),
        from,
        values,
        appliedPropagations,
      )

      if (result === undefined) {
        return undefined
      }

      for (const [name, variable] of renames.entries()) {
        mod.define(name, substitutionDeepWalk(result.substitution, variable))
      }

      if (hyperrule.guard !== undefined) {
        const ok = evaluate(mod, mod.env, hyperrule.guard)
        Values.assertValue(ok, "Boolean", { who: "hyperrewriteOneStep" })
        if (!ok.data) {
          return undefined
        }
      }

      const to = hyperrule.to.map((exp) =>
        substitutionDeepWalk(
          result.substitution,
          refresh(mod, renames, quote(mod, mod.env, exp)),
        ),
      )

      // NOTE Keep the input values.
      return [...values, ...to]
    }

    case "List": {
      for (const subHyperrule of hyperrule.hyperrules) {
        const results = hyperrewriteOneStep(
          subHyperrule,
          values,
          appliedPropagations,
        )
        if (results !== undefined) {
          return results
        }
      }

      return undefined
    }
  }
}
