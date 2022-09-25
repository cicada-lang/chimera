import * as Goals from "../goal"
import { Goal } from "../goal"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import { Value } from "../value"

/**
   Side-effects on `usedNames`.
**/

export function freshenValue(usedNames: Set<string>, value: Value): Value {
  switch (value.kind) {
    case "Var": {
      if (usedNames.has(value.name)) {
        const freshName = freshen(usedNames, value.name)
        usedNames.add(freshName)
        return Values.Var(freshName)
      } else {
        return Values.Var(value.name)
      }
    }

    case "String": {
      return Values.String(value.data)
    }

    case "Number": {
      return Values.Number(value.data)
    }

    case "Boolean": {
      return Values.Boolean(value.data)
    }

    case "Null": {
      return Values.Null()
    }

    case "Arrai": {
      return Values.Arrai(
        value.elements.map((element) => freshenValue(usedNames, element)),
      )
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            freshenValue(usedNames, property),
          ]),
        ),
      )
    }

    case "Relation": {
      return Values.Relation(
        value.clauses.map((clause) => freshenClause(usedNames, clause)),
      )
    }
  }
}

export function freshenClause(
  usedNames: Set<string>,
  clause: Values.Clause,
): Values.Clause {
  return Values.Clause(
    clause.name,
    freshenValue(usedNames, clause.value),
    clause.goals.map((goal) => freshenGoal(usedNames, goal)),
  )
}

export function freshenGoal(usedNames: Set<string>, goal: Goal): Goal {
  switch (goal.kind) {
    case "Apply": {
      return Goals.Apply(goal.name, freshenValue(usedNames, goal.arg))
    }

    case "Unifiable": {
      return Goals.Unifiable(
        freshenValue(usedNames, goal.left),
        freshenValue(usedNames, goal.right),
      )
    }
  }
}
