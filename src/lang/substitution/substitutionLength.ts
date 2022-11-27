import type { Substitution } from "../substitution"

export function substitutionLength(substitution: Substitution): number {
  switch (substitution["@kind"]) {
    case "SubstitutionNull": {
      return 0
    }

    case "SubstitutionCons": {
      return substitutionLength(substitution.rest) + 1
    }
  }
}
