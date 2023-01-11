clause Exp(var(name)) -- { String(name) }
clause Exp(fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(ap(target, arg)) -- { Exp(target) Exp(arg) }

clause Type(atom(name)) -- { String(name) }
clause Type(arrow(argType, retType)) -- { Type(argType) Type(retType) }

clause Ctx([])
clause Ctx([[name, type] | rest]) -- { String(name) Type(type) Ctx(rest) }

clause Lookup([[key, value] | _rest], key, value)

clause Lookup([[key, _value] | rest], name, found)
-------------------------------------------- {
  key != name
  Lookup(rest, name, found)
}

clause Check(ctx, var(name), type)
---------------------------- {
  Lookup(ctx, name, type)
}

clause Check(ctx, fn(name, ret), arrow(argType, retType))
--------------------------------------------------- {
  Check([[name, argType] | ctx], ret, retType)
}

clause Check(ctx, ap(target, arg), retType)
------------------------------------- {
  Check(ctx, target, arrow(argType, retType))
  Check(ctx, arg, argType)
}

print find type {
  ctx = []
  exp = fn("x", var("x"))
  Check(ctx, exp, type)
}

print find exp limit 10 {
  ctx = []
  type = arrow("A", "A")
  Check(ctx, exp, type)
}

// (lambda (f) (f f)) can not type check,
// but empty list is the error message.
// see "miniKanren 2021 - Prolog-Style Meta-Programming miniKanren"
// - https://www.youtube.com/watch?v=09OyKjX4Sik
// for more about this.

print find type {
  ctx = []
  exp = fn("f", ap(var("f"), var("f")))
  Check(ctx, exp, type)
}
