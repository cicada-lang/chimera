import * as Goals from "../goal"
import { Goal } from "../goal"
import { Mod } from "../mod"
import * as Values from "../value"
import { Value } from "../value"

/**
   Side-effects.
**/

export function freshenClause(
  mod: Mod,
  varMap: Map<string, Values.Var>,
  clause: Values.Clause,
): Values.Clause {
  return Values.Clause(
    clause.name,
    freshenValue(mod, varMap, clause.value),
    clause.goals.map((goal) => freshenGoal(mod, varMap, goal)),
  )
}

function freshenGoal(
  mod: Mod,
  varMap: Map<string, Values.Var>,
  goal: Goal,
): Goal {
  switch (goal.kind) {
    case "Apply": {
      return Goals.Apply(goal.name, freshenValue(mod, varMap, goal.arg))
    }

    case "Unifiable": {
      return Goals.Unifiable(
        freshenValue(mod, varMap, goal.left),
        freshenValue(mod, varMap, goal.right),
      )
    }
  }
}

function freshenValue(
  mod: Mod,
  varMap: Map<string, Values.Var>,
  value: Value,
): Value {
  switch (value.kind) {
    case "Var": {
      const found = varMap.get(value.name)
      if (found !== undefined) return found

      const count = mod.variableCount
      mod.variableCount++

      const freshName = `${value.name}#${count}`
      const variable = Values.Var(freshName)
      varMap.set(value.name, variable)
      return variable
    }

    case "String": {
      return value
    }

    case "Number": {
      return value
    }

    case "Boolean": {
      return value
    }

    case "Null": {
      return value
    }

    case "Arrai": {
      return Values.Arrai(
        value.elements.map((element) => freshenValue(mod, varMap, element)),
      )
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            freshenValue(mod, varMap, property),
          ]),
        ),
      )
    }

    case "Relation": {
      return value
    }
  }
}
