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
      // TODO
      return value
    }
  }
}
