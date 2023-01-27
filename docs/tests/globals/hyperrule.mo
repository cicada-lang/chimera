hyperrule walk {
  ["left", "right"] => []
  ["forward", "backward"] => []
}

print hyperrewrite(walk, quote [
  "left", "forward", "right",
  "right", "forward", "forward",
  "backward", "left", "left",
])

print hyperrewriteManySteps(3, walk, quote [
  "left", "forward", "right",
  "right", "forward", "forward",
  "backward", "left", "left",
])

print hyperrewriteManySteps(10, walk, quote [
  "left", "forward", "right",
  "right", "forward", "forward",
  "backward", "left", "left",
])
