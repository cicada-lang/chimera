export const goal = {
  $grammar: {
    "goal:apply": [{ name: "relation_name" }, { args: "args" }],
    "goal:conj": [
      '"Conj"',
      '"("',
      '"["',
      {
        goals: { $ap: ["zero_or_more", "goal", '","'] },
      },
      '"]"',
      '")"',
    ],
    "goal:disj": [
      '"Disj"',
      '"("',
      '"["',
      {
        goals: { $ap: ["zero_or_more", "goal", '","'] },
      },
      '"]"',
      '")"',
    ],
  },
}

export const goals = {
  $grammar: {
    "goals:goals": [{ goals: { $ap: ["zero_or_more", "goal"] } }],
  },
}
