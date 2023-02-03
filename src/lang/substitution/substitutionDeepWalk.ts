import type { Goal } from "../goal"
import * as Goals from "../goal"
import { Substitution, substitutionWalk } from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"

export function substitutionDeepWalk(
  substitution: Substitution,
  value: Value,
): Value {
  value = substitutionWalk(substitution, value)

  switch (value["@kind"]) {
    case "ArrayCons": {
      return Values.ArrayCons(
        substitutionDeepWalk(substitution, value.car),
        substitutionDeepWalk(substitution, value.cdr),
      )
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            substitutionDeepWalk(substitution, property),
          ]),
        ),
        value.etc && substitutionDeepWalk(substitution, value.etc),
      )
    }

    case "Term": {
      return Values.Term(
        value.name,
        value.args.map((arg) => substitutionDeepWalk(substitution, arg)),
      )
    }

    case "WithConstraints": {
      return Values.WithConstraints(
        substitutionDeepWalk(substitution, value.value),
        value.constraints.map((goal) =>
          substitutionDeepWalkGoal(substitution, goal),
        ),
      )
    }

    case "Curried": {
      return Values.Curried(
        substitutionDeepWalk(substitution, value.target),
        value.arity,
        value.args.map((value) => substitutionDeepWalk(substitution, value)),
      )
    }

    case "Goal": {
      return Values.Goal(substitutionDeepWalkGoal(substitution, value.goal))
    }

    default: {
      return value
    }
  }
}

export function substitutionDeepWalkGoal(
  substitution: Substitution,
  goal: Goal,
): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      return Goals.Apply(
        substitutionDeepWalk(substitution, goal.target),
        goal.args.map((value) => substitutionDeepWalk(substitution, value)),
      )
    }

    case "Equal": {
      return Goals.Equal(
        substitutionDeepWalk(substitution, goal.left),
        substitutionDeepWalk(substitution, goal.right),
      )
    }

    case "NotEqual": {
      return Goals.NotEqual(
        substitutionDeepWalk(substitution, goal.left),
        substitutionDeepWalk(substitution, goal.right),
      )
    }

    case "Conj": {
      return Goals.Conj(
        goal.goals.map((goal) => substitutionDeepWalkGoal(substitution, goal)),
      )
    }

    case "Disj": {
      return Goals.Disj(
        goal.goals.map((goal) => substitutionDeepWalkGoal(substitution, goal)),
      )
    }

    case "Constraints": {
      return Goals.Constraints(
        substitutionDeepWalk(substitution, goal.target),
        goal.values.map((value) => substitutionDeepWalk(substitution, value)),
      )
    }
  }
}
