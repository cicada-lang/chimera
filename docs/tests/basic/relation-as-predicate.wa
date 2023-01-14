clause Exp(var(name)) -- { String(name) }
clause Exp(fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(ap(target, arg)) -- { Exp(target) Exp(arg) }

assert Exp(quote var("x"))
assert Exp(quote fn("x", var("x")))
assert not(Exp(quote "x"))
assert not(Exp(quote fn()))

assert Equal({ x: 1 }, { x: 1 })
assert not(Equal({ x: 1 }, { x: 2 }))

assert Boolean(true)
assert Boolean(false)
assert Null(null)

assert not(Boolean(1))
assert not(Boolean(1))
assert not(Null(1))
