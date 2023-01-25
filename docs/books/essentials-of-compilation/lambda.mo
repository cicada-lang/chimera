clause Exp(var(name)) -- { String(name) }
clause Exp(fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(ap(target, arg)) -- { Exp(target) Exp(arg) }

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

// function lookup(env, name) {
//   match env {
//     [] => null
//     [[key, value] | rest] =>
//     if equal(key, name) then value
//     else lookup(rest, name)
//   }
// }
