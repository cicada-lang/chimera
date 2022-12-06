import type { Exp } from "../exp"
import type { VarCollection } from "../var-collection"
import { createVarCollection, varCollectionMerge } from "../var-collection"

export function varCollectionFromExp(exp: Exp): VarCollection {
  switch (exp["@kind"]) {
    case "PatternVar": {
      return createVarCollection([[exp.name, [exp]]])
    }

    case "ReifiedVar": {
      return createVarCollection()
    }

    case "String":
    case "Number":
    case "Boolean":
    case "Null": {
      return createVarCollection()
    }

    case "ArrayCons": {
      return varCollectionMerge([
        varCollectionFromExp(exp.car),
        varCollectionFromExp(exp.cdr),
      ])
    }

    case "ArrayNull": {
      return createVarCollection()
    }

    case "Objekt": {
      return varCollectionMerge([
        ...Object.values(exp.properties).map(varCollectionFromExp),
        ...(exp.etc ? [varCollectionFromExp(exp.etc)] : []),
      ])
    }

    case "Data": {
      return varCollectionMerge(exp.args.map(varCollectionFromExp))
    }
  }
}
