import type { AssertionError } from "./AssertionError"
import { LangError } from "./LangError"

export class TestingError extends LangError {
  constructor(
    public message: string,
    public assertionErrors: Array<AssertionError>,
  ) {
    super(message)
  }

  report(text?: string): string {
    return [
      this.message,
      ...this.assertionErrors.map((assertionError) =>
        assertionError.report(text),
      ),
    ].join("\n")
  }
}
