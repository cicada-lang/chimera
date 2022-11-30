export const query_pattern = {
  $grammar: {
    "query_pattern:name": [{ name: "name" }],
    "query_pattern:names": ['"["', { names: "names" }, '"]"'],
  },
}
