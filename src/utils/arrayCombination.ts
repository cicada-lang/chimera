export function arrayCombination<A>(
  array: Array<A>,
  k: number,
): Array<Array<A>> {
  if (k === 1) {
    return array.map((x) => [x])
  }

  return array.flatMap((x, i) =>
    arrayCombination(array.slice(i + 1), k - 1).map((arrays) => [...arrays, x]),
  )
}
