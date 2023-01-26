export const goal = {
  $grammar: {
    "goal:apply": [{ target: "operator" }, { args: "args" }],
    "goal:equal": [{ left: "exp" }, '"="', { right: "exp" }],
    "goal:not_equal": [{ left: "exp" }, '"!"', '"="', { right: "exp" }],
    "goal:conj": [
      '"conj"',
      '"{"',
      { goals: { $ap: ["zero_or_more", "goal"] } },
      '"}"',
    ],
    "goal:disj": [
      '"disj"',
      '"{"',
      { goals: { $ap: ["zero_or_more", "goal"] } },
      '"}"',
    ],
  },
}

export const goals = {
  $grammar: {
    "goals:goals": [{ goals: { $ap: ["zero_or_more", "goal"] } }],
  },
}
