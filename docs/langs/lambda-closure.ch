clause Exp(Exp::Var(name)) -- { String(name) }
clause Exp(Exp::Fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(Exp::Ap(target, arg)) -- { Exp(target) Exp(arg) }

print find exp limit 10 {
  Exp(exp)
}

clause Value(Value::Closure(name, ret, env)) -- {
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

clause Eval(env, Exp::Var(name), value)
---------------------------- var {
  Lookup(env, name, value)
}

clause Eval(env, Exp::Fn(name, ret), value)
---------------------------------- fn {
  Equal(value, Value::Closure(name, ret, env))
}

clause Eval(env, Exp::Ap(target, arg), value)
---------------------------------------- ap {
  Eval(env, target, Value::Closure(name, ret, env2))
  Eval(env, arg, argValue)
  Eval([[name, argValue] | env2], ret, value)
}

print find exp limit 3 {
  Equal(value, Value::Closure("y", Exp::Var("x"), [
    ["x", Value::Closure("z", Exp::Var("z"), [])]
  ]))
  Eval([], exp, value)
}
