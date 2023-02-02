export function arrayMember<A>(
  array: Array<A>,
  value: A,
  eq: (x: A, y: A) => boolean,
): boolean {
  for (const x of array) {
    if (eq(x, value)) {
      return true
    }
  }

  return false
}
