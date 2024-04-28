import type { Exp } from "../exp/index.js"
import type { VarCollection } from "../var-collection/index.js"
import {
  createVarCollection,
  varCollectionMerge,
} from "../var-collection/index.js"

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

    case "Term": {
      return varCollectionMerge(exp.args.map(varCollectionFromExp))
    }

    case "ListCons": {
      return varCollectionMerge([
        varCollectionFromExp(exp.car),
        varCollectionFromExp(exp.cdr),
      ])
    }

    case "ListNull": {
      return createVarCollection()
    }

    case "Objekt": {
      return varCollectionMerge([
        ...Object.values(exp.properties).map(varCollectionFromExp),
      ])
    }

    case "Dot": {
      return createVarCollection()
    }

    case "Ap": {
      return varCollectionMerge(exp.args.map(varCollectionFromExp))
    }

    case "Fn": {
      return createVarCollection()
    }

    case "Eval": {
      return createVarCollection()
    }

    case "Find": {
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
