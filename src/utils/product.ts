// NOTE Cartesian product of array of array.

export function product<A>(arrays: Array<Array<A>>): Array<Array<A>> {
  const [head, ...tail] = arrays

  if (tail.length === 0) {
    return head.map((e) => [e])
  }

  const results: Array<Array<A>> = []
  for (const rest of product(tail)) {
    for (const e of head) {
      results.push([e, ...rest])
    }
  }

  return results
}
