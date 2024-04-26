export const import_binding = {
  $grammar: {
    "import_binding:name": [
      { name: "variable_name" },
      { $ap: ["optional", '","'] },
    ],
    "import_binding:alias": [
      { name: "variable_name" },
      '"as"',
      { alias: "variable_name" },
      { $ap: ["optional", '","'] },
    ],
  },
}
