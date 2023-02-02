import { arrayMember } from "./arrayMember"

export function arrayDedup<A>(
  array: Array<A>,
  eq: (x: A, y: A) => boolean,
): Array<A> {
  const results: Array<A> = []
  for (const x of array) {
    if (!arrayMember(array, x, eq)) {
      results.push(x)
    }
  }

  return results
}
