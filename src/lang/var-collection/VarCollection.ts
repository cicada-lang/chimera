import Immutable from "immutable"
import type * as Exps from "../exp"

export type VarCollection = Immutable.Map<string, Array<Exps.PatternVar>>

export function varCollectionMerge(
  collections: Array<VarCollection>,
): VarCollection {
  let result: VarCollection = Immutable.Map()
  for (const collection of collections) {
    result = result.mergeWith((left, right) => [...left, ...right], collection)
  }

  return result
}
