import type { Exp } from "../exp"
import type { GoalExp } from "../goal-exp"

export function collectVarsFromExps(exps: Array<Exp>): Set<string> {
  return new Set(exps.flatMap((exp) => Array.from(collectVarsFromExp(exp))))
}

export function collectVarsFromExp(exp: Exp): Set<string> {
  switch (exp["@kind"]) {
    case "Var": {
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
        ...collectVarsFromExp(exp.car),
        ...collectVarsFromExp(exp.cdr),
      ])
    }

    case "ArrayNull": {
      return new Set()
    }

    case "Objekt": {
      return new Set(
        Object.values(exp.properties).flatMap((property) =>
          Array.from(collectVarsFromExp(property)),
        ),
      )
    }

    case "Term": {
      return new Set(
        exp.args.flatMap((arg) => Array.from(collectVarsFromExp(arg))),
      )
    }

    case "Fn": {
      return new Set()
    }
  }
}

export function collectVarsFromGoalExps(goals: Array<GoalExp>): Set<string> {
  return new Set(
    goals.flatMap((goal) => Array.from(collectVarsFromGoalExp(goal))),
  )
}

function collectVarsFromGoalExp(goal: GoalExp): Set<string> {
  switch (goal["@kind"]) {
    case "Apply": {
      return collectVarsFromExps(goal.args)
    }

    case "Equal": {
      return new Set([
        ...collectVarsFromExp(goal.left),
        ...collectVarsFromExp(goal.right),
      ])
    }

    case "NotEqual": {
      return new Set([
        ...collectVarsFromExp(goal.left),
        ...collectVarsFromExp(goal.right),
      ])
    }

    case "Conj": {
      return new Set(
        goal.goals.flatMap((goal) => Array.from(collectVarsFromGoalExp(goal))),
      )
    }

    case "Disj": {
      return new Set(
        goal.goals.flatMap((goal) => Array.from(collectVarsFromGoalExp(goal))),
      )
    }
  }
}
