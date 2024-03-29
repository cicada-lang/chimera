clause Exp(var(name)) -- { String(name) }
clause Exp(fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(ap(target, arg)) -- { Exp(target) Exp(arg) }

print find exp limit 10 {
  Exp(exp)
}

clause Value(closure(name, ret, env)) -- {
  String(name)
  Exp(ret)
  Env(env)
}

clause Env([])
clause Env([[name, value] | rest]) -- {
  String(name)
  Value(value)
  Env(rest)
}

clause Lookup([[key, value] | _rest], key, value) -- here
clause Lookup([[key, _value] | rest], name, found)
--------------------------------------------- there {
  NotEqual(key, name)
  Lookup(rest, name, found)
}

clause Eval(env, var(name), value)
---------------------------- var {
  Lookup(env, name, value)
}

clause Eval(env, fn(name, ret), value)
---------------------------------- fn {
  Equal(value, closure(name, ret, env))
}

clause Eval(env, ap(target, arg), value)
---------------------------------------- ap {
  Eval(env, target, closure(name, ret, env2))
  Eval(env, arg, argValue)
  Eval([[name, argValue] | env2], ret, value)
}

print find exp limit 3 {
  Equal(value, closure("y", var("x"), [
    ["x", closure("z", var("z"), [])]
  ]))
  Eval([], exp, value)
}
