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

function evaluate(env, exp) {
  return match exp {
    var(name) => lookup(env, name)
    fn(name, ret) => quote closure(eval name, eval ret, eval env)
    ap(target, arg) => apply(evaluate(env, target), evaluate(env, arg))
  }
}

function apply(target, arg) {
  return match target {
    closure(name, ret, env) => evaluate([[name, arg] | env], ret)
  }
}

let id = quote fn("x", var("x"))

print evaluate([], quote ap(eval id, eval id))
print evaluate([], quote ap(eval id, ap(eval id, eval id)))
