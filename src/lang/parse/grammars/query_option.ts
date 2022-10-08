export const query_option = {
  $grammar: {
    "query_option:limit": ['"limit"', { value: { $pattern: ["number"] } }],
  },
}
