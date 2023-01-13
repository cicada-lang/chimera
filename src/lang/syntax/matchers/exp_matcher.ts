import * as pt from "@cicada-lang/partech"
import type { Exp } from "../../exp"
import * as Exps from "../../exp"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function exp_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "exp:operator": ({ operator }) => operator_matcher(operator),
    "exp:operand": ({ operand }) => operand_matcher(operand),
  })(tree)
}

export function operator_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operator:var": ({ name }, { span }) => Exps.Var(pt.str(name), span),
  })(tree)
}

export function operand_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operand:string": ({ data }, { span }) =>
      Exps.String(pt.trim_boundary(pt.str(data), 1), span),
    "operand:number": ({ data }, { span }) =>
      Exps.Number(Number.parseFloat(pt.str(data)), span),
    "operand:null": ({}, { span }) => Exps.Null(span),
    "operand:true": ({}, { span }) => Exps.Boolean(true, span),
    "operand:false": ({}, { span }) => Exps.Boolean(false, span),
    "operand:array": ({ elements, last_element }, { span }) =>
      pt.matchers
        .zero_or_more_matcher(elements)
        .map(matchers.exp_matcher)
        .reduceRight(
          (result, element) => Exps.ArrayCons(element, result, span),
          Exps.ArrayCons(
            matchers.exp_matcher(last_element),
            Exps.ArrayNull(span),
            span,
          ),
        ),
    "operand:array_cons": (
      { elements, last_element, tail_element },
      { span },
    ) =>
      pt.matchers
        .zero_or_more_matcher(elements)
        .map(matchers.exp_matcher)
        .reduceRight(
          (result, element) => Exps.ArrayCons(element, result, span),
          Exps.ArrayCons(
            matchers.exp_matcher(last_element),
            matchers.exp_matcher(tail_element),
            span,
          ),
        ),
    "operand:array_empty": ({}, { span }) => Exps.ArrayNull(span),
    "operand:objekt": ({ properties, last_property }, { span }) =>
      Exps.Objekt(
        Object.fromEntries([
          ...pt.matchers
            .zero_or_more_matcher(properties)
            .map(matchers.property_matcher),
          matchers.property_matcher(last_property),
        ]),
        span,
      ),
    "operand:objekt_empty": ({}, { span }) => Exps.Objekt({}, span),
    "operand:term": ({ kind, args }, { span }) =>
      Exps.Ap(pt.str(kind), matchers.args_matcher(args), span),
    "operand:fn": ({ patterns, stmts }, { span }) =>
      Exps.Fn(
        matchers.args_matcher(patterns),
        matchers.stmts_matcher(stmts),
        span,
      ),
    "operand:fn_with_ret_exp": ({ patterns, ret }, { span }) =>
      Exps.Fn(
        matchers.args_matcher(patterns),
        [new Stmts.Return(matchers.exp_matcher(ret), span)],
        span,
      ),
    "operand:quote": ({ exp }, { span }) =>
      Exps.Quote(matchers.exp_matcher(exp), span),
    "operand:unquote": ({ exp }, { span }) =>
      Exps.Unquote(matchers.exp_matcher(exp), span),
    "operand:find": ({ pattern, limit, goals }, { span }) => {
      const realLimit = pt.matchers.optional_matcher(limit)
      return Exps.Find(
        matchers.exp_matcher(pattern),
        realLimit ? Number.parseFloat(pt.str(realLimit)) : Infinity,
        matchers.goals_matcher(goals),
        span,
      )
    },
  })(tree)
}
