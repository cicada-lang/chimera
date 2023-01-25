clause Exp(var(name)) -- { String(name) }
clause Exp(fn(name, ret)) -- { String(name) Exp(ret) }
clause Exp(ap(target, arg)) -- { Exp(target) Exp(arg) }

clause Env([])
clause Env([[name, value] | rest]) -- {
  String(name)
  Value(value)
  Env(rest)
}

clause Value(closure(name, ret, env)) -- {
  String(name)
  Exp(ret)
  Env(env)
}

function lookup(env, name) {
  return match env {
    [] => null
    [[key, value] | rest] =>
      if equal(key, name) then value
      else lookup(rest, name)
  }
}

let env = [["a", 1], ["b", 2], ["c", 3]]
assert equal(lookup(env, "b"), 2)
