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
        refresh(renames, quote(mod, mod.env, exp)),
      )

      const result = simplify(substitutionEmpty(), from, values)

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

      const to = substitutionDeepWalk(
        result.substitution,
        refresh(renames, quote(mod, mod.env, hyperrule.to)),
      )

      return [...result.remainValues, ...Values.toArray(to)]
    }

    case "Propagate": {
      const mod = hyperrule.mod.copy()
      mod.env = envMerge(mod.env, hyperrule.env)

      const renames = new Map()
      const from = hyperrule.from.map((exp) =>
        refresh(renames, quote(mod, mod.env, exp)),
      )

      const result = propagate(
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

      const to = substitutionDeepWalk(
        result.substitution,
        refresh(renames, quote(mod, mod.env, hyperrule.to)),
      )

      // NOTE Keep the input values.
      return [...values, ...Values.toArray(to)]
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
