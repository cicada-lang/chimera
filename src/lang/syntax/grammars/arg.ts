export const arg = {
  $grammar: {
    "arg:plain": [{ exp: "exp" }],
  },
}

export const args = {
  $grammar: {
    "args:args": [
      '"("',
      { args: { $ap: ["zero_or_more", "arg", '","'] } },
      { last_arg: "arg" },
      { $ap: ["optional", '","'] },
      '")"',
    ],
    "args:args_empty": ['"("', '")"'],
  },
}
