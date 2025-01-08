import * as pt from "@cicada-lang/partech"

export const zero_or_more = pt.grammars.zero_or_more
export const one_or_more = pt.grammars.one_or_more
export const optional = pt.grammars.optional
export const dashline = pt.grammars.dashline

export * from "./arg.ts"
export * from "./caze.ts"
export * from "./else_if.ts"
export * from "./exp.ts"
export * from "./goal.ts"
export * from "./import_binding.ts"
export * from "./key.ts"
export * from "./name.ts"
export * from "./property.ts"
export * from "./stmt.ts"
