import fs from "fs"
import watcher from "node-watch"
import { highlightErrorMessage } from "../lang/errors"
import { Loader } from "../loader"

export class Runner {
  loader = new Loader({
    onOutput: console.log,
  })

  constructor() {
    this.loader.fetcher.register("file", (url) => {
      if (process.platform === "win32") {
        return fs.readFileSync(url.pathname.slice(1), "utf8")
      } else {
        return fs.readFileSync(url.pathname, "utf8")
      }
    })
  }

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

  watch(main: URL): void {
    this.run(main)
    app.logger.info({ tag: "run", msg: main.pathname })
    app.logger.info({
      msg: `Watching for changes.`,
      tracked: this.loader.tracked,
    })

    for (const url of this.loader.tracked) {
      if (main.protocol !== "file:") {
        continue
      }

      watcher(url.pathname, (event) => {
        if (event === "remove") {
          this.loader.delete(url)
          if (url.href === main.href) {
            app.logger.info({ tag: event, msg: url.pathname })
            app.logger.info({ msg: "The main file is removed." })
          } else {
            this.run(main)
            app.logger.info({ tag: event, msg: url.pathname })
          }
        }

        if (event === "update") {
          this.loader.delete(url)
          this.run(main)
          app.logger.info({ tag: event, msg: url.pathname })
        }
      })
    }
  }
}
