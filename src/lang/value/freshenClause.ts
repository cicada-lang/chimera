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
  clause: Values.Clause,
  varMap: Map<string, Values.PatternVar> = new Map(),
): Values.Clause {
  return Values.Clause(
    clause.name,
    freshenValue(mod, clause.value, varMap),
    clause.goals.map((goal) => freshenGoal(mod, goal, varMap)),
  )
}

function freshenGoal(mod: Mod, goal: Goal, varMap: Map<string, Values.PatternVar>): Goal {
  switch (goal.kind) {
    case "Apply": {
      return Goals.Apply(goal.name, freshenValue(mod, goal.arg, varMap))
    }

    case "Unifiable": {
      return Goals.Unifiable(
        freshenValue(mod, goal.left, varMap),
        freshenValue(mod, goal.right, varMap),
      )
    }
  }
}

function freshenValue(mod: Mod, value: Value, varMap: Map<string, Values.PatternVar>): Value {
  switch (value.kind) {
    case "PatternVar": {
      const found = varMap.get(value.name)
      if (found !== undefined) return found

      const count = mod.variableCount
      mod.variableCount++

      const freshName = `?${value.name}_${count}`
      const variable = Values.PatternVar(freshName)
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

    case "ListCons": {
      return Values.ListCons(
        freshenValue(mod, value.car, varMap),
        freshenValue(mod, value.cdr, varMap),
      )
    }

    case "ListNull": {
      return value
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            freshenValue(mod, property, varMap),
          ]),
        ),
      )
    }

    case "Relation": {
      return value
    }
  }
}
