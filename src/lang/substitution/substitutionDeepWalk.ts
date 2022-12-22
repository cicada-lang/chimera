import { Substitution, substitutionWalk } from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"

export function substitutionDeepWalk(
  substitution: Substitution,
  value: Value,
): Value {
  value = substitutionWalk(substitution, value)

  switch (value["@kind"]) {
    case "ArrayCons": {
      return Values.ArrayCons(
        substitutionDeepWalk(substitution, value.car),
        substitutionDeepWalk(substitution, value.cdr),
      )
    }

    case "Objekt": {
      return Values.Objekt(
        Object.fromEntries(
          Object.entries(value.properties).map(([name, property]) => [
            name,
            substitutionDeepWalk(substitution, property),
          ]),
        ),
        value.etc && substitutionDeepWalk(substitution, value.etc),
      )
    }

    case "Term": {
      return Values.Term(
        value.name,
        value.args.map((arg) => substitutionDeepWalk(substitution, arg)),
      )
    }

    default: {
      return value
    }
  }
}
