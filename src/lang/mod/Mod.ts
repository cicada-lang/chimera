import type { Loader } from "../../loader"
import type { Env } from "../env"
import { envEmpty, envExtend, envLookupValue } from "../env"
import * as Errors from "../errors"
import type { Exp } from "../exp"
import type { Goal } from "../goal"
import type { Stmt } from "../stmt"
import type { Value } from "../value"
import { Clause, Relation } from "../value"

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
  env: Env = envEmpty()
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

  define(name: string, value: Value): void {
    this.env = envExtend(this.env, name, value)
  }

  /**

    About `Relation`.

  **/

  createRelation(name: string): void {
    this.env = envExtend(this.env, name, Relation(name, []))
  }

  /**

     Side-effect on `relation` in `env`.

  **/

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
    const value = envLookupValue(this.env, name)
    if (value === undefined) return undefined

    if (value["@kind"] !== "Relation") {
      throw new Errors.LangError(
        [
          `[Mod.findRelation] expect value to be Relation`,
          `  name: ${name}`,
          `  value["@kind"]: ${value["@kind"]}`,
        ].join("\n"),
      )
    }

    return value
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
