import type { Mod } from "../lang/mod"

export abstract class Script {
  abstract mod: Mod
  abstract text: string
  abstract run(): Promise<void>
}
