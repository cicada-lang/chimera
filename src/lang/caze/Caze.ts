import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"

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
