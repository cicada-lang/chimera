import type { Value } from "../value/index.js"

export function equal(left: Value, right: Value): boolean {
  if (left["@kind"] === "PatternVar" && right["@kind"] === "PatternVar") {
    return left.name === right.name
  }

  if (left["@kind"] === "Null" && right["@kind"] === "Null") {
    return true
  }

  if (left["@kind"] === "Boolean" && right["@kind"] === "Boolean") {
    return left.data === right.data
  }

  if (left["@kind"] === "String" && right["@kind"] === "String") {
    return left.data === right.data
  }

  if (left["@kind"] === "Number" && right["@kind"] === "Number") {
    return left.data === right.data
  }

  if (left["@kind"] === "ListCons" && right["@kind"] === "ListCons") {
    return equal(left.car, right.car) && equal(left.cdr, right.cdr)
  }

  if (left["@kind"] === "ListNull" && right["@kind"] === "ListNull") {
    return true
  }

  if (left["@kind"] === "Objekt" && right["@kind"] === "Objekt") {
    if (left.etc !== undefined && right.etc === undefined) {
      return false
    }

    if (left.etc === undefined && right.etc !== undefined) {
      return false
    }

    if (
      left.etc !== undefined &&
      right.etc !== undefined &&
      !equal(left.etc, right.etc)
    ) {
      return false
    }

    if (
      Object.keys(left.properties).length !==
      Object.keys(right.properties).length
    ) {
      return false
    }

    for (const [name, leftProperty] of Object.entries(left.properties)) {
      const rightProperty = right.properties[name]
      if (rightProperty === undefined) return false

      if (!equal(leftProperty, rightProperty)) return false
    }

    return true
  }

  if (left["@kind"] === "Term" && right["@kind"] === "Term") {
    if (left.kind !== right.kind) return false
    if (left.args.length !== right.args.length) return false

    for (const [i, leftArg] of left.args.entries()) {
      const rightArg = right.args[i]
      if (!equal(leftArg, rightArg)) {
        return false
      }
    }

    return true
  }

  return left === right
}
