hyperrule Walk {
  ["left", "right"] => []
  ["forward", "backward"] => []
}

print hyperrewrite(Walk, quote [
  "left", "forward", "right",
  "right", "forward", "forward",
  "backward", "left", "left",
])

print hyperrewriteManySteps(3, Walk, quote [
  "left", "forward", "right",
  "right", "forward", "forward",
  "backward", "left", "left",
])

print hyperrewriteManySteps(10, Walk, quote [
  "left", "forward", "right",
  "right", "forward", "forward",
  "backward", "left", "left",
])
