import { highlightErrorMessage } from "../lang/errors/index.ts"
import { Loader } from "../loader/index.ts"

export class Runner {
  loader = new Loader({
    onOutput: console.log,
  })

  run(url: URL, opts?: { silent?: boolean }): { error?: unknown } {
    try {
      this.loader.load(url)
      return { error: undefined }
    } catch (error) {
      if (!opts?.silent) {
        if (error instanceof Error) {
          console.error(highlightErrorMessage(error.message))
        } else {
          console.error(error)
        }
      }

      return { error }
    }
  }
}
