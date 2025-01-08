import type { Env } from "../env/index.ts"
import type { Exp } from "../exp/index.ts"
import type { Mod } from "../mod/index.ts"
import type { Stmt } from "../stmt/index.ts"

export type Caze = {
  mod: Mod
  env: Env
  pattern: Exp
  stmts: Array<Stmt>
}

export function Caze(
  mod: Mod,
  env: Env,
  pattern: Exp,
  stmts: Array<Stmt>,
): Caze {
  return {
    mod,
    env,
    pattern,
    stmts,
  }
}
