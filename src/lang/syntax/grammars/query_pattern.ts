export const query_pattern = {
  $grammar: {
    "query_pattern:name": [{ name: "variable_name" }],
    "query_pattern:variable_names": [
      '"["',
      { variable_names: "variable_names" },
      '"]"',
    ],
  },
}
