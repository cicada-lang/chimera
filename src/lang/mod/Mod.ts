import { Loader } from "../../loader"
import { Goal } from "../goal"
import { Clause, Relation } from "../relation"
import { Stmt } from "../stmt"
import { Value } from "../value"

export interface ModOptions {
  url: URL
  loader: Loader
}

export class Mod {
  variableCount = 0

  relations: Map<string, Relation> = new Map()
  outputs: Map<number, string> = new Map()
  stmts: Array<Stmt> = []

  constructor(public options: ModOptions) {}

  resolve(href: string): URL {
    return new URL(href, this.options.url)
  }

  async executeStmts(stmts: Array<Stmt>): Promise<void> {
    const offset = this.stmts.length
    for (const [index, stmt] of stmts.entries()) {
      const output = await stmt.execute(this)
      this.stmts.push(stmt)
      if (output) {
        this.outputs.set(offset + index, output)
        if (this.options.loader.options.onOutput) {
          this.options.loader.options.onOutput(output)
        }
      }
    }
  }

  defineClause(
    name: string,
    clauseName: string | undefined,
    value: Value,
    goals?: Array<Goal>,
  ): void {
    const relation = this.findOrCreateRelation(name)
    relation.clauses.push(
      Clause(
        clauseName || relation.clauses.length.toString(),
        value,
        goals || [],
      ),
    )
  }

  findOrCreateRelation(name: string): Relation {
    let relation = this.relations.get(name)
    if (relation !== undefined) {
      return relation
    }

    relation = new Relation([])
    this.relations.set(name, relation)
    return relation
  }
}
