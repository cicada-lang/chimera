export const goal = {
  $grammar: {
    "goal:apply": [{ name: "name" }, { exp: "exp" }],
    "goal:unify": [{ left: "exp" }, '"="', { right: "exp" }],
  },
}

export const goals = {
  $grammar: {
    "goals:goals": [{ goals: { $ap: ["zero_or_more", "goal"] } }],
  },
}
