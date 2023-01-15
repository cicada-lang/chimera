import type { Loader } from "../../loader"
import { Clause } from "../clause"
import type { Env } from "../env"
import { envEmpty, envEntries, envExtend, envLookupValue } from "../env"
import * as Errors from "../errors"
import { evaluateGoalExp, quote } from "../evaluate"
import type { Exp } from "../exp"
import { useGlobals } from "../globals"
import type { GoalExp } from "../goal-exp"
import type { Stmt } from "../stmt"
import { Relation, Value } from "../value"

export interface ModOptions {
  url: URL
  loader: Loader
}

/**

   TODO Is it safe to put the `variableCount` in a `Mod`
   (instead of using a global `variableCount`)?

**/

export class Mod {
  initialized = false
  variableCount = 0
  env: Env = envEmpty()
  exported: Set<string> = new Set()
  exportDepth: number = 0
  outputs: Map<number, string> = new Map()
  stmts: Array<Stmt> = []
  imported: Array<URL> = []

  constructor(public options: ModOptions) {}

  copy(): Mod {
    const mod = new Mod(this.options)
    mod.initialized = this.initialized
    mod.variableCount = this.variableCount
    mod.env = this.env
    mod.exported = new Set(this.exported)
    mod.outputs = new Map(this.outputs)
    mod.stmts = [...this.stmts]
    mod.imported = [...this.imported]
    return mod
  }

  async initialize(): Promise<void> {
    if (this.initialized) return
    const globals = await useGlobals()
    await globals.mount(this)
    this.initialized = true
  }

  entries(): Array<[string, Value]> {
    return envEntries(this.env)
  }

  find(name: string): Value | undefined {
    return envLookupValue(this.env, name)
  }

  freshen(name: string): string {
    const [prefix, _count] = name.split("#")
    return `${prefix}#${this.variableCount++}`
  }

  resolve(href: string): URL {
    return new URL(href, this.options.url)
  }

  async executeStmts(stmts: Array<Stmt>): Promise<void> {
    await this.initialize()

    for (const stmt of stmts.values()) {
      await stmt.prepare(this)
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

  executeStmtsSync(stmts: Array<Stmt>): void {
    if (!this.initialized) {
      throw new Errors.LangError(`[Mod.executeStmtsSync] not initialized mod`)
    }

    for (const stmt of stmts.values()) {
      stmt.prepareSync(this)
    }

    const offset = this.stmts.length
    for (const [index, stmt] of stmts.entries()) {
      const output = stmt.executeSync(this)
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
    if (this.exportDepth > 0) {
      this.exported.add(name)
    }

    this.env = envExtend(this.env, name, value)
  }

  ensureRelationOfThisMod(name: string): void {
    const relation = this.findRelation(name)
    if (relation !== undefined && relation.mod === this) {
      return
    }

    this.define(name, Relation(this, name, []))
  }

  defineClause(
    name: string,
    clauseName: string | undefined,
    exps: Array<Exp>,
    goals: Array<GoalExp> = [],
  ): void {
    const relation = this.findRelationOrFail(name)

    const clause = Clause(
      clauseName || relation.clauses.length.toString(),
      exps.map((exp) => quote(this, this.env, exp)),
      goals.map((goal) => evaluateGoalExp(this, this.env, goal)),
    )

    /**

       NOTE We do side-effect on `relation` in `env`,
       TODO Can we still copy `Mod` safely -- need for `Fn`'s `Mod`.

     **/

    relation.clauses.push(clause)

    this.define(relation.name, relation)
  }

  private findRelation(name: string): Relation | undefined {
    const relation = this.find(name)

    if (relation === undefined) return undefined

    if (relation["@kind"] !== "Relation") {
      throw new Errors.LangError(
        [
          `[Mod.findRelation] expecting relation`,
          `  name: ${name}`,
          `  relation["@kind"]: ${relation["@kind"]}`,
        ].join("\n"),
      )
    }

    return relation
  }

  private findRelationOrFail(name: string): Relation {
    const relation = this.findRelation(name)

    if (relation === undefined) {
      throw new Errors.LangError(
        `[Mod.findRelationOrFail] undefined relation name: ${name}`,
      )
    }

    return relation
  }
}
