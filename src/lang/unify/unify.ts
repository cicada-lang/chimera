import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Mod } from "../mod"
import {
  Substitution,
  substitutionExtend,
  substitutionWalk,
} from "../substitution"
import { occur } from "../unify"

export function unifyMany(
  mod: Mod,
  substitution: Substitution,
  pairs: Array<[Exp, Exp]>,
): Substitution | undefined {
  for (const [left, right] of pairs) {
    const nextSubstitution = unify(mod, substitution, left, right)
    if (nextSubstitution === undefined) return undefined
    substitution = nextSubstitution
  }

  return substitution
}

export function unify(
  mod: Mod,
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

    /**
       `unify` a `PatternVar` with a `Objekt` will push
       the unknownness of the `PatternVar`
       into the `etc` of the `Objekt`
    **/

    if (right["@kind"] === "Objekt" && right.etc === undefined) {
      right = objektAddEtc(mod, right, left)
    }

    return substitutionExtend(substitution, left.name, right)
  }

  if (right["@kind"] === "PatternVar") {
    if (occur(substitution, right.name, left)) return undefined
    if (left["@kind"] === "Objekt" && left.etc === undefined) {
      left = objektAddEtc(mod, left, right)
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
    const carSubstitution = unify(mod, substitution, left.car, right.car)
    if (carSubstitution === undefined) return undefined
    const cdrSubstitution = unify(mod, carSubstitution, left.cdr, right.cdr)
    return cdrSubstitution
  }

  if (left["@kind"] === "ArrayNull" && right["@kind"] === "ArrayNull") {
    return substitution
  }

  if (left["@kind"] === "Objekt" && right["@kind"] === "Objekt") {
    for (const [name, leftProperty] of Object.entries(left.properties)) {
      const rightProperty = right.properties[name]
      if (rightProperty === undefined) continue

      const nextSubstitution = unify(
        mod,
        substitution,
        leftProperty,
        rightProperty,
      )
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (left.etc && right.etc) {
      const nextSubstitution = unify(mod, substitution, left.etc, right.etc)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (left.etc) {
      const properties = diffProperties(right.properties, left.properties)
      const nextSubstitution = unify(
        mod,
        substitution,
        left.etc,
        Exps.Objekt(properties),
      )
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    if (right.etc) {
      const properties = diffProperties(left.properties, right.properties)
      const nextSubstitution = unify(
        mod,
        substitution,
        right.etc,
        Exps.Objekt(properties),
      )
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
      const nextSubstitution = unify(mod, substitution, leftArg, rightArg)
      if (nextSubstitution === undefined) return undefined
      substitution = nextSubstitution
    }

    return substitution
  }

  return undefined
}

function objektAddEtc(
  mod: Mod,
  objekt: Exps.Objekt,
  variable: Exps.PatternVar,
): Exps.Objekt {
  const count = mod.variableCount++
  const freshName = `${variable.name}#${count}`
  const etc = Exps.PatternVar(freshName, variable.span)
  return { ...objekt, etc }
}

function diffProperties(
  leftProperties: Record<string, Exp>,
  rightProperties: Record<string, Exp>,
): Record<string, Exp> {
  const properties: Record<string, Exp> = {}
  for (const [name, leftProperty] of Object.entries(leftProperties)) {
    const rightProperty = rightProperties[name]
    if (rightProperty === undefined) {
      properties[name] = leftProperty
    }
  }

  return properties
}
