import type { Loader } from "../../loader"
import type { Exp } from "../exp"
import type { Goal } from "../goal"
import { Clause, Relation } from "../relation"
import type { Stmt } from "../stmt"

export interface ModOptions {
  url: URL
  loader: Loader
}

/**

   It is safe to put the `variableCount` in a `Mod`,
   instead of using true global `variableCount`,
   because refreshing is relative to a `Mod`.

**/

export class Mod {
  private variableCount = 0
  relations: Map<string, Relation> = new Map()
  outputs: Map<number, string> = new Map()
  stmts: Array<Stmt> = []
  imported: Array<URL> = []

  constructor(public options: ModOptions) {}

  freshen(name: string): string {
    const [prefix, _count] = name.split("#")
    return `${prefix}#${this.variableCount++}`
  }

  resolve(href: string): URL {
    return new URL(href, this.options.url)
  }

  async executeStmts(stmts: Array<Stmt>): Promise<void> {
    for (const stmt of stmts.values()) {
      stmt.prepare(this)
    }

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

  /**

    About `Relation`.

  **/

  createRelation(name: string): void {
    this.relations.set(name, Relation([]))
  }

  defineClause(
    name: string,
    clauseName: string | undefined,
    exp: Exp,
    goals?: Array<Goal>,
  ): void {
    const relation = this.findRelationOrFail(name)
    const realClauseName = clauseName || relation.clauses.length.toString()
    relation.clauses.push(Clause(realClauseName, exp, goals || []))
  }

  findRelation(name: string): Relation | undefined {
    return this.relations.get(name)
  }

  private findRelationOrFail(name: string): Relation {
    const relation = this.findRelation(name)
    if (relation === undefined) {
      throw new Error(
        `[Mod.findRelationOrFail] undefined relation name: ${name}`,
      )
    }

    return relation
  }
}
