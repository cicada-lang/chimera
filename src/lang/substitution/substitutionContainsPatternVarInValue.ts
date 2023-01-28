import { Substitution, substitutionWalk } from "."
import type { Value } from "../value"

export function substitutionContainsPatternVarInValue(
  substitution: Substitution,
  value: Value,
): boolean {
  switch (value["@kind"]) {
    case "PatternVar": {
      value = substitutionWalk(substitution, value)
      return value["@kind"] === "PatternVar"
    }

    case "ReifiedVar": {
      return false
    }

    case "String":
    case "Number":
    case "Boolean":
    case "Null": {
      return false
    }

    case "ArrayCons": {
      return (
        substitutionContainsPatternVarInValue(substitution, value.car) ||
        substitutionContainsPatternVarInValue(substitution, value.cdr)
      )
    }

    case "ArrayNull": {
      return false
    }

    case "Objekt": {
      return (
        Object.values(value.properties).some((value) =>
          substitutionContainsPatternVarInValue(substitution, value),
        ) ||
        Boolean(
          value.etc &&
            substitutionContainsPatternVarInValue(substitution, value.etc),
        )
      )
    }

    case "Term": {
      return value.args.some((value) =>
        substitutionContainsPatternVarInValue(substitution, value),
      )
    }

    case "Relation": {
      return false
    }

    case "TypeConstraint": {
      return false
    }

    case "Rule": {
      return false
    }

    case "Hyperrule": {
      return false
    }

    case "Fn": {
      return false
    }

    case "WithConstraints": {
      return substitutionContainsPatternVarInValue(substitution, value.value)
    }

    case "Primitive": {
      return false
    }

    case "Curried": {
      return false
    }

    case "Goal": {
      return false
    }
  }
}
