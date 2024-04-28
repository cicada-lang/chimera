clause Exp(Exp::Var(name)) -- { String(name) }
clause Exp(Exp::Fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(Exp::Ap(target, arg)) -- { Exp(target) Exp(arg) }

clause Type(Type::Atom(name)) -- { String(name) }
clause Type(Type::Arrow(argType, retType)) -- { Type(argType) Type(retType) }

clause Ctx([])
clause Ctx([[name, type] | rest]) -- { String(name) Type(type) Ctx(rest) }

clause Lookup([[key, value] | _rest], key, value)
clause Lookup([[key, _value] | rest], name, found)
-------------------------------------------- {
  NotEqual(key, name)
  Lookup(rest, name, found)
}

clause Check(ctx, Exp::Var(name), type)
---------------------------- {
  Lookup(ctx, name, type)
}

clause Check(ctx, Exp::Fn(name, ret), Type::Arrow(argType, retType))
--------------------------------------------------- {
  Check([[name, argType] | ctx], ret, retType)
}

clause Check(ctx, Exp::Ap(target, arg), retType)
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
