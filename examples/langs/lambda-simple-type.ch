relation Exp(Exp::Var(name)) -- { String(name) }
relation Exp(Exp::Fn(name, ret)) -- { String(name) Exp(ret) }
relation Exp(Exp::Ap(target, arg)) -- { Exp(target) Exp(arg) }

relation Type(Type::Atom(name)) -- { String(name) }
relation Type(Type::Arrow(argType, retType)) -- { Type(argType) Type(retType) }

relation Ctx([])
relation Ctx([[name, type] | rest]) -- { String(name) Type(type) Ctx(rest) }

relation Lookup([[key, value] | _rest], key, value)
relation Lookup([[key, _value] | rest], name, found)
-------------------------------------------- {
  NotEqual(key, name)
  Lookup(rest, name, found)
}

relation Check(ctx, Exp::Var(name), type)
---------------------------- {
  Lookup(ctx, name, type)
}

relation Check(ctx, Exp::Fn(name, ret), Type::Arrow(argType, retType))
--------------------------------------------------- {
  Check([[name, argType] | ctx], ret, retType)
}

relation Check(ctx, Exp::Ap(target, arg), retType)
------------------------------------- {
  Check(ctx, target, Type::Arrow(argType, retType))
  Check(ctx, arg, argType)
}

print find type {
  Equal(ctx, [])
  Equal(exp, Exp::Fn("x", Exp::Var("x")))
  Check(ctx, exp, type)
}

print find exp limit 10 {
  Equal(ctx, [])
  Equal(type, Type::Arrow("A", "A"))
  Check(ctx, exp, type)
}

// (lambda (f) (f f)) can not type check,
// but empty list is the error message.
// see "miniKanren 2021 - Prolog-Style Meta-Programming miniKanren"
// - https://www.youtube.com/watch?v=09OyKjX4Sik
// for more about this.

print find type {
  Equal(ctx, [])
  Equal(exp, Exp::Fn("f", Exp::Ap(Exp::Var("f"), Exp::Var("f"))))
  Check(ctx, exp, type)
}
