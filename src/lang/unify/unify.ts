import { equal } from "../equal"
import { freshen } from "../freshen"
import {
  Substitution,
  substitutionExtend,
  substitutionWalk,
} from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"
import { occur } from "./occur"

export function unifyMany(
  substitution: Substitution,
  pairs: Array<[Value, Value]>,
): Substitution | undefined {
  for (const [left, right] of pairs) {
    const nextSubstitution = unify(substitution, left, right)
    if (nextSubstitution === undefined) return undefined
    substitution = nextSubstitution
  }

  return substitution
}

export function unify(
  substitution: Substitution,
  left: Value,
  right: Value,
): Substitution | undefined {
  left = substitutionWalk(substitution, left)
  right = substitutionWalk(substitution, right)

  if (
    left["@kind"] === "PatternVar" &&
    right["@kind"] === "PatternVar" &&
    left.name === right.name
  ) {
    return substitution
  }

  if (left["@kind"] === "PatternVar") {
    if (occur(substitution, left.name, right)) return undefined

    /**
       `unify` a `PatternVar` with a `Objekt` will push
       the unknownness of the `PatternVar`
       into the `etc` of the `Objekt`
    **/

    if (right["@kind"] === "Objekt" && right.etc === undefined) {
      right = objektAddEtc(right, left)
    }

    return substitutionExtend(substitution, left.name, right)
  }

  if (right["@kind"] === "PatternVar") {
    if (occur(substitution, right.name, left)) return undefined
    if (left["@kind"] === "Objekt" && left.etc === undefined) {
      left = objektAddEtc(left, right)
    }

    return substitutionExtend(substitution, right.name, left)
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
    const carSubstitution = unify(substitution, left.car, right.car)
    if (carSubstitution === undefined) return undefined
    const cdrSubstitution = unify(carSubstitution, left.cdr, right.cdr)
    return cdrSubstitution
  }

  if (left["@kind"] === "ArrayNull" && right["@kind"] === "ArrayNull") {
    return substitution
  }

  if (left["@kind"] === "Objekt" && right["@kind"] === "Objekt") {
    for (const [name, leftProperty] of Object.entries(left.properties)) {
      const rightProperty = right.properties[name]
      if (rightProperty === undefined) continue

      const nextSubstitution = unify(substitution, leftProperty, rightProperty)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (left.etc && right.etc) {
      const nextSubstitution = unify(substitution, left.etc, right.etc)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (left.etc) {
      const properties = diffProperties(right.properties, left.properties)
      const nextSubstitution = unify(
        substitution,
        left.etc,
        Values.Objekt(properties),
      )
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (right.etc) {
      const properties = diffProperties(left.properties, right.properties)
      const nextSubstitution = unify(
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
    if (left.name !== right.name) return undefined
    if (left.args.length !== right.args.length) return undefined

    for (const [i, leftArg] of left.args.entries()) {
      const rightArg = right.args[i]
      const nextSubstitution = unify(substitution, leftArg, rightArg)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    return substitution
  }

  if (equal(left, right)) {
    return substitution
  } else {
    return undefined
  }
}

function objektAddEtc(
  objekt: Values.Objekt,
  variable: Values.PatternVar,
): Values.Objekt {
  const etc = Values.PatternVar(freshen(variable.name))
  return { ...objekt, etc }
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
