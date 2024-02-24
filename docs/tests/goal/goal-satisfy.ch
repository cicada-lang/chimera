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

// NOTE `Equal` will do unification

assert satisfy(Equal(quote x, quote y))

assert satisfy(Boolean(true))
assert satisfy(Boolean(false))
assert not satisfy(Boolean(1))
assert not satisfy(Boolean(1))

// NOTE Not good because quoted variable is pattern variable,
//  for predicate use `isBoolean` instead.

assert satisfy(Boolean(quote x))

assert satisfy(Null(null))
assert not satisfy(Null(1))

// TypeConstraint

assert satisfy(String("abc"))
assert not satisfy(String(123))

// NOTE Not good because quoted variable is pattern variable,
//  for predicate use `isString` instead.

assert satisfy(String(quote x))

assert satisfy(Number(123))
assert not satisfy(Number("abc"))
