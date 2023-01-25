// Small step operational semantics of a Forth-like language.

clause Append([], t, t)
clause Append([a | d], t, out)
------------------------- {
  Append(d, t, res)
  out = [a | res]
}

clause Step([stack, [[quoted] | rest]], [[[quoted] | stack], rest])
clause Step([[quoted | stack], ["apply" | rest]], [stack, result]) -- { Append(quoted, rest, result) }
clause Step([[car, cdr | stack], ["cons" | rest]], [[[car | cdr] | stack], rest])
clause Step([[x | stack], ["dup" | rest]], [[x, x | stack], rest])
clause Step([[_x | stack], ["drop" | rest]], [stack, rest])
clause Step([[x, y | stack], ["swap" | rest]], [[y, x | stack], rest])
clause Step([[x, y | stack], ["over" | rest]], [[y, x, y | stack], rest])
clause Step([[x, y, z | stack], ["rot" | rest]], [[z, y, x | stack], rest])
clause Step([stack, ["lit", value | rest]], [[value | stack], rest])

clause Eval(start, end)
-------------------- {
  Step(start, end)
}

clause Eval(start, end)
------------------ {
  Step(start, next)
  Eval(next, end)
}

print find end {
  start = [
    [1, 2, 3],
    ["swap", "drop", "swap", "drop"],
  ]
  Eval(start, end)
}

print find end {
  start = [
    [[], 1, 2, 3],
    ["swap", "cons", "swap", "cons", "swap", "cons"],
  ]
  Eval(start, end)
}

print find end {
  start = [[], ["hello", "world"]]
  Eval(start, end)
}

print find words limit 10 {
  start = [[], words]
  end = [["I", "love", "you"], []]
  Eval(start, end)
}

// Try to solve something like quine.

print find words limit 1 {
  start = [[], [words, "apply"]]
  end = [words, []]
  Eval(start, end)
}
