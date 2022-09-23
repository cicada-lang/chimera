import { Env, EnvCons, EnvNull } from "../env"
// import { Stmt, StmtOutput } from "../stmt"
import { Value } from "../value"

export class Mod {
  env: Env = EnvNull()
  outputs: Map<number, StmtOutput> = new Map()
  stmts: Array<Stmt> = []

  // async executeStmts(stmts: Array<Stmt>): Promise<Array<StmtOutput>> {
  //   const outputs = []
  //   for (const [index, stmt] of stmts.entries()) {
  //     const output = await stmt.execute(this)
  //     this.stmts.push(stmt)
  //     if (output) {
  //       outputs.push(output)
  //       this.outputs.set(index, output)
  //     }
  //   }

  //   return outputs
  // }

  define(name: string, type: Value, value: Value): void {
    this.env = EnvCons(name, value, this.env)
  }
}
