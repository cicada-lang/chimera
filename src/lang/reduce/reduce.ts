import type { Mod } from "../mod"
import type { RewriteRule } from "../rewrite-rule"
import type { Value } from "../value"
import * as Values from "../value"

export function reduce(mod: Mod, rule: RewriteRule, value: Value): Value {
  while (true) {
    const next = rewriteOneStep(mod, rule, value)
    if (next !== undefined) {
      value = next
    } else {
      return value
    }
  }
}

export function rewriteOneStep(
  mod: Mod,
  rule: RewriteRule,
  value: Value,
): Value | undefined {
  const result = rewriteOnePlace(mod, rule, value)
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
      const car = rewriteOnePlace(mod, rule, value.car)
      if (car !== undefined) {
        return Values.ArrayCons(car, value.cdr)
      }

      const cdr = rewriteOnePlace(mod, rule, value.cdr)
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
        const result = rewriteOnePlace(mod, rule, property)
        if (result !== undefined) {
          return Values.Objekt(
            { ...value.properties, [name]: result },
            value.etc,
          )
        }
      }

      if (value.etc !== undefined) {
        const etc = rewriteOnePlace(mod, rule, value.etc)
        if (etc !== undefined) {
          return Values.Objekt(value.properties, etc)
        }
      }

      return undefined
    }

    case "Term": {
      for (const [index, arg] of value.args.entries()) {
        const result = rewriteOnePlace(mod, rule, arg)
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
    case "RewriteRule": {
      return undefined
    }
  }
}

export function rewriteOnePlace(
  mod: Mod,
  rule: RewriteRule,
  value: Value,
): Value | undefined {
  return undefined
}
