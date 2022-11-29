import { LangError } from "./LangError.ts"

export class ErrorReport extends LangError {
  constructor(public message: string) {
    super(message)
  }
}
