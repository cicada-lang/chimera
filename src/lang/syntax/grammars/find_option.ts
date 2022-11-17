export const find_option = {
  $grammar: {
    "find_option:limit": ['"limit"', { exp: { $pattern: ["number"] } }],
    "find_option:debug": ['"debug"', { exp: { $pattern: ["number"] } }],
    "find_option:debug_default": ['"debug"'],
  },
}
