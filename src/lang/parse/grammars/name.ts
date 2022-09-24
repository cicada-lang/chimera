import pt from "@cicada-lang/partech"

/**

   Preserve keywords for JSON.

**/

export const name = pt.grammars.pattern_unless_preserved("identifier", [
  "null",
  "true",
  "false",
])
