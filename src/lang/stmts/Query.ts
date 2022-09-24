import { Goal } from "../goal"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export type QueryBinding = QueryBindingName

export type QueryBindingName = {
  kind: "QueryBindingName"
  name: string
}

export function QueryBindingName(name: string): QueryBindingName {
  return {
    kind: "QueryBindingName",
    name,
  }
}

export class Query extends Stmt {
  constructor(
    public bindings: Array<QueryBinding>,
    public goals: Array<Goal>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    //
  }
}
