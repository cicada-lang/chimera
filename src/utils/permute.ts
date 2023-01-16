// NOTE Get the permutation of any array.
// - taken from: https://stackoverflow.com/a/37580979
// - references:
//   - http://homepage.math.uiowa.edu/~goodman/22m150.dir/2007/Permutation%20Generation%20Methods.pdf
//   - http://homepage.math.uiowa.edu/~goodman/algebrabook.dir/algebrabook.html

export function permute<A>(input: Array<A>): Array<Array<A>> {
  input = [...input]
  let length = input.length
  let result = [input.slice()]
  let c = new Array(length).fill(0)
  let i = 1
  let k
  let p

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i]
      p = input[i]
      input[i] = input[k]
      input[k] = p
      ++c[i]
      i = 1
      result.push(input.slice())
    } else {
      c[i] = 0
      ++i
    }
  }

  return result
}
