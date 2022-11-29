import type { Mod } from "../lang/mod/index.ts"

export abstract class Script {
  abstract mod: Mod
  abstract run(): Promise<void>
}
