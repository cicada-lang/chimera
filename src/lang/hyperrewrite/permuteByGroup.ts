import groupBy from "lodash/groupBy"
import { permute } from "../../utils/permute"
import { product } from "../../utils/product"
import type { Value } from "../value"

// NOTE We have labelled edge, thus we should:
// - group by term name (label).
// - get the permutation of each group.
// - get the cartesian product of the permutations.

export function permuteByGroup(values: Array<Value>): Array<Array<Value>> {
  const groups = groupByTag(values)
  const fragments = product(groups.map(permute))
  return fragments.map((fragment) => fragment.flat())
}

function groupByTag(values: Array<Value>): Array<Array<Value>> {
  return Object.values(groupBy(values, valueGroupTag))
}

function valueGroupTag(value: Value): string {
  const kind = value["@kind"]
  return kind === "Term" ? `${kind}/${value.name}` : kind
}
