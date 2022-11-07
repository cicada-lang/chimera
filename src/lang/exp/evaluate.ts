import * as Exps from "../exp"
import { Exp } from "../exp"
import * as Values from "../value"
import { Value } from "../value"

export function evaluate(exp: Exp): Value {
  switch (exp.kind) {
    case "PatternVar": {
      return Values.PatternVar(exp.name)
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

    case "ListCons": {
      return Values.ListCons(evaluate(exp.car), evaluate(exp.cdr))
    }

    case "ListNull": {
      return Values.ListNull()
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([name, property]) => [
            name,
            evaluate(property),
          ]),
        ),
      )
    }

    case "ObjektUnfolded": {
      return evaluate(Exps.Objekt(Exps.prepareProperties(exp.properties)))
    }
  }
}
