import { glob } from "glob"
import fs from "node:fs"
import Path from "node:path"
import { test } from "node:test"
import { fileURLToPath } from "node:url"
import { Runner } from "./command-line/Runner.js"
import { stripAnsi } from "./utils/ansi.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

test("snapshot docs/**/*.ch", async () => {
  const files = await glob(`${__dirname}/../docs/**/*.ch`)
  for (const file of files) {
    if (file.endsWith(".error.ch")) {
      await snapshotError(new URL(`file:${file}`))
    } else {
      await snapshot(new URL(`file:${file}`))
    }
  }
})

async function snapshot(url: URL): Promise<void> {
  console.log(`[snapshot] ${url}`)
  const runner = new Runner()
  const mod = await runner.loader.load(url)
  const output = Array.from(mod.outputs.values()).join("\n")
  if (output) {
    await fs.promises.writeFile(`${url.pathname}.out`, output + "\n")
  }
}

async function snapshotError(url: URL): Promise<void> {
  console.log(`[snapshotError] ${url}`)
  try {
    const runner = new Runner()
    await runner.loader.load(url)
    throw new Error(`[snapshotError] Expecting error.`)
  } catch (error) {
    if (!(error instanceof Error)) throw error
    await fs.promises.writeFile(
      `${url.pathname}.err`,
      stripAnsi(error.message) + "\n",
    )
  }
}
