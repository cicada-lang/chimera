clause Exp(var(name)) -- { String(name) }
clause Exp(fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(ap(target, arg)) -- { Exp(target) Exp(arg) }

assert satisfy(Exp(quote var("x")))
assert satisfy(Exp(quote fn("x", var("x"))))
assert not satisfy(Exp(quote "x"))
assert not satisfy(Exp(quote fn()))

assert satisfy(Equal({ x: 1 }, { x: 1 }))
assert not satisfy(Equal({ x: 1 }, { x: 2 }))

assert satisfy(Equal(quote x, quote x))

// `Equal` will do unification
assert satisfy(Equal(quote x, quote y))

assert satisfy(Boolean(true))
assert satisfy(Boolean(false))
assert satisfy(Null(null))

assert not satisfy(Boolean(1))
assert not satisfy(Boolean(1))
assert not satisfy(Null(1))

// TypeConstraint

assert satisfy(String("abc"))
assert not satisfy(String(123))

assert satisfy(Number(123))
assert not satisfy(Number("abc"))
