import type { Env } from "../env/index.js"
import type { Exp } from "../exp/index.js"
import type { Mod } from "../mod/index.js"
import type { Stmt } from "../stmt/index.js"

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
