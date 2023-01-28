import { catchReturnValue } from "../actions/catchReturnValue"
import { defineRenames } from "../actions/defineRenames"
import { envMerge } from "../env"
import type { Hyperrule } from "../hyperrule"
import { quote } from "../quote"
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
): Array<Value> | false | undefined {
  switch (hyperrule["@kind"]) {
    case "Simplify": {
      const mod = hyperrule.mod.copy()
      mod.env = envMerge(mod.env, hyperrule.env)

      const renames = new Map()
      const patterns = Values.toArray(
        refresh(renames, quote(mod, mod.env, hyperrule.patterns)),
      )

      const result = simplify(substitutionEmpty(), patterns, values)

      if (result === undefined) {
        return undefined
      }

      defineRenames(mod, renames, result.substitution)
      let returnValue = catchReturnValue(mod, hyperrule.stmts)

      if (returnValue["@kind"] === "Null") {
        return undefined
      }

      returnValue = substitutionDeepWalk(
        result.substitution,
        refresh(renames, returnValue),
      )

      if (returnValue["@kind"] === "Boolean" && returnValue.data === false) {
        return false
      }

      return [...result.remainValues, ...Values.toArray(returnValue)]
    }

    case "Propagate": {
      const mod = hyperrule.mod.copy()
      mod.env = envMerge(mod.env, hyperrule.env)

      const renames = new Map()
      const patterns = Values.toArray(
        refresh(renames, quote(mod, mod.env, hyperrule.patterns)),
      )

      const result = propagate(
        hyperrule,
        substitutionEmpty(),
        patterns,
        values,
        appliedPropagations,
      )

      if (result === undefined) {
        return undefined
      }

      defineRenames(mod, renames, result.substitution)
      let returnValue = catchReturnValue(mod, hyperrule.stmts)

      if (returnValue["@kind"] === "Null") {
        return undefined
      }

      returnValue = substitutionDeepWalk(
        result.substitution,
        refresh(renames, returnValue),
      )

      if (returnValue["@kind"] === "Boolean" && returnValue.data === false) {
        return false
      }

      // NOTE Keep the input values.

      return [...values, ...Values.toArray(returnValue)]
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
