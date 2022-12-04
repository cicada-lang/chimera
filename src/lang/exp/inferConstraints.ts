import * as Errors from "../errors"
import type { Exp } from "../exp"
import type { Goal } from "../goal"
import type { Mod } from "../mod"

export function inferConstraints(mod: Mod, exp: Exp): Array<Goal> {
  switch (exp["@kind"]) {
    case "PatternVar": {
      return []
    }

    case "ReifiedVar": {
      return []
    }

    case "String":
    case "Number":
    case "Boolean":
    case "Null": {
      return []
    }

    case "ArrayCons": {
      return [
        ...inferConstraints(mod, exp.car),
        ...inferConstraints(mod, exp.cdr),
      ]
    }

    case "ArrayNull": {
      return []
    }

    case "Objekt": {
      return Object.values(exp.properties).flatMap((property) =>
        inferConstraints(mod, property),
      )
    }

    case "Data": {
      const datatype = mod.findDatatype(exp.type)
      if (datatype === undefined) {
        throw new Errors.ElaborationError(
          `[inferConstraints] undefined datatype name: ${exp.type}`,
          { span: exp.span },
        )
      }

      const datactor = datatype.datactors.find(
        (datactor) => datactor.name === exp.kind,
      )
      if (datactor === undefined) {
        throw new Errors.ElaborationError(
          `[inferConstraints] undefined datactor name: ${exp.kind}`,
          { span: exp.span },
        )
      }

      return []
      // const args = exp.args.map(formatExp)
      // return `${exp.type}::${exp.kind}${formatArgs(args)}`
    }
  }
}
