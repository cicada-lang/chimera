import type { Loader } from "../../loader"
import { Datactor, Datatype } from "../datatype"
import type { Exp } from "../exp"
import type { Goal } from "../goal"
import { Clause, Relation } from "../relation"
import type { Stmt } from "../stmt"

export interface ModOptions {
  url: URL
  loader: Loader
}

export class Mod {
  variableCount = 0
  relations: Map<string, Relation> = new Map()
  datatypes: Map<string, Datatype> = new Map()
  outputs: Map<number, string> = new Map()
  stmts: Array<Stmt> = []
  imported: Array<URL> = []

  constructor(public options: ModOptions) {}

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

  /**
   
    About `Datatype`.

  **/

  createDatatype(name: string): void {
    this.datatypes.set(name, Datatype([]))
  }

  defineDatactor(
    name: string,
    datactorName: string,
    args: Array<string>,
    goals?: Array<Goal>,
  ): void {
    const datatype = this.findDatatypeOrFail(name)
    datatype.datactors.push(Datactor(datactorName, args, goals || []))
  }

  findDatatype(name: string): Datatype | undefined {
    return this.datatypes.get(name)
  }

  private findDatatypeOrFail(name: string): Datatype {
    const datatype = this.findDatatype(name)
    if (datatype === undefined) {
      throw new Error(
        `[Mod.findDatatypeOrFail] undefined datatype name: ${name}`,
      )
    }

    return datatype
  }
}
