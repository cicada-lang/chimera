export function arrayReplace<A>(
  xs: Array<A>,
  index: number,
  value: A,
): Array<A> {
  const results: Array<A> = []
  for (const [i, x] of xs.entries()) {
    if (i === index) {
      results.push(value)
    } else {
      results.push(x)
    }
  }

  return results
}
