import type { Rule } from "../rule"
import type { Value } from "../value"
import * as Values from "../value"
import { rewriteOnePlace } from "./rewriteOnePlace"

export function rewriteOneStep(rule: Rule, value: Value): Value | undefined {
  const result = rewriteOnePlace(rule, value)
  if (result !== undefined) {
    return result
  }

  switch (value["@kind"]) {
    case "PatternVar":
    case "ReifiedVar":
    case "String":
    case "Number":
    case "Boolean":
    case "Null": {
      return undefined
    }

    case "ArrayCons": {
      const car = rewriteOneStep(rule, value.car)
      if (car !== undefined) {
        return Values.ArrayCons(car, value.cdr)
      }

      const cdr = rewriteOneStep(rule, value.cdr)
      if (cdr !== undefined) {
        return Values.ArrayCons(value.car, cdr)
      }

      return undefined
    }

    case "ArrayNull": {
      return undefined
    }

    case "Objekt": {
      for (const [name, property] of Object.entries(value.properties)) {
        const result = rewriteOneStep(rule, property)
        if (result !== undefined) {
          return Values.Objekt(
            { ...value.properties, [name]: result },
            value.etc,
          )
        }
      }

      if (value.etc !== undefined) {
        const etc = rewriteOneStep(rule, value.etc)
        if (etc !== undefined) {
          return Values.Objekt(value.properties, etc)
        }
      }

      return undefined
    }

    case "Term": {
      for (const [index, arg] of value.args.entries()) {
        const result = rewriteOneStep(rule, arg)
        if (result !== undefined) {
          return Values.Term(value.name, [
            ...value.args.slice(0, index),
            result,
            ...value.args.slice(index + 1),
          ])
        }
      }

      return undefined
    }

    case "Relation":
    case "TypeConstraint":
    case "Rule": {
      return undefined
    }
  }
}
