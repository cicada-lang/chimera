import type { Exp } from "../exp"
import type { GoalExp } from "../goal-exp"

export function collectBindingsFromExp(exp: Exp): Set<string> {
  switch (exp["@kind"]) {
    case "PatternVar": {
      return new Set([exp.name])
    }

    case "String": {
      return new Set()
    }

    case "Number": {
      return new Set()
    }

    case "Boolean": {
      return new Set()
    }

    case "Null": {
      return new Set()
    }

    case "ArrayCons": {
      return new Set([
        ...collectBindingsFromExp(exp.car),
        ...collectBindingsFromExp(exp.cdr),
      ])
    }

    case "ArrayNull": {
      return new Set()
    }

    case "Objekt": {
      return new Set(
        Object.values(exp.properties).flatMap((property) =>
          Array.from(collectBindingsFromExp(property)),
        ),
      )
    }

    case "Data": {
      return new Set(
        exp.args.flatMap((arg) => Array.from(collectBindingsFromExp(arg))),
      )
    }
  }
}

export function collectBindingsFromGoalExp(goal: GoalExp): Set<string> {
  switch (goal["@kind"]) {
    case "Apply": {
      return collectBindingsFromExp(goal.arg)
    }

    case "Equal": {
      return new Set([
        ...collectBindingsFromExp(goal.left),
        ...collectBindingsFromExp(goal.right),
      ])
    }

    case "NotEqual": {
      return new Set([
        ...collectBindingsFromExp(goal.left),
        ...collectBindingsFromExp(goal.right),
      ])
    }

    case "Conj": {
      return new Set(
        goal.goals.flatMap((goal) =>
          Array.from(collectBindingsFromGoalExp(goal)),
        ),
      )
    }

    case "Disj": {
      return new Set(
        goal.goals.flatMap((goal) =>
          Array.from(collectBindingsFromGoalExp(goal)),
        ),
      )
    }
  }
}

export function collectBindingsFromGoalExps(
  goals: Array<GoalExp>,
): Set<string> {
  return new Set(
    goals.flatMap((goal) => Array.from(collectBindingsFromGoalExp(goal))),
  )
}
