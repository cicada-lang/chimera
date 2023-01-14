import { Eval } from "exp.mo"

print find exp limit 3 {
  value = closure("y", var("x"), [
    ["x", closure("z", var("z"), [])]
  ])
  Eval([], exp, value)
}
