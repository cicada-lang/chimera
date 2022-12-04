export const datactor = {
  $grammar: {
    "datactor:datactor_no_goals_no_args": [{ name: "name_no_preserved" }],
    "datactor:datactor_no_goals": [
      { name: "name_no_preserved" },
      '"("',
      { args: "names" },
      '")"',
    ],
    "datactor:datactor": [
      { name: "name_no_preserved" },
      '"("',
      { args: "names" },
      '")"',
      "dashline",
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
  },
}

export const datactors = {
  $grammar: {
    "datactors:datactors": [
      { datactors: { $ap: ["zero_or_more", "datactor"] } },
    ],
  },
}
