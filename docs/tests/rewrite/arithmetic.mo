rule arithmetic {
  add(x, zero()) => x
  add(x, add1(y)) => add1(add(x, y))

  mul(_, zero()) => zero()
  mul(x, add1(y)) => add(x, mul(x, y))

  sub(x, zero()) => x
  sub(add1(x), add1(y)) => sub(x, y)

  div(zero(), add1(_)) => zero()
  div(add1(x), add1(y)) => add1(div(sub(x, y), add1(y)))
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

print arithmetic(quote add(add1(zero()), add1(zero())))
print arithmetic(quote mul(add1(zero()), add1(zero())))
print arithmetic(quote add(add1(add1(zero())), add1(add1(zero()))))
print arithmetic(quote mul(add1(add1(zero())), add1(add1(zero()))))

print arithmetic(quote div(eval four, eval two))
print arithmetic(quote div(eval six, eval two))
print arithmetic(quote div(eval eight, eval two))
