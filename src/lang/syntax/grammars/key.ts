export const key = {
  $grammar: {
    "key:name": [{ name: "name_no_preserved" }],
    "key:quote": [{ data: { $pattern: ["string"] } }],
  },
}
