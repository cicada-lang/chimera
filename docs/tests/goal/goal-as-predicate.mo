clause Exp(var(name)) -- { String(name) }
clause Exp(fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(ap(target, arg)) -- { Exp(target) Exp(arg) }

assert sat(Exp(quote var("x")))
assert sat(Exp(quote fn("x", var("x"))))
assert not sat(Exp(quote "x"))
assert not sat(Exp(quote fn()))

assert sat(Equal({ x: 1 }, { x: 1 }))
assert not sat(Equal({ x: 1 }, { x: 2 }))

assert sat(Equal(quote x, quote x))

// `Equal` will do unification
assert sat(Equal(quote x, quote y))

assert sat(Boolean(true))
assert sat(Boolean(false))
assert sat(Null(null))

assert not sat(Boolean(1))
assert not sat(Boolean(1))
assert not sat(Null(1))

// TypeConstraint

assert sat(String("abc"))
assert not sat(String(123))

assert sat(Number(123))
assert not sat(Number("abc"))
