import { arrayCombination } from "../../utils/arrayCombination.js"
import { arrayDedup } from "../../utils/arrayDedup.js"
import { arrayMember } from "../../utils/arrayMember.js"
import { arrayProduct } from "../../utils/arrayProduct.js"
import * as Actions from "../actions/index.js"
import { doAp } from "../actions/index.js"
import { equal } from "../equal/index.js"
import * as Errors from "../errors/index.js"
import { formatValue } from "../format/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutArray(globals: GlobalStore): void {
  globals.primitive("isArray", 1, ([value]) => {
    return Values.Boolean(
      value["@kind"] === "ArrayNull" || value["@kind"] === "ArrayCons",
    )
  })

  globals.primitive("arrayLength", 1, ([array]) => {
    return Values.Number(Values.toArray(array).length)
  })

  globals.primitive("arrayAppend", 2, ([left, right]) => {
    return Values.fromArray([...Values.toArray(left), ...Values.toArray(right)])
  })

  globals.primitive("arrayDedup", 1, ([array]) => {
    return Values.fromArray(arrayDedup(Values.toArray(array), equal))
  })

  globals.primitive("arrayUnion", 2, ([left, right]) => {
    return Values.fromArray(
      arrayDedup([...Values.toArray(left), ...Values.toArray(right)], equal),
    )
  })

  globals.primitive("arrayIntersection", 2, ([left, right]) => {
    const leftValues = Values.toArray(left)
    const rightValues = Values.toArray(right)
    const results: Array<Value> = []

    for (const leftValue of leftValues) {
      if (arrayMember(rightValues, leftValue, equal)) {
        results.push(leftValue)
      }
    }

    return Values.fromArray(arrayDedup(results, equal))
  })

  globals.primitive("arrayMember", 2, ([values, target]) => {
    return Values.Boolean(arrayMember(Values.toArray(values), target, equal))
  })

  globals.primitive("arrayFilter", 2, ([values, predicate]) => {
    return Values.fromArray(
      Values.toArray(values).filter((value) => {
        const result = Actions.doAp(predicate, [value])
        Values.assertValue(result, "Boolean", { who: "arrayFilter" })
        return result.data
      }),
    )
  })

  globals.primitive("arrayProduct", 1, ([arrays]) => {
    return Values.fromArray(
      arrayProduct(Values.toArray(arrays).map(Values.toArray)).map(
        Values.fromArray,
      ),
    )
  })

  globals.primitive("arrayGet", 2, ([array, index]) => {
    Values.assertValue(index, "Number", { who: "arrayGet" })
    const result = Values.toArray(array)[index.data]
    if (result === undefined) {
      throw new Errors.LangError(
        [
          `[arrayGet] index out of bound`,
          `  array: ${formatValue(array)}`,
          `  index: ${index.data}`,
        ].join("\n"),
      )
    }

    return result
  })

  globals.primitive("arrayMap", 2, ([array, f]) => {
    return Values.fromArray(
      Values.toArray(array).map((value) => doAp(f, [value])),
    )
  })

  globals.primitive("arrayMapSpread", 2, ([array, f]) => {
    return Values.fromArray(
      Values.toArray(array).map((value) => doAp(f, Values.toArray(value))),
    )
  })

  globals.primitive("arrayEvery", 2, ([array, predicate]) => {
    for (const value of Values.toArray(array)) {
      const result = doAp(predicate, [value])
      Values.assertValue(result, "Boolean", { who: "arrayEvery" })
      if (result.data === false) {
        return Values.Boolean(false)
      }
    }

    return Values.Boolean(true)
  })

  globals.primitive("arraySome", 2, ([array, predicate]) => {
    for (const value of Values.toArray(array)) {
      const result = doAp(predicate, [value])
      Values.assertValue(result, "Boolean", { who: "arraySome" })
      if (result.data === true) {
        return Values.Boolean(true)
      }
    }

    return Values.Boolean(false)
  })

  globals.primitive("arrayCombination", 2, ([array, n]) => {
    Values.assertValue(n, "Number", { who: "arrayCombination" })
    return Values.fromArray(
      arrayCombination(Values.toArray(array), n.data).map(Values.fromArray),
    )
  })
}
