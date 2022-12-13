import type { Loader } from "../../loader"
import type { Env } from "../env"
import { envEmpty, envExtend, envLookupValue, envNames } from "../env"
import * as Errors from "../errors"
import type { Exp } from "../exp"
import { useGlobals } from "../globals"
import type { GoalExp } from "../goal-exp"
import type { Stmt } from "../stmt"
import {
  Clause,
  collectBindingsFromExp,
  collectBindingsFromGoalExps,
  Relation,
  Value,
} from "../value"

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
  private initialized = false
  private variableCount = 0
  env: Env = envEmpty()
  outputs: Map<number, string> = new Map()
  stmts: Array<Stmt> = []
  imported: Array<URL> = []

  constructor(public options: ModOptions) {}

  async initialize(): Promise<void> {
    if (this.initialized) return
    const globals = await useGlobals()
    await globals.mount(this)
    this.initialized = true
  }

  get names(): Array<string> {
    return envNames(this.env)
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

  define(name: string, value: Value): void {
    this.env = envExtend(this.env, name, value)
  }

  defineRelation(name: string): void {
    this.define(name, Relation(name, []))
  }

  defineClause(
    name: string,
    clauseName: string | undefined,
    exp: Exp,
    goals: Array<GoalExp> = [],
  ): void {
    const relation = this.findRelationOrFail(name)
    const bindings = new Set([
      ...collectBindingsFromExp(exp),
      ...collectBindingsFromGoalExps(goals),
    ])

    // Side-effect on `relation` in `env`.
    relation.clauses.push(
      Clause(
        this,
        this.env,
        bindings,
        clauseName || relation.clauses.length.toString(),
        exp,
        goals,
      ),
    )
  }

  find(name: string): Value | undefined {
    return envLookupValue(this.env, name)
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
