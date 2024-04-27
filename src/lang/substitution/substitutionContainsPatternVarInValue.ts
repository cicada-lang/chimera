import { type Goal } from "../goal/index.js"
import { type Value } from "../value/index.js"
import { substitutionWalk, type Substitution } from "./index.js"

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

    case "ListCons": {
      return (
        substitutionContainsPatternVarInValue(substitution, value.car) ||
        substitutionContainsPatternVarInValue(substitution, value.cdr)
      )
    }

    case "ListNull": {
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
      return (
        substitutionContainsPatternVarInValue(substitution, value.target) ||
        value.args.some((value) =>
          substitutionContainsPatternVarInValue(substitution, value),
        )
      )
    }

    case "Goal": {
      return substitutionContainsPatternVarInGoal(substitution, value.goal)
    }

    case "Solution": {
      return false
    }
  }
}

function substitutionContainsPatternVarInGoal(
  substitution: Substitution,
  goal: Goal,
): boolean {
  switch (goal["@kind"]) {
    case "Apply": {
      return (
        substitutionContainsPatternVarInValue(substitution, goal.target) ||
        goal.args.some((value) =>
          substitutionContainsPatternVarInValue(substitution, value),
        )
      )
    }

    case "Equal": {
      return (
        substitutionContainsPatternVarInValue(substitution, goal.left) ||
        substitutionContainsPatternVarInValue(substitution, goal.right)
      )
    }

    case "NotEqual": {
      return (
        substitutionContainsPatternVarInValue(substitution, goal.left) ||
        substitutionContainsPatternVarInValue(substitution, goal.right)
      )
    }

    case "Conj": {
      return goal.goals.some((goal) =>
        substitutionContainsPatternVarInGoal(substitution, goal),
      )
    }

    case "Disj": {
      return goal.goals.some((goal) =>
        substitutionContainsPatternVarInGoal(substitution, goal),
      )
    }
  }
}
