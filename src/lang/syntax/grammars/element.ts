export const element = {
  $grammar: {
    "element:plain": [{ exp: "exp" }],
  },
}

export const elements = {
  $grammar: {
    "elements:elements": [
      '"["',
      { elements: { $ap: ["zero_or_more", "element", '","'] } },
      { last_element: "element" },
      { $ap: ["optional", '","'] },
      '"]"',
    ],
    "elements:elements_empty": ['"["', '"]"'],
  },
}
