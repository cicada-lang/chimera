// NOTE Cartesian product of array of array.
// - taken from: https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript

export function product<A>(arrays: Array<Array<A>>): Array<Array<A>> {
  return arrays.reduce(
    (a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())) as Array<A>,
  ) as Array<Array<A>>
}
