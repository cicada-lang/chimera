import { permute } from "../../utils/permute"
import type { Value } from "../value"

// TODO We have labelled edge, thus we should:
// - group by term name (label).
// - get the permutation of each group.
// - get the cartesian product of the permutations.

export function permutationOfValues(values: Array<Value>): Array<Array<Value>> {
  return permute(values)
}
