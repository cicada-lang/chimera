import * as pt from "@cicada-lang/partech"

export const zero_or_more = pt.grammars.zero_or_more
export const one_or_more = pt.grammars.one_or_more
export const optional = pt.grammars.optional
export const dashline = pt.grammars.dashline

export * from "./arg.js"
export * from "./caze.js"
export * from "./else_if.js"
export * from "./exp.js"
export * from "./goal.js"
export * from "./import_binding.js"
export * from "./key.js"
export * from "./name.js"
export * from "./property.js"
export * from "./stmt.js"
