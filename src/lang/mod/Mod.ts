import type { Loader } from "../../loader"
import type { Env } from "../env"
import { envEmpty, envEntries, envExtend, envLookupValue } from "../env"
import { useGlobals } from "../globals"
import type { Stmt } from "../stmt"
import type { Value } from "../value"

export interface ModOptions {
  url: URL
  loader: Loader
}

export class Mod {
  initialized = false
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
    mod.env = this.env
    mod.exported = new Set(this.exported)
    mod.outputs = new Map(this.outputs)
    mod.stmts = [...this.stmts]
    mod.imported = [...this.imported]
    return mod
  }

  initialize(): void {
    if (this.initialized) return
    const globals = useGlobals()
    globals.mount(this)
    this.initialized = true
  }

  find(name: string): Value | undefined {
    return envLookupValue(this.env, name)
  }

  resolve(href: string): URL {
    return new URL(href, this.options.url)
  }

  exportedEntries(): Array<[string, Value]> {
    return envEntries(this.env).filter(([name, value]) =>
      this.exported.has(name),
    )
  }

  define(name: string, value: Value): void {
    if (this.exportDepth > 0) {
      this.exported.add(name)
    }

    this.env = envExtend(this.env, name, value)
  }
}
