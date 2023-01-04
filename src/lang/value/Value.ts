import type { Clause } from "../clause"
import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Hyperrule as EmbeddedHyperrule } from "../hyperrule"
import type { Mod } from "../mod"
import type { Rule as EmbeddedRule } from "../rule"
import type { Stmt } from "../stmt"

export type Value =
  | PatternVar
  | ReifiedVar
  | String
  | Number
  | Boolean
  | Null
  | ArrayCons
  | ArrayNull
  | Objekt
  | Term
  | Relation
  | TypeConstraint
  | Rule
  | Hyperrule
  | Fn

export type PatternVar = {
  "@type": "Value"
  "@kind": "PatternVar"
  name: string
}

export function PatternVar(name: string): PatternVar {
  return {
    "@type": "Value",
    "@kind": "PatternVar",
    name,
  }
}

export type ReifiedVar = {
  "@type": "Value"
  "@kind": "ReifiedVar"
  count: number
}

export function ReifiedVar(count: number): ReifiedVar {
  return {
    "@type": "Value",
    "@kind": "ReifiedVar",
    count,
  }
}

export type String = {
  "@type": "Value"
  "@kind": "String"
  data: string
}

export function String(data: string): String {
  return {
    "@type": "Value",
    "@kind": "String",
    data,
  }
}

export type Number = {
  "@type": "Value"
  "@kind": "Number"
  data: number
}

export function Number(data: number): Number {
  return {
    "@type": "Value",
    "@kind": "Number",
    data,
  }
}

export type Boolean = {
  "@type": "Value"
  "@kind": "Boolean"
  data: boolean
}

export function Boolean(data: boolean): Boolean {
  return {
    "@type": "Value",
    "@kind": "Boolean",
    data,
  }
}

export type Null = {
  "@type": "Value"
  "@kind": "Null"
}

export function Null(): Null {
  return {
    "@type": "Value",
    "@kind": "Null",
  }
}

export type ArrayCons = {
  "@type": "Value"
  "@kind": "ArrayCons"
  car: Value
  cdr: Value
}

export function ArrayCons(car: Value, cdr: Value): ArrayCons {
  return {
    "@type": "Value",
    "@kind": "ArrayCons",
    car,
    cdr,
  }
}

export type ArrayNull = {
  "@type": "Value"
  "@kind": "ArrayNull"
}

export function ArrayNull(): ArrayNull {
  return {
    "@type": "Value",
    "@kind": "ArrayNull",
  }
}

export type Objekt = {
  "@type": "Value"
  "@kind": "Objekt"
  properties: Record<string, Value>
  etc?: Value
}

export function Objekt(properties: Record<string, Value>, etc?: Value): Objekt {
  return {
    "@type": "Value",
    "@kind": "Objekt",
    properties,
    etc,
  }
}

export type Term = {
  "@type": "Value"
  "@kind": "Term"
  name: string
  args: Array<Value>
}

export function Term(name: string, args: Array<Value>): Term {
  return {
    "@type": "Value",
    "@kind": "Term",
    name,
    args,
  }
}

export type Relation = {
  "@type": "Value"
  "@kind": "Relation"
  mod: Mod
  name: string
  clauses: Array<Clause>
}

export function Relation(
  mod: Mod,
  name: string,
  clauses: Array<Clause>,
): Relation {
  return {
    "@type": "Value",
    "@kind": "Relation",
    mod,
    name,
    clauses,
  }
}

export type TypeConstraint = {
  "@type": "Value"
  "@kind": "TypeConstraint"
  name: string
  predicate: (value: Value) => boolean
}

export function TypeConstraint(
  name: string,
  predicate: (value: Value) => boolean,
): TypeConstraint {
  return {
    "@type": "Value",
    "@kind": "TypeConstraint",
    name,
    predicate,
  }
}

export type Rule = {
  "@type": "Value"
  "@kind": "Rule"
  name: string
  rule: EmbeddedRule
}

export function Rule(name: string, rule: EmbeddedRule): Rule {
  return {
    "@type": "Value",
    "@kind": "Rule",
    name,
    rule,
  }
}

export type Hyperrule = {
  "@type": "Value"
  "@kind": "Hyperrule"
  name: string
  hyperrule: EmbeddedHyperrule
}

export function Hyperrule(
  name: string,
  hyperrule: EmbeddedHyperrule,
): Hyperrule {
  return {
    "@type": "Value",
    "@kind": "Hyperrule",
    name,
    hyperrule,
  }
}

/**

   `Values.Fn` has both `env` and `mod`

   - So that top-level bindings defined after the function
     are also available in the function.

   - To support mutual recursive definition in function body.

   - We will shallow copy `Mod` at each function application.

**/

export type Fn = {
  "@type": "Value"
  "@kind": "Fn"
  mod: Mod
  env: Env
  patterns: Array<Value>
  stmts: Array<Stmt>
  ret: Exp
}

export function Fn(
  mod: Mod,
  env: Env,
  patterns: Array<Value>,
  stmts: Array<Stmt>,
  ret: Exp,
): Fn {
  return {
    "@type": "Value",
    "@kind": "Fn",
    mod,
    env,
    patterns,
    stmts,
    ret,
  }
}
