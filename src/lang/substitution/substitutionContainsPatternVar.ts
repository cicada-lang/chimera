import { Substitution, substitutionWalk } from "../substitution"
import type { Value } from "../value"

export function substitutionContainsPatternVar(
  value: Value,
  substitution: Substitution,
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
        substitutionContainsPatternVar(value.car, substitution) ||
        substitutionContainsPatternVar(value.cdr, substitution)
      )
    }

    case "ArrayNull": {
      return false
    }

    case "Objekt": {
      return (
        Object.values(value.properties).some((value) =>
          substitutionContainsPatternVar(value, substitution),
        ) ||
        Boolean(
          value.etc && substitutionContainsPatternVar(value.etc, substitution),
        )
      )
    }

    case "Term": {
      return value.args.some((value) =>
        substitutionContainsPatternVar(value, substitution),
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
      return substitutionContainsPatternVar(value.value, substitution)
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

    case "TermConstraint": {
      return false
    }
  }
}
