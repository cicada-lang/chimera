export const find_option = {
  $grammar: {
    "find_option:limit": ['"limit"', { exp: { $pattern: ["number"] } }],
  },
}
