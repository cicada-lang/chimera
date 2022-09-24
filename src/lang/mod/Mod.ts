import * as Clauses from "../clause"
import { Clause } from "../clause"
import { Env, EnvCons, EnvNull, lookupValueInEnv } from "../env"
import { Exp } from "../exp"
import { Stmt, StmtOutput } from "../stmt"
import * as Values from "../value"

export class Mod {
  env: Env = EnvNull()
  outputs: Map<number, StmtOutput> = new Map()
  stmts: Array<Stmt> = []

  async executeStmts(stmts: Array<Stmt>): Promise<Array<StmtOutput>> {
    const outputs = []
    for (const [index, stmt] of stmts.entries()) {
      const output = await stmt.execute(this)
      this.stmts.push(stmt)
      if (output) {
        outputs.push(output)
        this.outputs.set(index, output)
      }
    }

    return outputs
  }

  defineClause(name: string, clause: Clause): void {
    const relation = lookupValueInEnv(this.env, name)
    if (relation === undefined) {
      this.env = EnvCons(name, Values.Relation([clause]), this.env)
    } else {
      Values.assertRelation(relation)
      relation.clauses.push(clause)
    }
  }
}
