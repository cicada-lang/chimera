clause Exp(var(name)) -- { String(name) }
clause Exp(fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(ap(target, arg)) -- { Exp(target) Exp(arg) }

print Exp
print Exp(quote var("x"))

// TypeConstraint

print Number
print Number(1)
