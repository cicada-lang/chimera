import { arrayEqual } from "../../utils/arrayEqual"
import { equal } from "../equal"
import {
  Substitution,
  substitutionExtend,
  substitutionLookup,
} from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"

export function matchMany(
  substitution: Substitution,
  pairs: Array<[Value, Value]>,
): Substitution | undefined {
  for (const [left, right] of pairs) {
    const nextSubstitution = match(substitution, left, right)
    if (nextSubstitution === undefined) return undefined
    substitution = nextSubstitution
  }

  return substitution
}

/**

   `left` is viewed as a `pattern`.

**/

export function match(
  substitution: Substitution,
  left: Value,
  right: Value,
): Substitution | undefined {
  if (
    left["@kind"] === "PatternVar" &&
    right["@kind"] === "PatternVar" &&
    left.name === right.name
  ) {
    return substitution
  }

  if (left["@kind"] === "PatternVar") {
    const found = substitutionLookup(substitution, left.name)
    if (found === undefined) {
      return substitutionExtend(substitution, left.name, right)
    }

    if (!equal(found, right)) {
      return undefined
    }

    return substitution
  }

  if (left["@kind"] === "Null" && right["@kind"] === "Null") {
    return substitution
  }

  if (left["@kind"] === "Boolean" && right["@kind"] === "Boolean") {
    if (left.data !== right.data) return undefined
    return substitution
  }

  if (left["@kind"] === "String" && right["@kind"] === "String") {
    if (left.data !== right.data) return undefined
    return substitution
  }

  if (left["@kind"] === "Number" && right["@kind"] === "Number") {
    if (left.data !== right.data) return undefined
    return substitution
  }

  if (left["@kind"] === "ArrayCons" && right["@kind"] === "ArrayCons") {
    const carSubstitution = match(substitution, left.car, right.car)
    if (carSubstitution === undefined) return undefined
    const cdrSubstitution = match(carSubstitution, left.cdr, right.cdr)
    return cdrSubstitution
  }

  if (left["@kind"] === "ArrayNull" && right["@kind"] === "ArrayNull") {
    return substitution
  }

  if (left["@kind"] === "Objekt" && right["@kind"] === "Objekt") {
    for (const [name, leftProperty] of Object.entries(left.properties)) {
      const rightProperty = right.properties[name]
      if (rightProperty === undefined) continue

      const nextSubstitution = match(substitution, leftProperty, rightProperty)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (left.etc && right.etc) {
      const nextSubstitution = match(substitution, left.etc, right.etc)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (left.etc) {
      const properties = diffProperties(right.properties, left.properties)
      const nextSubstitution = match(
        substitution,
        left.etc,
        Values.Objekt(properties),
      )
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (right.etc) {
      const properties = diffProperties(left.properties, right.properties)
      const nextSubstitution = match(
        substitution,
        right.etc,
        Values.Objekt(properties),
      )
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    return substitution
  }

  if (left["@kind"] === "Term" && right["@kind"] === "Term") {
    if (!arrayEqual(left.prefix, right.prefix, (x, y) => x === y))
      return undefined
    if (left.name !== right.name) return undefined
    if (left.args.length !== right.args.length) return undefined

    for (const [i, leftArg] of left.args.entries()) {
      const rightArg = right.args[i]
      const nextSubstitution = match(substitution, leftArg, rightArg)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    return substitution
  }

  return undefined
}

function diffProperties(
  leftProperties: Record<string, Value>,
  rightProperties: Record<string, Value>,
): Record<string, Value> {
  const properties: Record<string, Value> = {}
  for (const [name, leftProperty] of Object.entries(leftProperties)) {
    const rightProperty = rightProperties[name]
    if (rightProperty === undefined) {
      properties[name] = leftProperty
    }
  }

  return properties
}
