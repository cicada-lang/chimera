import type { Exp } from "../exp"
import {
  Substitution,
  substitutionExtend,
  substitutionWalk,
} from "../substitution"
import { occur } from "../unify"

export function unifyMany(
  substitution: Substitution,
  pairs: Array<[Exp, Exp]>,
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
  left: Exp,
  right: Exp,
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
    return substitutionExtend(substitution, left.name, right)
  }

  if (right["@kind"] === "PatternVar") {
    if (occur(substitution, right.name, left)) return undefined
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

    return substitution
  }

  if (left["@kind"] === "Data" && right["@kind"] === "Data") {
    if (left.type !== right.type) return undefined
    if (left.kind !== right.kind) return undefined
    if (left.args.length !== right.args.length) return undefined

    for (const [i, leftArg] of left.args.entries()) {
      const rightArg = right.args[i]
      const nextSubstitution = unify(substitution, leftArg, rightArg)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    return substitution
  }

  return undefined
}
