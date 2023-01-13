import * as pt from "@cicada-lang/partech"

export const zero_or_more = pt.grammars.zero_or_more
export const one_or_more = pt.grammars.one_or_more
export const optional = pt.grammars.optional
export const dashline = pt.grammars.dashline

export * from "./arg"
export * from "./element"
export * from "./else_if"
export * from "./exp"
export * from "./goal"
export * from "./hyperrule"
export * from "./import_binding"
export * from "./key"
export * from "./name"
export * from "./property"
export * from "./rule"
export * from "./stmt"
