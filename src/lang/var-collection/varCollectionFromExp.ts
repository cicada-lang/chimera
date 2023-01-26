import type { Exp } from "../exp"
import type { VarCollection } from "../var-collection"
import { createVarCollection, varCollectionMerge } from "../var-collection"

export function varCollectionFromExps(exps: Array<Exp>): VarCollection {
  return varCollectionMerge(exps.map(varCollectionFromExp))
}

export function varCollectionFromExp(exp: Exp): VarCollection {
  switch (exp["@kind"]) {
    case "Var": {
      return createVarCollection([[exp.name, [exp]]])
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
      ])
    }

    case "Ap": {
      return varCollectionMerge(exp.args.map(varCollectionFromExp))
    }

    case "Fn": {
      return createVarCollection()
    }

    case "Quote": {
      return varCollectionFromExp(exp.exp)
    }

    case "Eval": {
      return createVarCollection()
    }

    case "Find": {
      return createVarCollection()
    }

    case "RuleList": {
      return createVarCollection()
    }

    case "HyperruleList": {
      return createVarCollection()
    }

    case "And": {
      return createVarCollection()
    }

    case "Or": {
      return createVarCollection()
    }

    case "Not": {
      return createVarCollection()
    }

    case "If": {
      return createVarCollection()
    }

    case "Match": {
      return createVarCollection()
    }
  }
}
