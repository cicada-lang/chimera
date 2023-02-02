export function arrayRemove<A>(array: Array<A>, index: number): Array<A> {
  const results: Array<A> = []
  for (const [i, x] of array.entries()) {
    if (i !== index) {
      results.push(x)
    }
  }

  return results
}
