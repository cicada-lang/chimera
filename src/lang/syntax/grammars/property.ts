export const property = {
  $grammar: {
    "property:field_shorthand": [{ key: "key" }],
    "property:field": [{ key: "key" }, '":"', { exp: "exp" }],
  },
}
