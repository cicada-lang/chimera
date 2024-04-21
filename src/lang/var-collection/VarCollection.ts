import Immutable from "immutable"
import type * as Exps from "../exp/index.js"

export type VarCollection = Immutable.Map<string, Array<Exps.Var>>

export function varCollectionLookup(
  varCollection: VarCollection,
  name: string,
): Array<Exps.Var> | undefined {
  return varCollection.get(name)
}

export function createVarCollection(
  entries: Array<[string, Array<Exps.Var>]> = [],
): VarCollection {
  return Immutable.Map(entries)
}

export function varCollectionMerge(
  collections: Array<VarCollection>,
): VarCollection {
  let result: VarCollection = Immutable.Map()
  for (const collection of collections) {
    result = result.mergeWith((left, right) => [...left, ...right], collection)
  }

  return result
}
