import * as Errors from "../errors"
import type { Exp } from "../exp"
import { formatExp } from "../format"
import type * as Values from "../value"

export function createTermHeadFromExp(exp: Exp): Values.TermHead {
  if (exp["@kind"] === "Var") {
    return {
      prefix: [],
      name: exp.name,
    }
  }

  if (exp["@kind"] === "Dot") {
    const { prefix, name } = createTermHeadFromExp(exp.target)
    return {
      prefix: [...prefix, name],
      name: exp.name,
    }
  }

  throw new Errors.LangError(
    [
      `[createTermHeadFromExp] can not handle exp`,
      `  target: ${formatExp(exp)}`,
    ].join("\n"),
    { span: exp.span },
  )
}
