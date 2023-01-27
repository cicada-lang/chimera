hyperrule walk {
  ["left", "right"] => quote []
  ["forward", "backward"] => quote []
}

print hyperrewrite(walk, quote [
  "left", "forward", "right",
  "right", "forward", "forward",
  "backward", "left", "left",
])
