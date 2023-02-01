export function arrayReplace<A>(
  array: Array<A>,
  index: number,
  value: A,
): Array<A> {
  const results: Array<A> = []
  for (const [i, x] of array.entries()) {
    if (i === index) {
      results.push(value)
    } else {
      results.push(x)
    }
  }

  return results
}
