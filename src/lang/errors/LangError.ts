import * as pt from "@cicada-lang/partech"
import type { Span } from "../span"

export class LangError extends Error {
  constructor(
    public message: string,
    public options?: { span?: Span },
  ) {
    super(message)
  }

  report(text?: string): string {
    if (this.options?.span && text) {
      return [this.message + "\n", pt.report(this.options.span, text)].join(
        "\n",
      )
    }

    return this.message
  }
}
