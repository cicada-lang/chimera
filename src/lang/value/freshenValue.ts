import { Exp } from "../exp"
import * as Values from "../value"
import { Value } from "../value"

/**
   Side-effects on `usedNames`.
**/

export function freshenValue(
  usedNames: Set<string> | Array<string>,
  exp: Exp,
): Value {
  switch (exp.kind) {
    case "Var": {
      return Values.Var(exp.name)
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
