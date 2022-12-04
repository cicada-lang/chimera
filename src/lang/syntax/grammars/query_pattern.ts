export const query_pattern = {
  $grammar: {
    "query_pattern:name": [{ name: "pattern_variable_name" }],
    "query_pattern:pattern_variable_names": [
      '"["',
      { pattern_variable_names: "pattern_variable_names" },
      '"]"',
    ],
  },
}
