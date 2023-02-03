// NOTE Cartesian product of array of array.

export function arrayProduct<A>(arrays: Array<Array<A>>): Array<Array<A>> {
  if (arrays.length === 0) {
    return []
  }

  const [head, ...tail] = arrays

  if (tail.length === 0) {
    return head.map((e) => [e])
  }

  const results: Array<Array<A>> = []
  for (const rest of arrayProduct(tail)) {
    for (const e of head) {
      results.push([e, ...rest])
    }
  }

  return results
}
