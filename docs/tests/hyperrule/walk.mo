hyperrule Walk {
  ["left", "right"] => quote []
  ["forward", "backward"] => quote []
}

print hyperrewrite(Walk, quote [
  "left", "forward", "right",
  "right", "forward", "forward",
  "backward", "left", "left",
])
