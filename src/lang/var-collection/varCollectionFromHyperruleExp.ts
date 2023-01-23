import type { HyperruleExp } from "../hyperrule-exp"
import type { VarCollection } from "../var-collection"
import { varCollectionFromExp, varCollectionMerge } from "../var-collection"

export function varCollectionFromHyperruleExp(
  hyperrule: HyperruleExp,
): VarCollection {
  switch (hyperrule["@kind"]) {
    case "Simplify":
    case "Propagate": {
      return hyperrule.guard !== undefined
        ? varCollectionMerge([
            ...hyperrule.from.map(varCollectionFromExp),
            varCollectionFromExp(hyperrule.to),
            varCollectionFromExp(hyperrule.guard),
          ])
        : varCollectionMerge([
            ...hyperrule.from.map(varCollectionFromExp),
            varCollectionFromExp(hyperrule.to),
          ])
    }

    case "List": {
      return varCollectionMerge(
        hyperrule.hyperrules.map(varCollectionFromHyperruleExp),
      )
    }

    case "Use": {
      return varCollectionFromExp(hyperrule.exp)
    }
  }
}
