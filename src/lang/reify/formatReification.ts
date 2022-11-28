import { formatExp } from "../exp"
import type { Reification } from "../reify"

export function formatReification(reification: Reification): string {
  return formatExp(reification.exp)
}
