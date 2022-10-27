export const find_option = {
  $grammar: {
    "find_option:limit": ['"limit"', { value: { $pattern: ["number"] } }],
    "find_option:debug": ['"debug"', { value: { $pattern: ["number"] } }],
    "find_option:debug_default": ['"debug"'],
  },
}
