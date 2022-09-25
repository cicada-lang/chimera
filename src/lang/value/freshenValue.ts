import * as Goals from "../goal"
import { Goal } from "../goal"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import { Value } from "../value"

/**
   Side-effects.
**/

export function freshenValue(
  usedNames: Set<string>,
  varMap: Map<string, Values.Var>,
  value: Value,
): Value {
  switch (value.kind) {
    case "Var": {
      const variable = varMap.get(value.name)
      if (variable !== undefined) return variable

      if (usedNames.has(value.name)) {
        const freshName = freshen(usedNames, value.name)
        const variable = Values.Var(freshName)
        varMap.set(freshName, variable)
        return variable
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
        value.elements.map((element) =>
          freshenValue(usedNames, varMap, element),
        ),
      )
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            freshenValue(usedNames, varMap, property),
          ]),
        ),
      )
    }

    case "Relation": {
      return value
    }
  }
}

export function freshenClause(
  usedNames: Set<string>,
  varMap: Map<string, Values.Var>,
  clause: Values.Clause,
): Values.Clause {
  return Values.Clause(
    clause.name,
    freshenValue(usedNames, varMap, clause.value),
    clause.goals.map((goal) => freshenGoal(usedNames, varMap, goal)),
  )
}

export function freshenGoal(
  usedNames: Set<string>,
  varMap: Map<string, Values.Var>,
  goal: Goal,
): Goal {
  switch (goal.kind) {
    case "Apply": {
      return Goals.Apply(goal.name, freshenValue(usedNames, varMap, goal.arg))
    }

    case "Unifiable": {
      return Goals.Unifiable(
        freshenValue(usedNames, varMap, goal.left),
        freshenValue(usedNames, varMap, goal.right),
      )
    }
  }
}

export function valueUsedNames(value: Value): Set<string> {
  switch (value.kind) {
    case "Var": {
      return new Set([value.name])
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

    case "Arrai": {
      return new Set(
        value.elements.flatMap((element) => [...valueUsedNames(element)]),
      )
    }

    case "Objekt": {
      return new Set(
        Object.values(value.properties).flatMap((property) => [
          ...valueUsedNames(property),
        ]),
      )
    }

    case "Relation": {
      return new Set()
    }
  }
}
