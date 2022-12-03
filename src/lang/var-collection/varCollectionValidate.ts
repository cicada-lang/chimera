import type { VarCollection } from "../var-collection"

export function varCollectionValidate(varCollection: VarCollection): void {
  varCollectionAssertNoUnused(varCollection)
  varCollectionAssertNoMisused(varCollection)
}

function varCollectionAssertNoUnused(varCollection: VarCollection): void {
  //
}

function varCollectionAssertNoMisused(varCollection: VarCollection): void {
  //
}
