import { Exp } from "../exp"
import { freshen } from "../utils/freshen"
import * as Values from "../value"
import { Value } from "../value"

/**
   Side-effects on `usedNames`.
**/

export function freshenValue(
  usedNames: Set<string> | Array<string>,
  exp: Exp,
): Value {
  usedNames = new Set(usedNames)

  switch (exp.kind) {
    case "Var": {
      if (usedNames.has(exp.name)) {
        const freshName = freshen(usedNames, exp.name)
        usedNames.add(freshName)
        return Values.Var(freshName)
      } else {
        return Values.Var(exp.name)
      }
    }

    case "String": {
      return Values.String(exp.data)
    }

    case "Number": {
      return Values.Number(exp.data)
    }

    case "Boolean": {
      return Values.Boolean(exp.data)
    }

    case "Null": {
      return Values.Null()
    }

    case "Arrai": {
      return Values.Arrai(
        exp.elements.map((element) => freshenValue(usedNames, element)),
      )
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([name, element]) => [
            name,
            freshenValue(usedNames, element),
          ]),
        ),
      )
    }
  }
}
