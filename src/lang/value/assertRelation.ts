import { LangError } from "../errors"
import { Relation, Value } from "../value"

export function assertRelation(value: Value): asserts value is Relation {
  if (
    value === null ||
      typeof value !== "object" ||
      (value as any).kind !== "Relation"
  ) {
    const json = JSON.stringify(value)
    throw new LangError(
      `assertRelation expect value to be Relation instead of: ${json}`,
    )
  }
}
