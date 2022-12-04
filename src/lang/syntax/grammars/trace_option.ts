export const trace_option = {
  $grammar: {
    "trace_option:steps": ['"steps"', { exp: { $pattern: ["number"] } }],
  },
}
