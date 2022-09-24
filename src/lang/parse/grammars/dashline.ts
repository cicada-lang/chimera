export const dashline = {
  $grammar: {
    "dashline:dashline": ['"-"', { $ap: ["one_or_more", '"-"'] }],
  },
}
