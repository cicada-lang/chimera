import type { HyperruleExp } from "../hyperrule-exp"
import type { VarCollection } from "../var-collection"
import { varCollectionFromExp, varCollectionMerge } from "../var-collection"

export function varCollectionFromHyperruleExp(
  hyperrule: HyperruleExp,
): VarCollection {
  switch (hyperrule["@kind"]) {
    case "Case": {
      return varCollectionMerge([
        ...hyperrule.from.map(varCollectionFromExp),
        ...hyperrule.to.map(varCollectionFromExp),
      ])
    }

    case "List": {
      return varCollectionMerge(
        hyperrule.hyperrules.map(varCollectionFromHyperruleExp),
      )
    }
  }
}
