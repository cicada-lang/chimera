import Immutable from "immutable"
import type { Exp } from "../exp"
import type { VarCollection } from "../var-collection"
import { varCollectionMerge } from "../var-collection"

export function varCollectionFromExp(exp: Exp): VarCollection {
  switch (exp["@kind"]) {
    case "PatternVar": {
      return Immutable.Map([[exp.name, [exp]]])
    }

    case "ReifiedVar": {
      return Immutable.Map()
    }

    case "String":
    case "Number":
    case "Boolean":
    case "Null": {
      return Immutable.Map()
    }

    case "ArrayCons": {
      return varCollectionMerge([
        varCollectionFromExp(exp.car),
        varCollectionFromExp(exp.cdr),
      ])
    }

    case "ArrayNull": {
      return Immutable.Map()
    }

    case "Objekt": {
      return varCollectionMerge(
        Object.values(exp.properties).map(varCollectionFromExp),
      )
    }

    case "Data": {
      return varCollectionMerge(exp.args.map(varCollectionFromExp))
    }
  }
}
