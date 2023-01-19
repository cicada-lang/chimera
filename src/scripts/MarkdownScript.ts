import * as commonmark from "commonmark"
import { createErrorReport } from "../lang/errors"
import { executeStmts } from "../lang/execute"
import type { Mod } from "../lang/mod"
import { parseStmts } from "../lang/syntax"
import { Script } from "../script"

export class MarkdownScript extends Script {
  constructor(public mod: Mod, public text: string) {
    super()
  }

  async run(): Promise<void> {
    for (const block of collectBlocks(this.text)) {
      await this.runBlock(block)
    }
  }

  buildText(block: Block): string | undefined {
    if (block.info === "mo") {
      return block.code
    }
  }

  async runBlock(block: Block): Promise<void> {
    const text = this.buildText(block)
    if (text === undefined) return

    try {
      const stmts = parseStmts(text)
      await executeStmts(this.mod, stmts)
    } catch (error) {
      throw createErrorReport(error, text)
    }
  }
}

type Block = { index: number; info: string; code: string }

function collectBlocks(text: string): Array<Block> {
  const reader = new commonmark.Parser()
  const parsed: commonmark.Node = reader.parse(text)
  const blocks = []
  const walker = parsed.walker()
  let counter = 0
  let event, node
  while ((event = walker.next())) {
    node = event.node
    if (event.entering && node.type === "code_block") {
      const [start_pos, _end_pos] = node.sourcepos
      const [row, col] = start_pos
      blocks.push({
        index: counter++,
        info: node.info || "",
        code: node.literal || "",
      })
    }
  }

  return blocks
}
