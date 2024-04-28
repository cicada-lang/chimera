import * as pt from "@cicada-lang/partech"
import type { Exp } from "../../exp/index.js"
import * as Exps from "../../exp/index.js"
import * as Stmts from "../../stmt/index.js"
import * as matchers from "./index.js"

export function exp_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "exp:operator": ({ operator }) => operator_matcher(operator),
    "exp:operand": ({ operand }) => operand_matcher(operand),
  })(tree)
}

export function operator_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operator:var": ({ name }, { span }) => Exps.Var(pt.str(name), span),
    "operator:dot": ({ target, name }, { span }) =>
      Exps.Dot(matchers.operator_matcher(target), pt.str(name), span),
    "operator:ap": ({ target, args }, { span }) =>
      Exps.Ap(
        matchers.operator_matcher(target),
        matchers.args_matcher(args),
        span,
      ),
  })(tree)
}

export function operand_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operand:string": ({ data }, { span }) =>
      Exps.String(pt.trim_boundary(pt.str(data), 1), span),
    "operand:number": ({ data }, { span }) =>
      Exps.Number(Number.parseFloat(pt.str(data)), span),
    "operand:term": ({ type, kind, args }, { span }) =>
      Exps.Term(
        pt.str(type),
        pt.str(kind),
        matchers.args_matcher(args),
        span,
      ),
    "operand:null": ({}, { span }) => Exps.Null(span),
    "operand:true": ({}, { span }) => Exps.Boolean(true, span),
    "operand:false": ({}, { span }) => Exps.Boolean(false, span),
    "operand:array": ({ elements, last_element }, { span }) =>
      pt.matchers
        .zero_or_more_matcher(elements)
        .map(matchers.exp_matcher)
        .reduceRight(
          (result, element) => Exps.ListCons(element, result, span),
          Exps.ListCons(
            matchers.exp_matcher(last_element),
            Exps.ListNull(span),
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
          (result, element) => Exps.ListCons(element, result, span),
          Exps.ListCons(
            matchers.exp_matcher(last_element),
            matchers.exp_matcher(tail_element),
            span,
          ),
        ),
    "operand:array_empty": ({}, { span }) => Exps.ListNull(span),
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
    "operand:fn": ({ patterns, stmts }, { span }) =>
      Exps.Fn(
        matchers.args_matcher(patterns),
        matchers.stmts_matcher(stmts),
        span,
      ),
    "operand:fn_with_exp": ({ patterns, ret }, { span }) =>
      Exps.Fn(
        matchers.args_matcher(patterns),
        [Stmts.Return(matchers.exp_matcher(ret), span)],
        span,
      ),
    "operand:eval": ({ exp }, { span }) =>
      Exps.Eval(matchers.exp_matcher(exp), span),
    "operand:find": ({ pattern, limit, goals }, { span }) => {
      const realLimit = pt.matchers.optional_matcher(limit)
      return Exps.Find(
        matchers.exp_matcher(pattern),
        realLimit ? Number.parseFloat(pt.str(realLimit)) : Infinity,
        matchers.goals_matcher(goals),
        span,
      )
    },
    "operand:and": ({ elements, last_element }, { span }) =>
      Exps.And(
        [
          ...pt.matchers
            .zero_or_more_matcher(elements)
            .map(matchers.exp_matcher),
          matchers.exp_matcher(last_element),
        ],
        span,
      ),
    "operand:and_empty": ({}, { span }) => Exps.And([], span),
    "operand:or": ({ elements, last_element }, { span }) =>
      Exps.Or(
        [
          ...pt.matchers
            .zero_or_more_matcher(elements)
            .map(matchers.exp_matcher),
          matchers.exp_matcher(last_element),
        ],
        span,
      ),
    "operand:or_empty": ({}, { span }) => Exps.Or([], span),
    "operand:not": ({ exp }, { span }) =>
      Exps.Not(matchers.exp_matcher(exp), span),
    "operand:if": ({ target, thenExp, elseExp }, { span }) =>
      Exps.If(
        matchers.exp_matcher(target),
        matchers.exp_matcher(thenExp),
        matchers.exp_matcher(elseExp),
        span,
      ),
    "operand:if_without_else": ({ target, thenExp }, { span }) =>
      Exps.If(
        matchers.exp_matcher(target),
        matchers.exp_matcher(thenExp),
        Exps.Null(span),
        span,
      ),
    "operand:match": ({ target, cazes }, { span }) =>
      Exps.Match(
        matchers.exp_matcher(target),
        matchers.cazes_matcher(cazes),
        span,
      ),
  })(tree)
}
