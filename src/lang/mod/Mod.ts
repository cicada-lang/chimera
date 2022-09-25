import { Loader } from "../../loader"
import { Clause } from "../clause"
import { Env, EnvCons, EnvNull, lookupValueInEnv } from "../env"
import { Exp } from "../exp"
import { Goal } from "../goal"
import { Stmt, StmtOutput } from "../stmt"
import { Relation } from "../relation"
import * as Values from "../value"

export interface ModOptions {
  loader: Loader
  url: URL
}

export class Mod {
  relations: Map<string, Relation> = new Map()
  env: Env = EnvNull()
  outputs: Map<number, StmtOutput> = new Map()
  stmts: Array<Stmt> = []

  constructor(public options: ModOptions) {}

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

  defineClause(
    name: string,
    clauseName: string | undefined,
    exp: Exp,
    goals?: Array<Goal>,
  ): void {
    const relation = this.findOrCreateRelation(name)
    relation.clauses.push(
      Clause(
        clauseName || relation.clauses.length.toString(),
        exp,
        goals || [],
      ),
    )
  }

  private findOrCreateRelation(name: string): Values.Relation {
    let relation = lookupValueInEnv(this.env, name)
    if (relation === undefined) {
      relation = Values.Relation([])
      this.env = EnvCons(name, relation, this.env)
      return relation
    } else {
      Values.assertRelation(relation)
      return relation
    }
  }
}
