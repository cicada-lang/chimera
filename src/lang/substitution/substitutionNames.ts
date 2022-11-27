import type { Substitution } from "../substitution"

export function substitutionNames(substitution: Substitution): Array<string> {
  switch (substitution["@kind"]) {
    case "SubstitutionNull": {
      return []
    }

    case "SubstitutionCons": {
      return [substitution.name, ...substitutionNames(substitution.rest)]
    }
  }
}
