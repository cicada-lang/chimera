export function arrayEqual<A>(
  xs: Array<A>,
  ys: Array<A>,
  eq: (x: A, y: A) => boolean,
): boolean {
  if (xs.length !== ys.length) {
    return false
  }

  for (const [index, x] of xs.entries()) {
    const y = ys[index]
    if (!eq(x, y)) {
      return false
    }
  }

  return true
}
