import * as Actions from "../actions"
import { catchReturnValue } from "../actions/catchReturnValue"
import { defineRenames } from "../actions/defineRenames"
import { envMerge } from "../env"
import type { Hyperrule } from "../hyperrule"
import { quote } from "../quote"
import { refresh } from "../refresh"
import {
  Substitution,
  substitutionDeepWalk,
  substitutionEmpty,
} from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"
import type { HyperrewriteContext } from "./hyperrewrite"
import type { Propagation } from "./propagate"
import { propagate } from "./propagate"
import { simplify } from "./simplify"

export function hyperrewriteOneStep(
  context: HyperrewriteContext,
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
      const returnValue = catchReturnValue(mod, hyperrule.stmts)
      const finialValues = handleReturnValue(
        context,
        renames,
        result.substitution,
        returnValue,
      )

      if (finialValues === false) return false
      if (finialValues === undefined) return undefined
      return [...result.remainValues, ...finialValues]
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
      const returnValue = catchReturnValue(mod, hyperrule.stmts)
      const finialValues = handleReturnValue(
        context,
        renames,
        result.substitution,
        returnValue,
      )

      if (finialValues === false) return false
      if (finialValues === undefined) return undefined
      return [...values, ...finialValues]
    }

    case "List": {
      for (const subHyperrule of hyperrule.hyperrules) {
        const results = hyperrewriteOneStep(
          context,
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

function handleReturnValue(
  context: HyperrewriteContext,
  renames: Map<string, Values.PatternVar>,
  substitution: Substitution,
  returnValue: Value,
): Array<Value> | false | undefined {
  returnValue = substitutionDeepWalk(
    substitution,
    refresh(renames, returnValue),
  )

  if (returnValue["@kind"] === "Null") {
    return undefined
  }

  if (returnValue["@kind"] === "Boolean" && returnValue.data === false) {
    return false
  }

  if (returnValue["@kind"] === "Fn") {
    let newReturnValue = Actions.doAp(returnValue, [
      Values.Objekt({
        solution: Values.Solution(context.solution),
      }),
    ])

    return handleReturnValue(context, renames, substitution, newReturnValue)
  }

  return Values.toArray(returnValue)
}
