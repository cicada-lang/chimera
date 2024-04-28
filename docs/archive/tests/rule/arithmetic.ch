rule arithmetic {
  add(x, zero()) => quote x
  add(x, add1(y)) => quote add1(add(x, y))

  mul(_, zero()) => quote zero()
  mul(x, add1(y)) => quote add(x, mul(x, y))

  sub(x, zero()) => quote x
  sub(add1(x), add1(y)) => quote sub(x, y)

  div(zero(), add1(_)) => quote zero()
  div(add1(x), add1(y)) => quote add1(div(sub(x, y), add1(y)))
}

let one = quote add1(zero())
let two = quote add1(eval one)
let three = quote add1(eval two)
let four = quote add1(eval three)
let five = quote add1(eval four)
let six = quote add1(eval five)
let seven = quote add1(eval six)
let eight = quote add1(eval seven)
let nine = quote add1(eval eight)
let ten = quote add1(eval nine)

print rewrite(arithmetic, quote add(add1(zero()), add1(zero())))
print rewrite(arithmetic, quote mul(add1(zero()), add1(zero())))
print rewrite(arithmetic, quote add(add1(add1(zero())), add1(add1(zero()))))
print rewrite(arithmetic, quote mul(add1(add1(zero())), add1(add1(zero()))))

print rewrite(arithmetic, quote div(eval four, eval two))
print rewrite(arithmetic, quote div(eval six, eval two))
print rewrite(arithmetic, quote div(eval eight, eval two))
