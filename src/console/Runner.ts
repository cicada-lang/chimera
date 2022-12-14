import fs from "fs"
import watcher from "node-watch"
import { Loader } from "../loader"
import { colors } from "../utils/colors"

export class Runner {
  loader = new Loader({
    onOutput: console.log,
  })

  constructor() {
    this.loader.fetcher.register("file", (url) =>
      fs.promises.readFile(url.pathname, "utf8"),
    )
  }

  async run(
    url: URL,
    opts?: { silent?: boolean },
  ): Promise<{ error?: unknown }> {
    try {
      await this.loader.load(url)
      return { error: undefined }
    } catch (error) {
      if (!opts?.silent) {
        if (error instanceof Error)
          console.error(highlightErrorMessage(error.message))
        else console.error(error)
      }

      return { error }
    }
  }

  async watch(main: URL): Promise<void> {
    await this.run(main)
    app.logger.info({ tag: "run", msg: main.pathname })
    app.logger.info({
      msg: `Watching for changes.`,
      tracked: this.loader.tracked,
    })

    for (const url of this.loader.tracked) {
      if (main.protocol !== "file:") continue

      watcher(url.pathname, async (event) => {
        if (event === "remove") {
          this.loader.delete(url)
          if (url.href === main.href) {
            app.logger.info({ tag: event, msg: url.pathname })
            app.logger.info({ msg: "The main file is removed." })
          } else {
            await this.run(main)
            app.logger.info({ tag: event, msg: url.pathname })
          }
        }

        if (event === "update") {
          this.loader.delete(url)
          await this.run(main)
          app.logger.info({ tag: event, msg: url.pathname })
        }
      })
    }
  }
}

function highlightErrorMessage(report: string): string {
  return report.split("\n").map(highlightLine).join("\n")
}

function highlightLine(line: string): string {
  if (!line.startsWith("[")) return line
  const i = line.indexOf("]")
  if (i === -1) return line
  const head = line.slice(0, i + 1)
  const rest = line.slice(i + 1)
  return colors.red(colors.bold(head)) + rest
}
