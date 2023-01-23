// NOTE Cartesian product of array of array.

export function product<A>(arrays: Array<Array<A>>): Array<Array<A>> {
  return arrays.reduce(
    (a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())) as Array<A>,
  ) as Array<Array<A>>
}

// // Generate cartesian product of given iterables:
// function* productGen(head, ...tail) {
//   const remainder = tail.length > 0 ? productGen(...tail) : [[]];
//   for (let r of remainder) for (let h of head) yield [h, ...r];
// }

// // Example:
// console.log(Array.from(productGen([1, 2], [10, 20], [100, 200, 300])));
